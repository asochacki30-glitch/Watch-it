// Entry point — wires the other files together. This file
// should stay small: no drawing logic, no math, just setup calls.

const canvasElement = document.getElementById("engineCanvas");

const { ctx, width, height } = setupCanvas(canvasElement);
const inputState = setupInput(canvasElement);

startLoop(ctx, width, height, inputState);