<?php
session_start();

// Only allow logged-in users
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

// Optionally, check role for admin-specific dashboard
if ($_SESSION['user']['role'] != 'admin') {
    echo "Welcome, Student!";
} else {
    echo "Welcome, Admin!";
}
?>