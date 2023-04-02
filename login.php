<?php
  // Get the email and password from the form data
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Authenticate the user's credentials
  if ($email == 'user@example.com' && $password == 'password123') {
    // Successful login
    echo 'Welcome, ' . $email . '!';
  } else {
    // Failed login
    echo 'Invalid email or password.';
  }
?>