<script setup>
import { NumArray, Trigo } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const SAMPLES = 28;
const values = new Float64Array(SAMPLES);

function draw(context, state, theme) {
  const { width, height, time } = state;

  // Synthesize fluctuating sample dataset
  for (let i = 0; i < SAMPLES; i++) {
    const wave1 = Trigo.sine(time * 1.5 + i * 0.35) * 25;
    const wave2 = Trigo.cosine(time * 0.8 + i * 0.2) * 15;
    values[i] = Math.max(10, Math.round(50 + wave1 + wave2));
  }

  const minVal = NumArray.min(values);
  const maxVal = NumArray.max(values);
  const avgVal = NumArray.average(values);
  const sumVal = Math.round(NumArray.sum(values));

  const paddingX = 40;
  const paddingBottom = 40;
  const paddingTop = 45;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingTop - paddingBottom;
  const barWidth = plotWidth / SAMPLES;

  // Draw bars
  const peak = Math.max(100, maxVal * 1.15);
  for (let i = 0; i < SAMPLES; i++) {
    const barH = (values[i] / peak) * plotHeight;
    const x = paddingX + i * barWidth;
    const y = height - paddingBottom - barH;

    context.fillStyle = theme.dark ? 'rgba(91, 140, 255, 0.4)' : 'rgba(91, 140, 255, 0.55)';
    context.fillRect(x + 2, y, barWidth - 4, barH);
  }

  // Y positions of statistics
  const yMax = height - paddingBottom - (maxVal / peak) * plotHeight;
  const yAvg = height - paddingBottom - (avgVal / peak) * plotHeight;
  const yMin = height - paddingBottom - (minVal / peak) * plotHeight;

  // Max line
  context.setLineDash([4, 4]);
  polyline(context, [[paddingX, yMax], [width - paddingX, yMax]], theme.warm, 1.5);

  // Avg line
  polyline(context, [[paddingX, yAvg], [width - paddingX, yAvg]], theme.fresh, 2);

  // Min line
  polyline(context, [[paddingX, yMin], [width - paddingX, yMin]], theme.guide, 1.5);
  context.setLineDash([]);

  // Labels beside lines
  context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
  context.fillStyle = theme.warm;
  context.fillText(`max ${maxVal.toFixed(0)}`, width - paddingX + 6, yMax + 3);

  context.fillStyle = theme.fresh;
  context.fillText(`avg ${avgVal.toFixed(1)}`, width - paddingX + 6, yAvg + 3);

  context.fillStyle = theme.guide;
  context.fillText(`min ${minVal.toFixed(0)}`, width - paddingX + 6, yMin + 3);

  label(
    context,
    `min: ${minVal.toFixed(0)}   avg: ${avgVal.toFixed(1)}   max: ${maxVal.toFixed(0)}   sum: ${sumVal}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    Real-time array reductions: <code>NumArray.min()</code>, <code>NumArray.max()</code>, and
    <code>NumArray.average()</code> computed in single loops over active numeric datasets.
  </DemoFrame>
</template>
