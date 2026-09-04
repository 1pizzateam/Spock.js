<script setup>
import { Random } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { label } from '../canvas.js';

const BATCH = 90;
const LIMIT = 9000;

let generator = Random.create(20260904);
let flat = [];
let clustered = [];

function reset() {
  generator = Random.create(20260904);
  flat = [];
  clustered = [];
}

function scatter(context, points, x, y, width, height, theme, title) {
  context.fillStyle = theme.grid;
  context.fillRect(x, y, width, height);
  for (const point of points) {
    context.fillStyle = point[2] ? theme.accent : theme.fresh;
    context.fillRect(x + point[0] * width, y + point[1] * height, 1.5, 1.5);
  }
  label(context, title, theme.text, x, y - 6);
}

function draw(context, state, theme) {
  const { width, height } = state;

  if (flat.length >= LIMIT) reset();
  for (let i = 0; i < BATCH; i++) {
    // pick() decides the tint, so the two colours interleave without bias
    flat.push([generator.float(0, 1), generator.float(0, 1), generator.pick(0, 1)]);
    clustered.push([
      generator.distribution(0, 1, 5),
      generator.distribution(0, 1, 5),
      generator.pick(0, 1),
    ]);
  }

  const panelWidth = (width - 60) / 2;
  const panelHeight = height - 60;
  scatter(context, flat, 20, 34, panelWidth, panelHeight, theme, 'float()');
  scatter(context, clustered, 40 + panelWidth, 34, panelWidth, panelHeight, theme, 'distribution(…, 5)');
  label(context, `${flat.length} points per panel`, theme.text, 20, height - 8);
}
</script>

<template>
  <DemoFrame :draw="draw">
    The same generator fills both panels in two dimensions. <code>float()</code> spreads points
    evenly across the square, while <code>distribution()</code> averages five samples per axis and
    pulls them into a soft cloud around the centre. <code>pick()</code> chooses each point's colour.
  </DemoFrame>
</template>
