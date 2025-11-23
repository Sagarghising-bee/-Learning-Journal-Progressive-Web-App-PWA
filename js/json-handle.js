document.addEventListener("DOMContentLoaded", () => {
    loadJSONReflections();
    setupExportButton(); // Extra feature
});

function loadJSONReflections() {
    fetch('backend/reflections.json')
        .then(response => response.json())
        .then(reflections => {
            displayJSONReflections(reflections);
        })
        .catch(error => {
            console.error('Error loading reflections:', error);
        });
}

function displayJSONReflections(reflections) {
    const container = document.getElementById('json-reflections-container');
    
    if (reflections.length === 0) {
        container.innerHTML = '<p>No reflections yet. Run the Python script to add some!</p>';
        return;
    }
    
    container.innerHTML = reflections.map(reflection => `
        <div class="reflection-item">
            <p><strong>${reflection.date}</strong>: ${reflection.content}</p>
        </div>
    `).join('');
}

// Extra feature: Export button
function setupExportButton() {
    const exportBtn = document.createElement('button');
    exportBtn.textContent = ' Export Reflections';
    exportBtn.className = 'export-btn';
    exportBtn.addEventListener('click', exportJSON);
    
    const container = document.getElementById('json-reflections-container');
    container.parentNode.insertBefore(exportBtn, container);
}

function exportJSON() {
    fetch('backend/reflections.json')
        .then(response => response.json())
        .then(reflections => {
            const dataStr = JSON.stringify(reflections, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'my-reflections.json';
            link.click();
            
            URL.revokeObjectURL(url);
            alert('Reflections exported successfully!');
        });
}