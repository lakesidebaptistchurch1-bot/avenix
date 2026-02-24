<?php
require_once __DIR__ . '/backend/auth.php';
$error = $_SESSION['auth_error'] ?? '';
$success = $_SESSION['auth_success'] ?? '';
$reset_link = $_SESSION['reset_link'] ?? '';
unset($_SESSION['auth_error'], $_SESSION['auth_success'], $_SESSION['reset_link']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - LAKESIDE BAPTIST CHURCH</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/LBC LOGO.png">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/all.css" rel="stylesheet" media="screen">
    <link href="css/custom.css" rel="stylesheet" media="screen">
    <link href="css/auth.css" rel="stylesheet" media="screen">
</head>
<body>
    <main class="auth-page">
        <div class="auth-card single">
            <div class="auth-form">
                <div class="auth-header">
                    <h1>Reset your password</h1>
                    <p>Enter your email and we will send a reset link.</p>
                </div>

                <?php if ($success): ?>
                    <div class="auth-alert success"><?php echo htmlspecialchars($success); ?></div>
                <?php endif; ?>
                <?php if ($error): ?>
                    <div class="auth-alert"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>
                <?php if ($reset_link): ?>
                    <div class="auth-alert">
                        <strong>Dev link:</strong> <a href="<?php echo htmlspecialchars($reset_link); ?>">Reset password</a>
                    </div>
                <?php endif; ?>

                <form action="backend/auth_request_reset.php" method="POST">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" class="form-control" required>
                    </div>
                    <button type="submit" class="btn-default btn-block">Send reset link</button>
                </form>

                <p class="auth-footer">
                    Remembered your password? <a href="login.php">Sign in</a>
                </p>
            </div>
        </div>
    </main>
</body>
</html>
