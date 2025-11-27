# 👑 My Learning Journal PWA

A Progressive Web Application (PWA) developed as a learning journal for the **FGCT6021 Mobile Application Development** unit. This project demonstrates proficiency in frontend interactivity (DOM, various APIs) and full-stack integration using Python Flask.

---

## 🚀 Live Demonstration

The application is deployed live, serving all static frontend assets and managing dynamic data storage via a Python backend.

| Deployment | URL |
| :--- | :--- |
| **Live PWA** | `https://ghisingsagar.pythonanywhere.com/` |
| **GitHub Repository** | `https://github.com/Sagarghising-bee/-Learning-Journal-Progressive-Web-App-PWA` |

---

## ✨ Key Features & Technical Progression

This journal was developed across several weeks, showcasing incremental learning and feature additions.

### Frontend (HTML, CSS, JavaScript)
* **DOM Manipulation:** Reusable navigation injection, live date display, and collapsible journal entries.
* **APIs:** Implemented `localStorage` for persistent theme preference and drafts, and the Clipboard API for easy content copying.
* **Responsive Design:** Mobile-first approach using Flexbox ensures compatibility across all devices.

### Backend & Data Persistence (Flask)
* **Python Flask Backend:** A complete server-side application manages all dynamic data requests.
* **Full CRUD:** Implemented **Create**, **Read** (GET), and **Delete** (DELETE) operations on reflections.
* **Server-Side Storage:** Reflections are stored persistently in a `reflections.json` file on the PythonAnywhere server.
* **Static Asset Handling:** Uses Flask's `url_for()` to correctly serve CSS and JS files from the `/static` directory.

---

## 📂 Project Structure

The structure adheres to Flask conventions, ensuring all static assets and templates are correctly linked and served by the Python backend.
```
/mysite/
├── flask_app.py                      # (Python Backend Logic)
├── /templates/
│   ├── index.html                    # (Home Page - New Root)
│   ├── journal.html                  # (Journal Page - Flask API Integration)
│   ├── projects.html                 # (Projects Page)
│   └── about.html                    # (About Page)
└── /static/
    ├── /css/
    │   └── style.css                 # (Stylesheets - UPDATED for DELETE button)
    └── /js/
        ├── script.js                 # (Main DOM/Nav/Theme Logic - UPDATED for Flask routing)
        ├── storage.js                # (Local Storage API)
        ├── browser.js                # (Clipboard API)
        ├── thirdparty.js             # (YouTube Embed)
        └── backend.js                # (Flask API Logic - GET, POST, DELETE)

```
***
Made with ❤️ by Sagar Ghising
