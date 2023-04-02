<?php
// Database connection
require 'dbconnect.php';
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the email and password from the form data
$email = $_POST['email'];
$password = $_POST['password'];

// Authenticate the user's credentials
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Successful login
        echo 'Welcome, ' . $user['name'] . '!';
    } else {
        // Failed login
        echo 'Invalid email or password.';
    }
} else {
    // Failed login
    echo 'Invalid email or password.';
}

$stmt->close();
$conn->close();
?>