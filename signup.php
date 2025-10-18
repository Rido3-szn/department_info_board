<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);
  $matric = trim($_POST['matric']);
  $role = $_POST['role'];
  $password = $_POST['password'];

  // Password validation
  if (strlen($password) < 8 || !preg_match('/[0-9]/', $password)) {
    die("Password must be at least 8 characters long and contain at least one number.");
  }

  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  // Check if email already exists
  $check = $conn->prepare("SELECT * FROM users WHERE email = ?");
  $check->bind_param("s", $email);
  $check->execute();
  $result = $check->get_result();

  if ($result->num_rows > 0) {
    die("Email already exists!");
  }

  // Insert new user
  $stmt = $conn->prepare("INSERT INTO users (name, email, matric, role, password) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("sssss", $name, $email, $matric, $role, $hashedPassword);

  if ($stmt->execute()) {
    echo "Signup successful!";
  } else {
    echo "Error: " . $stmt->error;
  }
}
?>
echo "<script>
alert('Signup successful! You can now log in.');
window.location.href = '../student-login.html';
</script>";

