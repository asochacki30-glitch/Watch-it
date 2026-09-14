# Prompts

## Context block (paste this at the start of any AI conversation for a new project)
I am building an interactive Canvas-based system. My files are structured as: index.html, style.css, main.js as the entry point, with src/canvas/ for setup and the animation loop, src/input/ for input tracking, and src/utils/ for math helpers. My constraints are: one input signal only, no straight-line geometry unless the system is specifically about rigidity or breakage, and every visual effect must be tied to a rule, not added for polish.

## Reusable prompt templates

**Canvas draw loop:**
"Write a requestAnimationFrame loop that draws [X] and updates based on [Y], following the HiDPI scaling already set up in setupCanvas.js."

**Input mapping:**
"Map [mouse position / click / scroll] to control [specific parameter], within the range [min–max], using the mapRange helper in src/utils/math.js."

**Debugging:**
"Here is my current code: [paste]. Here is the error I'm seeing: [paste]. What's causing it, and what's the smallest fix?"

## Rule
Every AI response must be followed by my own explanation, in my own words, of what changed and why.