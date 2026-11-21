import { readFileSync } from 'node:fs';
import { Frustum, Plane, Sphere, Box, Vec3, Mat4 } from '../../build/es6/spock.js';

describe('Plane', () => {
  test('distanceToPoint', () => {
    const plane = new Plane(new Vec3(0, 1, 0), -5);
    expect(plane.distanceToPoint(new Vec3(0, 10, 0))).toBe(5);
    expect(plane.distanceToPoint(new Vec3(0, 5, 0))).toBe(0);
    expect(plane.distanceToPoint(new Vec3(0, 0, 0))).toBe(-5);
  });

  test('AC-2 set then normalize yields unit normal and scaled constant', () => {
    const plane = new Plane().set(new Vec3(0, 2, 0), -10).normalize();
    expect(plane.normal.toArray()).toEqual([0, 1, 0]);
    expect(plane.constant).toBe(-5);
    expect(plane.distanceToPoint(new Vec3(0, 6, 0))).toBe(1);
  });

  test('AC-1 Plane has no setComponents and set copies the vector', () => {
    const plane = new Plane();
    expect(plane.setComponents).toBeUndefined();
    const n = new Vec3(0, 0, 1);
    expect(plane.set(n, 3)).toBe(plane);
    n.setScalar(1, 0, 0);
    expect(plane.normal.toArray()).toEqual([0, 0, 1]);
    expect(plane.constant).toBe(3);
  });

  test('AC-6 plane docs no longer reference setComponents', () => {
    const doc = readFileSync(new URL('../../website/docs/api/plane.md', import.meta.url), 'utf8');
    expect(doc).not.toContain('setComponents');
    expect(doc).toContain('Plane.set()');
  });
});

describe('Frustum', () => {
  const frustum = () => new Frustum().setFromProjectionViewMatrix(new Mat4().perspective(Math.PI / 4, 1.0, 1.0, 100.0));

  test('has six planes', () => {
    expect(new Frustum().planes).toHaveLength(6);
  });

  test('accepts Mat4', () => {
    const proj = new Mat4().perspective(Math.PI / 4, 1.0, 1.0, 100.0);
    const sphere = new Sphere(new Vec3(0, 0, -10), 1);
    expect(new Frustum().setFromProjectionViewMatrix(proj).intersectsSphere(sphere)).toBe(true);
  });

  test('intersectsSphere', () => {
    const f = frustum();
    expect(f.intersectsSphere(new Sphere(new Vec3(0, 0, -10), 1))).toBe(true);
    expect(f.intersectsSphere(new Sphere(new Vec3(0, 0, 10), 1))).toBe(false);
    expect(f.intersectsSphere(new Sphere(new Vec3(0, 0, -200), 1))).toBe(false);
  });

  test('intersectsBox', () => {
    const f = frustum();
    expect(f.intersectsBox(new Box(new Vec3(-1, -1, -15), new Vec3(1, 1, -10)))).toBe(true);
    expect(f.intersectsBox(new Box(new Vec3(50, 50, -15), new Vec3(60, 60, -10)))).toBe(false);
  });

  test('containsPoint', () => {
    const f = frustum();
    expect(f.containsPoint(new Vec3(0, 0, -10))).toBe(true);
    expect(f.containsPoint(new Vec3(0, 0, 10))).toBe(false);
  });

  test('AC-3 frustum planes are unit length and contain the view axis', () => {
    const f = frustum();
    const p = new Vec3(0, 0, -10);
    for (const plane of f.planes) {
      expect(plane.normal.getMagnitude()).toBeCloseTo(1, 5);
      expect(plane.distanceToPoint(p)).toBeGreaterThanOrEqual(0);
    }
  });

  test('AC-4 frustum planes match matrix row extraction', () => {
    const m = new Mat4().perspective(Math.PI / 4, 1.0, 1.0, 100.0).toArray();
    const f = new Frustum().setFromProjectionViewMatrix(new Mat4().perspective(Math.PI / 4, 1.0, 1.0, 100.0));
    const cases = [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1]];
    cases.forEach(([axis, sign], i) => {
      const n = new Vec3(m[3] + sign * m[axis], m[7] + sign * m[axis + 4], m[11] + sign * m[axis + 8]);
      const d = m[15] + sign * m[12 + axis];
      const len = n.getMagnitude();
      expect(f.planes[i].normal.x).toBeCloseTo(n.x / len, 5);
      expect(f.planes[i].normal.y).toBeCloseTo(n.y / len, 5);
      expect(f.planes[i].normal.z).toBeCloseTo(n.z / len, 5);
      expect(f.planes[i].constant).toBeCloseTo(d / len, 5);
    });
  });

  test('AC-5 intersectsSphere culls behind the camera', () => {
    const f = frustum();
    expect(f.intersectsSphere(new Sphere(new Vec3(0, 0, -10), 1))).toBe(true);
    expect(f.intersectsSphere(new Sphere(new Vec3(0, 0, 10), 1))).toBe(false);
  });
});
