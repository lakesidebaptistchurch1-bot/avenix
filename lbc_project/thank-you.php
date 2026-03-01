<?php
require_once __DIR__ . '/backend/auth.php';

$ref = trim($_GET['ref'] ?? '');
if ($ref === '') {
    header('Location: donation.php');
    exit;
}

$payment = null;
$donation = null;

try {
    $pdo = db();

    // Get payment + donation
    $stmt = $pdo->prepare("
        SELECT p.reference, p.amount, p.currency, p.status, p.created_at, p.donation_id
        FROM payments p
        WHERE p.reference = ?
        LIMIT 1
    ");
    $stmt->execute([$ref]);
    $payment = $stmt->fetch();

    if ($payment && !empty($payment['donation_id'])) {
        $stmt2 = $pdo->prepare("
            SELECT id, name, email, note, amount, currency, status, created_at
            FROM donations
            WHERE id = ?
            LIMIT 1
        ");
        $stmt2->execute([(int)$payment['donation_id']]);
        $donation = $stmt2->fetch();
    }
} catch (Exception $e) {
    // keep it user-friendly
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Thank You — Lakeside Baptist Church</title>
  <link rel="shortcut icon" href="images/LBC LOGO.png">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/all.css" rel="stylesheet">
  <link href="css/custom.css" rel="stylesheet">
  <style>
    .receipt-wrap { max-width: 820px; margin: 40px auto; }
    .receipt-card { background:#fff; border-radius:16px; padding:24px; box-shadow: 0 10px 30px rgba(0,0,0,.08); }
    .receipt-badge { display:inline-block; padding:6px 10px; border-radius:999px; font-size: 12px; }
    .badge-success { background:#e9f9ee; color:#157347; }
    .badge-failed  { background:#fdecec; color:#b02a37; }
    .muted { color:#6c757d; }
  </style>
</head>
<body class="bg-light">

<div class="receipt-wrap">
  <div class="receipt-card">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
      <div>
        <h2 class="mb-1">Thank you for your donation!</h2>
        <div class="muted">Lakeside Baptist Church</div>
      </div>
      <div>
        <?php
          $status = $payment['status'] ?? 'unknown';
          $isSuccess = ($status === 'success');
        ?>
        <span class="receipt-badge <?php echo $isSuccess ? 'badge-success' : 'badge-failed'; ?>">
          <?php echo htmlspecialchars(strtoupper($status)); ?>
        </span>
      </div>
    </div>

    <hr>

    <?php if (!$payment): ?>
      <div class="alert alert-warning mb-0">
        We couldn’t find a payment with that reference. If you believe this is a mistake, please contact support.
      </div>
    <?php else: ?>
      <div class="row g-3">
        <div class="col-md-6">
          <h5 class="mb-2">Payment Details</h5>
          <div><strong>Reference:</strong> <?php echo htmlspecialchars($payment['reference']); ?></div>
          <div><strong>Amount:</strong> <?php echo htmlspecialchars($payment['currency']); ?> <?php echo number_format((float)$payment['amount'], 2); ?></div>
          <div><strong>Date:</strong> <?php echo htmlspecialchars($payment['created_at']); ?></div>
        </div>

        <div class="col-md-6">
          <h5 class="mb-2">Donor Details</h5>
          <?php if ($donation): ?>
            <div><strong>Name:</strong> <?php echo htmlspecialchars($donation['name']); ?></div>
            <div><strong>Email:</strong> <?php echo htmlspecialchars($donation['email']); ?></div>
            <?php if (!empty($donation['note'])): ?>
              <div><strong>Note:</strong> <?php echo htmlspecialchars($donation['note']); ?></div>
            <?php endif; ?>
          <?php else: ?>
            <div class="muted">Donation record not found for this payment.</div>
          <?php endif; ?>
        </div>
      </div>

      <hr>

      <div class="d-flex gap-2 flex-wrap">
        <a href="donation.php" class="btn btn-primary">
          <i class="fas fa-heart me-1"></i> Donate again
        </a>
        <a href="index-slider.html" class="btn btn-outline-secondary">
          Back to home
        </a>
      </div>
    <?php endif; ?>
  </div>
</div>

</body>
</html>