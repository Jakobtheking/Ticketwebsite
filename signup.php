<?php
require 'dbconnect.php';

// Get the user's information from the form data
$name = $_POST['name'];
$number = $_POST['number'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Check if the password and confirm_password match
if ($password !== $confirm_password) {
    echo 'Passwords do not match.';
    exit();
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert the user's information into the database
$sql = "INSERT INTO users (name, number, email, password) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'ssss', $name, $number, $email, $hashed_password);
$result = mysqli_stmt_execute($stmt);

if ($result) {
    // Registration successful, redirect to the home page
    header('Location: main.html');
    exit();
} else {
    // Registration failed
    echo 'Error: ' . $sql . '<br>' . mysqli_error($conn);
}

mysqli_close($conn);
?>