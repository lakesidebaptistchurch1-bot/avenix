<?php
// backend/auth_controller.php
require_once __DIR__ . '/auth.php';

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$action = $_GET['action'] ?? '';

/**
 * Helper: only allow POST for actions that change data
 */
function require_post(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo "Method Not Allowed (POST required).";
        exit;
    }
}

/**
 * Helper: require CSRF
 */
function require_csrf(): void {
    if (!csrf_check($_POST['csrf_token'] ?? '')) {
        $_SESSION['auth_error'] = 'Session expired. Please refresh and try again.';
        safe_redirect('/lbc_project/login.php');
    }
}

/**
 * Helper: redirect after login if stored
 */
function redirect_after_login_default(): void {
    $to = $_SESSION['redirect_after_login'] ?? '/lbc_project/payment.php';
    unset($_SESSION['redirect_after_login']);
    safe_redirect($to);
}

switch ($action) {

    case 'register':
        require_post();
        require_csrf();

        // Rate limit (basic)
        if (!rl_ok('register', 10, 300)) {
            $_SESSION['auth_error'] = 'Too many attempts. Please wait and try again.';
            safe_redirect('/lbc_project/signup.php');
        }
        rl_hit('register');

        $name  = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $pass  = (string)($_POST['password'] ?? '');
        $pass2 = (string)($_POST['confirm_password'] ?? '');

        if ($name === '' || $email === '' || $pass === '' || $pass2 === '') {
            $_SESSION['auth_error'] = 'All fields are required.';
            safe_redirect('/lbc_project/signup.php');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $_SESSION['auth_error'] = 'Please enter a valid email.';
            safe_redirect('/lbc_project/signup.php');
        }

        if (strlen($pass) < 8) {
            $_SESSION['auth_error'] = 'Password must be at least 8 characters.';
            safe_redirect('/lbc_project/signup.php');
        }

        if ($pass !== $pass2) {
            $_SESSION['auth_error'] = 'Passwords do not match.';
            safe_redirect('/lbc_project/signup.php');
        }

        try {
            $pdo = db();

            // Check existing
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                $_SESSION['auth_error'] = 'Email already exists. Please sign in instead.';
                safe_redirect('/lbc_project/login.php');
            }

            // Create user
            $hash = password_hash($pass, PASSWORD_DEFAULT);

            $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, NOW())");
            $stmt->execute([$name, $email, $hash]);

            $userId = (int)$pdo->lastInsertId();

            login_user(['id' => $userId, 'name' => $name, 'email' => $email]);
            rl_reset('register');

            // If user was donating, go to payment, else go to donation or homepage
            redirect_after_login_default();

        } catch (Exception $e) {
            $_SESSION['auth_error'] = 'Registration failed: ' . $e->getMessage();
            safe_redirect('/lbc_project/signup.php');
        }

        break;

    case 'login':
        require_post();
        require_csrf();

        if (!rl_ok('login', 10, 300)) {
            $_SESSION['auth_error'] = 'Too many attempts. Please wait and try again.';
            safe_redirect('/lbc_project/login.php');
        }
        rl_hit('login');

        $email = trim($_POST['email'] ?? '');
        $pass  = (string)($_POST['password'] ?? '');

        if ($email === '' || $pass === '') {
            $_SESSION['auth_error'] = 'Email and password are required.';
            safe_redirect('/lbc_project/login.php');
        }

        try {
            $pdo = db();

            $stmt = $pdo->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($pass, $user['password_hash'])) {
                $_SESSION['auth_error'] = 'Invalid email or password.';
                safe_redirect('/lbc_project/login.php');
            }

            login_user($user);
            rl_reset('login');

            redirect_after_login_default();

        } catch (Exception $e) {
            $_SESSION['auth_error'] = 'Login failed: ' . $e->getMessage();
            safe_redirect('/lbc_project/login.php');
        }

        break;

    case 'logout':
        require_post();
        require_csrf();

        logout_user();
        $_SESSION['auth_success'] = 'You have been signed out.';
        safe_redirect('/lbc_project/login.php');
        break;

    // Optional: you already have forgot/reset pages – keep these placeholders if you want
    case 'request_reset':
        require_post();
        require_csrf();
        $_SESSION['auth_success'] = 'Password reset is not fully configured yet.';
        safe_redirect('/lbc_project/forgot-password.php');
        break;

    case 'reset_password':
        require_post();
        require_csrf();
        $_SESSION['auth_success'] = 'Password reset is not fully configured yet.';
        safe_redirect('/lbc_project/login.php');
        break;

    default:
        http_response_code(400);
        echo "Invalid action.";
        break;
}