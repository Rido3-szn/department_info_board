document.addEventListener("DOMContentLoaded", () => {
    const annForm = document.getElementById("announcement-form");
    const eventForm = document.getElementById("event-form");
    const annList = document.getElementById("announcement-list");
    const eventList = document.getElementById("event-list");
    const logoutBtn = document.getElementById("logout-btn");
  
    // Load saved posts from localStorage
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];
  
    function displayAnnouncements() {
      annList.innerHTML = "";
      announcements.forEach((a) => {
        const div = document.createElement("div");
        div.className = "admin-item";
        div.innerHTML = `<h3>${a.title}</h3><p>${a.body}</p><small>${a.date}</small>`;
        annList.appendChild(div);
      });
    }
  
    function displayEvents() {
      eventList.innerHTML = "";
      events.forEach((e) => {
        const div = document.createElement("div");
        div.className = "admin-item";
        div.innerHTML = `<h3>${e.title}</h3><p>${e.details}</p><small>${e.date}</small>`;
        eventList.appendChild(div);
      });
    }
  
    annForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const title = document.getElementById("announcement-title").value.trim();
      const body = document.getElementById("announcement-body").value.trim();
      if (!title || !body) return;
  
      const newAnnouncement = {
        title,
        body,
        date: new Date().toLocaleString(),
      };
  
      announcements.unshift(newAnnouncement);
      localStorage.setItem("announcements", JSON.stringify(announcements));
      displayAnnouncements();
      annForm.reset();
    });
  
    eventForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const title = document.getElementById("event-title").value.trim();
      const details = document.getElementById("event-details").value.trim();
      const date = document.getElementById("event-date").value;
  
      if (!title || !details || !date) return;
  
      const newEvent = {
        title,
        details,
        date,
      };
  
      events.unshift(newEvent);
      localStorage.setItem("events", JSON.stringify(events));
      displayEvents();
      eventForm.reset();
    });
  
    logoutBtn.addEventListener("click", () => {
      alert("Logging out...");
      window.location.href = "admin-login.html";
    });
  
    // Display existing posts
    displayAnnouncements();
    displayEvents();
  });
  