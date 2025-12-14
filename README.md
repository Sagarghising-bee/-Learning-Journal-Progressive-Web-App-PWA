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

### 📱 Progressive Web App (PWA) - **New (Week 7)**
* **Installable App:** Configured `manifest.json` to allow users to add the app to their home screen with custom icons and theme colors.
* **Offline Capability:** Implemented a **Service Worker (`sw.js`)** to cache the "App Shell" (HTML, CSS, JS), ensuring the app loads instantly even without an internet connection.
* **Network Detection (Extra Feature):** Added a real-time JavaScript notification system that detects network loss and warns the user when they are offline.
* **Root Scope Service Worker:** Configured Flask to serve `sw.js` from the root URL (`/sw.js`) to control the entire application scope.

### 🎨 Frontend (HTML, CSS, JavaScript)
* **DOM Manipulation:** Reusable navigation injection, live date display, and collapsible journal entries.
* **APIs:** Implemented `localStorage` for persistent theme preference and drafts, and the Clipboard API for easy content copying.
* **Responsive Design:** Mobile-first approach using Flexbox ensures compatibility across all devices.

### 🐍 Backend & Data Persistence (Flask)
* **Python Flask Backend:** A complete server-side application manages all dynamic data requests.
* **Full CRUD:** Implemented **Create**, **Read** (GET), and **Delete** (DELETE) operations on reflections.
* **Server-Side Storage:** Reflections are stored persistently in a `reflections.json` file on the PythonAnywhere server.
* **Static Asset Handling:** Uses Flask's `url_for()` and `send_from_directory()` to correctly serve CSS, JS, and PWA files.

---

## 📂 Project Structure

The structure adheres to Flask conventions, ensuring all static assets, templates, and PWA files are correctly linked and served.
```
/mysite/
├── flask_app.py                      # (Backend: Routes for HTML, API, & PWA files)
├── /templates/
│   ├── index.html                    # (Home Page - Install Button)
│   ├── journal.html                  # (Journal Page - Flask API Integration)
│   ├── projects.html                 # (Projects Page)
│   └── about.html                    # (About Page)
└── /static/
├── manifest.json                 # (PWA Manifest - App Metadata)
├── /images/
│   ├── icon-192.png              # (App Icon - Small)
│   └── icon-512.png              # (App Icon - Large)
├── /backend/
│   └── reflections.json          # (JSON Database)
├── /css/
│   └── style.css                 # (Stylesheets)
└── /js/
├── script.js                 # (Main Logic: Nav, Theme, Install Prompt, Network Status)
├── sw.js                     # (Service Worker: Caching & Offline Strategy)
├── backend.js                # (Flask API Logic)
├── storage.js                # (Local Storage)
├── browser.js                # (Clipboard API)
└── thirdparty.js             # (YouTube Embed)
```
---

Made with ❤️ by Sagar Ghising
