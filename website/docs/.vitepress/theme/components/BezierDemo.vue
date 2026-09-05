<script setup>
import { Vec2 } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const p0 = new Vec2();
const p1 = new Vec2();
const p2 = new Vec2();
const scratch = new Vec2();
const tangent = new Vec2();

function draw(context, state, theme) {
  const { width, height } = state;
  p0.setScalar(width * 0.12, height * 0.78);
  p2.setScalar(width * 0.88, height * 0.78);

  if (state.pointer)
    p1.setScalar(state.pointer.x, state.pointer.y);
  else
    p1.setScalar(width * 0.5, height * 0.24 + Math.sin(state.time) * height * 0.1);

  polyline(context, [[p0.x, p0.y], [p1.x, p1.y], [p2.x, p2.y]], theme.guide, 1);

  const curve = [];
  for (let i = 0; i <= 64; i++) {
    scratch.quadraticBezier(p0, p1, p2, i / 64);
    curve.push([scratch.x, scratch.y]);
  }
  polyline(context, curve, theme.accent, 2.5);

  const t = (state.time * 0.3) % 1;
  scratch.quadraticBezier(p0, p1, p2, t);
  tangent.quadraticBezierDerivative(p0, p1, p2, t).normalize().scale(46);
  polyline(
    context,
    [[scratch.x - tangent.x, scratch.y - tangent.y], [scratch.x + tangent.x, scratch.y + tangent.y]],
    theme.warm,
    2
  );

  dot(context, p0.x, p0.y, 5, theme.guide);
  dot(context, p2.x, p2.y, 5, theme.guide);
  dot(context, p1.x, p1.y, 6, theme.fresh);
  dot(context, scratch.x, scratch.y, 6, theme.warm, theme.surface);

  const length = scratch.quadraticBezierLength(p0, p1, p2);
  label(context, `t = ${t.toFixed(2)}   length ≈ ${Math.round(length)} px`, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    Move the pointer to drag the control point. The blue curve is sampled with
    <code>quadraticBezier()</code>, the orange line is <code>quadraticBezierDerivative()</code>
    at the animated <code>t</code>, and the arc length comes from <code>quadraticBezierLength()</code>.
  </DemoFrame>
</template>
