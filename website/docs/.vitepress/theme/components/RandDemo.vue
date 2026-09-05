<script setup>
import { Random } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { label } from '../canvas.js';

const BUCKETS = 32;
const BATCH = 24;
const LIMIT = 6000;

let generator = Random.create(1337);
let uniform = new Array(BUCKETS).fill(0);
let bell = new Array(BUCKETS).fill(0);
let drawn = 0;

function bucket(value) {
  return Math.min(BUCKETS - 1, Math.max(0, Math.floor(value * BUCKETS)));
}

function reset() {
  generator = Random.create(1337);
  uniform = new Array(BUCKETS).fill(0);
  bell = new Array(BUCKETS).fill(0);
  drawn = 0;
}

function histogram(context, values, x, y, width, height, color, theme, title) {
  const peak = Math.max(1, ...values);
  const barWidth = width / values.length;
  for (let i = 0; i < values.length; i++) {
    const bar = (values[i] / peak) * height;
    context.fillStyle = color;
    context.fillRect(x + i * barWidth, y + height - bar, barWidth - 1, bar);
  }
  context.fillStyle = theme.grid;
  context.fillRect(x, y + height, width, 1);
  label(context, title, theme.text, x, y - 6);
}

function draw(context, state, theme) {
  const { width, height } = state;

  if (drawn >= LIMIT) reset();
  for (let i = 0; i < BATCH; i++) {
    uniform[bucket(generator.float(0, 1))] += 1;
    bell[bucket(generator.distribution(0, 1, 5))] += 1;
    drawn += 1;
  }

  const columnWidth = (width - 60) / 2;
  const plotHeight = height - 60;
  histogram(context, uniform, 20, 34, columnWidth, plotHeight, theme.accent, theme, 'float()');
  histogram(context, bell, 40 + columnWidth, 34, columnWidth, plotHeight, theme.fresh, theme, 'distribution(…, 5)');
  label(context, `${drawn} samples from seed 1337`, theme.text, 20, height - 8);
}
</script>

<template>
  <DemoFrame :draw="draw">
    Both histograms come from one seeded generator via <code>Random.create(1337)</code>, so the
    shape is identical on every reload. <code>float()</code> is flat;
    <code>distribution()</code> averages five samples and converges toward the middle.
  </DemoFrame>
</template>
