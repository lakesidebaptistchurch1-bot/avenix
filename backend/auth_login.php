<?php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../login.php');
    exit;
}

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    $_SESSION['auth_error'] = 'Email and password are required.';
    header('Location: ../login.php');
    exit;
}

$pdo = db();
$stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    $_SESSION['auth_error'] = 'Invalid email or password.';
    header('Location: ../login.php');
    exit;
}

login_user($user);

$redirect = $_SESSION['redirect_after_login'] ?? '/payment.php';
unset($_SESSION['redirect_after_login']);
header('Location: ' . $redirect);
exit;
