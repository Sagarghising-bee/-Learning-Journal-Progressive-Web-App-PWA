document.addEventListener("DOMContentLoaded", () => {
  // 1. REUSABLE NAVIGATION
  const navContainer = document.getElementById("nav-container");
  if (navContainer) {
    navContainer.innerHTML = `
      <nav class="navbar">
        <h1 class="logo">My Learning Journal</h1>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </nav>
    `;

    // Active Link Logic
    const currentPath = window.location.pathname;
    navContainer.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href");
      if (currentPath.endsWith(href) || (href === "index.html" && currentPath === "/")) {
        link.classList.add("active");
      }
    });
  }

  // 2. LIVE DATE (Home Page)
  const dateEl = document.getElementById("live-date");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }

  // 3. COLLAPSIBLE ENTRIES (The Fix for Journal)
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling; // The div immediately after the button
      content.classList.toggle("collapsed");
      
      // Update button text
      if (content.classList.contains("collapsed")) {
        btn.textContent = "Show Entry";
      } else {
        btn.textContent = "Hide Entry";
      }
    });
  });

  // 4. THEME TOGGLE
  const toggleBtn = document.getElementById("theme-toggle");
  // Check saved preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️ Toggle Light Mode";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️ Toggle Light Mode" : "🌙 Toggle Dark Mode";
    });
  }

  // 5. OFFLINE NOTIFICATION (Extra Feature)
  function updateOnlineStatus() {
    if (!navigator.onLine) {
      let offlineMsg = document.getElementById('offline-msg');
      if (!offlineMsg) {
        offlineMsg = document.createElement('div');
        offlineMsg.id = 'offline-msg';
        offlineMsg.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #dc3545; color: white; text-align: center; padding: 10px; z-index: 9999;';
        offlineMsg.textContent = '⚠️ You are currently offline. Using cached mode.';
        document.body.appendChild(offlineMsg);
      }
    } else {
      const offlineMsg = document.getElementById('offline-msg');
      if (offlineMsg) offlineMsg.remove();
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
});

// 6. PWA SERVICE WORKER REGISTRATION
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW Registered!', reg.scope))
      .catch(err => console.log('SW Failed:', err));
  });
}

// 7. INSTALL BUTTON LOGIC
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.style.display = 'block';
});

if (installBtn) {
  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result) => {
        deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    }
  });
}

