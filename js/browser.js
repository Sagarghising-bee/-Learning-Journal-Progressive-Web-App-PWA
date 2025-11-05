document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-entry");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const entryText = btn.previousElementSibling.textContent;
      navigator.clipboard.writeText(entryText).then(() => {
        alert("📋 Entry copied to clipboard!");
      }).catch(err => {
        console.error("Clipboard error:", err);
      });
    });
  });
});
