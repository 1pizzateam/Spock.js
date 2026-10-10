import { Ray3, Sphere, Box, Vec3 } from '../../build/es6/spock.js';

describe('Ray3', () => {
  test('creates ray with origin and normalized direction', () => {
    const ray = new Ray3(new Vec3(0, 0, 0), new Vec3(0, 0, 5));
    expect(ray.direction.z).toBeCloseTo(1);
    expect(ray.direction.getMagnitude()).toBeCloseTo(1);
  });

  test('defaults to -Z from the origin', () => {
    const ray = new Ray3();
    expect(ray.origin.toArray()).toEqual([0, 0, 0]);
    expect(ray.direction.toArray()).toEqual([0, 0, -1]);
  });

  test('at returns point along ray', () => {
    const ray = new Ray3(new Vec3(1, 2, 3), new Vec3(1, 0, 0));
    expect(ray.at(10).toArray()).toEqual([11, 2, 3]);
  });

  test('set, clone and copy keep the direction normalized and independent', () => {
    const ray = new Ray3().set(new Vec3(1, 1, 1), new Vec3(0, 4, 0));
    expect(ray.direction.toArray()).toEqual([0, 1, 0]);
    const clone = ray.clone();
    clone.origin.x = 9;
    expect(ray.origin.x).toBe(1);
    expect(new Ray3().copy(ray).direction.y).toBe(1);
  });

  test('intersectSphere returns intersection point', () => {
    const ray = new Ray3(new Vec3(0, 0, -10), new Vec3(0, 0, 1));
    const sphere = new Sphere(new Vec3(0, 0, 0), 2);
    const hit = ray.intersectSphere(sphere);
    expect(hit).not.toBeNull();
    expect(hit.z).toBeCloseTo(-2);
    expect(ray.intersectsSphere(sphere)).toBe(true);

    const missRay = new Ray3(new Vec3(0, 10, -10), new Vec3(0, 0, 1));
    expect(missRay.intersectSphere(sphere)).toBeNull();
  });

  test('intersectBox returns intersection point', () => {
    const ray = new Ray3(new Vec3(0, 0, -10), new Vec3(0, 0, 1));
    const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    const hit = ray.intersectBox(box);
    expect(hit).not.toBeNull();
    expect(hit.z).toBeCloseTo(-1);
    expect(ray.intersectsBox(box)).toBe(true);

    const missRay = new Ray3(new Vec3(5, 5, -10), new Vec3(0, 0, 1));
    expect(missRay.intersectBox(box)).toBeNull();
  });

  test('intersectBox handles ray parallel to axis with origin on boundary without NaN', () => {
    const ray = new Ray3(new Vec3(-1, 0, -10), new Vec3(0, 0, 1));
    const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    const hit = ray.intersectBox(box);
    expect(hit).not.toBeNull();
    expect(Number.isNaN(hit.x) || Number.isNaN(hit.y) || Number.isNaN(hit.z)).toBe(false);
    expect(hit.z).toBeCloseTo(-1);
  });

  test('intersectBox handles rays starting inside and pointing away', () => {
    const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    expect(new Ray3(new Vec3(0, 0, 0), new Vec3(1, 0, 0)).intersectBox(box).toArray()).toEqual([1, 0, 0]);
    expect(new Ray3(new Vec3(0, 0, 5), new Vec3(0, 0, 1)).intersectBox(box)).toBeNull();
  });

  test('intersectTriangle detects hit and miss on triangle', () => {
    const ray = new Ray3(new Vec3(0.2, 0.2, -5), new Vec3(0, 0, 1));
    const a = new Vec3(0, 0, 0);
    const b = new Vec3(1, 0, 0);
    const c = new Vec3(0, 1, 0);

    const hit = ray.intersectTriangle(a, b, c);
    expect(hit).not.toBeNull();
    expect(hit.z).toBeCloseTo(0);

    const missRay = new Ray3(new Vec3(2, 2, -5), new Vec3(0, 0, 1));
    expect(missRay.intersectTriangle(a, b, c)).toBeNull();
  });

  test('intersectTriangle backface culling', () => {
    const a = new Vec3(0, 0, 0);
    const b = new Vec3(1, 0, 0);
    const c = new Vec3(0, 1, 0);
    const front = new Ray3(new Vec3(0.2, 0.2, 5), new Vec3(0, 0, -1));
    const back = new Ray3(new Vec3(0.2, 0.2, -5), new Vec3(0, 0, 1));
    expect(front.intersectTriangle(a, b, c, true)).not.toBeNull();
    expect(back.intersectTriangle(a, b, c, false)).not.toBeNull();
    expect(back.intersectTriangle(a, b, c, true)).toBeNull();
  });
});
