<?php
// backend/paystack_webhook.php
require_once __DIR__ . '/config.php';

$input = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_PAYSTACK_SIGNATURE'] ?? '';

if (PAYSTACK_SECRET_KEY === '' || $signature === '') {
    http_response_code(400);
    echo "Missing signature/secret";
    exit;
}

$computed = hash_hmac('sha512', $input, PAYSTACK_SECRET_KEY);
if (!hash_equals($computed, $signature)) {
    http_response_code(401);
    echo "Invalid signature";
    exit;
}

$event = json_decode($input, true);
if (!$event || empty($event['event']) || empty($event['data'])) {
    http_response_code(400);
    echo "Invalid payload";
    exit;
}

if ($event['event'] === 'charge.success') {
    $data = $event['data'];
    $reference = $data['reference'] ?? '';

    try {
        $pdo = db();

        $pdo->prepare("UPDATE payments SET status='success', provider_response=? WHERE reference=?")
            ->execute([json_encode($event), $reference]);

        $stmt = $pdo->prepare("SELECT donation_id FROM payments WHERE reference=? LIMIT 1");
        $stmt->execute([$reference]);
        $row = $stmt->fetch();

        if ($row && !empty($row['donation_id'])) {
            $pdo->prepare("UPDATE donations SET status='paid' WHERE id=?")
                ->execute([(int)$row['donation_id']]);
        }
    } catch (Exception $e) {}
}

http_response_code(200);
echo "ok";