# flask_app.py
import os
import json
from datetime import datetime
from flask import Flask, request, jsonify, render_template

# Creates the Flask application object.
app = Flask(__name__)

# Define the base directory of the application
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# --- CRITICAL CHANGE: Define DATA_FILE path inside static/backend/ ---
DATA_FILE = os.path.join(BASE_DIR, "static", "backend", "reflections.json")

# --- Utility Functions ---

def load_reflections():
    """Loads all reflections from the JSON file."""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_reflections(reflections):
    """Saves the current list of reflections to the JSON file."""
    # Ensure the directory exists before saving
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(reflections, f, indent=4)

# --- ROUTES ---

# 1. Default/Home Route (GET /)
@app.route("/")
def home_page_default():
    return render_template("index.html")

# --- MULTI-PAGE NAVIGATION ROUTES ---

# Route for index.html (Still needed for explicit link clicks)
@app.route("/index.html")
def home_page_explicit():
    return render_template("index.html")

# Route for journal.html (The journal page)
@app.route("/journal.html")
def journal_page():
    return render_template("journal.html")

# Route for projects.html
@app.route("/projects.html")
def projects_page():
    return render_template("projects.html")

# Route for about.html
@app.route("/about.html")
def about_page():
    return render_template("about.html")

# 2. Get Reflections API (GET /api/reflections)
@app.route("/api/reflections", methods=["GET"])
def get_reflections():
    reflections = load_reflections()
    return jsonify(reflections)

# 3. Add Reflection API (POST /api/reflections)
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

# 4. Delete Reflection API (DELETE /api/reflections/<index>) - EXTRA FEATURE
@app.route("/api/reflections/<int:index>", methods=["DELETE"])
def delete_reflection(index):
    reflections = load_reflections()

    if 0 <= index < len(reflections):
        deleted_reflection = reflections.pop(index)
        save_reflections(reflections)
        return jsonify({"message": "Reflection deleted", "deleted": deleted_reflection}), 200
    else:
        return jsonify({"error": "Reflection not found"}), 404
