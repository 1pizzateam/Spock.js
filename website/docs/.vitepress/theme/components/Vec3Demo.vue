<script setup>
import { Trigo, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const vecA = new Vec3();
const vecB = new Vec3();
const vecC = new Vec3();
const vecAB = new Vec3();
const origin = new Vec3(0, 0, 0);
const axisX = new Vec3(1.3, 0, 0);
const axisY = new Vec3(0, 1.3, 0);
const axisZ = new Vec3(0, 0, 1.3);

function project(v, width, height, scale = 90) {
  const px = width * 0.5 + (v.x - v.z * 0.55) * scale;
  const py = height * 0.55 - (v.y - v.z * 0.3) * scale;
  return [px, py];
}

function drawArrow(context, from, to, color, width = 2.5) {
  polyline(context, [from, to], color, width);
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  if (len < 5) return;
  const angle = Math.atan2(dy, dx);
  const headLen = 8;
  const p1 = [to[0] - headLen * Math.cos(angle - Math.PI / 6), to[1] - headLen * Math.sin(angle - Math.PI / 6)];
  const p2 = [to[0] - headLen * Math.cos(angle + Math.PI / 6), to[1] - headLen * Math.sin(angle + Math.PI / 6)];
  polyline(context, [p1, to, p2], color, width);
}

function draw(context, state, theme) {
  const { width, height, time } = state;

  const tA = time * 0.6;
  const tB = time * 1.1;

  vecA.setScalar(Math.cos(tA), Math.sin(tA) * 0.4, Math.sin(tA * 0.7) * 0.5).normalize();
  vecB.setScalar(Math.cos(tB) * 0.3, Math.cos(tB * 0.8), Math.sin(tB)).normalize();
  vecC.crossVectors(vecA, vecB).normalize();

  const angleRad = vecA.getAngle(vecB);
  const angleDeg = angleRad !== false ? Math.round(Trigo.radianToDegree(angleRad)) : 0;

  const pOrigin = project(origin, width, height);
  const pA = project(vecA, width, height);
  const pB = project(vecB, width, height);
  const pC = project(vecC, width, height);

  // Reference axes
  const pX = project(axisX, width, height);
  const pY = project(axisY, width, height);
  const pZ = project(axisZ, width, height);
  polyline(context, [pOrigin, pX], theme.grid, 1);
  polyline(context, [pOrigin, pY], theme.grid, 1);
  polyline(context, [pOrigin, pZ], theme.grid, 1);

  // Plane spanned by a and b
  vecAB.addVectors(vecA, vecB);
  const pAB = project(vecAB, width, height);
  context.fillStyle = theme.dark ? 'rgba(91, 140, 255, 0.08)' : 'rgba(91, 140, 255, 0.12)';
  context.beginPath();
  context.moveTo(pOrigin[0], pOrigin[1]);
  context.lineTo(pA[0], pA[1]);
  context.lineTo(pAB[0], pAB[1]);
  context.lineTo(pB[0], pB[1]);
  context.closePath();
  context.fill();

  // Draw vectors
  drawArrow(context, pOrigin, pA, theme.accent, 2.5);
  drawArrow(context, pOrigin, pB, theme.fresh, 2.5);
  drawArrow(context, pOrigin, pC, theme.warm, 3);

  dot(context, pOrigin[0], pOrigin[1], 4, theme.text);
  dot(context, pA[0], pA[1], 4, theme.accent);
  dot(context, pB[0], pB[1], 4, theme.fresh);
  dot(context, pC[0], pC[1], 5, theme.warm);

  label(
    context,
    `a (blue)  b (green)  c = a × b (orange)   angle: ${angleDeg}°`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    3D vector operations: the orange vector is the orthogonal cross product <code>vecA.cross(vecB)</code>
    perpendicular to the plane spanned by <code>a</code> and <code>b</code>, with angle measured by <code>vecA.getAngle(vecB)</code>.
  </DemoFrame>
</template>
