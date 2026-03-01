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

$csrf = csrf_token();
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

    <main class="auth-page">
        <div class="auth-card">
            <div class="auth-form">
                <div class="auth-header">
                    <h1>Welcome back</h1>
                    <p>Sign in to continue securely.</p>
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
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf); ?>">

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