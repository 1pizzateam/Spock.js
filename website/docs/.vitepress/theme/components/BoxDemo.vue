<script setup>
import { Box, Vec3 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label } from '../canvas.js';
import { createScene3D } from '../scene3d.js';

const scene = createScene3D();
const box = new Box(new Vec3(-1.6, 0.2, -1.1), new Vec3(1.6, 2.2, 1.1));
const target = new Vec3(0, 1.2, 0);
const cursor = new Vec3();
const slice = [new Vec3(), new Vec3(), new Vec3(), new Vec3()];
const HEIGHT = 1.2;

function draw(context, state, theme) {
  const { width, height, time } = state;
  if (!width || !height) return;

  scene.update(width, height, { azimuth: 0.55 + Math.sin(time * 0.25) * 0.2, elevation: 0.45, target });

  // the test point slides on the horizontal plane at HEIGHT, under the pointer
  const pointer = state.pointer ?? {
    x: width * (0.5 + Math.cos(time * 0.8) * 0.3),
    y: height * (0.58 + Math.sin(time * 1.1) * 0.2),
  };
  const hit = scene.pointOnHeight(pointer, HEIGHT, cursor);
  const inside = hit ? box.containsPoint(cursor) : false;
  const color = inside ? theme.fresh : theme.accent;

  scene.grid(context, theme);
  scene.box(context, box, color, 2);

  // the box cut at the point's height: the point is inside the box exactly when it is inside this rectangle
  slice[0].setScalar(box.min.x, HEIGHT, box.min.z);
  slice[1].setScalar(box.max.x, HEIGHT, box.min.z);
  slice[2].setScalar(box.max.x, HEIGHT, box.max.z);
  slice[3].setScalar(box.min.x, HEIGHT, box.max.z);
  scene.path(context, slice, color, 1.5, {
    closed: true,
    fill: inside ? 'rgba(56, 199, 147, 0.25)' : 'rgba(91, 140, 255, 0.14)',
  });

  if (hit) {
    scene.drop(context, cursor, theme.guide);
    const marker = scene.toScreen(cursor);
    if (marker) dot(context, marker[0], marker[1], 6, color);
  }

  label(
    context,
    hit
      ? `point (${cursor.x.toFixed(1)}, ${cursor.y.toFixed(1)}, ${cursor.z.toFixed(1)})   box.containsPoint(): ${inside}`
      : 'move the pointer over the ground',
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    A <code>Box</code> and a point that follows the pointer at a fixed height. The shaded rectangle is the
    box cut at that height. <code>box.containsPoint()</code> is <code>true</code>, and the box turns green,
    when the point is inside that rectangle: its x and z within the box, and its height between the box's
    bottom and top.
  </DemoFrame>
</template>
