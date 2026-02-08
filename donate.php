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
        <form id="donateForm" action="backend/initiate_donation.php" method="POST">
            <div class="form-group">
                <label for="fname">First Name:</label>
                <input type="text" name="fname" id="fname" class="form-control" placeholder="First Name" required>
            </div>
            <div class="form-group">
                <label for="lname">Last Name:</label>
                <input type="text" name="lname" id="lname" class="form-control" placeholder="Last Name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <label for="custom_amount">Donation Amount (GH₵):</label>
                <input type="number" name="custom_amount" id="custom_amount" class="form-control" placeholder="Amount" step="0.01" min="1" required>
            </div>
            <button type="submit" class="btn btn-primary">Donate Now</button>
        </form>
    </div>
</body>
</html>
