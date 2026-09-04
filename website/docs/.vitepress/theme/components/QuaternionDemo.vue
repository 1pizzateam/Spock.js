<script setup>
import { Quaternion, Trigonometry, Vector3 } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { label, polyline } from '../canvas.js';

const CORNERS = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
].map(([x, y, z]) => new Vector3(x, y, z));

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const rotation = new Quaternion();
const axis = new Vector3(0.4, 1, 0.25);
const rotated = new Vector3();

function draw(context, state, theme) {
  const { width, height } = state;
  const angle = state.time * 0.7;
  rotation.setAxisAngle(axis, angle);

  const scale = Math.min(width, height) * 0.32;
  const projected = CORNERS.map(corner => {
    rotation.multiplyVector(corner, rotated);
    const depth = 1 / (3 - rotated.z);
    return [
      width * 0.5 + rotated.x * scale * depth * 3,
      height * 0.5 + rotated.y * scale * depth * 3,
    ];
  });

  for (const [from, to] of EDGES)
    polyline(context, [projected[from], projected[to]], theme.accent, 2);

  rotation.multiplyVector(new Vector3(0, 0, 1), rotated);
  polyline(
    context,
    [[width * 0.5, height * 0.5], [width * 0.5 + rotated.x * scale, height * 0.5 + rotated.y * scale]],
    theme.warm,
    2
  );

  label(
    context,
    `axis (${axis.x}, ${axis.y}, ${axis.z})   angle ${Math.round(Trigonometry.radianToDegree(angle) % 360)}°`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    A single <code>Quaternion.setAxisAngle()</code> rotation applied to each cube corner with
    <code>multiplyVector()</code>, which writes into a reusable target instead of allocating.
    The orange arm is the rotated forward axis.
  </DemoFrame>
</template>
