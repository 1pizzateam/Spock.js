import { Mat4, Mat4x3, Plane, Ray3, Vec3 } from '@1pizzateam/spock';

const BOX_EDGES = [
  [0, 1], [1, 3], [3, 2], [2, 0],
  [4, 5], [5, 7], [7, 6], [6, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];
const RING_SEGMENTS = 48;

/**
 * A small perspective view for the 3D demos, built from Spock's own types:
 * an orbit camera (Vec3.setFromSpherical + Mat4x3.lookAtRH), a projection-view Mat4,
 * and a Ray3 unprojected from the pointer through the inverted matrix.
 * Create one per demo and call update() at the start of every frame.
 */
export function createScene3D() {
  const projection = new Mat4();
  const view = new Mat4x3();
  const projectionView = new Mat4();
  const inverse = new Mat4();
  const eye = new Vec3();
  const forward = new Vec3();
  const right = new Vec3();
  const up = new Vec3(0, 1, 0);
  const ndc = new Vec3();
  const near = new Vec3();
  const far = new Vec3();
  const direction = new Vec3();
  const projected = new Vec3();
  const offset = new Vec3();
  const start = new Vec3();
  const end = new Vec3();
  const ground = new Plane(new Vec3(0, 1, 0), 0);
  const ray = new Ray3();
  const corners = Array.from({ length: 8 }, () => new Vec3());
  const ringPoints = Array.from({ length: RING_SEGMENTS }, () => new Vec3());
  const size = { width: 0, height: 0 };

  const scene = {
    eye,
    right,
    ray,

    /** Position the orbit camera and rebuild the matrices. */
    update(width, height, { azimuth = 0.6, elevation = 0.5, distance = 9, target = new Vec3(0, 1, 0) } = {}) {
      size.width = width;
      size.height = height;
      eye.setFromSpherical(distance, azimuth, elevation).add(target);
      view.lookAtRH(eye, target, up);
      projection.perspective(50, width / height, 0.1, 80);
      projectionView.copy(projection).multiplyAffine(view);
      inverse.copy(projectionView).invert();
      forward.subVectors(target, eye).normalize();
      right.crossVectors(forward, up).normalize();
    },

    /** Screen coordinates of a world point, or null when it is outside the depth range. */
    toScreen(point, out = [0, 0]) {
      projectionView.transformPoint(point, projected);
      if (projected.z < -1 || projected.z > 1) return null;
      out[0] = (projected.x * 0.5 + 0.5) * size.width;
      out[1] = (0.5 - projected.y * 0.5) * size.height;
      return out;
    },

    /** The Ray3 that passes through a screen position. */
    pointerRay(pointer) {
      ndc.setScalar((pointer.x / size.width) * 2 - 1, 1 - (pointer.y / size.height) * 2, -1);
      inverse.transformPoint(ndc, near);
      ndc.z = 1;
      inverse.transformPoint(ndc, far);
      return ray.set(near, direction.subVectors(far, near));
    },

    /** The world point under a screen position on the horizontal plane at `height`, or null. */
    pointOnHeight(pointer, height, out) {
      scene.pointerRay(pointer);
      ground.set(up, -height);
      const denominator = ground.normal.dotProduct(ray.direction);
      if (Math.abs(denominator) < 1e-6) return null;
      const t = -ground.distanceToPoint(ray.origin) / denominator;
      return t < 0 ? null : ray.at(t, out);
    },

    /** Circle on screen for a world sphere, measured along the camera's right vector: [x, y, radius]. */
    screenRadius(center, radius, out = [0, 0, 0]) {
      const c = scene.toScreen(center, [0, 0]);
      const e = scene.toScreen(offset.copy(center).addScaledVector(right, radius), [0, 0]);
      if (!c || !e) return null;
      out[0] = c[0];
      out[1] = c[1];
      out[2] = Math.hypot(e[0] - c[0], e[1] - c[1]);
      return out;
    },

    /** Connect world points on screen. Skipped when any point is outside the depth range. */
    path(context, points, color, lineWidth = 2, { closed = false, fill = null, dash = null } = {}) {
      const screen = [];
      for (const point of points) {
        const s = scene.toScreen(point, [0, 0]);
        if (!s) return;
        screen.push(s);
      }
      context.beginPath();
      screen.forEach(([x, y], i) => (i ? context.lineTo(x, y) : context.moveTo(x, y)));
      if (closed) context.closePath();
      if (fill) {
        context.fillStyle = fill;
        context.fill();
      }
      if (color) {
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash(dash ?? []);
        context.stroke();
        context.setLineDash([]);
      }
    },

    line(context, a, b, color, lineWidth = 2, dash = null) {
      scene.path(context, [a, b], color, lineWidth, { dash });
    },

    /** Ground grid at y = 0. */
    grid(context, theme, extent = 5) {
      for (let i = -extent; i <= extent; i++) {
        scene.line(context, start.setScalar(i, 0, -extent), end.setScalar(i, 0, extent), theme.grid, 1);
        scene.line(context, start.setScalar(-extent, 0, i), end.setScalar(extent, 0, i), theme.grid, 1);
      }
    },

    /** Wireframe of a Box, optionally carried through a Mat4x3 first. */
    box(context, box, color, lineWidth = 2, { model = null, dash = null } = {}) {
      for (let i = 0; i < 8; i++) {
        corners[i].setScalar(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z);
        if (model) model.transformPoint(corners[i], corners[i]);
      }
      for (const [a, b] of BOX_EDGES)
        scene.line(context, corners[a], corners[b], color, lineWidth, dash);
    },

    /** Circle around `center` in the plane spanned by the unit vectors a and b, optionally through a Mat4x3. */
    ring(context, center, a, b, radius, color, lineWidth = 2, { model = null, dash = null, fill = null } = {}) {
      for (let i = 0; i < RING_SEGMENTS; i++) {
        const angle = (i / RING_SEGMENTS) * Math.PI * 2;
        ringPoints[i]
          .copy(center)
          .addScaledVector(a, Math.cos(angle) * radius)
          .addScaledVector(b, Math.sin(angle) * radius);
        if (model) model.transformPoint(ringPoints[i], ringPoints[i]);
      }
      scene.path(context, ringPoints, color, lineWidth, { closed: true, dash, fill });
    },

    /** Vertical guide from a point down to the ground, for depth. */
    drop(context, point, color) {
      scene.line(context, point, start.setScalar(point.x, 0, point.z), color, 1, [3, 3]);
    },
  };

  return scene;
}
