document.addEventListener("DOMContentLoaded", () => {
  // Inject reusable nav
  const navHTML = `
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
  const navContainer = document.getElementById("nav-container");
  if (navContainer) {
    navContainer.innerHTML = navHTML;

    // --- START: Active Link Logic Update ---
    // Get the base path of the current page's URL
    const currentPath = window.location.pathname;

    const links = navContainer.querySelectorAll(".nav-links a");
    links.forEach(link => {
      const linkHref = link.getAttribute("href");

      // Check if the current URL path ends with the link's href (safer for Flask routing)
      if (currentPath.endsWith(linkHref)) {
        link.classList.add("active");
      }

      // Special case: Highlight 'index.html' if the path is the root (/)
      if (linkHref === "index.html" && currentPath.endsWith("/")) {
        link.classList.add("active");
      }
    });
    // --- END: Active Link Logic Update ---
  }

  // Live date
  const dateEl = document.getElementById("live-date");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }

  // Collapsible entries
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.classList.toggle("collapsed");
      btn.textContent = content.classList.contains("collapsed") ? "Show Entry" : "Hide Entry";
    });
  });

  // Theme toggle
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
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
});
