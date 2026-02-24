<?php
// Basic app configuration
define('APP_ENV', 'development'); // change to 'production' when live
define('BASE_URL', 'http://localhost/avenix');

// Database configuration (MySQL)
define('DB_HOST', 'localhost');
define('DB_NAME', 'avenix');
define('DB_USER', 'root');
define('DB_PASS', '');

/**
 * Return a shared PDO instance
 */
function db() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    return $pdo;
}
