<?php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../signup.php');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';

if ($name === '' || $email === '' || $password === '' || $confirm === '') {
    $_SESSION['auth_error'] = 'All fields are required.';
    header('Location: ../signup.php');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['auth_error'] = 'Please enter a valid email address.';
    header('Location: ../signup.php');
    exit;
}

if (strlen($password) < 8 || strlen($password) > 12) {
    $_SESSION['auth_error'] = 'Password must be 8-12 characters.';
    header('Location: ../signup.php');
    exit;
}

if (!preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password) || !preg_match('/\d/', $password) || !preg_match('/[^A-Za-z0-9]/', $password)) {
    $_SESSION['auth_error'] = 'Password must include uppercase, lowercase, number, and special character.';
    header('Location: ../signup.php');
    exit;
}

if ($password !== $confirm) {
    $_SESSION['auth_error'] = 'Passwords do not match.';
    header('Location: ../signup.php');
    exit;
}

$pdo = db();
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    $_SESSION['auth_error'] = 'An account with this email already exists.';
    header('Location: ../signup.php');
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$insert = $pdo->prepare('INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, NOW())');
$insert->execute([$name, $email, $hash]);

$user = [
    'id' => $pdo->lastInsertId(),
    'name' => $name,
    'email' => $email
];
login_user($user);

$redirect = $_SESSION['redirect_after_login'] ?? '/payment.php';
unset($_SESSION['redirect_after_login']);
header('Location: ' . $redirect);
exit;
