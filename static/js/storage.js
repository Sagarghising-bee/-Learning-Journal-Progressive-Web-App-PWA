document.addEventListener("DOMContentLoaded", () => {
  const entryForm = document.getElementById("entry-form");
  const entryText = document.getElementById("entry-text");
  const entryList = document.getElementById("entry-list");

  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    entryList.innerHTML = "";
    entries.forEach((entry, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <p>${entry}</p>
        <button class="delete-entry" data-index="${index}">🗑️ Delete</button>
      `;
      entryList.appendChild(li);
    });
  }

  if (entryForm) {
    entryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = entryText.value.trim();
      if (text) {
        const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
        entries.push(text);
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        entryText.value = "";
        loadEntries();
      }
    });
  }

  if (entryList) {
    entryList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-entry")) {
        const index = e.target.getAttribute("data-index");
        const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
        entries.splice(index, 1);
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        loadEntries();
      }
    });
  }

  loadEntries();
});
