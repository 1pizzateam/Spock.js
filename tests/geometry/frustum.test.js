import { Frustum, Plane, Sphere, Box, Vec3, Mat4 } from '../../build/es6/spock.js';

describe('Plane', () => {
  test('distanceToPoint', () => {
    const plane = new Plane(new Vec3(0, 1, 0), -5);
    expect(plane.distanceToPoint(new Vec3(0, 10, 0))).toBe(5);
    expect(plane.distanceToPoint(new Vec3(0, 5, 0))).toBe(0);
    expect(plane.distanceToPoint(new Vec3(0, 0, 0))).toBe(-5);
  });

  test('setComponents normalizes the plane', () => {
    const plane = new Plane().setComponents(0, 2, 0, -10);
    expect(plane.normal.toArray()).toEqual([0, 1, 0]);
    expect(plane.constant).toBe(-5);
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
});
