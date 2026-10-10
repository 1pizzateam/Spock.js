<script setup>
import { Box, Frustum, Mat4, Mat4x3, Sphere, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const projection = new Mat4();
const view = new Mat4x3();
const projectionView = new Mat4();
const inverse = new Mat4();
const frustum = new Frustum();
const eye = new Vec3();
const target = new Vec3();
const up = new Vec3(0, 1, 0);
const ndc = new Vec3();
const world = new Vec3();

const spheres = [
  new Sphere(new Vec3(-3, 0, -3), 0.7),
  new Sphere(new Vec3(1.5, 0, -2.5), 0.6),
  new Sphere(new Vec3(3.5, 0, -6), 0.8),
  new Sphere(new Vec3(-2, 0, 1), 0.6),
  new Sphere(new Vec3(0.5, 0, -8), 0.7),
];
const boxes = [
  new Box(new Vec3(-4.6, -0.5, -7), new Vec3(-3.4, 0.5, -6)),
  new Box(new Vec3(2.6, -0.5, -0.8), new Vec3(3.6, 0.5, 0.2)),
  new Box(new Vec3(-0.4, -0.5, -5), new Vec3(0.6, 0.5, -4)),
];

function draw(context, state, theme) {
  const scale = Math.min(state.width / 12, state.height / 8.5);
  const cx = state.width * 0.5;
  const cy = state.height * 0.92;
  const screen = (v) => [cx + v.x * scale, cy + v.z * scale];

  const yaw = state.pointer
    ? ((state.pointer.x / state.width) - 0.5) * Math.PI * 0.9
    : Math.sin(state.time * 0.6) * 0.6;

  eye.setScalar(0, 0, 0);
  target.setScalar(Math.sin(yaw), 0, -Math.cos(yaw));
  view.lookAtRH(eye, target, up);
  projection.perspective(55, 1.4, 1, 7);
  projectionView.copy(projection).multiplyAffine(view);
  frustum.setFromProjectionViewMatrix(projectionView);

  // frustum outline: unproject the near and far corners at the vertical middle
  inverse.copy(projectionView).invert();
  const outline = [];
  for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    inverse.transformPoint(ndc.setScalar(x, 0, z), world);
    outline.push(screen(world));
  }
  context.fillStyle = theme.dark ? 'rgba(91, 140, 255, 0.10)' : 'rgba(91, 140, 255, 0.12)';
  context.beginPath();
  outline.forEach(([x, y], i) => (i ? context.lineTo(x, y) : context.moveTo(x, y)));
  context.closePath();
  context.fill();
  polyline(context, [...outline, outline[0]], theme.accent, 2);

  let visible = 0;
  for (const sphere of spheres) {
    const inside = frustum.intersectsSphere(sphere);
    if (inside) visible++;
    context.strokeStyle = inside ? theme.fresh : theme.guide;
    context.fillStyle = inside ? 'rgba(56, 199, 147, 0.25)' : 'transparent';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(...screen(sphere.center), sphere.radius * scale, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
  for (const box of boxes) {
    const inside = frustum.intersectsBox(box);
    if (inside) visible++;
    context.strokeStyle = inside ? theme.fresh : theme.guide;
    context.fillStyle = inside ? 'rgba(56, 199, 147, 0.25)' : 'transparent';
    context.lineWidth = 2;
    const [x, y] = screen(box.min);
    context.beginPath();
    context.rect(x, y, (box.max.x - box.min.x) * scale, (box.max.z - box.min.z) * scale);
    context.fill();
    context.stroke();
  }

  dot(context, ...screen(eye), 6, theme.text);
  label(context, `${visible} of ${spheres.length + boxes.length} shapes pass frustum.intersectsSphere() / intersectsBox()`, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    A <code>Frustum</code> built with <code>setFromProjectionViewMatrix()</code> from a perspective
    <code>Mat4</code> and a <code>Mat4x3</code> look-at view. Shapes inside it turn green. Move the
    pointer sideways to turn the camera. Seen from above.
  </DemoFrame>
</template>
