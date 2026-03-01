<?php
// backend/auth.php
require_once __DIR__ . '/config.php';

/**
 * CSRF
 */
function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_check(string $token): bool {
    return !empty($token) && !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Redirect helper (prevents header injection)
 */
function safe_redirect(string $path): void {
    // Allow only relative redirects
    if (preg_match('~^https?://~i', $path)) {
        $path = '/';
    }
    header('Location: ' . $path);
    exit;
}

/**
 * Auth helpers
 */
function current_user(): ?array {
    return $_SESSION['user'] ?? null;
}

function login_user(array $user): void {
    // Prevent session fixation
    session_regenerate_id(true);

    $_SESSION['user'] = [
        'id'    => (int)($user['id'] ?? 0),
        'name'  => (string)($user['name'] ?? ''),
        'email' => (string)($user['email'] ?? ''),
    ];
}

function logout_user(): void {
    unset($_SESSION['user']);
    session_regenerate_id(true);
}

function require_login(string $redirectTo = 'login.php'): void {
    if (!current_user()) {
        $_SESSION['redirect_after_login'] = '/payment.php';
        safe_redirect($redirectTo);
    }
}

/**
 * Simple session-based rate limiting (good enough for localhost)
 */
function rl_key(string $name): string {
    return 'rl_' . $name;
}

function rl_ok(string $name, int $maxAttempts, int $windowSeconds): bool {
    $k = rl_key($name);
    $data = $_SESSION[$k] ?? ['count' => 0, 'start' => time()];

    // reset window
    if ((time() - (int)$data['start']) > $windowSeconds) {
        $data = ['count' => 0, 'start' => time()];
    }

    $_SESSION[$k] = $data;
    return ((int)$data['count'] < $maxAttempts);
}

function rl_hit(string $name): void {
    $k = rl_key($name);
    $data = $_SESSION[$k] ?? ['count' => 0, 'start' => time()];
    $data['count'] = ((int)$data['count']) + 1;
    $_SESSION[$k] = $data;
}

function rl_reset(string $name): void {
    unset($_SESSION[rl_key($name)]);
}