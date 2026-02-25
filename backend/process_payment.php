<?php
// process_payment.php - Handles payment processing for donations
// This script processes the payment based on the selected method and amount

// Start session to store temporary data if needed
session_start();

require_once __DIR__ . '/config.php';

// Include necessary files (e.g., database connection, config)
// require_once 'config.php'; // Placeholder for config file

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get POST data
$amount = isset($_POST['amount']) ? floatval($_POST['amount']) : 0;
$payment_method = isset($_POST['payment_method']) ? $_POST['payment_method'] : '';

// Validate amount
if ($amount <= 0) {
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}

// Validate payment method
$valid_methods = ['mobile_money', 'card', 'paystack'];
if (!in_array($payment_method, $valid_methods)) {
    echo json_encode(['error' => 'Invalid payment method']);
    exit;
}

// Process based on payment method
switch ($payment_method) {
    case 'mobile_money':
        // Mobile money processing (MTN, Telecel, AirtelTigo)
        $network = isset($_POST['mm_network']) ? $_POST['mm_network'] : '';
        $phone = isset($_POST['mm_phone']) ? $_POST['mm_phone'] : '';
        $name = isset($_POST['mm_name']) ? $_POST['mm_name'] : '';
        $response = processMobileMoney($amount, $network, $phone, $name);
        break;

    case 'card':
        // Card processing (Visa/Mastercard/Virtual)
        $card_data = [
            'number' => $_POST['card_number'] ?? '',
            'expiry' => $_POST['expiry'] ?? '',
            'cvv' => $_POST['cvv'] ?? '',
            'name' => $_POST['card_name'] ?? '',
            'email' => $_POST['card_email'] ?? ''
        ];
        $response = processCreditCard($amount, $card_data);
        break;

    case 'paystack':
        // Paystack processing - verify payment
        $reference = isset($_POST['reference']) ? $_POST['reference'] : '';
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';
        $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
        $response = processPaystack($amount, $reference, $name, $email, $phone);
        break;

    default:
        $response = ['error' => 'Unknown payment method'];
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Function definitions

/**
 * Process mobile money payment
 * @param float $amount
 * @param string $network
 * @param string $phone
 * @param string $name
 * @return array
 */
function processMobileMoney($amount, $network, $phone, $name) {
    // Validate inputs
    if (empty($network) || empty($phone) || empty($name)) {
        return ['error' => 'Network, phone number, and name are required'];
    }

    // Placeholder: Integrate with mobile money API (e.g., MTN MoMo API or aggregator)
    // API Placeholder: Call mobile money provider API

    // Simulate API call
    $api_response = simulateMobileMoneyAPI($amount, $network, $phone, $name);

    if ($api_response['success']) {
        $transaction_id = 'MOMO_' . time() . '_' . rand(1000, 9999);
        // logTransaction($transaction_id, $amount, 'mobile_money');

        return [
            'success' => true,
            'message' => 'Mobile money payment initiated. Please complete the payment on your phone.',
            'transaction_id' => $transaction_id
        ];
    } else {
        return ['error' => 'Mobile money payment failed: ' . $api_response['message']];
    }
}

/**
 * Process credit card payment
 * @param float $amount
 * @param array $card_data
 * @return array
 */
function processCreditCard($amount, $card_data) {
    // Validate card data (basic validation)
    if (empty($card_data['number']) || empty($card_data['expiry']) || empty($card_data['cvv']) || empty($card_data['name'])) {
        return ['error' => 'All card details are required'];
    }

    // Placeholder: Integrate with payment gateway (e.g., Stripe, PayPal)
    // API Placeholder: Call payment gateway API

    // Simulate processing
    $api_response = simulatePaymentGatewayAPI($amount, $card_data, 'credit_card');

    if ($api_response['success']) {
        $transaction_id = 'CC_' . time() . '_' . rand(1000, 9999);
        // logTransaction($transaction_id, $amount, 'credit_card');

        return [
            'success' => true,
            'message' => 'Credit card payment successful.',
            'transaction_id' => $transaction_id
        ];
    } else {
        return ['error' => 'Credit card payment failed: ' . $api_response['message']];
    }
}

/**
 * Process Paystack payment verification
 * @param float $amount
 * @param string $reference
 * @param string $name
 * @param string $email
 * @param string $phone
 * @return array
 */
function processPaystack($amount, $reference, $name, $email, $phone) {
    if (empty($reference)) {
        return ['error' => 'Missing Paystack reference.'];
    }
    if (empty(PAYSTACK_SECRET_KEY)) {
        return ['error' => 'Paystack secret key is not configured.'];
    }

    $url = 'https://api.paystack.co/transaction/verify/' . urlencode($reference);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . PAYSTACK_SECRET_KEY,
            'Accept: application/json'
        ],
        CURLOPT_TIMEOUT => 30
    ]);
    $response = curl_exec($ch);
    $err = curl_error($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($err) {
        return ['error' => 'Paystack verification failed: ' . $err];
    }
    if ($status !== 200) {
        return ['error' => 'Paystack verification failed: HTTP ' . $status];
    }

    $payload = json_decode($response, true);
    if (!$payload || empty($payload['data'])) {
        return ['error' => 'Paystack verification response invalid.'];
    }

    $data = $payload['data'];
    $paid = isset($data['status']) && $data['status'] === 'success';
    $paidAmount = isset($data['amount']) ? ($data['amount'] / 100) : 0;
    $currency = $data['currency'] ?? 'GHS';

    if (!$paid) {
        return ['error' => 'Paystack payment not successful.'];
    }
    if ($currency !== 'GHS') {
        return ['error' => 'Currency mismatch: expected GHS.'];
    }
    if ($paidAmount < $amount) {
        return ['error' => 'Amount mismatch.'];
    }

    $transaction_id = $data['reference'] ?? ('PAYSTACK_' . time());

    // Store payment (optional)
    try {
        $pdo = db();
        $donation_id = $_SESSION['donation_id'] ?? null;
        $stmt = $pdo->prepare('INSERT INTO payments (donation_id, method, amount, reference, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())');
        $stmt->execute([$donation_id, 'paystack', $paidAmount, $transaction_id, 'success']);
        if ($donation_id) {
            $pdo->prepare('UPDATE donations SET status = ? WHERE id = ?')->execute(['paid', $donation_id]);
        }
    } catch (Exception $e) {
        // Ignore DB failures in payment response
    }

    return [
        'success' => true,
        'message' => 'Paystack payment verified successfully.',
        'transaction_id' => $transaction_id
    ];
}

// Simulation functions (replace with real API calls)

/**
 * Simulate mobile money API call
 */
function simulateMobileMoneyAPI($amount, $network, $phone, $name) {
    // Placeholder: Replace with actual API call
    return ['success' => true, 'message' => 'Payment initiated'];
}

/**
 * Simulate payment gateway API call
 */
function simulatePaymentGatewayAPI($amount, $card_data, $type) {
    // Placeholder: Replace with actual API call
    return ['success' => true, 'message' => 'Payment processed'];
}

/**
 * Simulate Paystack verification
 */
function simulatePaystackVerification($reference) {
    // Deprecated (kept for backward compatibility)
    return ['success' => true, 'message' => 'Payment verified'];
}

/**
 * Log transaction (placeholder)
 */
function logTransaction($transaction_id, $amount, $method) {
    // Placeholder: Log to database or file
    // Example: Insert into database
    // $stmt = $pdo->prepare("INSERT INTO transactions (id, amount, method, status) VALUES (?, ?, ?, 'pending')");
    // $stmt->execute([$transaction_id, $amount, $method]);
}

?>