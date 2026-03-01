<?php
require_once __DIR__ . '/backend/auth.php';
$token = $_GET['token'] ?? '';
$error = $_SESSION['auth_error'] ?? '';
unset($_SESSION['auth_error']);

$csrf = csrf_token();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set New Password - LAKESIDE BAPTIST CHURCH</title>
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
                    <h1>Create a new password</h1>
                    <p>Enter a secure password to continue.</p>
                </div>

                <?php if ($error): ?>
                    <div class="auth-alert"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>

                <form action="backend/auth_controller.php?action=reset_password" method="POST" id="resetForm">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf); ?>">
                    <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">

                    <div class="form-group">
                        <label for="password">New Password</label>
                        <input type="password" id="password" name="password" class="form-control" minlength="8" maxlength="64" required>
                    </div>

                    <div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" class="form-control" minlength="8" maxlength="64" required>
                    </div>

                    <button type="submit" class="btn-default btn-block">Update password</button>
                </form>
            </div>
        </div>
    </main>

    <script src="js/jquery-3.7.1.min.js"></script>
    <script>
        $('#resetForm').on('submit', function () {
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