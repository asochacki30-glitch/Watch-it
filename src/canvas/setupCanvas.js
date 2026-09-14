// This file's job: create the canvas element's actual pixel setup,
// including HiDPI scaling so it looks sharp on retina screens.
// Nothing in here draws anything — it just prepares the canvas.

function setupCanvas(canvasElement) {
  const ctx = canvasElement.getContext("2d");

  // devicePixelRatio tells us how many real pixels make up one
  // "CSS pixel" on this screen — retina screens report 2 or 3
  const dpr = window.devicePixelRatio || 1;

  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;

  // The canvas's actual pixel buffer is set larger than its
  // displayed size, then scaled back down visually — this is
  // what makes drawings look crisp instead of blurry on retina
  canvasElement.width = cssWidth * dpr;
  canvasElement.height = cssHeight * dpr;
  canvasElement.style.width = cssWidth + "px";
  canvasElement.style.height = cssHeight + "px";

  ctx.scale(dpr, dpr);

  return { ctx, width: cssWidth, height: cssHeight };
}