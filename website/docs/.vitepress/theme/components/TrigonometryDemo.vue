<script setup>
import { Trigonometry } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

function draw(context, state, theme) {
  const { width, height } = state;
  const midY = height * 0.52;
  const amplitude = height * 0.3;
  const left = 20;
  const right = width - 20;

  polyline(context, [[left, midY], [right, midY]], theme.grid, 1);

  const sine = [];
  const cosine = [];
  for (let x = left; x <= right; x++) {
    const t = (x - left) / (right - left);
    const radians = -Trigonometry.pi + t * Trigonometry.twopi;
    sine.push([x, midY - Trigonometry.sine(radians) * amplitude]);
    cosine.push([x, midY - Trigonometry.cosine(radians) * amplitude]);
  }
  polyline(context, cosine, theme.fresh, 2);
  polyline(context, sine, theme.accent, 2.5);

  const phase = Trigonometry.normalizeRadian(state.time * 1.2);
  const markerX = left + ((phase + Trigonometry.pi) / Trigonometry.twopi) * (right - left);
  polyline(context, [[markerX, midY - amplitude], [markerX, midY + amplitude]], theme.guide, 1);
  dot(context, markerX, midY - Trigonometry.sine(phase) * amplitude, 5, theme.accent);
  dot(context, markerX, midY - Trigonometry.cosine(phase) * amplitude, 5, theme.fresh);

  let readout = `angle ${Trigonometry.radianToDegree(phase).toFixed(0)}°   sine ${Trigonometry.sine(phase).toFixed(3)}   cosine ${Trigonometry.cosine(phase).toFixed(3)}`;
  if (state.pointer) {
    const heading = Trigonometry.arctan2(midY - state.pointer.y, state.pointer.x - width * 0.5);
    if (heading !== false)
      readout = `arctan2 toward pointer: ${Trigonometry.radianToDegree(heading).toFixed(0)}°`;
  }
  label(context, readout, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    <code>Trigonometry.sine()</code> and <code>cosine()</code> read from a lookup table across one
    full turn, with the phase wrapped by <code>normalizeRadian()</code>. Move the pointer to read
    its heading through <code>arctan2()</code>.
  </DemoFrame>
</template>
