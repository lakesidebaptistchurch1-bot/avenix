<?php
// initiate_donation.php - Handles initial donation form submission
session_start();
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../donation.php');
    exit;
}

// Get form data - map preset values (value1, value2, ...) to amounts in GH₵
$value_map = ['value1' => 100, 'value2' => 200, 'value3' => 300, 'value4' => 400, 'value5' => 500, 'value6' => 600];
$raw_value = isset($_POST['value']) ? trim($_POST['value']) : '';
$amount = isset($_POST['custom_amount']) ? floatval($_POST['custom_amount']) : (isset($value_map[$raw_value]) ? $value_map[$raw_value] : floatval($raw_value));
$fname = isset($_POST['fname']) ? trim($_POST['fname']) : '';
$lname = isset($_POST['lname']) ? trim($_POST['lname']) : '';
$name = trim($fname . ' ' . $lname);
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$note = isset($_POST['donation_note']) ? trim($_POST['donation_note']) : '';

// Basic validation
if ($amount <= 0) {
    header('Location: ../donation.php?error=' . urlencode('Please enter a valid donation amount.'));
    exit;
}

if (empty($fname) || empty($lname) || empty($email)) {
    header('Location: ../donation.php?error=' . urlencode('First name, last name, and email are required.'));
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ../donation.php?error=' . urlencode('Please enter a valid email address.'));
    exit;
}

// Store in session
$_SESSION['donation'] = [
    'amount' => $amount,
    'name' => $name,
    'email' => $email,
    'note' => $note
];

// Store donation draft (optional)
try {
    $pdo = db();
    $stmt = $pdo->prepare('INSERT INTO donations (user_id, name, email, note, amount, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())');
    $user_id = $_SESSION['user']['id'] ?? null;
    $stmt->execute([$user_id, $name, $email, $note, $amount, 'pending']);
    $_SESSION['donation_id'] = $pdo->lastInsertId();
} catch (Exception $e) {
    // Silently continue if DB insert fails
}

// Require login before payment
if (!isset($_SESSION['user'])) {
    $_SESSION['redirect_after_login'] = '/payment.php';
    $_SESSION['auth_info'] = 'Please sign in or create an account to continue to payment.';
    header('Location: ../login.php');
    exit;
}

// Redirect to payment page
header('Location: ../payment.php');
exit;
?>