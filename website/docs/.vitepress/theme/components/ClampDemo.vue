<script setup>
import { Circle, Rectangle, Vector2 } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const RADIUS = 22;
const pointer = new Vector2();
const clamped = new Vector2();
let bounds = null;
let inner = null;
let circle = null;
let width = 0;
let height = 0;

function draw(context, state, theme) {
  if (state.width !== width || state.height !== height) {
    width = state.width;
    height = state.height;
    bounds = new Rectangle(width * 0.58, height * 0.58, width * 0.5, height * 0.54);
    inner = new Rectangle(
      bounds.size.x - RADIUS * 2,
      bounds.size.y - RADIUS * 2,
      bounds.position.x,
      bounds.position.y
    );
    circle = new Circle(RADIUS, bounds.position.x, bounds.position.y);
  }
  if (!bounds) return;

  if (state.pointer)
    pointer.setScalar(state.pointer.x, state.pointer.y);
  else
    pointer.setScalar(
      width * 0.5 + Math.cos(state.time * 0.7) * width * 0.42,
      height * 0.5 + Math.sin(state.time * 0.9) * height * 0.4
    );

  clamped.copy(pointer).clamp(inner);
  circle.setPosition(clamped.x, clamped.y);

  const inside = bounds.isIn(pointer);
  const distance = pointer.getDistance(bounds.position);

  bounds.draw(context, '', theme.guide, 1);
  inner.draw(context, '', theme.grid, 1);

  polyline(
    context,
    [[bounds.position.x, bounds.position.y], [pointer.x, pointer.y]],
    theme.guide,
    1
  );
  if (!inside)
    polyline(context, [[pointer.x, pointer.y], [clamped.x, clamped.y]], theme.warm, 1.5);

  dot(context, bounds.position.x, bounds.position.y, 4, theme.guide);
  dot(context, pointer.x, pointer.y, 5, theme.guide);
  circle.draw(context, inside ? theme.fresh : theme.warm, '', 0);

  label(
    context,
    `getDistance() ${Math.round(distance)} px   ${inside ? 'inside' : 'clamped'}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    Move the pointer around the rectangle. The ghost is the unconstrained point; the filled
    circle is that same <code>Vector2</code> after <code>clamp()</code> against the inner box,
    so the disc never crosses the outer edge. The caption is
    <code>getDistance()</code> from the pointer to the rectangle centre.
  </DemoFrame>
</template>
