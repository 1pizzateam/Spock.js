import { readFileSync } from 'node:fs';
import { Sphere, Box, Vec3, Mat4x3, Quat } from '../../build/es6/spock.js';

describe('Sphere', () => {
  test('creates default sphere at origin', () => {
    const sphere = new Sphere();
    expect(sphere.center.isOrigin()).toBe(true);
    expect(sphere.radius).toBe(0);
  });

  test('setFromPoints calculates enclosing sphere', () => {
    const sphere = new Sphere().setFromPoints([new Vec3(-2, 0, 0), new Vec3(2, 0, 0)]);
    expect(sphere.center.x).toBe(0);
    expect(sphere.radius).toBeGreaterThanOrEqual(2);
  });

  test('setFromPoints accepts Vec3 lists, a custom center and planar points', () => {
    const fromVectors = new Sphere().setFromPoints([new Vec3(-2, 0, 0), new Vec3(2, 0, 0)]);
    expect(fromVectors.radius).toBeCloseTo(2);

    const custom = new Sphere().setFromPoints([new Vec3(1, 0, 0), new Vec3(3, 0, 0)], new Vec3(0, 0, 0));
    expect(custom.radius).toBe(3);

    const flat = new Sphere().setFromPoints([new Vec3(0, 0, 0), new Vec3(4, 2, 0)]);
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

  test('applyMatrix4 works with a translated Mat4x3', () => {
    const sphere = new Sphere(new Vec3(0, 1, 0), 2);
    const mat = new Mat4x3();
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

  test('setFromPoints keeps the scratch Box identity across calls', () => {
    const box = Sphere._scratchBox;
    expect(box).toBeInstanceOf(Box);
    new Sphere().setFromPoints([new Vec3(-1, 0, 0), new Vec3(1, 0, 0)]);
    new Sphere().setFromPoints([new Vec3(0, 0, 0), new Vec3(2, 0, 0)]);
    new Sphere().setFromPoints([new Vec3(0, 0, 0), new Vec3(4, 2, 0)]);
    expect(Sphere._scratchBox).toBe(box);
  });

  test('consecutive calls do not leak stale scratch state', () => {
    const sphere = new Sphere();
    sphere.setFromPoints([new Vec3(-100, 0, 0), new Vec3(100, 0, 0)]);
    expect(sphere.radius).toBe(100);
    sphere.setFromPoints([new Vec3(0, 0, 0), new Vec3(2, 0, 0)]);
    expect([sphere.center.x, sphere.radius]).toEqual([1, 1]);
    sphere.setFromPoints([]);
    expect(sphere.radius).toBe(0);
  });

  test('AC-1 PointSource is readonly Vec3[] only', () => {
    const src = readFileSync(new URL('../../src/geometry/points.ts', import.meta.url), 'utf8');
    expect(src).toMatch(/PointSource\s*=\s*readonly Vec3\[\]/);
    expect(src).not.toMatch(/number\[\]|Float32Array/);
  });

  test('AC-2 readPoint and stride are gone', () => {
    for (const f of ['points', 'box', 'sphere']) {
      const src = readFileSync(new URL(`../../src/geometry/${f}.ts`, import.meta.url), 'utf8');
      expect(src).not.toContain('readPoint');
      expect(src).not.toContain('stride');
    }
  });

  test('AC-3 no instanceof or asAffine in geometry points sources', () => {
    for (const f of ['points', 'box', 'sphere']) {
      const src = readFileSync(new URL(`../../src/geometry/${f}.ts`, import.meta.url), 'utf8');
      expect(src).not.toContain('instanceof');
      expect(src).not.toContain('asAffine');
    }
  });

  test('AC-4 setFromPoints on Vec3[] yields exact centre and radius, honours optionalCenter and empty input', () => {
    const s3 = new Sphere().setFromPoints([new Vec3(-2, 0, 0), new Vec3(2, 0, 0)]);
    expect([s3.center.x, s3.radius]).toEqual([0, 2]);
    const s2 = new Sphere().setFromPoints([new Vec3(0, 0, 0), new Vec3(4, 2, 0)]);
    expect([s2.center.x, s2.center.y, s2.center.z, s2.radius]).toEqual([2, 1, 0, Math.sqrt(5)]);
    const sc = new Sphere().setFromPoints([new Vec3(1, 0, 0), new Vec3(3, 0, 0)], new Vec3(0, 0, 0));
    expect([sc.center.x, sc.radius]).toEqual([0, 3]);
    const sphere = new Sphere();
    expect(sphere.setFromPoints([])).toBe(sphere);
    expect(sphere.radius).toBe(0);
    expect(sphere.center.isOrigin()).toBe(true);
  });

  test('AC-5 applyMatrix4 scales radius by largest axis scale with Mat4x3', () => {
    const sphere = new Sphere(new Vec3(1, 0, 0), 2);
    sphere.applyMatrix4(new Mat4x3().compose(new Vec3(0, 1, 0), new Quat(), new Vec3(1, 3, 2)));
    expect(sphere.center.toArray()).toEqual([1, 1, 0]);
    expect(sphere.radius).toBeCloseTo(6);
  });

  test('AC-6 changelog documents flat PointSource, readPoint and asAffine removal', () => {
    const log = readFileSync(new URL('../../CHANGELOG.md', import.meta.url), 'utf8');
    const newest = log.slice(0, log.indexOf('Version', 10));
    for (const word of ['PointSource', 'readPoint', 'asAffine', 'Mat4x3'])
      expect(newest).toContain(word);
  });
});
