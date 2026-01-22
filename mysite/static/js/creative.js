document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawing-board");
  const ctx = canvas.getContext("2d");

  // DOM Elements
  const colorPicker = document.getElementById("color-picker");
  const brushSize = document.getElementById("brush-size");
  const brushBtn = document.getElementById("brush-btn");
  const eraserBtn = document.getElementById("eraser-btn");
  const undoBtn = document.getElementById("undo-btn");
  const clearBtn = document.getElementById("clear-btn");
  const downloadBtn = document.getElementById("download-btn");

  // State
  let isDrawing = false;
  let currentTool = "brush"; // 'brush' or 'eraser'
  let drawColor = "#333333";
  let drawWidth = 3;

  // Undo History
  let restoreArray = [];
  let index = -1;

  // Initialize Canvas Background (White instead of transparent)
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --- SETTINGS FUNCTIONS ---

  function updateSettings() {
    ctx.lineWidth = drawWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round"; // Makes smooth turns

    if (currentTool === "brush") {
      ctx.strokeStyle = drawColor;
    } else if (currentTool === "eraser") {
      ctx.strokeStyle = "white"; // "Erasing" is just painting white
    }
  }

  // --- DRAWING LOGIC ---

  function startPosition(e) {
    isDrawing = true;
    draw(e); // Allow dotting
  }

  function endPosition() {
    if (isDrawing) {
      isDrawing = false;
      ctx.beginPath(); // Reset path so lines don't connect weirdly

      // Save state for UNDO
      if (e.type !== 'mouseout') { // Don't save if we just drifted off
        saveState();
      }
    }
  }

  function draw(e) {
    if (!isDrawing) return;

    e.preventDefault(); // Stop scrolling on touch

    // Get correct coordinates
    let clientX, clientY;
    if (e.type.includes("touch")) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  // --- UNDO SYSTEM ---

  function saveState() {
    // Take a snapshot of the current canvas
    restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    undoBtn.disabled = false;
  }

  function undoLast() {
    if (index <= 0) {
      // Clear to start if at the beginning
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      restoreArray = [];
      index = -1;
      undoBtn.disabled = true;
    } else {
      index -= 1;
      restoreArray.pop(); // Remove the mistake
      ctx.putImageData(restoreArray[index], 0, 0); // Restore previous
    }
  }

  // --- EVENT LISTENERS ---

  // Mouse
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", (e) => {
    isDrawing = false;
    ctx.beginPath();
    saveState();
  });
  canvas.addEventListener("mousemove", draw);

  // Touch
  canvas.addEventListener("touchstart", startPosition, { passive: false });
  canvas.addEventListener("touchend", () => {
    isDrawing = false;
    ctx.beginPath();
    saveState();
  }, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });

  // Tools
  colorPicker.addEventListener("change", (e) => {
    drawColor = e.target.value;
    // Automatically switch back to brush if they pick a color
    if(currentTool === 'eraser') brushBtn.click();
    updateSettings();
  });

  brushSize.addEventListener("input", (e) => {
    drawWidth = e.target.value;
    updateSettings();
  });

  brushBtn.addEventListener("click", () => {
    currentTool = "brush";
    brushBtn.classList.add("active");
    eraserBtn.classList.remove("active");
    updateSettings();
  });

  eraserBtn.addEventListener("click", () => {
    currentTool = "eraser";
    eraserBtn.classList.add("active");
    brushBtn.classList.remove("active");
    updateSettings();
  });

  // Actions
  undoBtn.addEventListener("click", undoLast);

  clearBtn.addEventListener("click", () => {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Refill white

    // Reset History
    restoreArray = [];
    index = -1;
    undoBtn.disabled = true;
  });

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });

  // Initial settings
  updateSettings();
  // Save the blank white canvas as the first undo state?
  // Optional: usually we don't undo to blank unless we drew something.
});
