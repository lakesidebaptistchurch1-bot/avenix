<?php
// backend/auth_controller.php
require_once __DIR__ . '/auth.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CSRF check for ALL POST actions except "status"
    $token = $_POST['csrf_token'] ?? '';
    if ($action !== 'status' && !csrf_check($token)) {
        http_response_code(419);
        $_SESSION['auth_error'] = 'Session expired. Please try again.';
        safe_redirect('../login.php');
    }
}

switch ($action) {
    case 'login':
        require_post();
        handle_login();
        break;

    case 'logout':
        require_post();
        logout_user();
        safe_redirect('../login.php');
        break;

    case 'register':
        require_post();
        handle_register();
        break;

    case 'request_reset':
        require_post();
        handle_request_reset();
        break;

    case 'reset_password':
        require_post();
        handle_reset_password();
        break;

    case 'status':
        // For navbar JS
        header('Content-Type: application/json');
        $u = current_user();
        echo json_encode($u ? ['loggedIn' => true, 'name' => $u['name'], 'email' => $u['email']] : ['loggedIn' => false]);
        exit;

    default:
        http_response_code(404);
        echo "Not found";
        exit;
}

/* ---------------- helpers + handlers ---------------- */

function require_post() {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        http_response_code(405);
        exit('Method Not Allowed');
    }
}

function handle_login() {
    // Basic rate limit (per session)
    if (!rate_limit_ok('login', 10, 300)) { // 10 attempts / 5 minutes
        $_SESSION['auth_error'] = 'Too many attempts. Please try again later.';
        safe_redirect('../login.php');
    }

    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        $_SESSION['auth_error'] = 'Email and password are required.';
        safe_redirect('../login.php');
    }

    $pdo = db();
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        rate_limit_hit('login');
        $_SESSION['auth_error'] = 'Invalid email or password.';
        safe_redirect('../login.php');
    }

    rate_limit_reset('login');
    login_user($user);

    $redirect = $_SESSION['redirect_after_login'] ?? '/payment.php';
    unset($_SESSION['redirect_after_login']);
    safe_redirect('..' . $redirect);
}

function handle_register() {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm_password'] ?? '';

    if ($name === '' || $email === '' || $password === '' || $confirm === '') {
        $_SESSION['auth_error'] = 'All fields are required.';
        safe_redirect('../signup.php');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['auth_error'] = 'Please enter a valid email address.';
        safe_redirect('../signup.php');
    }

    // Better password length policy
    if (strlen($password) < 8 || strlen($password) > 64) {
        $_SESSION['auth_error'] = 'Password must be 8-64 characters.';
        safe_redirect('../signup.php');
    }

    if (!preg_match('/[A-Z]/', $password) ||
        !preg_match('/[a-z]/', $password) ||
        !preg_match('/\d/', $password) ||
        !preg_match('/[^A-Za-z0-9]/', $password)) {
        $_SESSION['auth_error'] = 'Password must include uppercase, lowercase, number, and special character.';
        safe_redirect('../signup.php');
    }

    if ($password !== $confirm) {
        $_SESSION['auth_error'] = 'Passwords do not match.';
        safe_redirect('../signup.php');
    }

    $pdo = db();
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        $_SESSION['auth_error'] = 'An account with this email already exists.';
        safe_redirect('../signup.php');
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $insert = $pdo->prepare('INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, NOW())');
    $insert->execute([$name, $email, $hash]);

    login_user([
        'id' => $pdo->lastInsertId(),
        'name' => $name,
        'email' => $email
    ]);

    $redirect = $_SESSION['redirect_after_login'] ?? '/payment.php';
    unset($_SESSION['redirect_after_login']);
    safe_redirect('..' . $redirect);
}

function handle_request_reset() {
    $email = trim($_POST['email'] ?? '');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['auth_error'] = 'Please enter a valid email address.';
        safe_redirect('../forgot-password.php');
    }

    $pdo = db();
    $stmt = $pdo->prepare('SELECT id, name, email FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Avoid email enumeration
    $_SESSION['auth_success'] = 'If that email exists, a reset link has been sent.';

    if (!$user) {
        safe_redirect('../forgot-password.php');
    }

    $token = bin2hex(random_bytes(32));
    $token_hash = hash('sha256', $token);
    $expires = date('Y-m-d H:i:s', time() + 3600);

    $pdo->prepare('DELETE FROM password_resets WHERE user_id = ?')->execute([(int)$user['id']]);
    $insert = $pdo->prepare('INSERT INTO password_resets (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, NOW())');
    $insert->execute([(int)$user['id'], $token_hash, $expires]);

    $reset_link = BASE_URL . '/reset-password.php?token=' . urlencode($token);

    $mail_sent = send_reset_email($user['email'], $user['name'], $reset_link);

    if (APP_ENV !== 'production') {
        $_SESSION['reset_link'] = $reset_link;
    } else if (!$mail_sent) {
        $_SESSION['auth_success'] = 'We could not send the email. Please contact support.';
    }

    safe_redirect('../forgot-password.php');
}

function handle_reset_password() {
    $token = trim($_POST['token'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm_password'] ?? '';

    if ($token === '' || $password === '' || $confirm === '') {
        $_SESSION['auth_error'] = 'All fields are required.';
        safe_redirect('../reset-password.php?token=' . urlencode($token));
    }

    if (strlen($password) < 8 || strlen($password) > 64) {
        $_SESSION['auth_error'] = 'Password must be 8-64 characters.';
        safe_redirect('../reset-password.php?token=' . urlencode($token));
    }

    if ($password !== $confirm) {
        $_SESSION['auth_error'] = 'Passwords do not match.';
        safe_redirect('../reset-password.php?token=' . urlencode($token));
    }

    $token_hash = hash('sha256', $token);
    $pdo = db();
    $stmt = $pdo->prepare('SELECT user_id, expires_at FROM password_resets WHERE token_hash = ? LIMIT 1');
    $stmt->execute([$token_hash]);
    $reset = $stmt->fetch();

    if (!$reset || strtotime($reset['expires_at']) < time()) {
        $_SESSION['auth_error'] = 'Reset link is invalid or expired.';
        safe_redirect('../forgot-password.php');
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([$hash, (int)$reset['user_id']]);
    $pdo->prepare('DELETE FROM password_resets WHERE user_id = ?')->execute([(int)$reset['user_id']]);

    $_SESSION['auth_success'] = 'Password updated. You can log in now.';
    safe_redirect('../login.php');
}

function send_reset_email($to, $name, $link) {
    $subject = 'Reset your password';
    $message = "Hello $name,\n\nUse the link below to reset your password:\n$link\n\nIf you did not request this, please ignore this email.";
    $headers = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM . ">\r\n";
    return @mail($to, $subject, $message, $headers);
}