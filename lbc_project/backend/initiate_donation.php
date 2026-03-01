<?php
// backend/initiate_donation.php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../donation.php');
    exit;
}

// ✅ CSRF check
if (!csrf_check($_POST['csrf_token'] ?? '')) {
    header('Location: ../donation.php?error=' . urlencode('Session expired. Please refresh and try again.'));
    exit;
}

$amount = isset($_POST['custom_amount']) ? (float)$_POST['custom_amount'] : 0;
$fname  = trim($_POST['fname'] ?? '');
$lname  = trim($_POST['lname'] ?? '');
$name   = trim($fname . ' ' . $lname);
$email  = trim($_POST['email'] ?? '');
$note   = trim($_POST['donation_note'] ?? '');

// ✅ validation
if ($amount <= 0 || $amount > 1000000) {
    header('Location: ../donation.php?error=' . urlencode('Please enter a valid donation amount.'));
    exit;
}
if ($fname === '' || $lname === '' || $email === '') {
    header('Location: ../donation.php?error=' . urlencode('First name, last name, and email are required.'));
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ../donation.php?error=' . urlencode('Please enter a valid email address.'));
    exit;
}

// Save donation session (used by payment.php + backend verification)
$_SESSION['donation'] = [
    'amount'   => $amount,
    'name'     => $name,
    'email'    => $email,
    'note'     => $note,
    'currency' => 'GHS'
];

// Create pending donation record
try {
    $pdo = db();
    $user_id = $_SESSION['user']['id'] ?? null;

    $stmt = $pdo->prepare(
        "INSERT INTO donations (user_id, name, email, note, amount, currency, status, created_at)
         VALUES (?, ?, ?, ?, ?, 'GHS', 'pending', NOW())"
    );
    $stmt->execute([$user_id, $name, $email, $note, $amount]);

    $_SESSION['donation_id'] = (int)$pdo->lastInsertId();
} catch (Exception $e) {
    header('Location: ../donation.php?error=' . urlencode('We could not start your donation. Please try again.'));
    exit;
}

// Require login before payment
if (!current_user()) {
    $_SESSION['redirect_after_login'] = '/payment.php';
    $_SESSION['auth_info'] = 'Please sign in or create an account to continue to payment.';
    header('Location: ../login.php');
    exit;
}

header('Location: ../payment.php');
exit;