<?php
// backend/auth.php
require_once __DIR__ . '/config.php';

// Security headers (safe for most sites)
security_headers();

if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.use_strict_mode', '1');
    ini_set('session.cookie_httponly', '1');
    ini_set('session.cookie_samesite', 'Lax'); // PHP supports SameSite via ini :contentReference[oaicite:2]{index=2}

    if (APP_ENV === 'production') {
        ini_set('session.cookie_secure', '1');
    }

    session_start();
}

function current_user() {
    return $_SESSION['user'] ?? null;
}

function login_user(array $user) {
    session_regenerate_id(true);
    $_SESSION['user'] = [
        'id' => (int)($user['id'] ?? 0),
        'name' => $user['name'] ?? '',
        'email' => $user['email'] ?? ''
    ];
}

function logout_user() {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"], $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
}

function require_login($login_page = 'login.php') {
    if (!current_user()) {
        $_SESSION['redirect_after_login'] = '/payment.php';
        safe_redirect('../' . ltrim($login_page, '/'));
    }
}

function csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_check($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string)$token);
}

function safe_redirect($path) {
    header('Location: ' . $path);
    exit;
}

/* -------- Rate limit helpers (simple per-session limiter) -------- */
function rate_limit_ok(string $key, int $maxAttempts, int $windowSeconds): bool {
    $now = time();
    $bucket = $_SESSION['rl'][$key] ?? ['count' => 0, 'start' => $now];

    if (($now - $bucket['start']) > $windowSeconds) {
        $_SESSION['rl'][$key] = ['count' => 0, 'start' => $now];
        return true;
    }
    return ($bucket['count'] < $maxAttempts);
}
function rate_limit_hit(string $key): void {
    $now = time();
    if (!isset($_SESSION['rl'][$key])) {
        $_SESSION['rl'][$key] = ['count' => 1, 'start' => $now];
        return;
    }
    $_SESSION['rl'][$key]['count']++;
}
function rate_limit_reset(string $key): void {
    unset($_SESSION['rl'][$key]);
}