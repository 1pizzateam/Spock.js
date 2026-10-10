<script setup>
import { Box, Sphere, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label } from '../canvas.js';
import { createScene3D } from '../scene3d.js';

const scene = createScene3D();
const target = new Vec3(0, 0.6, 0);
const hitPoint = new Vec3();
const bestPoint = new Vec3();

const spheres = [
  new Sphere(new Vec3(-2.6, 0.9, -1), 0.9),
  new Sphere(new Vec3(1.6, 1.1, 1.8), 1.1),
  new Sphere(new Vec3(0.4, 0.55, -3.2), 0.55),
];
const boxes = [
  new Box(new Vec3(2, 0, -2.6), new Vec3(3.5, 1.5, -1.1)),
  new Box(new Vec3(-3.6, 0, 1.6), new Vec3(-2.2, 1, 3)),
];

function draw(context, state, theme) {
  const { width, height, time } = state;
  if (!width || !height) return;

  scene.update(width, height, { azimuth: time * 0.18 + 0.6, elevation: 0.5, distance: 9.5, target });

  // the pointer becomes a Ray3 through the inverted projection-view matrix
  const pointer = state.pointer ?? {
    x: width * (0.5 + Math.cos(time * 0.7) * 0.28),
    y: height * (0.55 + Math.sin(time * 1.1) * 0.22),
  };
  const ray = scene.pointerRay(pointer);

  // nearest hit across every shape
  let best = Infinity;
  let picked = null;
  spheres.forEach((sphere, index) => {
    const hit = ray.intersectSphere(sphere, hitPoint);
    const distance = hit ? hit.getDistance(ray.origin) : Infinity;
    if (distance < best) {
      best = distance;
      picked = { kind: 'sphere', index };
      bestPoint.copy(hit);
    }
  });
  boxes.forEach((box, index) => {
    const hit = ray.intersectBox(box, hitPoint);
    const distance = hit ? hit.getDistance(ray.origin) : Infinity;
    if (distance < best) {
      best = distance;
      picked = { kind: 'box', index };
      bestPoint.copy(hit);
    }
  });

  scene.grid(context, theme);

  spheres.forEach((sphere, index) => {
    const disc = scene.screenRadius(sphere.center, sphere.radius);
    if (!disc) return;
    const isPicked = picked && picked.kind === 'sphere' && picked.index === index;
    context.fillStyle = isPicked
      ? 'rgba(56, 199, 147, 0.28)'
      : theme.dark ? 'rgba(91, 140, 255, 0.14)' : 'rgba(91, 140, 255, 0.18)';
    context.strokeStyle = isPicked ? theme.fresh : theme.accent;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(disc[0], disc[1], disc[2], 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });

  boxes.forEach((box, index) => {
    const isPicked = picked && picked.kind === 'box' && picked.index === index;
    scene.box(context, box, isPicked ? theme.fresh : theme.accent, 2);
  });

  context.strokeStyle = picked ? theme.fresh : theme.text;
  context.lineWidth = 1.5;
  context.beginPath();
  context.arc(pointer.x, pointer.y, 9, 0, Math.PI * 2);
  context.stroke();

  if (picked) {
    const marker = scene.toScreen(bestPoint);
    if (marker) dot(context, marker[0], marker[1], 5, theme.warm);
    label(
      context,
      `picked ${picked.kind}   hit: (${bestPoint.x.toFixed(2)}, ${bestPoint.y.toFixed(2)}, ${bestPoint.z.toFixed(2)})   distance: ${best.toFixed(2)}`,
      theme.text
    );
  } else
    label(context, 'ray.intersectSphere() / intersectBox(): no hit', theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    A perspective camera orbits a 3D scene (<code>Vec3.setFromSpherical()</code>). The pointer is
    unprojected through the inverted projection-view <code>Mat4</code> into a <code>Ray3</code>, which
    <code>ray.intersectSphere()</code> and <code>ray.intersectBox()</code> test against three spheres and
    two boxes. The nearest hit lights up, with its world-space point (orange).
  </DemoFrame>
</template>
