<?php
// auth_status.php — Returns current session user as JSON (used by navbar JS)
require_once __DIR__ . '/auth.php';
header('Content-Type: application/json');
$user = current_user();
if ($user) {
    echo json_encode(['loggedIn' => true, 'name' => $user['name'], 'email' => $user['email']]);
} else {
    echo json_encode(['loggedIn' => false]);
}
