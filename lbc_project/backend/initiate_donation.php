<?php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    safe_redirect('../donation.php');
}

if (!csrf_check($_POST['csrf_token'] ?? '')) {
    safe_redirect('../donation.php?error=' . urlencode('Session expired. Please try again.'));
}

$amount = isset($_POST['custom_amount']) ? (float)$_POST['custom_amount'] : 0;
$fname  = trim($_POST['fname'] ?? '');
$lname  = trim($_POST['lname'] ?? '');
$name   = trim($fname . ' ' . $lname);
$email  = trim($_POST['email'] ?? '');
$note   = trim($_POST['donation_note'] ?? '');

if ($amount <= 0) safe_redirect('../donation.php?error=' . urlencode('Please enter a valid donation amount.'));
if ($fname === '' || $lname === '' || $email === '') safe_redirect('../donation.php?error=' . urlencode('First name, last name, and email are required.'));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) safe_redirect('../donation.php?error=' . urlencode('Please enter a valid email address.'));

$_SESSION['donation'] = [
    'amount' => $amount,
    'name'   => $name,
    'email'  => $email,
    'note'   => $note,
    'currency' => 'GHS'
];

// Require login BEFORE inserting donation record (cleaner)
if (!current_user()) {
    $_SESSION['redirect_after_login'] = '/payment.php';
    $_SESSION['auth_info'] = 'Please sign in or create an account to continue to payment.';
    safe_redirect('../login.php');
}

try {
    $pdo = db();
    $user_id = current_user()['id'];

    $stmt = $pdo->prepare(
        "INSERT INTO donations (user_id, name, email, note, amount, currency, status, created_at)
         VALUES (?, ?, ?, ?, ?, 'GHS', 'pending', NOW())"
    );
    $stmt->execute([$user_id, $name, $email, $note, $amount]);
    $_SESSION['donation_id'] = (int)$pdo->lastInsertId();
} catch (Exception $e) {
    safe_redirect('../donation.php?error=' . urlencode('Could not start donation. Please try again.'));
}

safe_redirect('../payment.php');