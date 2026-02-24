<?php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../forgot-password.php');
    exit;
}

$email = trim($_POST['email'] ?? '');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['auth_error'] = 'Please enter a valid email address.';
    header('Location: ../forgot-password.php');
    exit;
}

$pdo = db();
$stmt = $pdo->prepare('SELECT id, name, email FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

// Always show success to avoid email enumeration
if (!$user) {
    $_SESSION['auth_success'] = 'If that email exists, a reset link has been sent.';
    header('Location: ../forgot-password.php');
    exit;
}

$token = bin2hex(random_bytes(32));
$token_hash = hash('sha256', $token);
$expires = date('Y-m-d H:i:s', time() + 3600);

$pdo->prepare('DELETE FROM password_resets WHERE user_id = ?')->execute([$user['id']]);
$insert = $pdo->prepare('INSERT INTO password_resets (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, NOW())');
$insert->execute([$user['id'], $token_hash, $expires]);

$reset_link = BASE_URL . '/reset-password.php?token=' . $token;

// Send reset email (use SMTP provider in production)
$mail_sent = send_reset_email($user['email'], $user['name'], $reset_link);

if (APP_ENV !== 'production') {
    $_SESSION['auth_success'] = 'Reset link generated. Use the link below to continue.';
    $_SESSION['reset_link'] = $reset_link;
} else {
    $_SESSION['auth_success'] = $mail_sent
        ? 'If that email exists, a reset link has been sent.'
        : 'We could not send the email. Please contact support.';
}

header('Location: ../forgot-password.php');
exit;

function send_reset_email($to, $name, $link) {
    $subject = 'Reset your password';
    $message = "Hello $name,\n\nUse the link below to reset your password:\n$link\n\nIf you did not request this, please ignore this email.";
    $headers = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM . ">\r\n";

    // In production, configure PHP to use an SMTP provider (SendGrid, Mailgun, etc.)
    // This uses PHP's mail() which relies on server mail settings.
    return @mail($to, $subject, $message, $headers);
}
