<?php
require_once __DIR__ . '/backend/auth.php';
if (current_user()) {
    header('Location: payment.php');
    exit;
}
$error = $_SESSION['auth_error'] ?? '';
$info = $_SESSION['auth_info'] ?? '';
unset($_SESSION['auth_error'], $_SESSION['auth_info']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - LAKESIDE BAPTIST CHURCH</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/LBC LOGO.png">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/all.css" rel="stylesheet" media="screen">
    <link href="css/custom.css" rel="stylesheet" media="screen">
    <link href="css/auth.css" rel="stylesheet" media="screen">
</head>
<body>
    <main class="auth-page">
        <div class="auth-card">
            <!-- Left: form -->
            <div class="auth-form">
                <div class="auth-header">
                    <h1>Create your account</h1>
                    <p>Join the community and manage your giving securely.</p>
                </div>

                <?php if ($info): ?>
                    <div class="auth-alert info"><?php echo htmlspecialchars($info); ?></div>
                <?php endif; ?>
                <?php if ($error): ?>
                    <div class="auth-alert"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>

                <form action="backend/auth_register.php" method="POST" id="signupForm">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control" minlength="8" required>
                        <small class="form-hint">Minimum 8 characters</small>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" class="form-control" minlength="8" required>
                    </div>
                    <button type="submit" class="btn-default btn-block">Create account</button>
                </form>

                <p class="auth-footer">
                    Already have an account? <a href="login.php">Sign in</a>
                </p>
            </div>

            <!-- Right: visual -->
            <div class="auth-visual">
                <!-- Replace image with the provided design asset -->
                <img src="images/auth-plant.png" alt="Welcome">
                <div class="auth-visual-text">
                    <h3>Give with confidence</h3>
                    <p>Your generosity fuels mission work, outreach, and care.</p>
                </div>
            </div>
        </div>
    </main>

    <script src="js/jquery-3.7.1.min.js"></script>
    <script>
        $('#signupForm').on('submit', function () {
            var pass = $('#password').val();
            var confirm = $('#confirm_password').val();
            if (pass !== confirm) {
                alert('Passwords do not match.');
                return false;
            }
            return true;
        });
    </script>
</body>
</html>
