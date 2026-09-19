<script setup>
import { Circ, Trigo, Vec2 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const circle = new Circ(65, 0, 0);
const target = new Vec2();
const closest = new Vec2();
const center = new Vec2();

function draw(context, state, theme) {
  const { width, height, pointer, time } = state;
  center.setScalar(width * 0.5, height * 0.5);
  circle.setPosition(center);

  if (pointer)
    target.setScalar(pointer.x, pointer.y);
  else {
    const orbit = time * 1.2;
    target.setScalar(
      center.x + Trigo.cosine(orbit) * (circle.radius * 1.7),
      center.y + Trigo.sine(orbit) * (circle.radius * 1.3)
    );
  }

  circle.getClosestPoint(target, closest);
  const isInside = circle.isIn(target);

  context.fillStyle = isInside
    ? (theme.dark ? 'rgba(56, 199, 147, 0.18)' : 'rgba(56, 199, 147, 0.22)')
    : (theme.dark ? 'rgba(91, 140, 255, 0.08)' : 'rgba(91, 140, 255, 0.12)');
  context.beginPath();
  context.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = isInside ? theme.fresh : theme.accent;
  context.lineWidth = 2;
  context.stroke();

  dot(context, circle.position.x, circle.position.y, 4, theme.guide);
  polyline(context, [[target.x, target.y], [closest.x, closest.y]], theme.guide, 1.5);
  dot(context, closest.x, closest.y, 5, isInside ? theme.fresh : theme.warm);
  dot(context, target.x, target.y, 6, isInside ? theme.fresh : theme.accent);

  const dist = target.getDistance(circle.position);
  label(
    context,
    `circ.isIn(): ${isInside}   distance: ${dist.toFixed(1)}px   radius: ${circle.radius}px`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    Interactive circle containment test with <code>circ.isIn()</code> and boundary projection
    with <code>circ.getClosestPoint()</code>. Move your pointer over the canvas to test points.
  </DemoFrame>
</template>
