import os
import json
from datetime import datetime
from flask import Flask, request, jsonify, render_template, send_from_directory

app = Flask(__name__)

# Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "static", "backend", "reflections.json")

# --- UTILITY FUNCTIONS ---
def load_reflections():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_reflections(reflections):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(reflections, f, indent=4)

# --- PWA ROUTES (No offline.html route) ---

@app.route('/manifest.json')
def manifest():
    return send_from_directory(app.static_folder, 'manifest.json')

@app.route('/sw.js')
def service_worker():
    # Serves SW from /static/js/sw.js but exposed at /sw.js
    js_folder = os.path.join(app.static_folder, 'js')
    return send_from_directory(js_folder, 'sw.js')

# --- PAGE ROUTES ---

@app.route("/")
@app.route("/index.html")
def home_page():
    return render_template("index.html")

@app.route("/journal.html")
def journal_page():
    return render_template("journal.html")

@app.route("/projects.html")
def projects_page():
    return render_template("projects.html")

@app.route("/about.html")
def about_page():
    return render_template("about.html")

@app.route("/creative.html")
def creative_page():
    return render_template("creative.html")


# --- API ROUTES ---

@app.route("/api/reflections", methods=["GET"])
def get_reflections():
    return jsonify(load_reflections())

@app.route("/api/reflections", methods=["POST"])
def add_reflection():
    data = request.get_json()
    new_reflection = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "content": data.get("reflection", "No content provided")
    }
    reflections = load_reflections()
    reflections.append(new_reflection)
    save_reflections(reflections)
    return jsonify(new_reflection), 201

@app.route("/api/reflections/<int:index>", methods=["DELETE"])
def delete_reflection(index):
    reflections = load_reflections()
    if 0 <= index < len(reflections):
        deleted = reflections.pop(index)
        save_reflections(reflections)
        return jsonify({"message": "Deleted", "deleted": deleted}), 200
    return jsonify({"error": "Not found"}), 404
    
