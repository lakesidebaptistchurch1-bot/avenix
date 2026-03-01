<?php
require_once __DIR__ . '/backend/auth.php';

require_login('login.php');

$donation = $_SESSION['donation'] ?? null;
if (!$donation) {
    header('Location: donation.php'); // ✅ was donation.html
    exit;
}

$amount = (float)($donation['amount'] ?? 0);
$name   = $donation['name'] ?? '';
$email  = $donation['email'] ?? '';

// CSRF token (used by backend/process_payment.php)
$csrf = csrf_token();
?>
<!DOCTYPE html>
<html lang="zxx">
<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Complete Your Donation - LAKESIDE BAPTIST CHURCH</title>

    <link rel="shortcut icon" type="image/x-icon" href="images/LBC LOGO.png">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/slicknav.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/swiper-bundle.min.css">
    <link href="css/all.css" rel="stylesheet" media="screen">
    <link href="css/animate.css" rel="stylesheet">
    <link rel="stylesheet" href="css/magnific-popup.css">
    <link rel="stylesheet" href="css/mousecursor.css">
    <link rel="stylesheet" href="css/plyr.css">
    <link href="css/custom.css" rel="stylesheet" media="screen">
    <link href="css/payment-new.css" rel="stylesheet" media="screen">

    <!-- Paystack SDK -->
    <script src="https://js.paystack.co/v1/inline.js"></script>
</head>
<body>

    <!-- Preloader Start -->
    <div class="preloader">
        <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-icon"><img src="images/church_logo_blue-removebg-preview (1).png" alt=""></div>
        </div>
    </div>
    <!-- Preloader End -->

    <!-- Header Start -->
    <header class="main-header">
        <div class="header-sticky">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="index-slider.html">
                        <img src="images/LBC LOGO.png" alt="Logo">
                    </a>

                    <div class="collapse navbar-collapse main-menu">
                        <div class="nav-menu-wrapper">
                            <ul class="navbar-nav mr-auto" id="menu">
                                <li class="nav-item"><a class="nav-link" href="index-slider.html">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                                <li class="nav-item"><a class="nav-link" href="service.html">Services</a></li>
                                <li class="nav-item submenu"><a class="nav-link" href="#">Pages</a>
                                    <ul>
                                        <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                                        <li class="nav-item"><a class="nav-link" href="sermons.html">Sermons</a></li>
                                        <li class="nav-item"><a class="nav-link" href="sermons-single.html">Sermons Details</a></li>
                                        <li class="nav-item"><a class="nav-link" href="Event.html">Event</a></li>
                                        <li class="nav-item"><a class="nav-link" href="donation.php">Donation</a></li>
                                        <li class="nav-item"><a class="nav-link" href="ministries.html">Ministries</a></li>
                                        <li class="nav-item"><a class="nav-link" href="ministry-single.html">Ministries Details</a></li>
                                        <li class="nav-item"><a class="nav-link" href="pastor.html">pastor</a></li>
                                        <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
                                <li class="nav-item highlighted-menu"><a class="nav-link" href="donation.php">donate now</a></li>
                            </ul>
                        </div>

                        <div class="header-btn d-inline-flex">
                            <a href="signup.php" class="btn-default btn-signup">sign up</a>
                            <a href="donation.php" class="btn-default">donate now</a>
                        </div>
                    </div>

                    <div class="navbar-toggle"></div>
                </div>
            </nav>
            <div class="responsive-menu"></div>
        </div>
    </header>
    <!-- Header End -->

    <!-- Page Header Start -->
    <div class="page-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="page-header-box">
                        <h1 class="text-anime-style-2" data-cursor="-opaque">Complete Your Donation</h1>
                        <nav class="wow fadeInUp">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index-slider.html">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Payment</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Page Header End -->

    <!-- Payment Page Start -->
    <div class="payment-page-new">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-11">

                    <div class="payment-hero wow fadeInDown">
                        <div class="hero-content">
                            <h1 class="hero-title">Make Your Impact Today</h1>
                            <p class="hero-subtitle">Support Lakeside Baptist Church and transform lives in our community</p>
                        </div>
                    </div>

                    <div class="payment-container">

                        <!-- Left Side -->
                        <div class="payment-left wow fadeInLeft">
                            <div class="amount-showcase">
                                <div class="amount-circle">
                                    <div class="circle-inner">
                                        <span class="currency">GH₵</span>
                                        <span class="amount-value" id="display-amount"><?php echo number_format($amount, 2); ?></span>
                                    </div>
                                </div>
                                <div class="amount-details">
                                    <h3>Your Donation</h3>
                                    <p>Every contribution makes a difference in our mission to serve with love and faith.</p>
                                    <div class="impact-badges">
                                        <div class="badge">
                                            <i class="fas fa-heart"></i>
                                            <span>100% Secure</span>
                                        </div>
                                        <div class="badge">
                                            <i class="fas fa-shield-alt"></i>
                                            <span>Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Side -->
                        <div class="payment-right wow fadeInRight">

                            <form id="paymentForm" action="backend/process_payment.php" method="POST">
                                <!-- ✅ CSRF -->
                                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf); ?>">

                                <!-- note: backend ignores amount from client, but keep for UI -->
                                <input type="hidden" id="payment-amount" value="<?php echo htmlspecialchars((string)$amount); ?>">

                                <h2 class="payment-title">Choose Payment Method</h2>

                                <div class="payment-methods-carousel">

                                    <div class="payment-method-item">
                                        <input type="radio" id="mobile_money" name="payment_method" value="mobile_money" checked>
                                        <label for="mobile_money" class="method-card">
                                            <div class="card-glow"></div>
                                            <div class="card-content">
                                                <div class="method-icon-large"><i class="fas fa-mobile-alt"></i></div>
                                                <h4>Mobile Money</h4>
                                                <p>MTN • Telecel • AirtelTigo</p>
                                                <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
                                            </div>
                                        </label>
                                    </div>

                                    <div class="payment-method-item">
                                        <input type="radio" id="paystack" name="payment_method" value="paystack">
                                        <label for="paystack" class="method-card">
                                            <div class="card-glow"></div>
                                            <div class="card-content">
                                                <div class="method-icon-large"><i class="fas fa-wallet"></i></div>
                                                <h4>Paystack</h4>
                                                <p>Secure gateway</p>
                                                <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
                                            </div>
                                        </label>
                                    </div>

                                    <div class="payment-method-item">
                                        <input type="radio" id="card" name="payment_method" value="card">
                                        <label for="card" class="method-card">
                                            <div class="card-glow"></div>
                                            <div class="card-content">
                                                <div class="method-icon-large"><i class="fas fa-credit-card"></i></div>
                                                <h4>Mastercard / Visa / Virtual Card</h4>
                                                <p>3-D Secure verification</p>
                                                <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div class="payment-details-section">

                                    <!-- Mobile Money -->
                                    <div id="mobile-money-details" class="payment-details-form active">
                                        <div class="form-header">
                                            <i class="fas fa-mobile-alt"></i>
                                            <h3>Mobile Money Details</h3>
                                        </div>

                                        <div class="form-group">
                                            <label for="mm_network">Select Network</label>
                                            <select id="mm_network" name="mm_network" class="form-control-new" required>
                                                <option value="">Choose network...</option>
                                                <option value="mtn">MTN Mobile Money</option>
                                                <option value="telecel">Telecel Cash</option>
                                                <option value="airteltigo">AirtelTigo Money</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="mm_phone">Phone Number (10 digits)</label>
                                            <input type="tel" id="mm_phone" name="mm_phone" class="form-control-new"
                                                   placeholder="0XXXXXXXXX" pattern="[0-9]{10}" maxlength="10" required>
                                            <small class="form-hint">Format: 0XXXXXXXXX (e.g., 0501234567)</small>
                                        </div>

                                        <div class="form-group">
                                            <label for="mm_name">Full Name</label>
                                            <input type="text" id="mm_name" name="mm_name" class="form-control-new"
                                                   placeholder="Your full name" value="<?php echo htmlspecialchars($name); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="mm_amount">Amount (GH₵)</label>
                                            <input type="number" id="mm_amount" class="form-control-new"
                                                   step="0.01" min="0.01" disabled>
                                            <small class="form-hint">Amount is locked for security.</small>
                                        </div>
                                    </div>

                                    <!-- Card -->
                                    <div id="card-details" class="payment-details-form">
                                        <div class="form-header">
                                            <i class="fas fa-credit-card"></i>
                                            <h3>Card Details</h3>
                                        </div>

                                        <div class="form-group">
                                            <label for="card_number">Card Number (16 digits)</label>
                                            <input type="text" id="card_number" name="card_number" class="form-control-new"
                                                   placeholder="1234 5678 9012 3456" maxlength="19" required>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group">
                                                <label for="expiry">Expiry Date</label>
                                                <input type="text" id="expiry" name="expiry" class="form-control-new"
                                                       placeholder="MM/YY" maxlength="5" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="cvv">CVV</label>
                                                <input type="text" id="cvv" name="cvv" class="form-control-new"
                                                       placeholder="123" maxlength="4" required>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="card_name">Cardholder Name</label>
                                            <input type="text" id="card_name" name="card_name" class="form-control-new"
                                                   value="<?php echo htmlspecialchars($name); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="card_email">Email Address</label>
                                            <input type="email" id="card_email" name="card_email" class="form-control-new"
                                                   value="<?php echo htmlspecialchars($email); ?>" required>
                                        </div>
                                    </div>

                                    <!-- Paystack -->
                                    <div id="paystack-details" class="payment-details-form">
                                        <div class="form-header">
                                            <i class="fas fa-wallet"></i>
                                            <h3>Paystack Payment</h3>
                                        </div>

                                        <div class="form-group">
                                            <label for="paystack_name">Full Name</label>
                                            <input type="text" id="paystack_name" class="form-control-new"
                                                   value="<?php echo htmlspecialchars($name); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="paystack_email">Email Address</label>
                                            <input type="email" id="paystack_email" class="form-control-new"
                                                   value="<?php echo htmlspecialchars($email); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="paystack_phone">Phone Number</label>
                                            <input type="tel" id="paystack_phone" class="form-control-new"
                                                   placeholder="0XXXXXXXXX" pattern="[0-9]{10}" maxlength="10" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="paystack_amount">Amount (GH₵)</label>
                                            <input type="number" id="paystack_amount" class="form-control-new"
                                                   step="0.01" min="0.01" disabled>
                                            <small class="form-hint">Amount is locked for security.</small>
                                        </div>

                                        <p class="form-note">You will be redirected to Paystack's secure payment page</p>

                                        <button type="button" id="paystack-btn" class="btn-paystack-new">
                                            <i class="fas fa-lock"></i> Proceed to Paystack
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" class="btn-submit-donation">
                                    <span class="btn-text">Complete Donation</span>
                                    <span class="btn-icon"><i class="fas fa-check"></i></span>
                                </button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- Payment Page End -->

    <!-- JS -->
    <script src="js/jquery-3.7.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.slicknav.js"></script>
    <script src="js/swiper-bundle.min.js"></script>
    <script src="js/jquery.waypoints.min.js"></script>
    <script src="js/jquery.counterup.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/SmoothScroll.js"></script>
    <script src="js/parallaxie.js"></script>
    <script src="js/gsap.min.js"></script>
    <script src="js/magiccursor.js"></script>
    <script src="js/SplitText.js"></script>
    <script src="js/ScrollTrigger.min.js"></script>
    <script src="js/jquery.mb.YTPlayer.min.js"></script>
    <script src="js/plyr.js"></script>
    <script src="js/wow.js"></script>

    <script>
    $(document).ready(function() {

        // ✅ amount from server/session
        var amount = parseFloat($('#payment-amount').val()) || 100;

        // UI
        $('#display-amount').text(amount.toFixed(2));
        $('#mm_amount, #paystack_amount').val(amount.toFixed(2));

        // Toggle panels + disable hidden required fields
        function togglePanel(method){
            $('.payment-details-form').removeClass('active');
            var detailsId = method.replace(/_/g, '-') + '-details';
            $('#' + detailsId).addClass('active');

            $('.payment-details-form').find('input, select, textarea').prop('disabled', true);
            $('#' + detailsId).find('input, select, textarea').prop('disabled', false);

            // keep amount fields disabled always
            $('#mm_amount, #paystack_amount').prop('disabled', true);
        }

        togglePanel($('input[name="payment_method"]:checked').val());

        $('input[name="payment_method"]').change(function() {
            togglePanel($(this).val());
        });

        // Phone formatting
        $('#mm_phone, #paystack_phone').on('input', function() {
            let value = $(this).val().replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            $(this).val(value);
        });

        // Card formatting
        $('#card_number').on('input', function() {
            let value = $(this).val().replace(/\s/g, '').replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
            $(this).val(formatted);
        });

        $('#expiry').on('input', function() {
            let value = $(this).val().replace(/\D/g, '');
            if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
            $(this).val(value);
        });

        $('#cvv').on('input', function() {
            $(this).val($(this).val().replace(/\D/g, ''));
        });

        // ✅ submit (non-paystack methods still post to backend)
        $('#paymentForm').on('submit', function(e) {
            e.preventDefault();

            var method = $('input[name="payment_method"]:checked').val();

            // If user selected Paystack, force them to use the Paystack button
            if (method === 'paystack') {
                $('#errorMessage').text('Please click "Proceed to Paystack" to complete Paystack payment.');
                $('#errorModal').modal('show');
                return false;
            }

            $('#loadingModal').modal('show');
            $.ajax({
                url: 'backend/process_payment.php',
                type: 'POST',
                data: $(this).serialize(),
                dataType: 'json'
            }).done(function(data) {
                $('#loadingModal').modal('hide');
                if (data.success) {
                    $('#successMessage').text(data.message || 'Payment processed.');
                    $('#successModal').modal('show');
                    $('#successModal').one('hidden.bs.modal', function () {
                        window.location.href = data.redirect_url || 'donation.php';
                    });
                } else {
                    $('#errorMessage').text(data.error || 'Payment could not be processed.');
                    $('#errorModal').modal('show');
                }
            }).fail(function(xhr) {
                $('#loadingModal').modal('hide');
                var msg = 'Request failed. Please try again.';
                try {
                    var j = JSON.parse(xhr.responseText);
                    if (j.error) msg = j.error;
                } catch (err) {}
                $('#errorMessage').text(msg);
                $('#errorModal').modal('show');
            });

            return false;
        });

        // ✅ Paystack handler
        $('#paystack-btn').click(function(e) {
            e.preventDefault();

            var name  = $('#paystack_name').val().trim();
            var email = $('#paystack_email').val().trim();
            var phone = $('#paystack_phone').val().trim();

            if (!name || !email || phone.length !== 10) {
                $('#errorMessage').text('Please fill name, email, and a valid 10-digit phone number.');
                $('#errorModal').modal('show');
                return;
            }

            // Paystack expects amount in pesewas (kobo equivalent) => amount * 100
            var payAmount = Math.round(amount * 100);

            var handler = PaystackPop.setup({
                key: '<?php echo htmlspecialchars(PAYSTACK_PUBLIC_KEY); ?>', // ✅ from .env
                email: email,
                amount: payAmount,
                currency: 'GHS',
                ref: 'DON_' + Date.now(), // ✅ unique enough
                metadata: {
                    custom_fields: [
                        { display_name: 'Donor Name', variable_name: 'donor_name', value: name },
                        { display_name: 'Phone', variable_name: 'phone', value: phone }
                    ]
                },
                callback: function(response) {
                    // ✅ Verify on server. Server will use session amount + donation_id
                    $('#loadingModal').modal('show');

                    $.post('backend/process_payment.php', {
                        csrf_token: $('input[name="csrf_token"]').val(),
                        payment_method: 'paystack',
                        reference: response.reference
                    }, function(data) {
                        $('#loadingModal').modal('hide');

                        if (data.success) {
                            $('#successMessage').text(data.message || ('Transaction ID: ' + (data.transaction_id || response.reference)));
                            $('#successModal').modal('show');
                            $('#successModal').one('hidden.bs.modal', function () {
                                window.location.href = data.redirect_url || ('thank-you.php?ref=' + encodeURIComponent(response.reference));
                            });
                        } else {
                            $('#errorMessage').text(data.error || 'Payment verification failed.');
                            $('#errorModal').modal('show');
                        }
                    }, 'json').fail(function(xhr){
                        $('#loadingModal').modal('hide');
                        var msg = 'Verification request failed. Please try again.';
                        try {
                            var j = JSON.parse(xhr.responseText);
                            if (j.error) msg = j.error;
                        } catch (err) {}
                        $('#errorMessage').text(msg);
                        $('#errorModal').modal('show');
                    });
                },
                onClose: function() {
                    $('#errorMessage').text('Transaction was not completed.');
                    $('#errorModal').modal('show');
                }
            });

            handler.openIframe();
        });

    });
    </script>

    <script src="js/function.js"></script>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="successModalLabel">Payment Successful</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                    <p class="mt-3">Thank you for your generous donation! Your payment has been processed successfully.</p>
                    <p id="successMessage"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Continue</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorModalLabel">Payment Failed</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <i class="fas fa-times-circle text-danger" style="font-size: 3rem;"></i>
                    <p class="mt-3">Sorry, there was an issue processing your payment.</p>
                    <p id="errorMessage"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Try Again</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading Modal -->
    <div class="modal fade" id="loadingModal" tabindex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3">Processing your payment...</p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>