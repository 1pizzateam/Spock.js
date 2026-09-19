<script setup>
import { Time } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const TRACKS = [
  { fps: 60, colorKey: 'fresh' },
  { fps: 30, colorKey: 'accent' },
  { fps: 12, colorKey: 'warm' },
];

function draw(context, state, theme) {
  const { width, height, time } = state;

  const paddingX = 40;
  const trackWidth = width - paddingX * 2 - 120;
  const startX = paddingX + 110;
  const loopDuration = 3.0; // 3 seconds per lap
  const lapTime = (time % loopDuration);

  const trackYStep = (height - 60) / (TRACKS.length + 1);

  for (let i = 0; i < TRACKS.length; i++) {
    const { fps, colorKey } = TRACKS[i];
    const color = theme[colorKey];
    const budgetMs = Time.fpsToMillisec(fps);
    const budgetSec = Time.millisecToSec(budgetMs);
    const y = 50 + (i + 0.6) * trackYStep;

    // Quantize lap time to track fps
    const quantizedLapTime = Math.floor(lapTime / budgetSec) * budgetSec;
    const progress = quantizedLapTime / loopDuration;
    const runnerX = startX + progress * trackWidth;

    // Track baseline
    polyline(context, [[startX, y], [startX + trackWidth, y]], theme.grid, 4);

    // Frame tick intervals
    const totalTicks = Math.floor(loopDuration / budgetSec);
    const maxTicksToDraw = Math.min(totalTicks, 30);
    const tickStep = totalTicks > 30 ? Math.ceil(totalTicks / 30) : 1;
    for (let t = 0; t <= totalTicks; t += tickStep) {
      const tx = startX + (t / totalTicks) * trackWidth;
      polyline(context, [[tx, y - 5], [tx, y + 5]], theme.guide, 1);
    }

    // Active progress trail
    polyline(context, [[startX, y], [runnerX, y]], color, 4);

    // Runner head
    dot(context, runnerX, y, 7, color, theme.surface);

    // Track label
    context.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    context.fillStyle = color;
    context.fillText(`${fps} FPS`, paddingX, y + 4);
    context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
    context.fillStyle = theme.guide;
    context.fillText(`${budgetMs.toFixed(1)} ms`, paddingX + 55, y + 4);
  }

  const liveFps = Math.round(state.fps || 0);
  const liveDelta = ((state.delta || 0) * 1000).toFixed(1);
  const liveInfo = liveFps > 0 ? `   [LoopR: ${liveFps} FPS / ${liveDelta}ms]` : '';

  label(
    context,
    `Time.fpsToMillisec()   60 FPS: 16.7ms   30 FPS: 33.3ms   12 FPS: 83.3ms${liveInfo}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    Visualizing frame budgets and discrete sampling intervals calculated with
    <code>Time.fpsToMillisec()</code> and <code>Time.millisecToSec()</code> across 60, 30, and 12 FPS.
  </DemoFrame>
</template>
