<script setup>
import { Trigo } from '@1pizzateam/spockjs';
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
    const radians = -Trigo.pi + t * Trigo.twopi;
    sine.push([x, midY - Trigo.sine(radians) * amplitude]);
    cosine.push([x, midY - Trigo.cosine(radians) * amplitude]);
  }
  polyline(context, cosine, theme.fresh, 2);
  polyline(context, sine, theme.accent, 2.5);

  const phase = Trigo.normalizeRadian(state.time * 1.2);
  const markerX = left + ((phase + Trigo.pi) / Trigo.twopi) * (right - left);
  polyline(context, [[markerX, midY - amplitude], [markerX, midY + amplitude]], theme.guide, 1);
  dot(context, markerX, midY - Trigo.sine(phase) * amplitude, 5, theme.accent);
  dot(context, markerX, midY - Trigo.cosine(phase) * amplitude, 5, theme.fresh);

  let readout = `angle ${Trigo.radianToDegree(phase).toFixed(0)}°   sine ${Trigo.sine(phase).toFixed(3)}   cosine ${Trigo.cosine(phase).toFixed(3)}`;
  if (state.pointer) {
    const heading = Trigo.arctan2(midY - state.pointer.y, state.pointer.x - width * 0.5);
    if (heading !== false)
      readout = `arctan2 toward pointer: ${Trigo.radianToDegree(heading).toFixed(0)}°`;
  }
  label(context, readout, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    <code>Trigo.sine()</code> and <code>cosine()</code> read from a lookup table across one
    full turn, with the phase wrapped by <code>normalizeRadian()</code>. Move the pointer to read
    its heading through <code>arctan2()</code>.
  </DemoFrame>
</template>
