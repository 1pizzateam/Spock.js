<script setup>
import { Vec2 } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const MARKERS = 12;

const p0 = new Vec2();
const p1 = new Vec2();
const p2 = new Vec2();
const p3 = new Vec2();
const scratch = new Vec2();
const tangent = new Vec2();

function draw(context, state, theme) {
  const { width, height } = state;
  p0.setScalar(width * 0.08, height * 0.72);
  p3.setScalar(width * 0.92, height * 0.72);
  p1.setScalar(width * 0.32, height * 0.2);

  if (state.pointer)
    p2.setScalar(state.pointer.x, state.pointer.y);
  else
    p2.setScalar(width * 0.68, height * 0.28 + Math.sin(state.time * 1.4) * height * 0.16);

  polyline(context, [[p0.x, p0.y], [p1.x, p1.y]], theme.guide, 1);
  polyline(context, [[p2.x, p2.y], [p3.x, p3.y]], theme.guide, 1);

  const curve = [];
  for (let i = 0; i <= 96; i++) {
    scratch.cubicBezier(p0, p1, p2, p3, i / 96);
    curve.push([scratch.x, scratch.y]);
  }
  polyline(context, curve, theme.accent, 2.5);

  const length = scratch.cubicBezierLength(p0, p1, p2, p3);

  // evenly spaced by arc length, so the gaps stay equal where the curve bends
  for (let i = 1; i < MARKERS; i++) {
    const at = scratch.cubicBezierParameterAtLength(p0, p1, p2, p3, (length * i) / MARKERS);
    scratch.cubicBezier(p0, p1, p2, p3, at);
    dot(context, scratch.x, scratch.y, 3, theme.fresh);
  }

  const t = (state.time * 0.25) % 1;
  scratch.cubicBezier(p0, p1, p2, p3, t);
  tangent.cubicBezierDerivative(p0, p1, p2, p3, t).normalize().scale(44);
  polyline(
    context,
    [[scratch.x - tangent.x, scratch.y - tangent.y], [scratch.x + tangent.x, scratch.y + tangent.y]],
    theme.warm,
    2
  );

  dot(context, p0.x, p0.y, 5, theme.guide);
  dot(context, p3.x, p3.y, 5, theme.guide);
  dot(context, p1.x, p1.y, 6, theme.fresh);
  dot(context, p2.x, p2.y, 6, theme.fresh);
  dot(context, scratch.x, scratch.y, 6, theme.warm, theme.surface);

  label(context, `t = ${t.toFixed(2)}   length ≈ ${Math.round(length)} px`, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    Move the pointer to drag the second control point. The curve is sampled with
    <code>cubicBezier()</code>, the orange line is <code>cubicBezierDerivative()</code>, and the
    green dots are spaced by equal arc length using <code>cubicBezierLength()</code> with
    <code>cubicBezierParameterAtLength()</code> — note they stay evenly spread through the bends,
    which plain <code>t</code> steps would not.
  </DemoFrame>
</template>
