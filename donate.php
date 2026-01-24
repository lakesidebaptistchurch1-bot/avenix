<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donate Now</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>
    <div class="container">
        <h1>Donate Now</h1>
        <form id="donateForm" action="process_donation.php" method="POST">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" class="form-control" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" class="form-control" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <label for="amount">Donation Amount:</label>
                <input type="number" name="amount" class="form-control" placeholder="Amount" required>
            </div>
            <button type="submit" class="btn btn-primary">Donate Now</button>
        </form>
    </div>
</body>
</html>
