<?php
session_start();
$donation = $_SESSION['donation'] ?? null;
if (!$donation) {
    header('Location: donation.html');
    exit;
}
$amount = $donation['amount'];
$name = $donation['name'];
$email = $donation['email'];
?>
<!DOCTYPE html>
<html lang="zxx">

<!-- Styling Overview:
- Bootstrap: Grid system, forms, buttons.
- Custom CSS: Payment sections from custom.css.
- Font Awesome: Icons for payment methods.
- Animate.css: Wow animations.

JavaScript Functionalities:
- jQuery: Core.
- Bootstrap JS: Forms, modals.
- Wow.js: Animations.
- Custom JS: function.js, payment handler.
-->

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Awaiken">
    <!-- Page Title -->
    <title>Complete Your Donation - LAKESIDE BAPTIST CHURCH</title>
    <!-- Favicon Icon -->
    <link rel="shortcut icon" type="image/x-icon" href="images/LBC LOGO.png">
    <!-- Google Fonts Css-->
    <link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- Bootstrap Css -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <!-- SlickNav Css -->
    <link href="css/slicknav.min.css" rel="stylesheet">
    <!-- Swiper Css -->
    <link rel="stylesheet" href="css/swiper-bundle.min.css">
    <!-- Font Awesome Icon Css-->
    <link href="css/all.css" rel="stylesheet" media="screen">
    <!-- Animated Css -->
    <link href="css/animate.css" rel="stylesheet">
    <!-- Magnific Popup Core Css File -->
    <link rel="stylesheet" href="css/magnific-popup.css">
    <!-- Mouse Cursor Css File -->
    <link rel="stylesheet" href="css/mousecursor.css">
    <!-- Audio Css File -->
    <link rel="stylesheet" href="css/plyr.css">
    <!-- Main Custom Css -->
    <link href="css/custom.css" rel="stylesheet" media="screen">
    <!-- Payment Page Css -->
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
                    <!-- Logo Start -->
                    <a class="navbar-brand" href="index-slider.html">
                        <img src="images/LBC LOGO.png" alt="Logo">
                    </a>
                    <!-- Logo End -->

                    <!-- Main Menu Start -->
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
                                        <li class="nav-item"><a class="nav-link" href="donation.html">Donation</a></li>
                                        <li class="nav-item"><a class="nav-link" href="ministries.html">Ministries</a></li>
                                        <li class="nav-item"><a class="nav-link" href="ministry-single.html">Ministries Details</a></li>
                                        <li class="nav-item"><a class="nav-link" href="pastor.html">pastor</a></li>
                                        <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
                                <li class="nav-item highlighted-menu"><a class="nav-link" href="donation.html#donate-section">donate now</a></li>
                            </ul>
                        </div>
                        <!-- Let’s Start Button Start -->
                        <div class="header-btn d-inline-flex">
                            <a href="donation.html#donate-section" class="btn-default">donate now</a>
                        </div>
                        <!-- Let’s Start Button End -->
                    </div>
                    <!-- Main Menu End -->
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
                    <!-- Page Header Box Start -->
                    <div class="page-header-box">
                        <h1 class="text-anime-style-2" data-cursor="-opaque">Complete Your Donation</h1>
                        <nav class="wow fadeInUp">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index-slider.html">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Payment</li>
                            </ol>
                        </nav>
                    </div>
                    <!-- Page Header Box End -->
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
                    <!-- Hero Section -->
                    <div class="payment-hero wow fadeInDown">
                        <div class="hero-content">
                            <h1 class="hero-title">Make Your Impact Today</h1>
                            <p class="hero-subtitle">Support Lakeside Baptist Church and transform lives in our community</p>
                        </div>
                    </div>

                    <!-- Main Payment Container -->
                    <div class="payment-container">
                        <!-- Left Side - Amount Display -->
                        <div class="payment-left wow fadeInLeft">
                            <div class="amount-showcase">
                                <div class="amount-circle">
                                    <div class="circle-inner">
                                        <span class="currency">GH</span>
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

                        <!-- Right Side - Payment Methods -->
                        <div class="payment-right wow fadeInRight">
                            <form id="paymentForm" action="backend/process_payment.php" method="POST">
                                <input type="hidden" name="amount" id="payment-amount" value="<?php echo $amount; ?>">

                                <h2 class="payment-title">Choose Payment Method</h2>

                                <div class="payment-methods-carousel">
                                    <!-- Mobile Money -->
                                    <div class="payment-method-item">
                                        <input type="radio" id="mobile_money" name="payment_method" value="mobile_money" checked>
                                        <label for="mobile_money" class="method-card">
                                            <div class="card-glow"></div>
                                            <div class="card-content">
                                                <div class="method-icon-large">
                                                    <i class="fas fa-mobile-alt"></i>
                                                </div>
                                                <h4>Mobile Money</h4>
                                                <p>MTN • Telecel • AirtelTigo</p>
                                                <div class="card-arrow">
                                                    <i class="fas fa-arrow-right"></i>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <!-- Paystack -->
                                    <div class="payment-method-item">
                                        <input type="radio" id="paystack" name="payment_method" value="paystack">
                                        <label for="paystack" class="method-card">
                                            <div class="card-glow"></div>
                                            <div class="card-content">
                                                <div class="method-icon-large">
                                                    <i class="fas fa-wallet"></i>
                                                </div>
                                                <h4>Paystack</h4>
                                                <p>Secure gateway</p>
                                                <div class="card-arrow">
                                                    <i class="fas fa-arrow-right"></i>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <!-- Card -->
                                    <div class="payment-method-item">
                                        <input type="radio" id="card" name="payment_method" value="card">
                                        <label for="card" class="method-card">
                                            <div class="card-glow"></div>
                                            <div class="card-content">
                                                <div class="method-icon-large">
                                                    <i class="fas fa-credit-card"></i>
                                                </div>
                                                <h4>Mastercard / Visa / Virtual Card</h4>
                                                <p>3-D Secure verification</p>
                                                <div class="card-arrow">
                                                    <i class="fas fa-arrow-right"></i>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Payment Details Section -->
                                <div class="payment-details-section">
                                    <!-- Mobile Money Details -->
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
                                            <input type="tel" id="mm_phone" name="mm_phone" class="form-control-new" placeholder="0XX XXX XXXX" pattern="[0-9]{10}" maxlength="10" required>
                                            <small class="form-hint">Format: 0XXXXXXXXX (e.g., 0501234567)</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="mm_name">Full Name</label>
                                            <input type="text" id="mm_name" name="mm_name" class="form-control-new" placeholder="Your full name" value="<?php echo htmlspecialchars($name); ?>" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="mm_amount">Amount (GH₵)</label>
                                            <input type="number" id="mm_amount" name="mm_amount" class="form-control-new" placeholder="0.00" step="0.01" min="0.01" required>
                                        </div>
                                    </div>

                                    <!-- Card Details -->
                                    <div id="card-details" class="payment-details-form">
                                        <div class="form-header">
                                            <i class="fas fa-credit-card"></i>
                                            <h3>Card Details</h3>
                                        </div>
                                        <div class="form-group">
                                            <label for="card_number">Card Number (16 digits)</label>
                                            <input type="text" id="card_number" name="card_number" class="form-control-new" placeholder="1234 5678 9012 3456" pattern="[0-9\s]{16,19}" maxlength="19" required>
                                            <small class="form-hint">Enter 16-digit card number</small>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group">
                                                <label for="expiry">Expiry Date</label>
                                                <input type="text" id="expiry" name="expiry" class="form-control-new" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])/[0-9]{2}" maxlength="5" required>
                                                <small class="form-hint">Format: MM/YY</small>
                                            </div>
                                            <div class="form-group">
                                                <label for="cvv">CVV (3-4 digits)</label>
                                                <input type="text" id="cvv" name="cvv" class="form-control-new" placeholder="123" pattern="[0-9]{3,4}" maxlength="4" required>
                                                <small class="form-hint">Back of card</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="card_name">Cardholder Name</label>
                                            <input type="text" id="card_name" name="card_name" class="form-control-new" placeholder="John Doe" value="<?php echo htmlspecialchars($name); ?>" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="card_email">Email Address</label>
                                            <input type="email" id="card_email" name="card_email" class="form-control-new" placeholder="your@email.com" value="<?php echo htmlspecialchars($email); ?>" required>
                                        </div>
                                    </div>

                                    <!-- Paystack Details -->
                                    <div id="paystack-details" class="payment-details-form">
                                        <div class="form-header">
                                            <i class="fas fa-wallet"></i>
                                            <h3>Paystack Payment</h3>
                                        </div>
                                        <div class="form-group">
                                            <label for="paystack_name">Full Name</label>
                                            <input type="text" id="paystack_name" name="paystack_name" class="form-control-new" placeholder="Your full name" value="<?php echo htmlspecialchars($name); ?>" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="paystack_email">Email Address</label>
                                            <input type="email" id="paystack_email" name="paystack_email" class="form-control-new" placeholder="your@email.com" value="<?php echo htmlspecialchars($email); ?>" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="paystack_phone">Phone Number</label>
                                            <input type="tel" id="paystack_phone" name="paystack_phone" class="form-control-new" placeholder="0XX XXX XXXX" pattern="[0-9]{10}" maxlength="10" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="paystack_amount">Amount (GH₵)</label>
                                            <input type="number" id="paystack_amount" name="paystack_amount" class="form-control-new" placeholder="0.00" step="0.01" min="0.01" required>
                                        </div>
                                        <p class="form-note">You will be redirected to Paystack's secure payment page</p>
                                        <button type="button" id="paystack-btn" class="btn-paystack-new">
                                            <i class="fas fa-lock"></i> Proceed to Paystack
                                        </button>
                                    </div>
                                </div>

                                <!-- Submit Button -->
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

    <!-- Footer Start -->
    <footer class="main-footer">
        <div class="footer-content">
            <div class="container">
                <div class="row">
                    <!-- About Section -->
                    <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                        <div class="about-footer">
                            <div class="footer-logo">
                                <img src="images/church_logo_blue-removebg-preview (1).png" alt="Lakeside Baptist Church">
                            </div>
                            <div class="about-footer-content">
                                <p>Lakeside Baptist Church is dedicated to spreading God's love and serving our community with faith, compassion, and purpose.</p>
                            </div>
                            <div class="footer-social-links">
                                <ul>
                                    <li><a href="https://web.facebook.com/lbcghana" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="https://www.youtube.com/@lakesidebaptistchurchab1" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a></li>
                                    <li><a href="https://www.tiktok.com/@lakeside.baptist" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-tiktok"></i></a></li>
                                    <li><a href="https://www.instagram.com/lakesidebaptistchurchab" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links Section -->
                    <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                        <div class="footer-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="index-slider.html">Home</a></li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="service.html">Services</a></li>
                                <li><a href="sermons.html">Sermons</a></li>
                                <li><a href="ministries.html">Ministries</a></li>
                                <li><a href="gallery.html">Gallery</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Resources Section -->
                    <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                        <div class="footer-links">
                            <h3>Resources</h3>
                            <ul>
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="Event.html">Events</a></li>
                                <li><a href="donation.html">Donate</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
                                <li><a href="pastor.html">Our Pastors</a></li>
                                <li><a href="#">Prayer Requests</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Contact Section -->
                    <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                        <div class="footer-contact">
                            <h3>Contact Info</h3>
                            <div class="footer-contact-details">
                                <div class="footer-info-box">
                                    <div class="icon-box">
                                        <img src="images/icon-location.svg" alt="Location">
                                    </div>
                                    <div class="footer-info-box-content">
                                        <p>[Church Address]<br>Accra, Ghana</p>
                                    </div>
                                </div>
                                <div class="footer-info-box">
                                    <div class="icon-box">
                                        <img src="images/icon-phone.svg" alt="Phone">
                                    </div>
                                    <div class="footer-info-box-content">
                                        <p><a href="tel:[phone-number]">[Phone Number]</a></p>
                                    </div>
                                </div>
                                <div class="footer-info-box">
                                    <div class="icon-box">
                                        <img src="images/icon-mail.svg" alt="Email">
                                    </div>
                                    <div class="footer-info-box-content">
                                        <p><a href="mailto:info@lbcghana.org">info@lbcghana.org</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-copyright">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-12">
                        <div class="footer-copyright-text">
                            <p>&copy; 2024 Lakeside Baptist Church. All rights reserved.</p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="footer-privacy-policy">
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer End -->

    <!-- Jquery Library File -->
    <script src="js/jquery-3.7.1.min.js"></script>
    <!-- Bootstrap js file -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Validator js file -->
    <script src="js/validator.min.js"></script>
    <!-- SlickNav js file -->
    <script src="js/jquery.slicknav.js"></script>
    <!-- Swiper js file -->
    <script src="js/swiper-bundle.min.js"></script>
    <!-- Counter js file -->
    <script src="js/jquery.waypoints.min.js"></script>
    <script src="js/jquery.counterup.min.js"></script>
    <!-- Magnific js file -->
    <script src="js/jquery.magnific-popup.min.js"></script>
    <!-- SmoothScroll -->
    <script src="js/SmoothScroll.js"></script>
    <!-- Parallax js -->
    <script src="js/parallaxie.js"></script>
    <!-- MagicCursor js file -->
    <script src="js/gsap.min.js"></script>
    <script src="js/magiccursor.js"></script>
    <!-- Text Effect js file -->
    <script src="js/SplitText.js"></script>
    <script src="js/ScrollTrigger.min.js"></script>
    <!-- YTPlayer js File -->
    <script src="js/jquery.mb.YTPlayer.min.js"></script>
    <!-- Audio js File -->
    <script src="js/plyr.js"></script>
    <!-- Wow js file -->
    <script src="js/wow.js"></script>
    <!-- Payment form handler -->
    <script>
        $(document).ready(function() {
            // Use server-provided amount (fallback to 100 if missing)
            var amount = parseFloat($('#payment-amount').val()) || 100;
            $('#display-amount').text('GH ' + amount.toFixed(2));
            $('#payment-amount').val(amount);

            // Auto-fill amount fields
            $('#mm_amount, #paystack_amount').val(amount.toFixed(2));

            // Payment method details toggle (method values use underscore, IDs use hyphen)
            $('input[name="payment_method"]').change(function() {
                $('.payment-details-form').removeClass('active');
                var method = $(this).val();
                var detailsId = method.replace(/_/g, '-') + '-details';
                $('#' + detailsId).addClass('active');
            });

            // Format phone number input (Ghana format: 0XXXXXXXXX)
            $('#mm_phone, #paystack_phone').on('input', function() {
                let value = $(this).val().replace(/\D/g, '');
                if (value.length > 10) value = value.slice(0, 10);
                $(this).val(value);
            });

            // Format card number with spaces
            $('#card_number').on('input', function() {
                let value = $(this).val().replace(/\s/g, '').replace(/\D/g, '');
                if (value.length > 16) value = value.slice(0, 16);
                let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                $(this).val(formatted);
            });

            // Format expiry date (MM/YY)
            $('#expiry').on('input', function() {
                let value = $(this).val().replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                $(this).val(value);
            });

            // Format CVV (numbers only)
            $('#cvv').on('input', function() {
                $(this).val($(this).val().replace(/\D/g, ''));
            });

            // Validate form and submit via AJAX so user sees success/error modal instead of JSON
            $('#paymentForm').on('submit', function(e) {
                e.preventDefault();
                var method = $('input[name="payment_method"]:checked').val();
                var isValid = true;
                var errorMsg = '';

                if (method === 'mobile_money') {
                    var phone = $('#mm_phone').val();
                    var network = $('#mm_network').val();
                    
                    if (!network) {
                        errorMsg = 'Please select a mobile money network';
                        isValid = false;
                    } else if (phone.length !== 10) {
                        errorMsg = 'Phone number must be 10 digits (format: 0XXXXXXXXX)';
                        isValid = false;
                    } else if (!$('#mm_name').val()) {
                        errorMsg = 'Please enter your full name';
                        isValid = false;
                    }
                } else if (method === 'card') {
                    var cardNum = $('#card_number').val().replace(/\s/g, '');
                    var expiry = $('#expiry').val();
                    var cvv = $('#cvv').val();

                    if (cardNum.length !== 16) {
                        errorMsg = 'Card number must be 16 digits';
                        isValid = false;
                    } else if (!expiry.match(/^\d{2}\/\d{2}$/)) {
                        errorMsg = 'Expiry date must be in MM/YY format';
                        isValid = false;
                    } else if (cvv.length < 3 || cvv.length > 4) {
                        errorMsg = 'CVV must be 3 or 4 digits';
                        isValid = false;
                    } else if (!$('#card_name').val()) {
                        errorMsg = 'Please enter cardholder name';
                        isValid = false;
                    } else if (!$('#card_email').val()) {
                        errorMsg = 'Please enter email address';
                        isValid = false;
                    }
                } else if (method === 'paystack') {
                    if (!$('#paystack_name').val()) {
                        errorMsg = 'Please enter your full name';
                        isValid = false;
                    } else if (!$('#paystack_email').val()) {
                        errorMsg = 'Please enter your email address';
                        isValid = false;
                    } else if ($('#paystack_phone').val().length !== 10) {
                        errorMsg = 'Phone number must be 10 digits';
                        isValid = false;
                    }
                }

                if (!isValid) {
                    $('#errorMessage').text(errorMsg);
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
                        $('#successMessage').text(data.message || ('Transaction ID: ' + (data.transaction_id || '')));
                        $('#successModal').modal('show');
                        $('#successModal').on('hidden.bs.modal', function () {
                            window.location.href = 'donation.html';
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

            // Paystack button handler
            $('#paystack-btn').click(function(e) {
                e.preventDefault();
                var name = $('#paystack_name').val();
                var email = $('#paystack_email').val();
                var phone = $('#paystack_phone').val();
                var amount = parseFloat($('#paystack_amount').val()) * 100; // Paystack expects kobo

                if (!name || !email || !phone || !amount) {
                    $('#errorMessage').text('Please fill in all fields');
                    $('#errorModal').modal('show');
                    return;
                }

                // Paystack configuration
                var handler = PaystackPop.setup({
                    key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your public key
                    email: email,
                    amount: amount,
                    currency: 'GHS',
                    ref: 'DON_' + Math.floor((Math.random() * 1000000000) + 1),
                    metadata: {
                        custom_fields: [
                            {
                                display_name: 'Donor Name',
                                variable_name: 'donor_name',
                                value: name
                            },
                            {
                                display_name: 'Phone',
                                variable_name: 'phone',
                                value: phone
                            }
                        ]
                    },
                    callback: function(response) {
                        // Payment successful, send to server for verification
                        $.post('backend/process_payment.php', {
                            payment_method: 'paystack',
                            reference: response.reference,
                            amount: amount / 100,
                            name: name,
                            email: email,
                            phone: phone
                        }, function(data) {
                            if (data.success) {
                                $('#successMessage').text('Transaction ID: ' + data.transaction_id);
                                $('#successModal').modal('show');
                                $('#successModal').on('hidden.bs.modal', function () {
                                    window.location.href = 'donation.html';
                                });
                            } else {
                                $('#errorMessage').text('Payment verification failed: ' + data.error);
                                $('#errorModal').modal('show');
                            }
                        }, 'json');
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
    <!-- Main Custom js file -->
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