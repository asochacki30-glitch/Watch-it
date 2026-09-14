// This file's job: track one input signal (mouse X position)
// and expose it as a simple, always-current value. Nothing in
// here knows anything about drawing or canvas — just input.

function setupInput(canvasElement) {
  const state = {
    mouseX: window.innerWidth / 2
  };

  canvasElement.addEventListener("mousemove", (event) => {
    state.mouseX = event.clientX;
  });

  return state;
}