<?php
require_once __DIR__ . '/backend/auth.php';
$user = current_user();
$err  = isset($_GET['error']) ? htmlspecialchars(urldecode($_GET['error'])) : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donate — Lakeside Baptist Church</title>
    <link rel="shortcut icon" href="images/LBC LOGO.png">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="css/all.css" rel="stylesheet">
    <!-- Donation page styles -->
    <link href="css/donation-page.css" rel="stylesheet">
</head>
<body class="dp-body">

<!-- Top bar -->
<header class="dp-topbar">
    <a href="index-slider.html" class="dp-topbar-logo">
        <img src="images/LBC LOGO.png" alt="Lakeside Baptist Church">
        <span>Lakeside Baptist</span>
    </a>

    <nav class="dp-topbar-auth">
        <a href="index-slider.html" class="dp-topbar-back">
            <i class="fas fa-arrow-left"></i> Back to site
        </a>

        <?php if ($user): ?>
            <div class="dp-user-pill">
                <i class="fas fa-user-circle"></i>
                <span><?php echo htmlspecialchars($user['name']); ?></span>
            </div>
            <a href="backend/auth_logout.php" class="dp-signout">Sign out</a>
        <?php else: ?>
            <div class="dp-guest-bar">
                <span>Have an account?</span>
                <a href="login.php" class="dp-btn-signin">
                    <i class="fas fa-sign-in-alt"></i> Sign In
                </a>
            </div>
        <?php endif; ?>
    </nav>
</header>

<!-- Page body -->
<div class="dp-page">

    <!-- Left — impact panel -->
    <div class="dp-left">
        <div class="dp-left-inner">
            <span class="dp-eyebrow"><i class="fas fa-heart"></i> Your Gift Matters</span>

            <h1 class="dp-headline">
                Every Cedi<br><em>Changes Lives</em>
            </h1>

            <p class="dp-subtext">
                Your generosity directly supports ministry, youth outreach, and community care at Lakeside Baptist Church. Every donation — big or small — makes a lasting difference.
            </p>

            <div class="dp-stats">
                <div class="dp-stat">
                    <div class="dp-stat-num">500+</div>
                    <div class="dp-stat-lbl">Families Served</div>
                </div>
                <div class="dp-stat">
                    <div class="dp-stat-num">20+</div>
                    <div class="dp-stat-lbl">Years of Ministry</div>
                </div>
                <div class="dp-stat">
                    <div class="dp-stat-num">15+</div>
                    <div class="dp-stat-lbl">Outreach Programs</div>
                </div>
            </div>

            <div class="dp-trust">
                <div class="dp-trust-item"><i class="fas fa-lock"></i> SSL Encrypted</div>
                <div class="dp-trust-item"><i class="fas fa-shield-alt"></i> Verified Giving</div>
                <div class="dp-trust-item"><i class="fas fa-envelope-open-text"></i> Email Receipt</div>
                <div class="dp-trust-item"><i class="fas fa-hand-holding-heart"></i> Direct Impact</div>
            </div>

            <div class="dp-quote">
                <p>"Giving to Lakeside has been one of the most rewarding parts of my faith journey. I know my gift truly makes a difference."</p>
                <cite>— Church Member, Lakeside Baptist</cite>
            </div>
        </div>
    </div>

    <!-- Right — form panel -->
    <div class="dp-right">
        <div class="dp-form-box">

            <?php if (!$user): ?>
            <!-- Login hint shown only to guests -->
            <div class="dp-guest-hint">
                <i class="fas fa-user-circle"></i>
                <span>Already have an account? Sign in for a faster checkout.</span>
                <a href="login.php" class="dp-hint-link">Sign In <i class="fas fa-arrow-right"></i></a>
            </div>
            <?php endif; ?>

            <div class="dp-card">
                <h2 class="dp-card-title">Make Your Donation</h2>
                <p class="dp-card-sub">Choose a preset amount or enter your own below.</p>

                <form id="donateForm" action="backend/initiate_donation.php" method="POST">
                    <!-- Amount resolved by JS before submit -->
                    <input type="hidden" name="custom_amount" id="resolved_amount">

                    <!-- Preset amounts -->
                    <div class="dp-amount-sec">
                        <label class="dp-field-lbl">Select Amount (GH₵)</label>
                        <div class="dp-amounts">
                            <button type="button" class="dp-amt-btn active" data-val="100">GH₵ 100</button>
                            <button type="button" class="dp-amt-btn" data-val="200">GH₵ 200</button>
                            <button type="button" class="dp-amt-btn" data-val="300">GH₵ 300</button>
                            <button type="button" class="dp-amt-btn" data-val="400">GH₵ 400</button>
                            <button type="button" class="dp-amt-btn" data-val="500">GH₵ 500</button>
                            <button type="button" class="dp-amt-btn" data-val="600">GH₵ 600</button>
                        </div>
                        <!-- Custom amount -->
                        <div class="dp-custom-wrap">
                            <span class="dp-custom-pre">GH₵</span>
                            <input type="number" id="custom_amt" class="dp-input" placeholder="Other amount" min="1" step="0.01">
                        </div>
                    </div>

                    <!-- Donor info -->
                    <div class="dp-fields">
                        <label class="dp-field-lbl">Your Details</label>
                        <div class="dp-row">
                            <div class="dp-field">
                                <input type="text" name="fname" id="fname" class="dp-input" placeholder="First Name" required>
                            </div>
                            <div class="dp-field">
                                <input type="text" name="lname" id="lname" class="dp-input" placeholder="Last Name" required>
                            </div>
                        </div>
                        <div class="dp-field">
                            <input type="email" name="email" id="email" class="dp-input" placeholder="Email Address" required
                                <?php if ($user): ?>value="<?php echo htmlspecialchars($user['email']); ?>"<?php endif; ?>>
                        </div>
                        <div class="dp-field">
                            <input type="text" name="donation_note" class="dp-input" placeholder="Add a note or dedication (optional)">
                        </div>
                    </div>

                    <!-- Error -->
                    <?php if ($err): ?>
                        <div class="dp-error"><?php echo $err; ?></div>
                    <?php endif; ?>
                    <div id="dp-err" class="dp-error" style="display:none"></div>

                    <!-- Submit -->
                    <button type="submit" class="dp-submit">
                        <i class="fas fa-heart"></i>
                        Continue to Payment
                        <i class="fas fa-arrow-right"></i>
                    </button>

                    <p class="dp-secure">
                        <i class="fas fa-lock"></i> Secure, encrypted checkout.
                    </p>

                    <div class="dp-footer-note">
                        <?php if ($user): ?>
                            Signed in as <strong><?php echo htmlspecialchars($user['name']); ?></strong>.
                            <a href="backend/auth_logout.php">Not you? Sign out</a>
                        <?php else: ?>
                            New here? <a href="signup.php">Create a free account</a> to track your giving.
                        <?php endif; ?>
                    </div>
                </form>
            </div>

        </div>
    </div>

</div>

<script src="js/jquery-3.7.1.min.js"></script>
<script>
$(function(){
    var selected = 100;

    // Pill buttons
    $('.dp-amt-btn').on('click', function(){
        $('.dp-amt-btn').removeClass('active');
        $(this).addClass('active');
        selected = parseFloat($(this).data('val'));
        $('#custom_amt').val('');
    });

    // Custom input deselects pills
    $('#custom_amt').on('input', function(){
        if($(this).val()){
            $('.dp-amt-btn').removeClass('active');
            selected = 0;
        } else {
            $('.dp-amt-btn').first().addClass('active');
            selected = 100;
        }
    });

    // On submit: validate then set hidden field
    $('#donateForm').on('submit', function(e){
        var custom = parseFloat($('#custom_amt').val());
        var amount = (custom > 0) ? custom : selected;

        if(!amount || amount <= 0){
            e.preventDefault();
            $('#dp-err').text('Please select or enter a donation amount.').show();
            $('html,body').animate({scrollTop:$('#dp-err').offset().top - 20}, 300);
            return false;
        }
        $('#resolved_amount').val(amount);
    });
});
</script>
</body>
</html>
