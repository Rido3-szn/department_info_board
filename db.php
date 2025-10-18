<?php
$host = "sqlXXX.epizy.com"; // Replace with your InfinityFree DB host
$user = "epiz_XXXXXXX"; // Your InfinityFree username
$pass = "your_password"; // Your InfinityFree DB password
$dbname = "epiz_XXXXXXX_info_board"; // Your InfinityFree DB name

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
