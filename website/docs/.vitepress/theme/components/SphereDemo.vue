<script setup>
import { Sphere, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label } from '../canvas.js';
import { createScene3D } from '../scene3d.js';

const scene = createScene3D();
const sphere = new Sphere(new Vec3(0, 1.2, 0), 1.6);
const target = new Vec3(0, 1.2, 0);
const cursor = new Vec3();
const AXIS_X = new Vec3(1, 0, 0);
const AXIS_Y = new Vec3(0, 1, 0);
const AXIS_Z = new Vec3(0, 0, 1);
const HEIGHT = 1.2;

function draw(context, state, theme) {
  const { width, height, time } = state;
  if (!width || !height) return;

  scene.update(width, height, { azimuth: 0.5 + Math.sin(time * 0.25) * 0.2, elevation: 0.4, target });

  // the test point slides on the horizontal plane at HEIGHT, under the pointer
  const pointer = state.pointer ?? {
    x: width * (0.5 + Math.cos(time * 0.8) * 0.3),
    y: height * (0.58 + Math.sin(time * 1.1) * 0.2),
  };
  const hit = scene.pointOnHeight(pointer, HEIGHT, cursor);
  const distance = hit ? cursor.getDistance(sphere.center) : 0;
  const inside = hit ? sphere.containsPoint(cursor) : false;
  const color = inside ? theme.fresh : theme.accent;

  scene.grid(context, theme);

  // the sphere: its silhouette and three rings
  const disc = scene.screenRadius(sphere.center, sphere.radius);
  if (disc) {
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(disc[0], disc[1], disc[2], 0, Math.PI * 2);
    context.stroke();
  }
  scene.ring(context, sphere.center, AXIS_X, AXIS_Z, sphere.radius, color, 1.5, {
    fill: inside ? 'rgba(56, 199, 147, 0.25)' : 'rgba(91, 140, 255, 0.14)',
  });
  scene.ring(context, sphere.center, AXIS_X, AXIS_Y, sphere.radius, color, 1);
  scene.ring(context, sphere.center, AXIS_Y, AXIS_Z, sphere.radius, color, 1);

  if (hit) {
    scene.drop(context, cursor, theme.guide);
    const marker = scene.toScreen(cursor);
    if (marker) dot(context, marker[0], marker[1], 6, color);
  }

  label(
    context,
    hit
      ? `distance to center: ${distance.toFixed(2)}   radius: ${sphere.radius.toFixed(2)}   sphere.containsPoint(): ${inside}`
      : 'move the pointer over the ground',
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    A <code>Sphere</code> and a point that follows the pointer at the sphere's height. The point is inside
    when its distance to the centre is at most the radius, and then <code>sphere.containsPoint()</code> is
    <code>true</code> and the sphere turns green. The shaded disc is the sphere cut at the point's height.
  </DemoFrame>
</template>
