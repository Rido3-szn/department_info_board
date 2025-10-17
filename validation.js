document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("admin-login-form");
    const message = document.getElementById("login-message");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.getElementById("admin-username").value.trim();
      const password = document.getElementById("admin-password").value.trim();
  
      // Simple hardcoded admin login for demo
      const ADMIN_USER = "admin";
      const ADMIN_PASS = "12345";
  
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";
  
        setTimeout(() => {
          window.location.href = "admin-dashboard.html"; // redirect page
        }, 1500);
      } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password.";
      }
    });
  });
  