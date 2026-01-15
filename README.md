# 👑 My Learning Journal PWA

A Progressive Web Application (PWA) developed as a learning journal for the **FGCT6021 Mobile Application Development** unit. This project demonstrates proficiency in frontend interactivity, full-stack integration using Python Flask, and modern PWA capabilities like offline access and installability.

---

## 🚀 Live Demonstration

The application is deployed live, serving all static frontend assets and managing dynamic data storage via a Python backend.

| Deployment | URL |
| :--- | :--- |
| **Live PWA** | `https://ghisingsagar.pythonanywhere.com/` |
| **GitHub Repository** | `https://github.com/Sagarghising-bee/-Learning-Journal-Progressive-Web-App-PWA` |

---

## ✨ Key Features & Technical Progression

This journal was developed across several weeks, showcasing incremental learning from basic HTML to a full-stack PWA.

### 🎨 Week 8: Mini Project (Creative Zone & Dashboard)
* **Creative Zone:** A dedicated drawing interface powered by the HTML5 Canvas API, allowing users to sketch, clear, and download visual reflections as PNG files.
* **Native Dashboard UI:** Completely redesigned the Homepage (`index.html`) using CSS Grid to feature large, touch-friendly navigation cards that mimic a native app home screen.
* **Touch Event Support:** Implemented complex JavaScript logic to handle `touchstart` and `touchmove` events, ensuring smooth drawing on mobile devices without page scrolling.
* **Dynamic Greeting:** Added a time-aware greeting system ("Good Morning/Evening") for a personalized user experience.

### 📱 Progressive Web App (PWA) - (Week 7)
* **Installable App:** Configured `manifest.json` to allow users to add the app to their home screen with custom icons and theme colors.
* **Offline Capability:** Implemented a **Service Worker (`sw.js`)** to cache the "App Shell" (HTML, CSS, JS), ensuring the app loads instantly even without an internet connection.
* **Network Detection:** Added a real-time JavaScript notification system that detects network loss and warns the user when they are offline.
* **Root Scope Service Worker:** Configured Flask to serve `sw.js` from the root URL (`/sw.js`) to control the entire application scope.

### 🐍 Backend & Data Persistence (Flask)
* **Python Flask Backend:** A complete server-side application manages all dynamic data requests.
* **Full CRUD:** Implemented **Create**, **Read** (GET), and **Delete** (DELETE) operations on reflections.
* **Server-Side Storage:** Reflections are stored persistently in a `reflections.json` file on the PythonAnywhere server.
* **Static Asset Handling:** Uses Flask's `url_for()` and `send_from_directory()` to correctly serve CSS, JS, and PWA files.

### 🎨 Frontend Essentials
* **DOM Manipulation:** Reusable navigation injection, live date display, and collapsible journal entries.
* **APIs:** Implemented `localStorage` for persistent theme preference and drafts, and the Clipboard API for easy content copying.
* **Responsive Design:** Mobile-first approach using Flexbox ensures compatibility across all devices.

---

## 📂 Project Structure

The structure adheres to Flask conventions, ensuring all static assets, templates, and PWA files are correctly linked and served.

```

/mysite/
├── flask_app.py                      # (Backend: Routes for HTML, API, & PWA files)
├── /templates/
│   ├── index.html                    # (Home Page - Dashboard Grid UI)
│   ├── journal.html                  # (Journal Page - Flask API Integration)
│   ├── projects.html                 # (Projects Page)
│   ├── about.html                    # (About Page - Profile Card)
│   └── creative.html                 # (Creative Zone - Canvas API)
└── /static/
├── manifest.json                 # (PWA Manifest - App Metadata)
├── /images/
│   ├── icon-192.png              # (App Icon - Small)
│   └── icon-512.png              # (App Icon - Large)
├── /backend/
│   └── reflections.json          # (JSON Database)
├── /css/
│   └── style.css                 # (Stylesheets including Dashboard Grid)
└── /js/
├── script.js                 # (Main Logic: Nav, Theme, Install Prompt)
├── sw.js                     # (Service Worker: Caching & Offline Strategy)
├── backend.js                # (Flask API Logic)
├── storage.js                # (Local Storage)
├── browser.js                # (Clipboard API)
├── creative.js               # (Canvas API Drawing Logic)
└── thirdparty.js             # (YouTube Embed)

```

---

**Made with ❤️ by Sagar Ghising**
```
