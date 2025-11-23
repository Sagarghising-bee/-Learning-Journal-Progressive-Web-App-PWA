document.addEventListener("DOMContentLoaded", () => {
    loadJSONReflections();
    setupExportButton();
});

function loadJSONReflections() {
    const container = document.getElementById('json-reflections-container');
    
    fetch('backend/reflections.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load reflections.json');
            }
            return response.json();
        })
        .then(reflections => {
            displayJSONReflections(reflections);
        })
        .catch(error => {
            console.error('Error loading reflections:', error);
            container.innerHTML = `
                <div class="error-message">
                    <p> Unable to load reflections. Please check the file exists.</p>
                </div>
            `;
        });
}

function displayJSONReflections(reflections) {
    const container = document.getElementById('json-reflections-container');
    
    if (reflections.length === 0) {
        container.innerHTML = '<p class="no-reflections">No reflections yet. Run the Python script to add some! </p>';
        return;
    }
    
    container.innerHTML = reflections.map(reflection => `
        <div class="reflection-item">
            <div class="reflection-header">
                <span class="reflection-date"> ${reflection.date}</span>
            </div>
            <div class="reflection-content">
                ${reflection.content}
            </div>
        </div>
    `).join('');
}

function setupExportButton() {
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = `
        <span class="export-icon"></span>
        <span class="export-text">Export Reflections</span>
        <span class="export-format">(JSON)</span>
    `;
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
            link.download = 'my-learning-reflections.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            
            // Show success animation
            showExportSuccess();
        })
        .catch(error => {
            console.error('Export error:', error);
            alert(' Failed to export reflections.');
        });
}

function showExportSuccess() {
    const exportBtn = document.querySelector('.export-btn');
    const originalHTML = exportBtn.innerHTML;
    
    // Change to success state
    exportBtn.innerHTML = `
        <span class="export-icon"></span>
        <span class="export-text">Exported Successfully!</span>
    `;
    exportBtn.classList.add('export-success');
    
    // Revert after 2 seconds
    setTimeout(() => {
        exportBtn.innerHTML = originalHTML;
        exportBtn.classList.remove('export-success');
    }, 2000);
}