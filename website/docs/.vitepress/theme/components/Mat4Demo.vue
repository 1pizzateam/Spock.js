<script setup>
import { Mat4, Trigo, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const VERTICES = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
];

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const mat = new Mat4();
const buffer = new Float32Array(16);

function draw(context, state, theme) {
  const { width, height, time } = state;
  const rotX = time * 0.6;
  const rotY = time * 0.9;

  mat.identity().rotateY(rotY).rotateX(rotX);
  mat.toArray(buffer);

  const m = buffer;
  const scale = Math.min(width, height) * 0.32;
  const cx = width * 0.5;
  const cy = height * 0.5;

  const projected = VERTICES.map(([x, y, z]) => {
    // Column-major affine 4x4 matrix vector multiply
    const tx = m[0] * x + m[4] * y + m[8] * z + m[12];
    const ty = m[1] * x + m[5] * y + m[9] * z + m[13];
    const tz = m[2] * x + m[6] * y + m[10] * z + m[14];

    // Perspective projection
    const fov = 3.5;
    const depth = 1 / (fov - tz * 0.7);
    return [cx + tx * scale * depth * 2.5, cy - ty * scale * depth * 2.5];
  });

  for (const [from, to] of EDGES) {
    const isFront = from >= 4 || to >= 4;
    polyline(context, [projected[from], projected[to]], isFront ? theme.accent : theme.guide, 1.8);
  }

  for (let i = 0; i < projected.length; i++)
    dot(context, projected[i][0], projected[i][1], 3.5, i >= 4 ? theme.accent : theme.fresh);

  const det = mat.determinant().toFixed(2);
  label(
    context,
    `Mat4: rotY ${Math.round(Trigo.radianToDegree(rotY) % 360)}°  rotX ${Math.round(Trigo.radianToDegree(rotX) % 360)}°   det = ${det}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    A 3D cube model-view transformation computed in real-time with <code>Mat4.rotateY()</code> and
    <code>Mat4.rotateX()</code>, stored in a contiguous 16-element <code>Float32Array</code> buffer.
  </DemoFrame>
</template>
