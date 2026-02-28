<?php
require_once __DIR__ . '/backend/auth.php';
if (current_user()) {
    header('Location: payment.php');
    exit;
}
$error = $_SESSION['auth_error'] ?? '';
$success = $_SESSION['auth_success'] ?? '';
$info = $_SESSION['auth_info'] ?? '';
unset($_SESSION['auth_error'], $_SESSION['auth_success'], $_SESSION['auth_info']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - LAKESIDE BAPTIST CHURCH</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/LBC LOGO.png">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/all.css" rel="stylesheet" media="screen">
    <link href="css/custom.css" rel="stylesheet" media="screen">
    <link href="css/auth.css" rel="stylesheet" media="screen">
</head>
<body>
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
                        <div class="header-btn d-inline-flex">
                            <a href="signup.php" class="btn-default btn-signup">sign up</a>
                            <a href="donation.html#donate-section" class="btn-default">donate now</a>
                        </div>
                    </div>
                    <div class="navbar-toggle"></div>
                </div>
            </nav>
            <div class="responsive-menu"></div>
        </div>
    </header>
    <!-- Header End -->

    <main class="auth-page">
        <div class="auth-card">
            <div class="auth-form">
                <div class="auth-header">
                    <h1>Welcome back</h1>
                    <p>Sign in to complete your donation securely.</p>
                </div>

                <?php if ($info): ?>
                    <div class="auth-alert info"><?php echo htmlspecialchars($info); ?></div>
                <?php endif; ?>
                <?php if ($success): ?>
                    <div class="auth-alert success"><?php echo htmlspecialchars($success); ?></div>
                <?php endif; ?>
                <?php if ($error): ?>
                    <div class="auth-alert"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>

                <form action="backend/auth_controller.php?action=login" method="POST">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control" required>
                    </div>
                    <div class="auth-row">
                        <a href="forgot-password.php">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn-default btn-block">Sign in</button>
                </form>

                <p class="auth-footer">
                    New here? <a href="signup.php">Create an account</a>
                </p>
            </div>
            <div class="auth-visual">
                <!-- Replace image with the provided design asset -->
                <img src="images/auth-plant.png" alt="Welcome">
                <div class="auth-visual-text">
                    <h3>Giving made simple</h3>
                    <p>Secure your giving and track your impact.</p>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
