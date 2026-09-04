<script setup>
import { Trigonometry } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const DOTS = 24;
const SLICE = Trigonometry.twopi / DOTS;

function draw(context, state, theme) {
  const { width, height } = state;
  const centerX = width * 0.24;
  const centerY = height * 0.52;
  const radius = Math.min(height * 0.32, width * 0.18);
  const phase = state.time * 1.2;

  const ring = [];
  for (let i = 0; i <= DOTS; i++)
    ring.push([
      Trigonometry.cosineEquation(radius, i * SLICE, 0, centerX),
      Trigonometry.sineEquation(radius, i * SLICE, 0, centerY),
    ]);
  polyline(context, ring, theme.grid, 1);

  for (let i = 0; i < DOTS; i++) {
    const angle = i * SLICE;
    // the lit dot sweeps around the ring, trailing a fade behind it
    const behind = (phase - angle) % Trigonometry.twopi;
    const trail = behind < 0 ? behind + Trigonometry.twopi : behind;
    const glow = Math.max(0.18, 1 - (trail / Trigonometry.twopi) * 3);
    context.globalAlpha = glow;
    dot(
      context,
      Trigonometry.cosineEquation(radius, angle, 0, centerX),
      Trigonometry.sineEquation(radius, angle, 0, centerY),
      5,
      theme.fresh
    );
  }
  context.globalAlpha = 1;

  const headX = Trigonometry.cosineEquation(radius, phase, 0, centerX);
  const headY = Trigonometry.sineEquation(radius, phase, 0, centerY);

  const plotLeft = centerX + radius + 26;
  const plotRight = width - 16;
  const wave = [];
  for (let x = plotLeft; x <= plotRight; x++) {
    const travelled = (x - plotLeft) * 0.02;
    wave.push([x, Trigonometry.sineEquation(radius, phase - travelled, 0, centerY)]);
  }
  polyline(context, wave, theme.accent, 2.5);

  polyline(context, [[headX, headY], [plotLeft, headY]], theme.warm, 1);
  dot(context, headX, headY, 6, theme.warm, theme.surface);
  dot(context, plotLeft, headY, 5, theme.warm);

  polyline(context, [[plotLeft, centerY], [plotRight, centerY]], theme.guide, 1);
  label(
    context,
    `amplitude ${Math.round(radius)}   period ${phase.toFixed(2)}   y ${Math.round(headY - centerY)}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    The ring and the wave are the same equation. Each dot sits at
    <code>cosineEquation()</code> horizontally and <code>sineEquation()</code> vertically, and the
    blue trace plots that same sine as the period advances — the height of the orange marker is
    shared by both.
  </DemoFrame>
</template>
