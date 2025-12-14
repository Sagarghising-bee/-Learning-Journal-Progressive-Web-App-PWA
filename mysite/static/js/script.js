document.addEventListener("DOMContentLoaded", () => {
  // --- NAV & THEME LOGIC (Standard) ---
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
      </nav>`;

    // Active Link Logic
    const currentPath = window.location.pathname;
    navContainer.querySelectorAll("a").forEach(link => {
      if (currentPath.endsWith(link.getAttribute("href")) || (link.getAttribute("href") === "index.html" && currentPath === "/")) {
        link.classList.add("active");
      }
    });
  }

  // Theme Logic
  const toggleBtn = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
  }

  // --- ONLINE/OFFLINE NOTIFICATION (New Feature) ---
  function updateOnlineStatus() {
    if (!navigator.onLine) {
      // Create and show offline banner
      let offlineMsg = document.getElementById('offline-msg');
      if (!offlineMsg) {
        offlineMsg = document.createElement('div');
        offlineMsg.id = 'offline-msg';
        offlineMsg.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #dc3545; color: white; text-align: center; padding: 10px; z-index: 9999;';
        offlineMsg.textContent = '⚠️ You are currently offline. Using cached mode.';
        document.body.appendChild(offlineMsg);
      }
    } else {
      // Remove banner if back online
      const offlineMsg = document.getElementById('offline-msg');
      if (offlineMsg) offlineMsg.remove();
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus(); // Check on load
});

// --- PWA INSTALL LOGIC ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW Registered!', reg.scope))
      .catch(err => console.log('SW Failed:', err));
  });
}

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

