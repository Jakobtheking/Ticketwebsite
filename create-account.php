<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['create_account'])) {
    // Retrieve the form data
    $name = $_POST['name'];
    $number = $_POST['number'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // TODO: Add validation and database logic here

    // If all validation checks pass, create the new account in the database
    // ...

    // Redirect the user to the login page
    header("Location: login.html");
    exit();
  }
?>