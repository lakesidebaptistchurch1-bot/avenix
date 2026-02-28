<?php
// backend/process_payment.php
require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

// Must be logged in
if (!current_user()) {
    http_response_code(401);
    echo json_encode(['error' => 'Please login first.']);
    exit;
}

// Donation session must exist
$donation = $_SESSION['donation'] ?? null;
$donation_id = $_SESSION['donation_id'] ?? null;
if (!$donation || !$donation_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Donation session missing. Please start again.']);
    exit;
}

// ✅ prevent amount tampering: always use session amount
$amount = (float)$donation['amount'];
$currency = $donation['currency'] ?? 'GHS';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$payment_method = $_POST['payment_method'] ?? '';
$valid_methods = ['mobile_money', 'card', 'paystack'];
if (!in_array($payment_method, $valid_methods, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payment method']);
    exit;
}

switch ($payment_method) {
    case 'mobile_money':
        // Placeholder only (you need real MoMo provider / aggregator API)
        echo json_encode([
            'success' => true,
            'message' => 'Mobile money is not integrated yet. Use Paystack for now.',
            'transaction_id' => 'MOMO_PLACEHOLDER'
        ]);
        exit;

    case 'card':
        // Placeholder only (do NOT collect raw card data in PHP for production)
        echo json_encode([
            'success' => true,
            'message' => 'Card is not integrated yet. Use Paystack for now.',
            'transaction_id' => 'CARD_PLACEHOLDER'
        ]);
        exit;

    case 'paystack':
        $reference = trim($_POST['reference'] ?? '');
        if ($reference === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Paystack reference.']);
            exit;
        }
        if (PAYSTACK_SECRET_KEY === '') {
            http_response_code(500);
            echo json_encode(['error' => 'Paystack secret key is not configured.']);
            exit;
        }

        $result = verify_paystack($reference);
        if (!$result['ok']) {
            // store failed payment record
            try_store_payment($donation_id, 'paystack', $amount, $currency, $reference, 'failed', 'paystack', $result['raw']);
            echo json_encode(['error' => $result['message']]);
            exit;
        }

        $paidAmount = (float)$result['paid_amount'];
        $paidCurrency = $result['currency'];

        if ($paidCurrency !== $currency) {
            try_store_payment($donation_id, 'paystack', $amount, $currency, $reference, 'failed', 'paystack', $result['raw']);
            echo json_encode(['error' => 'Currency mismatch.']);
            exit;
        }

        // Allow exact match (or >=, if you want to allow tips)
        if ($paidAmount < $amount) {
            try_store_payment($donation_id, 'paystack', $amount, $currency, $reference, 'failed', 'paystack', $result['raw']);
            echo json_encode(['error' => 'Amount mismatch.']);
            exit;
        }

        // store success
        try_store_payment($donation_id, 'paystack', $paidAmount, $currency, $reference, 'success', 'paystack', $result['raw']);

        // update donation status
        try {
            $pdo = db();
            $pdo->prepare("UPDATE donations SET status='paid' WHERE id=?")->execute([(int)$donation_id]);
        } catch (Exception $e) {}

        echo json_encode([
            'success' => true,
            'message' => 'Paystack payment verified successfully.',
            'transaction_id' => $reference
        ]);
        exit;
}

function verify_paystack(string $reference): array {
    $url = 'https://api.paystack.co/transaction/verify/' . urlencode($reference);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . PAYSTACK_SECRET_KEY,
            'Accept: application/json'
        ],
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    $err = curl_error($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($err) {
        return ['ok' => false, 'message' => 'Paystack verification failed: ' . $err, 'raw' => null];
    }
    if ($http !== 200) {
        return ['ok' => false, 'message' => 'Paystack verification failed: HTTP ' . $http, 'raw' => $response];
    }

    $payload = json_decode($response, true);
    if (!$payload || empty($payload['data'])) {
        return ['ok' => false, 'message' => 'Paystack response invalid.', 'raw' => $response];
    }

    $data = $payload['data'];
    if (($data['status'] ?? '') !== 'success') {
        return ['ok' => false, 'message' => 'Paystack payment not successful.', 'raw' => $response];
    }

    $amount = isset($data['amount']) ? ((float)$data['amount'] / 100.0) : 0.0;
    $currency = $data['currency'] ?? 'GHS';

    return [
        'ok' => true,
        'paid_amount' => $amount,
        'currency' => $currency,
        'raw' => $payload
    ];
}

function try_store_payment($donation_id, $method, $amount, $currency, $reference, $status, $provider, $provider_response) {
    try {
        $pdo = db();
        $stmt = $pdo->prepare(
            "INSERT INTO payments (donation_id, method, amount, currency, reference, status, provider, provider_response, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE status=VALUES(status), provider_response=VALUES(provider_response)"
        );
        $json = $provider_response ? json_encode($provider_response) : null;
        $stmt->execute([(int)$donation_id, $method, $amount, $currency, $reference, $status, $provider, $json]);
    } catch (Exception $e) {}
}