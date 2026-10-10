import { Sphere, Box, Vec3, Mat4x3, Mat4, Quat } from '../../build/es6/spock.js';

describe('Sphere', () => {
  test('creates default sphere at origin', () => {
    const sphere = new Sphere();
    expect(sphere.center.isOrigin()).toBe(true);
    expect(sphere.radius).toBe(0);
  });

  test('setFromPoints calculates enclosing sphere', () => {
    const sphere = new Sphere().setFromPoints([-2, 0, 0, 2, 0, 0]);
    expect(sphere.center.x).toBe(0);
    expect(sphere.radius).toBeGreaterThanOrEqual(2);
  });

  test('setFromPoints accepts Vec3 lists, a custom center and stride 2', () => {
    const fromVectors = new Sphere().setFromPoints([new Vec3(-2, 0, 0), new Vec3(2, 0, 0)]);
    expect(fromVectors.radius).toBeCloseTo(2);

    const custom = new Sphere().setFromPoints([1, 0, 0, 3, 0, 0], new Vec3(0, 0, 0));
    expect(custom.radius).toBe(3);

    const flat = new Sphere().setFromPoints([0, 0, 4, 2], undefined, 2);
    expect(flat.center.z).toBe(0);
    expect(flat.center.x).toBe(2);
  });

  test('containsPoint and intersectsSphere', () => {
    const s1 = new Sphere(new Vec3(0, 0, 0), 5);
    expect(s1.containsPoint(new Vec3(3, 0, 0))).toBe(true);
    expect(s1.containsPoint(new Vec3(6, 0, 0))).toBe(false);
    expect(s1.intersectsSphere(new Sphere(new Vec3(7, 0, 0), 3))).toBe(true);
    expect(s1.intersectsSphere(new Sphere(new Vec3(10, 0, 0), 1))).toBe(false);
  });

  test('intersectsBox', () => {
    const sphere = new Sphere(new Vec3(0, 0, 0), 2);
    expect(sphere.intersectsBox(new Box(new Vec3(1, 1, 1), new Vec3(3, 3, 3)))).toBe(true);
    expect(sphere.intersectsBox(new Box(new Vec3(5, 5, 5), new Vec3(8, 8, 8)))).toBe(false);
  });

  test('applyMatrix4 transforms center and scales radius', () => {
    const sphere = new Sphere(new Vec3(1, 0, 0), 2);
    sphere.applyMatrix4(new Mat4x3().translate(new Vec3(5, 0, 0)).scale(new Vec3(2, 2, 2)));
    expect(sphere.center.x).toBe(7);
    expect(sphere.radius).toBe(4);
  });

  test('applyMatrix4 scales the radius by the largest axis scale', () => {
    const sphere = new Sphere(new Vec3(1, 0, 0), 2);
    sphere.applyMatrix4(new Mat4x3().compose(new Vec3(0, 1, 0), new Quat(), new Vec3(1, 3, 2)));
    expect(sphere.center.toArray()).toEqual([1, 1, 0]);
    expect(sphere.radius).toBeCloseTo(6);
  });

  test('applyMatrix4 works with Mat4', () => {
    const sphere = new Sphere(new Vec3(0, 1, 0), 2);
    const mat = new Mat4();
    mat.translate(new Vec3(0, 3, 0));
    sphere.applyMatrix4(mat);
    expect(sphere.center.y).toBe(4);
    expect(sphere.radius).toBe(2);
  });

  test('clone and copy are independent', () => {
    const sphere = new Sphere(new Vec3(1, 2, 3), 4);
    const clone = sphere.clone();
    clone.center.x = 9;
    expect(sphere.center.x).toBe(1);
    expect(new Sphere().copy(sphere).radius).toBe(4);
  });
});
