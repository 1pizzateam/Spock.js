<script setup>
import { Utils, Vec2 } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const start = new Vec2();
const end = new Vec2();
const point = new Vec2();

function draw(context, state, theme) {
  const { width, height } = state;
  start.setScalar(width * 0.12, height * 0.7);
  end.setScalar(width * 0.88, height * 0.34);

  const cycle = (state.time * 0.25) % 1;
  const t = cycle < 0.5 ? cycle * 2 : 2 - cycle * 2;

  point.lerp(start, end, t);
  const radius = Utils.lerp(8, 30, t);
  const alpha = Utils.lerp(0.25, 1, t);

  polyline(context, [[start.x, start.y], [end.x, end.y]], theme.guide, 1);
  dot(context, start.x, start.y, 5, theme.guide);
  dot(context, end.x, end.y, 5, theme.guide);

  context.globalAlpha = alpha;
  dot(context, point.x, point.y, radius, theme.accent);
  context.globalAlpha = 1;

  const barY = height - 24;
  polyline(context, [[width * 0.12, barY], [width * 0.88, barY]], theme.grid, 6);
  polyline(
    context,
    [[width * 0.12, barY], [Utils.lerp(width * 0.12, width * 0.88, t), barY]],
    theme.fresh,
    6
  );

  label(context, `t = ${t.toFixed(2)}   radius = ${radius.toFixed(1)}`, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    <code>Vec2.lerp()</code> moves the disc between the two anchors while
    <code>Utils.lerp()</code> interpolates its radius and opacity from the same <code>t</code>.
  </DemoFrame>
</template>
