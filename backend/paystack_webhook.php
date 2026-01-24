<?php
// paystack_webhook.php - Handles Paystack webhooks for payment verification

// Get the raw POST data
$input = file_get_contents('php://input');

// Verify webhook signature (placeholder - in production, verify with Paystack secret key)
// $secret = 'your_paystack_secret_key';
// $signature = hash_hmac('sha512', $input, $secret);
// if ($signature !== $_SERVER['HTTP_X_PAYSTACK_SIGNATURE']) {
//     http_response_code(400);
//     exit;
// }

$data = json_decode($input, true);

if ($data && isset($data['event'])) {
    if ($data['event'] === 'charge.success') {
        // Payment was successful
        $reference = $data['data']['reference'];
        $amount = $data['data']['amount'] / 100; // Convert from kobo
        $status = $data['data']['status'];

        // Log or update database
        // logTransaction($reference, $amount, 'paystack', $status);

        // Send confirmation email, etc.
    }
}

// Respond to Paystack
http_response_code(200);
echo json_encode(['status' => 'success']);
?>