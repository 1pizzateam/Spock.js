<script setup>
import { Plane, Utils, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label } from '../canvas.js';
import { createScene3D } from '../scene3d.js';

const scene = createScene3D();
const plane = new Plane();
const normal = new Vec3();
const origin = new Vec3();
const tangent = new Vec3();
const bitangent = new Vec3();
const tip = new Vec3();
const foot = new Vec3();
const base3 = new Vec3();
const cursor = new Vec3();
const target = new Vec3(0, 1, 0);
const UP = new Vec3(0, 1, 0);
const quad = [new Vec3(), new Vec3(), new Vec3(), new Vec3()];
const HALF = 3.6;
const RANGE = 2.2;
const DISTANCE = 1;

// A square of the plane around its centre point, `half` units to each side.
function fillQuad(half) {
  quad[0].copy(origin).addScaledVector(tangent, -half).addScaledVector(bitangent, -half);
  quad[1].copy(origin).addScaledVector(tangent, half).addScaledVector(bitangent, -half);
  quad[2].copy(origin).addScaledVector(tangent, half).addScaledVector(bitangent, half);
  quad[3].copy(origin).addScaledVector(tangent, -half).addScaledVector(bitangent, half);
}

function draw(context, state, theme) {
  const { width, height, time } = state;
  if (!width || !height) return;

  scene.update(width, height, { azimuth: 0.55 + Math.sin(time * 0.2) * 0.15, elevation: 0.45, target });

  // a plane DISTANCE away from the origin along a slowly turning normal
  normal.setFromSpherical(1, time * 0.35, 1.0 + Math.sin(time * 0.5) * 0.35);
  plane.set(normal, -DISTANCE);
  origin.copy(normal).scale(DISTANCE);

  tangent.crossVectors(normal, UP).normalize();
  bitangent.crossVectors(normal, tangent);

  const pointer = state.pointer ?? {
    x: width * (0.5 + Math.cos(time * 0.8) * 0.3),
    y: height * (0.58 + Math.sin(time * 1.1) * 0.2),
  };
  const hit = scene.pointOnHeight(pointer, 1.2, cursor);
  if (hit) {
    cursor.x = Utils.clamp(cursor.x, -RANGE, RANGE);
    cursor.z = Utils.clamp(cursor.z, -RANGE, RANGE);
  }
  const distance = hit ? plane.distanceToPoint(cursor) : 0;
  const front = distance >= 0;
  foot.copy(cursor).addScaledVector(plane.normal, -distance);

  // The plane is infinite; a fixed square of it is drawn. HALF is large enough that the foot of the
  // perpendicular always lies inside it, because the point is limited to RANGE from the centre.
  fillQuad(HALF);
  scene.grid(context, theme);
  scene.path(context, quad, theme.accent, 2, {
    closed: true,
    fill: theme.dark ? 'rgba(91, 140, 255, 0.16)' : 'rgba(91, 140, 255, 0.2)',
  });

  // normal arrow
  tip.copy(origin).addScaledVector(normal, 1.5);
  scene.line(context, origin, tip, theme.warm, 2);
  const arrow = scene.toScreen(tip);
  if (arrow) dot(context, arrow[0], arrow[1], 4, theme.warm);

  if (hit) {
    // dotted line down to the ground: where the point stands
    scene.drop(context, cursor, theme.guide);
    const base = scene.toScreen(base3.setScalar(cursor.x, 0, cursor.z));
    if (base) dot(context, base[0], base[1], 3, theme.guide);

    // solid line along the normal to the foot of the perpendicular: the distance being measured
    scene.line(context, cursor, foot, theme.warm, 1.5);
    const footScreen = scene.toScreen(foot);
    if (footScreen) dot(context, footScreen[0], footScreen[1], 4, theme.warm);
    const marker = scene.toScreen(cursor);
    if (marker) dot(context, marker[0], marker[1], 6, front ? theme.fresh : theme.accent);
  }

  label(
    context,
    `plane.distanceToPoint(): ${distance.toFixed(2)}   side: ${front ? 'normal' : 'behind'}`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    A <code>Plane</code> with a slowly turning normal (orange arrow). The point under the pointer slides
    at a fixed height; the dotted line drops from it to the ground. <code>plane.distanceToPoint()</code> is
    its signed distance, measured along the normal to the foot of the perpendicular (solid orange line).
    The point can only slide a short way from the centre, so the foot always lands on the drawn part of
    the plane. It is green on the side the normal points to.
  </DemoFrame>
</template>
