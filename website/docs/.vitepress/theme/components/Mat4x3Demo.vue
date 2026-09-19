<script setup>
import { Mat4x3, Trigo, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const parentMat = new Mat4x3();
const childMat = new Mat4x3();
const combinedMat = new Mat4x3();

const parentPos = new Vec3();
const childOffset = new Vec3(1.2, 0, 0);
const buffer = new Float32Array(16);

function project(x, y, z, width, height, scale = 75) {
  return [
    width * 0.5 + (x - z * 0.4) * scale,
    height * 0.55 - (y - z * 0.25) * scale,
  ];
}

function transformPoint(m, x, y, z) {
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14],
  ];
}

function draw(context, state, theme) {
  const { width, height, time } = state;

  const angle1 = Math.sin(time * 0.8) * 0.8;
  const angle2 = Math.cos(time * 1.2) * 1.1;

  // Root joint affine transform
  parentMat.identity()
    .rotateY(time * 0.4)
    .rotateZ(angle1);

  // Child joint affine transform relative to parent
  childMat.identity()
    .translate(childOffset)
    .rotateX(angle2);

  // Combined hierarchical transform
  combinedMat.copy(parentMat).multiply(childMat);
  combinedMat.toArray(buffer);
  const m = buffer;

  parentMat.toArray(buffer);
  const mp = buffer;

  const rootScreen = project(0, 0, 0, width, height);

  // Joint 1 position (transformed root)
  const [j1x, j1y, j1z] = transformPoint(mp, childOffset.x, childOffset.y, childOffset.z);
  const jointScreen = project(j1x, j1y, j1z, width, height);

  // End effector position
  const [eex, eey, eez] = transformPoint(m, 1.0, 0, 0);
  const endScreen = project(eex, eey, eez, width, height);

  // Bone segments
  polyline(context, [rootScreen, jointScreen], theme.accent, 4);
  polyline(context, [jointScreen, endScreen], theme.fresh, 4);

  // End effector basis axes
  const axisLen = 0.4;
  const [axX, axY, axZ] = transformPoint(m, 1.0 + axisLen, 0, 0);
  const [ayX, ayY, ayZ] = transformPoint(m, 1.0, axisLen, 0);
  const [azX, azY, azZ] = transformPoint(m, 1.0, 0, axisLen);

  polyline(context, [endScreen, project(axX, axY, axZ, width, height)], theme.warm, 2.5);
  polyline(context, [endScreen, project(ayX, ayY, ayZ, width, height)], theme.fresh, 2.5);
  polyline(context, [endScreen, project(azX, azY, azZ, width, height)], theme.accent, 2.5);

  dot(context, rootScreen[0], rootScreen[1], 6, theme.text);
  dot(context, jointScreen[0], jointScreen[1], 5, theme.accent);
  dot(context, endScreen[0], endScreen[1], 5, theme.warm);

  label(
    context,
    `Mat4x3 affine hierarchy: parent.multiply(child)   rotZ: ${Math.round(Trigo.radianToDegree(angle1))}°   rotX: ${Math.round(Trigo.radianToDegree(angle2))}°`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    Hierarchical 3D affine transforms composed with <code>Mat4x3.multiply()</code>. The 12-element
    affine matrix handles rotation, scale, and translation without the overhead of perspective rows.
  </DemoFrame>
</template>
