<?php
// initiate_donation.php - Handles initial donation form submission
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../donation.html');
    exit;
}

// Get form data
$amount = isset($_POST['custom_amount']) ? floatval($_POST['custom_amount']) : (isset($_POST['value']) ? floatval($_POST['value']) : 0);
$fname = isset($_POST['fname']) ? trim($_POST['fname']) : '';
$lname = isset($_POST['lname']) ? trim($_POST['lname']) : '';
$name = trim($fname . ' ' . $lname);
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// Basic validation
if ($amount <= 0) {
    $_SESSION['error'] = 'Please enter a valid donation amount.';
    header('Location: ../donation.html');
    exit;
}

if (empty($fname) || empty($lname) || empty($email)) {
    $_SESSION['error'] = 'First name, last name, and email are required.';
    header('Location: ../donation.html');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['error'] = 'Please enter a valid email address.';
    header('Location: ../donation.html');
    exit;
}

// Store in session
$_SESSION['donation'] = [
    'amount' => $amount,
    'name' => $name,
    'email' => $email
];

// Redirect to payment page
header('Location: ../payment.php');
exit;
?>