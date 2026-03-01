<?php
// backend/config.php

// Start session everywhere
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Load .env from project root (C:\xampp\htdocs\lbc_project\.env)
 */
function load_env(string $path): void {
    if (!file_exists($path)) return;

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) continue;

        $key = trim($parts[0]);
        $val = trim($parts[1]);

        // Remove surrounding quotes "..."
        if ((str_starts_with($val, '"') && str_ends_with($val, '"')) ||
            (str_starts_with($val, "'") && str_ends_with($val, "'"))) {
            $val = substr($val, 1, -1);
        }

        $_ENV[$key] = $val;
        putenv("$key=$val");
    }
}

function env(string $key, $default = null) {
    $v = $_ENV[$key] ?? getenv($key);
    return ($v === false || $v === null || $v === '') ? $default : $v;
}

// Load env from project root
load_env(dirname(__DIR__) . '/.env');

define('APP_ENV', env('APP_ENV', 'development'));
define('BASE_URL', rtrim(env('BASE_URL', 'http://localhost/lbc_project'), '/'));

// DB
define('DB_HOST', env('DB_HOST', '127.0.0.1'));
define('DB_PORT', (int)env('DB_PORT', 3306));
define('DB_NAME', env('DB_NAME', ''));
define('DB_USER', env('DB_USER', 'root'));
define('DB_PASS', env('DB_PASS', ''));

// Paystack
define('PAYSTACK_SECRET_KEY', env('PAYSTACK_SECRET_KEY', ''));
define('PAYSTACK_PUBLIC_KEY', env('PAYSTACK_PUBLIC_KEY', ''));

// SMTP (for later)
define('SMTP_HOST', env('SMTP_HOST', ''));
define('SMTP_PORT', (int)env('SMTP_PORT', 587));
define('SMTP_USER', env('SMTP_USER', ''));
define('SMTP_PASS', env('SMTP_PASS', ''));
define('SMTP_FROM', env('SMTP_FROM', 'noreply@example.com'));
define('SMTP_FROM_NAME', env('SMTP_FROM_NAME', 'Lakeside Baptist Church'));

/**
 * PDO connection helper
 */
function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    return $pdo;
}