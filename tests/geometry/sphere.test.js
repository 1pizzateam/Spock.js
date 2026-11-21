import { readFileSync } from 'node:fs';
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
  test('AC-1 setFromPoints keeps scratch Box and Vec3 identity across calls', () => {
    const box = Sphere._scratchBox;
    const tmp = Sphere._scratchTmp;
    expect(box).toBeInstanceOf(Box);
    expect(tmp).toBeInstanceOf(Vec3);
    new Sphere().setFromPoints([new Vec3(-1, 0, 0), new Vec3(1, 0, 0)]);
    new Sphere().setFromPoints([0, 0, 0, 2, 0, 0]);
    new Sphere().setFromPoints([0, 0, 4, 2], undefined, 2);
    expect(Sphere._scratchBox).toBe(box);
    expect(Sphere._scratchTmp).toBe(tmp);
  });

  test('AC-2 setFromPoints yields exact center and radius for all input shapes', () => {
    const s3 = new Sphere().setFromPoints([-2, 0, 0, 2, 0, 0]);
    expect(s3.center.x).toBe(0);
    expect(s3.radius).toBe(2);
    const s2 = new Sphere().setFromPoints([0, 0, 4, 2], undefined, 2);
    expect([s2.center.x, s2.center.y, s2.center.z, s2.radius]).toEqual([2, 1, 0, Math.sqrt(5)]);
    const sv = new Sphere().setFromPoints([new Vec3(-2, 0, 0), new Vec3(2, 0, 0)]);
    expect([sv.center.x, sv.radius]).toEqual([0, 2]);
    const sc = new Sphere().setFromPoints([1, 0, 0, 3, 0, 0], new Vec3(0, 0, 0));
    expect([sc.center.x, sc.radius]).toEqual([0, 3]);
  });

  test('AC-3 consecutive calls do not leak stale scratch state', () => {
    const sphere = new Sphere();
    sphere.setFromPoints([-100, 0, 0, 100, 0, 0]);
    expect(sphere.radius).toBe(100);
    sphere.setFromPoints([0, 0, 0, 2, 0, 0]);
    expect([sphere.center.x, sphere.radius]).toEqual([1, 1]);
    sphere.setFromPoints([]);
    expect(sphere.radius).toBe(0);
  });

  test('AC-4 empty input yields radius 0 and returns this', () => {
    const sphere = new Sphere();
    expect(sphere.setFromPoints([])).toBe(sphere);
    expect(sphere.radius).toBe(0);
    expect(sphere.center.isOrigin()).toBe(true);
  });

  test('AC-5 existing Sphere tests pass unchanged', () => {
    expect(new Sphere().setFromPoints([-2, 0, 0, 2, 0, 0]).radius).toBe(2);
  });

  test('AC-6 changelog documents the scratch reuse change', () => {
    const log = readFileSync(new URL('../../CHANGELOG.md', import.meta.url), 'utf8');
    expect(log).toContain('Sphere.setFromPoints');
    expect(log).toMatch(/scratch `Box` and `Vec3`/);
  });
});
