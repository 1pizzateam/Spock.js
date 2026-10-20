<script setup>
import { Circ, RightTriangle, Trigo, Vec2 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { dot, label, polyline } from '../canvas.js';

const CORNERS = ['nw', 'ne', 'se', 'sw'];
const size = new Vec2(130, 110);
const center = new Vec2();
const target = new Vec2();
const closest = new Vec2();
const hypProj = new Vec2();
const normalTip = new Vec2();
const boundsMin = new Vec2();
const boundsMax = new Vec2();
const vertS = new Vec2();
const vertA = new Vec2();
const vertB = new Vec2();
const opp = new Vec2();

const tri = new RightTriangle(size, new Vec2(0, 0), 'nw');
const probe = new Circ(18, new Vec2(0, 0));

let activeCorner = '';

function draw(context, state, theme) {
  const { width, height, pointer, time } = state;
  const corner = CORNERS[Math.floor(time * 0.25) % CORNERS.length];
  if (corner !== activeCorner) {
    activeCorner = corner;
    tri.copy(new RightTriangle(size, center, corner));
  }

  center.setScalar(width * 0.5, height * 0.5);
  tri.setPosition(center);
  tri.getBounds(boundsMin, boundsMax);
  tri.getVertices(vertS, vertA, vertB);
  tri.getOppositeCorner(opp);

  if (pointer)
    target.copy(pointer);
  else {
    const orbit = time * 1.15;
    target.setScalar(
      center.x + Trigo.cosine(orbit) * 95,
      center.y + Trigo.sine(orbit) * 78
    );
  }

  probe.setPosition(target);
  tri.getClosestPoint(target, closest);
  tri.projectOntoHypotenuse(target, 0, hypProj);
  const isInside = tri.isIn(target);
  const overlaps = tri.overlapsCircle(probe);
  const signedDist = tri.signedDistanceToHypotenuse(target);

  // Bounding Rect dashed/subtle guide box + open corner
  context.strokeStyle = theme.grid;
  context.lineWidth = 1;
  context.strokeRect(boundsMin.x, boundsMin.y, tri.size.x, tri.size.y);
  dot(context, opp.x, opp.y, 3.5, theme.grid);

  // RightTriangle fill & stroke
  const fill = isInside
    ? (theme.dark ? 'rgba(56, 199, 147, 0.20)' : 'rgba(56, 199, 147, 0.24)')
    : overlaps
      ? (theme.dark ? 'rgba(240, 140, 75, 0.16)' : 'rgba(240, 140, 75, 0.20)')
      : (theme.dark ? 'rgba(91, 140, 255, 0.10)' : 'rgba(91, 140, 255, 0.14)');
  const stroke = isInside ? theme.fresh : overlaps ? theme.warm : theme.accent;
  tri.draw(context, fill, stroke, 2);

  // Hypotenuse outward normal arrow at center
  normalTip.copy(tri.position).addScaledVector(tri.hypNormal, 32);
  polyline(context, [[tri.position.x, tri.position.y], [normalTip.x, normalTip.y]], theme.warm, 2);
  dot(context, normalTip.x, normalTip.y, 4, theme.warm);

  // Vertices S (right-angle), A, B
  dot(context, vertS.x, vertS.y, 4.5, stroke);
  dot(context, vertA.x, vertA.y, 3.5, stroke);
  dot(context, vertB.x, vertB.y, 3.5, stroke);

  // Probe circle, closest point, and hypotenuse projection
  const probeStroke = isInside ? theme.fresh : overlaps ? theme.warm : theme.guide;
  probe.draw(context, '', probeStroke, 1.5);
  polyline(context, [[target.x, target.y], [closest.x, closest.y]], theme.guide, 1.5);
  dot(context, hypProj.x, hypProj.y, 3.5, theme.guide);
  dot(context, closest.x, closest.y, 5, isInside ? theme.fresh : theme.warm);
  dot(context, target.x, target.y, 5, isInside ? theme.fresh : theme.accent);

  label(
    context,
    `shape: ${tri.shape}   isIn(): ${isInside}   overlapsCircle(): ${overlaps}   signedDist: ${signedDist.toFixed(1)}px`,
    theme.text
  );
}
</script>

<template>
  <DemoFrame :draw="draw">
    Interactive <code>RightTriangle</code> cycling through all four corners (<code>'nw'</code>, <code>'ne'</code>,
    <code>'se'</code>, <code>'sw'</code>) with outward <code>hypNormal</code> (orange arrow), bounding
    <code>Rect</code> guide box, probe <code>Circ</code> tested with <code>tri.overlapsCircle(probe)</code>
    and <code>tri.isIn(point)</code>, and boundary projection via <code>tri.getClosestPoint()</code>.
  </DemoFrame>
</template>
