<?php
include 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = trim($_POST['email']);
  $password = trim($_POST['password']);

  $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
      $_SESSION['user'] = $user;

      if ($user['role'] === 'admin') {
        header("Location: ../dashboard/admin-dashboard.php");
      } else {
        header("Location: ../dashboard/student-dashboard.php");
      }
      exit();
    } else {
      echo "Invalid password!";
    }
  } else {
    echo "No account found with that email!";
  }
}
?>
