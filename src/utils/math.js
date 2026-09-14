// This file's job: small, reusable math helpers with no
// dependency on canvas, input, or anything specific to one
// project. Add to this file over time as you need more helpers.

// Takes a value in one range and maps it proportionally into
// another range — useful anytime an input (like mouse position)
// needs to control a very different-scaled parameter (like radius)
function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

// Clamps a value so it never goes below min or above max
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}