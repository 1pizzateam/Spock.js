import { Quaternion, Vector3 } from '@1pizzateam/spockjs';

const PHI = (1 + Math.sqrt(5)) / 2;
const RADIUS = Math.sqrt(1 + PHI * PHI);
const CAMERA = 3.4;

/** The twelve icosahedron corners, scaled onto the unit sphere. */
const CORNERS = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
].map(([x, y, z]) => new Vector3(x / RADIUS, y / RADIUS, z / RADIUS));

// every corner pair one edge length apart, which is the shortest distance on the solid
const EDGE_LENGTH = 2 / RADIUS;
const EDGES = [];
for (let a = 0; a < CORNERS.length; a++)
  for (let b = a + 1; b < CORNERS.length; b++)
    if (Math.abs(CORNERS[a].getDistance(CORNERS[b]) - EDGE_LENGTH) < 0.001)
      EDGES.push([a, b]);

const SPIN_AXIS = new Vector3(0, 1, 0);
const SPEED = 0.4;

// a fixed lean so the solid is never seen straight on, applied once
const TILT = new Quaternion().setAxisAngle(new Vector3(1, 0, 0), 0.34);

const spin = new Quaternion();
const orientation = new Quaternion();
const rotated = new Vector3();

function reducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

/**
 * Draw the homepage mark: an icosahedron turned by a quaternion, shaded by depth.
 * Shared by the Vue component and the offscreen renderer.
 */
export function drawLogo(context, state, theme) {
  const { width, height } = state;
  const scale = Math.min(width, height) * 0.34;

  spin.setAxisAngle(SPIN_AXIS, reducedMotion() ? 0.9 : state.time * SPEED);
  orientation.copy(TILT).multiply(spin);

  const points = CORNERS.map(corner => {
    orientation.multiplyVector(corner, rotated);
    const depth = CAMERA / (CAMERA - rotated.z);
    return {
      x: width * 0.5 + rotated.x * scale * depth,
      y: height * 0.5 - rotated.y * scale * depth,
      z: rotated.z,
    };
  });

  const edges = EDGES
    .map(([from, to]) => ({ from, to, depth: (points[from].z + points[to].z) * 0.5 }))
    .sort((a, b) => a.depth - b.depth);

  context.lineCap = 'round';
  for (const edge of edges) {
    const near = (edge.depth + 1) * 0.5;
    const a = points[edge.from];
    const b = points[edge.to];
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.globalAlpha = 0.18 + near * 0.82;
    context.strokeStyle = theme.accent;
    context.lineWidth = 0.9 + near * 2.1;
    context.stroke();
  }

  for (const point of points) {
    const near = (point.z + 1) * 0.5;
    context.globalAlpha = 0.3 + near * 0.7;
    context.beginPath();
    context.arc(point.x, point.y, 2 + near * 2.6, 0, Math.PI * 2, false);
    context.fillStyle = theme.warm;
    context.fill();
  }

  context.globalAlpha = 1;
}
