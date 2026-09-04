<script setup>
import { Utils } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const CELSIUS_MIN = -20;
const CELSIUS_MAX = 40;
const STEP = 2.5;

function draw(context, state, theme) {
  const { width, height } = state;
  const left = 30;
  const right = width - 30;
  const trackY = height * 0.42;

  const pointerX = state.pointer
    ? Utils.clamp(state.pointer.x, left, right)
    : Utils.map(Math.sin(state.time * 0.9), -1, 1, left, right);

  const celsius = Utils.map(pointerX, left, right, CELSIUS_MIN, CELSIUS_MAX);
  const ratio = Utils.normalize(celsius, CELSIUS_MIN, CELSIUS_MAX);
  const snapped = Utils.roundToNearest(celsius, STEP);
  const snappedX = Utils.map(snapped, CELSIUS_MIN, CELSIUS_MAX, left, right);

  polyline(context, [[left, trackY], [right, trackY]], theme.grid, 3);
  for (let value = CELSIUS_MIN; value <= CELSIUS_MAX; value += STEP) {
    const x = Utils.map(value, CELSIUS_MIN, CELSIUS_MAX, left, right);
    polyline(context, [[x, trackY - 6], [x, trackY + 6]], theme.guide, 1);
  }

  polyline(context, [[left, trackY], [pointerX, trackY]], theme.accent, 3);
  polyline(context, [[snappedX, trackY - 16], [snappedX, trackY + 16]], theme.fresh, 2);
  dot(context, pointerX, trackY, 7, theme.warm, theme.surface);

  const barY = height - 26;
  const barWidth = (right - left) * ratio;
  context.fillStyle = theme.grid;
  context.fillRect(left, barY, right - left, 8);
  context.fillStyle = theme.accent;
  context.fillRect(left, barY, barWidth, 8);

  label(context, `map()          ${celsius.toFixed(1)} °C`, theme.text, left, trackY - 46);
  label(context, `roundToNearest()  ${snapped.toFixed(1)} °C`, theme.fresh, left, trackY - 30);
  label(context, `normalize()      ${ratio.toFixed(3)}`, theme.text, left, barY - 10);
}
</script>

<template>
  <DemoFrame :draw="draw">
    Move the pointer along the track. <code>map()</code> converts the pixel position into degrees
    Celsius, <code>roundToNearest()</code> snaps that reading to the nearest 2.5° tick (green), and
    <code>normalize()</code> reduces it to the 0–1 ratio driving the bar underneath.
  </DemoFrame>
</template>
