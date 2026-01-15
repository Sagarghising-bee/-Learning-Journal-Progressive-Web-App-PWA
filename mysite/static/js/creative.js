document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawing-board");
  const ctx = canvas.getContext("2d");
  const clearBtn = document.getElementById("clear-btn");
  const downloadBtn = document.getElementById("download-btn");

  let isDrawing = false;

  // Set default stroke styles
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#333";

  // --- MOUSE EVENTS (Desktop) ---
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener("mouseup", () => { isDrawing = false; });
  canvas.addEventListener("mouseout", () => { isDrawing = false; });

  // --- TOUCH EVENTS (Mobile) ---
  // We need to calculate touch position relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Stop scrolling
    isDrawing = true;
    const pos = getTouchPos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Stop scrolling
    if (isDrawing) {
      const pos = getTouchPos(canvas, e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  }, { passive: false });

  canvas.addEventListener("touchend", () => { isDrawing = false; });

  // --- BUTTONS ---

  // 1. Clear Canvas
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // 2. Download as Image
  downloadBtn.addEventListener("click", () => {
    // Convert canvas to data URL
    const imageURI = canvas.toDataURL("image/png");

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.download = `my-sketch-${Date.now()}.png`;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
