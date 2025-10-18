<?php
// config.php
$servername = "localhost"; // InfinityFree usually uses localhost
$username = "your_db_username"; // replace with your MySQL username
$password = "your_db_password"; // replace with your MySQL password
$dbname = "your_db_name";       // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
