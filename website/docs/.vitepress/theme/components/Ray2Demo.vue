<script setup>
import { Circ, Rect, Ray2, Vec2 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const origin = new Vec2();
const aim = new Vec2();
const hitPoint = new Vec2();
const normalTip = new Vec2();
const ray = new Ray2();
const hit = { fraction: 0, point: new Vec2(), normal: new Vec2() };
const best = { fraction: 0, point: new Vec2(), normal: new Vec2() };

let width = 0;
let height = 0;
let shapes = [];

function layout() {
  shapes = [
    new Rect(new Vec2(60, 120), new Vec2(width * 0.55, height * 0.3)),
    new Rect(new Vec2(110, 40), new Vec2(width * 0.72, height * 0.74)),
    new Circ(42, new Vec2(width * 0.42, height * 0.7)),
  ];
}

function draw(context, state, theme) {
  if (state.width !== width || state.height !== height) {
    width = state.width;
    height = state.height;
    layout();
  }

  origin.setScalar(width * 0.12, height * 0.5);
  if (state.pointer)
    aim.copy(state.pointer);
  else
    aim.setScalar(width * 0.75, height * 0.5 + Math.sin(state.time * 0.8) * height * 0.42);

  const maxDistance = width;
  ray.set(origin, aim.clone().subtract(origin));

  // keep the nearest hit across every shape
  let found = false;
  for (const shape of shapes) {
    const result = shape instanceof Rect
      ? ray.intersectRect(shape, maxDistance, hit)
      : ray.intersectCirc(shape, maxDistance, hit);
    if (result && (!found || result.fraction < best.fraction)) {
      best.fraction = result.fraction;
      best.point.copy(result.point);
      best.normal.copy(result.normal);
      found = true;
    }
  }

  context.lineWidth = 2;
  for (const shape of shapes) {
    context.fillStyle = theme.dark ? 'rgba(91, 140, 255, 0.10)' : 'rgba(91, 140, 255, 0.14)';
    context.strokeStyle = theme.accent;
    context.beginPath();
    if (shape instanceof Rect)
      context.rect(shape.topLeftCorner.x, shape.topLeftCorner.y, shape.size.x, shape.size.y);
    else
      context.arc(shape.position.x, shape.position.y, shape.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  const end = found ? best.point : ray.at(maxDistance, hitPoint);
  polyline(context, [[origin.x, origin.y], [end.x, end.y]], found ? theme.fresh : theme.guide, 2);
  dot(context, origin.x, origin.y, 5, theme.text);

  if (found) {
    normalTip.copy(best.point).addScaledVector(best.normal, 26);
    polyline(context, [[best.point.x, best.point.y], [normalTip.x, normalTip.y]], theme.warm, 2);
    dot(context, best.point.x, best.point.y, 6, theme.fresh);
  }

  label(
    context,
    found
      ? `nearest hit: ${(best.fraction * maxDistance).toFixed(1)}px   normal: (${best.normal.x.toFixed(2)}, ${best.normal.y.toFixed(2)})`
      : 'no hit within maxDistance',
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    A <code>Ray2</code> aimed at the pointer tests two rectangles and a circle with
    <code>ray.intersectRect()</code> and <code>ray.intersectCirc()</code>, reusing one hit object
    and keeping the nearest. Distance along the ray is <code>hit.fraction * maxDistance</code>.
  </DemoFrame>
</template>
