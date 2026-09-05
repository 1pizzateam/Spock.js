<script setup>
import { Mat3, Trigo, Vec2 } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const matrix = new Mat3();
const translation = new Vec2();
const scaling = new Vec2();
const corners = [[-40, -40], [40, -40], [40, 40], [-40, 40]];

/** Apply the row-major affine matrix to a local point. */
function apply(m, x, y) {
  return [m[0] * x + m[3] * y + m[6], m[1] * x + m[4] * y + m[7]];
}

function draw(context, state, theme) {
  const { width, height } = state;
  const angle = state.time * 0.6;
  const scale = 1 + Math.sin(state.time * 0.9) * 0.35;

  translation.setScalar(width * 0.5, height * 0.5);
  scaling.setScalar(scale, scale);

  const m = matrix
    .identity()
    .translate(translation)
    .rotate(angle)
    .scale(scaling)
    .toArray();

  const outline = corners.map(([x, y]) => apply(m, x, y));
  outline.push(outline[0]);
  polyline(context, outline, theme.accent, 2.5);

  const origin = apply(m, 0, 0);
  polyline(context, [origin, apply(m, 60, 0)], theme.warm, 2);
  polyline(context, [origin, apply(m, 0, 60)], theme.fresh, 2);
  dot(context, origin[0], origin[1], 4, theme.text);

  label(
    context,
    `rotate ${Math.round(Trigo.radianToDegree(angle) % 360)}°   scale ${scale.toFixed(2)}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    One <code>Mat3</code> composed each frame with <code>translate()</code>,
    <code>rotate()</code>, and <code>scale()</code>. The orange and green arms are the
    transformed local X and Y axes read from <code>toArray()</code>.
  </DemoFrame>
</template>
