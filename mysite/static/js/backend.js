// backend.js

document.addEventListener("DOMContentLoaded", () => {
    // Start by loading the reflections from Flask
    loadFlaskReflections();

    // Setup listener for the POST form submission
    setupServerFormListener();

    // Setup listener for the dynamically created DELETE buttons
    document.getElementById('json-reflections-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-flask-entry')) {
            const index = e.target.getAttribute('data-index');
            // Confirmation box before delete
            if (confirm("Are you sure you want to delete this server reflection?")) {
                deleteReflection(index);
            }
        }
    });
});

// --- GET: Load Reflections from Flask ---
function loadFlaskReflections() {
    const container = document.getElementById('json-reflections-container');

    fetch('/api/reflections') // Connects to the Flask GET route
        .then(response => {
            if (!response.ok) {
                // Throw error if Flask returns non-200 status
                throw new Error('Failed to load reflections from Flask API.');
            }
            return response.json();
        })
        .then(reflections => {
            displayFlaskReflections(reflections);
        })
        .catch(error => {
            console.error('Error loading reflections:', error);
            container.innerHTML = `<div class="error-message"><p> ⚠️ Unable to load reflections from Flask. Check console for details. </p></div>`;
        });
}

// --- Display Reflections (Includes Delete Button) ---
function displayFlaskReflections(reflections) {
    const container = document.getElementById('json-reflections-container');

    if (reflections.length === 0) {
        container.innerHTML = '<p class="no-reflections">No server reflections yet. Use the form above to add one! </p>';
        return;
    }

    // Map over reflections, ensuring a data-index is added for the delete function
    container.innerHTML = reflections.map((reflection, index) => `
        <div class="reflection-item">
            <div class="reflection-header">
                <span class="reflection-date"> ${reflection.date}</span>
                <button class="delete-flask-entry" data-index="${index}" style="margin-left: auto;">❌ Delete</button>
            </div>
            <div class="reflection-content">
                ${reflection.content}
            </div>
        </div>
    `).join('');
}

// --- POST: Submit New Reflection to Flask ---
function setupServerFormListener() {
    const serverEntryForm = document.getElementById("server-entry-form");

    if (serverEntryForm) {
        serverEntryForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const reflectionText = document.getElementById("reflection-text").value.trim();

            if (reflectionText) {
                await postReflection(reflectionText);
            }
        });
    }
}

async function postReflection(reflectionText) {
    const entryData = { reflection: reflectionText };

    try {
        const response = await fetch("/api/reflections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entryData)
        });

        if (response.ok) {
            alert("Reflection saved to Flask server!");
            document.getElementById("reflection-text").value = "";
            loadFlaskReflections(); // Refresh the list
        } else {
            // Handle server-side errors
            const errorText = await response.text();
            alert(`Failed to save reflection. Server response: ${errorText}`);
        }
    } catch (error) {
        console.error("Network error during reflection post:", error);
        alert("A network error occurred. Could not connect to the Flask server.");
    }
}

// --- DELETE: Delete Reflection from Flask ---
async function deleteReflection(index) {
    try {
        // Send a DELETE request to the Flask API endpoint, including the index in the URL
        const response = await fetch(`/api/reflections/${index}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert(`Reflection deleted successfully!`);
            loadFlaskReflections(); // Refresh the list
        } else {
            const errorData = await response.json();
            alert(`Failed to delete reflection: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Network error during reflection delete:", error);
    }
}
