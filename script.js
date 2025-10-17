// =========================================================
//  STUDENT INFORMATION BOARD - FINAL CLEAN VERSION
// =========================================================

console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------
     Utility Helpers
     ----------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* -----------------------
     SIDEBAR TOGGLE (MOBILE)
     ----------------------- */
  function initSidebarToggle() {
    const menuBtn = $("#menu-btn");
    const sidebar = $("#sidebar");
    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("show");
      document.body.classList.toggle("menu-open");
    });

    document.body.addEventListener("click", (e) => {
      if (
        document.body.classList.contains("menu-open") &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn
      ) {
        sidebar.classList.remove("show");
        document.body.classList.remove("menu-open");
      }
    });
  }

  /* -----------------------
     PROFILE MODAL
     ----------------------- */
  function initProfileModal() {
    const profileBtn = $("#profile-btn");
    const modal = $("#profile-modal");
    const closeBtn = $("#close-profile");
    const profileName = $("#profile-name");
    const profileMatric = $("#profile-matric");

    if (!profileBtn || !modal) return;

    profileBtn.addEventListener("click", () => {
      const name = localStorage.getItem("studentName") || "John Doe";
      const matric = localStorage.getItem("studentMatric") || "FUTO/CSC/25/001";
      if (profileName) profileName.textContent = name;
      if (profileMatric) profileMatric.textContent = matric;
      modal.style.display = "flex";
    });

    closeBtn?.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  /* -----------------------
     HOMEPAGE: Announcements & Events
     ----------------------- */
  /* -----------------------
   HOMEPAGE: populate announcements + events
   (index.html)
   ----------------------- */
function initHomepage() {
  const annList = document.querySelector("#announcement-list");
  const evtList = document.querySelector("#event-list");

  if (!annList && !evtList) return;

  // Load announcements/events from localStorage (posted by admin)
  const storedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
  const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

  // If nothing is posted yet, show default info
  const announcements =
    storedAnnouncements.length > 0
      ? storedAnnouncements
      : [
          {
            title: "No announcements yet",
            body: "Departmental updates will appear here once posted by the admin.",
            date: new Date().toLocaleDateString(),
          },
        ];

  const events =
    storedEvents.length > 0
      ? storedEvents
      : [
          {
            title: "No upcoming events",
            desc: "Events will appear here once added by the admin.",
            date: new Date().toLocaleDateString(),
          },
        ];

  // Render Announcements
  if (annList) {
    annList.innerHTML = "";
    announcements.forEach((a) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${a.title}</h3>
        <p>${a.body || a.details || "No description available"}</p>
        <div class="date">Posted on: ${a.date}</div>
      `;
      annList.appendChild(card);
    });
  }

  // Render Events
  if (evtList) {
    evtList.innerHTML = "";
    events.forEach((e) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${e.title}</h3>
        <p>${e.desc || e.details || "No description available"}</p>
        <div class="date">Date: ${e.date}</div>
      `;
      evtList.appendChild(card);
    });
  }

  console.log("✅ Homepage announcements & events loaded dynamically");
}


  /* -----------------------
     DASHBOARD PAGE
     ----------------------- */
  function initDashboard() {
    const dashAnn = $("#dash-announcements");
    const dashEvt = $("#dash-events");
    const resultBody = $("#result-table-body");
    const dashHeader = document.querySelector(".dash-header h1");
    const studentName = localStorage.getItem("studentName");
    const studentMatric = localStorage.getItem("studentMatric");

    if (dashHeader && (studentName || studentMatric)) {
      dashHeader.textContent = `Welcome, ${studentName || studentMatric}`;
    }

    // Announcements
    if (dashAnn) {
      const announcements = [
        {
          title: "Departmental Timetable",
          body: "The departmental timetable has not been published yet. Please check back later for updates.",
          date: "2025-10-13",
        },
        {
          title: "SIWES Registration",
          body: "Information on SIWES will be dropping soon.",
          date: "2025-10-12",
        },
      ];
      dashAnn.innerHTML = announcements
        .map(
          (a) => `
        <div class="card">
          <h3>${a.title}</h3>
          <p>${a.body}</p>
          <div class="date">Posted: ${a.date}</div>
        </div>`
        )
        .join("");
    }

    // Events
    if (dashEvt) {
      const events = [
        {
          title: "NACOS Election",
          desc: "It's either you are voting, or you are being voted for. Goodluck to those running for any position.",
          date: "2025-10-25",
        },
        {
          title: "Convocation Ceremony",
          desc: "Convocation Ceremony coming this December.",
          date: "2025-11-15",
        },
      ];
      dashEvt.innerHTML = events
        .map(
          (e) => `
        <div class="card">
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
          <div class="date">Date: ${e.date}</div>
        </div>`
        )
        .join("");
    }

    // Results (Coming Soon)
    if (resultBody) {
      resultBody.innerHTML = `
        <tr>
          <td>Coming soon</td>
          <td>Coming soon</td>
          <td>Coming soon</td>
        </tr>`;
    }

    // Logout
    const logoutLinks = $$(".logout");
    logoutLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "student-login.html";
      })
    );
  }

  /* -----------------------
     ANNOUNCEMENTS PAGE
     ----------------------- */
  function initAnnouncementsPage() {
    const container = $("#announcement-container");
    if (!container) return;

    const announcements = [
      {
        title: "Departmental Timetable",
        body: "The departmental timetable has not been published yet. Please check back later for updates.",
        date: "2025-10-15",
      },
      {
        title: "SIWES Registration",
        body: "Information on SIWES will be dropping soon.",
        date: "2025-10-14",
      },
      {
        title: "School 2025/2026 Calendar",
        body: "FUTO Academic Calendar is now out, resumption date is Nov 4th.",
        date: "2025-10-09",
      },
      {
        title: "CIT 306 Project Submission",
        body: "Groups that picked Video submission will send videos tomorrow. Link dropping soon.",
        date: "2025-10-17",
      },
    ];

    container.innerHTML = announcements
      .map(
        (a) => `
      <div class="card">
        <h3>${a.title}</h3>
        <p>${a.body}</p>
        <div class="date">Posted on: ${a.date}</div>
      </div>`
      )
      .join("");
  }

  /* -----------------------
     EVENTS PAGE
     ----------------------- */
  function initEventsPage() {
    const container = $("#events-container");
    if (!container) return;

    const events = [
      {
        title: "NACOS Election",
        body: "It's either you are voting, or you are being voted for.",
        date: "2025-10-25",
      },
      {
        title: "Convocation Ceremony",
        body: "Convocation Ceremony coming this December.",
        date: "2025-11-15",
      },
    ];

    container.innerHTML = events
      .map(
        (e) => `
      <div class="card">
        <h3>${e.title}</h3>
        <p>${e.body}</p>
        <div class="date">Event Date: ${e.date}</div>
      </div>`
      )
      .join("");
  }

  /* -----------------------
     ARCHIVE PAGE
     ----------------------- */
  function initArchivePage() {
    const container = $("#archive-container");
    const searchInput = $("#archive-search");
    if (!container) return;

    const archives = [
      {
        title: "2024 Departmental Symposium",
        body: "Held on AI and Emerging Tech, Nov 10, 2024.",
        date: "2024-11-10",
        type: "event",
      },
      {
        title: "Course Registration Deadline",
        body: "Registration closed March 15, 2024.",
        date: "2024-03-15",
        type: "announcement",
      },
      {
        title: "Internship Placement Update",
        body: "Approved IT centers list released June 2024.",
        date: "2024-06-05",
        type: "announcement",
      },
      {
        title: "Sports Week 2023",
        body: "Included coding challenges and football matches.",
        date: "2023-09-22",
        type: "event",
      },
    ];

    function render(list) {
      container.innerHTML = list.length
        ? list
            .map(
              (a) => `
          <div class="card">
            <h3>${a.title}</h3>
            <p>${a.body}</p>
            <div class="date">${a.type === "event" ? "Event Date" : "Posted On"}: ${a.date}</div>
          </div>`
            )
            .join("")
        : `<p class="no-records">No records found for your search.</p>`;
    }

    render(archives);

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = archives.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.body.toLowerCase().includes(q) ||
            a.date.includes(q)
        );
        render(filtered);
      });
    }
  }

  /* -----------------------
     TIMETABLE + RESULTS PAGE
     ----------------------- */
  function initTimetablePage() {
    if ($("#timetable-page")) console.log("Timetable page not out yet 🕒");
  }

  function initResultsPage() {
    if ($("#results-container")) console.log("Results page coming soon 🕒");
  }
    /* -----------------------
     HOMEPAGE NAVBAR TOGGLE (for index.html)
     ----------------------- */
     function initTopNavToggle() {
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
  
      if (!menuToggle || !navLinks) return;
  
      // Toggle when clicking the menu button
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("show");
      });
  
      // Close menu if clicking outside it
      document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
          navLinks.classList.remove("show");
        }
      });
    }
  

  /* -----------------------
     INITIALIZE EVERYTHING
     ----------------------- */
  initTopNavToggle();
  initSidebarToggle();
  initProfileModal();
  initHomepage();
  initDashboard();
  initAnnouncementsPage();
  initEventsPage();
  initArchivePage();
  initResultsPage();

  console.log("🚀 All modules initialized successfully");
});
