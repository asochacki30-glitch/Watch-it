// This file's job: the animation loop itself — what happens
// every single frame. It reads from input, updates one
// parameter, and draws one visual form. Nothing else.

function startLoop(ctx, width, height, inputState) {
  let pulseTime = 0;

  function frame() {
    ctx.clearRect(0, 0, width, height);

    // Signal: mouse X position
    // Parameter: radius — mapped from the mouse's horizontal
    // position across the full width of the screen
    const radius = mapRange(inputState.mouseX, 0, width, 20, 160);

    // Behavior: the ring pulses faster as radius grows —
    // achieved by speeding up pulseTime's increment based on radius
    const pulseSpeed = mapRange(radius, 20, 160, 0.02, 0.12);
    pulseTime += pulseSpeed;

    const pulseAmount = Math.sin(pulseTime) * 6;
    const finalRadius = radius + pulseAmount;

    ctx.strokeStyle = "#5ec8ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, finalRadius, 0, Math.PI * 2);
    ctx.stroke();

    requestAnimationFrame(frame);
  }

  frame();
}