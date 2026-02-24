<?php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../reset-password.php');
    exit;
}

$token = trim($_POST['token'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';

if ($token === '' || $password === '' || $confirm === '') {
    $_SESSION['auth_error'] = 'All fields are required.';
    header('Location: ../reset-password.php?token=' . urlencode($token));
    exit;
}

if (strlen($password) < 8) {
    $_SESSION['auth_error'] = 'Password must be at least 8 characters.';
    header('Location: ../reset-password.php?token=' . urlencode($token));
    exit;
}

if ($password !== $confirm) {
    $_SESSION['auth_error'] = 'Passwords do not match.';
    header('Location: ../reset-password.php?token=' . urlencode($token));
    exit;
}

$token_hash = hash('sha256', $token);
$pdo = db();
$stmt = $pdo->prepare('SELECT pr.user_id, pr.expires_at FROM password_resets pr WHERE pr.token_hash = ? LIMIT 1');
$stmt->execute([$token_hash]);
$reset = $stmt->fetch();

if (!$reset || strtotime($reset['expires_at']) < time()) {
    $_SESSION['auth_error'] = 'Reset link is invalid or expired.';
    header('Location: ../forgot-password.php');
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([$hash, $reset['user_id']]);
$pdo->prepare('DELETE FROM password_resets WHERE user_id = ?')->execute([$reset['user_id']]);

$_SESSION['auth_success'] = 'Password updated. You can log in now.';
header('Location: ../login.php');
exit;
