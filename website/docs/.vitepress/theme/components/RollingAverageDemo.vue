<script setup>
import { RollingAverage } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const WINDOW_SIZE = 30;
const rolling = new RollingAverage(WINDOW_SIZE);
const rawHistory = [];
const avgHistory = [];
const MAX_POINTS = 160;

function draw(context, state, theme) {
  const { width, height, time } = state;
  const centerY = height * 0.52;
  const amplitude = height * 0.32;

  // Synthesize noisy signal: base wave + high-frequency jitter + sporadic spikes
  const base = centerY + Math.sin(time * 2.2) * (amplitude * 0.65);
  const noise = (Math.sin(time * 19.3) * 0.5 + Math.cos(time * 31.7) * 0.5) * (amplitude * 0.35);
  const spike = Math.sin(time * 4.7) > 0.92 ? (Math.sin(time * 50) * amplitude * 0.4) : 0;
  const rawValue = base + noise + spike;

  const currentAvg = rolling.push(rawValue);

  rawHistory.push(rawValue);
  avgHistory.push(currentAvg);

  if (rawHistory.length > MAX_POINTS) {
    rawHistory.shift();
    avgHistory.shift();
  }

  // Draw background grid lines
  const stepX = width / (MAX_POINTS - 1);
  polyline(context, [[0, centerY], [width, centerY]], theme.grid, 1);
  polyline(context, [[0, centerY - amplitude], [width, centerY - amplitude]], theme.grid, 1);
  polyline(context, [[0, centerY + amplitude], [width, centerY + amplitude]], theme.grid, 1);

  // Map histories to canvas coordinate pairs
  const rawPoints = [];
  const avgPoints = [];
  for (let i = 0; i < rawHistory.length; i++) {
    const x = i * stepX;
    rawPoints.push([x, rawHistory[i]]);
    avgPoints.push([x, avgHistory[i]]);
  }

  // Draw raw noisy signal (warm/orange with lower opacity)
  context.globalAlpha = 0.45;
  polyline(context, rawPoints, theme.warm, 1.5);
  context.globalAlpha = 1;

  // Draw smoothed rolling average signal (fresh/green, thick line)
  polyline(context, avgPoints, theme.fresh, 2.5);

  // Draw current indicator dots at the right edge
  const lastX = (rawHistory.length - 1) * stepX;
  dot(context, lastX, rawValue, 4, theme.warm);
  dot(context, lastX, currentAvg, 6, theme.fresh, theme.surface);

  label(
    context,
    `Raw: ${Math.round(rawValue)}px   RollingAvg(N=${WINDOW_SIZE}): ${Math.round(currentAvg)}px   Samples: ${rolling.count}/${rolling.size}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    The orange curve shows a synthesized jittery input signal; the thick green curve is smoothed
    in real time by <code>RollingAverage(30)</code> in constant <code>O(1)</code> time with zero memory allocations
    (the same algorithm used internally by LoopR's <code>Player.getFPS()</code>).
  </DemoFrame>
</template>
