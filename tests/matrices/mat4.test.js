import { Mat4 } from '../../build/es6/matrices/mat4.js';
import { Mat4x3 } from '../../build/es6/matrices/mat4x3.js';
import { Vec3 } from '../../build/es6/vectors/vec3.js';
import { Box } from '../../build/es6/geometry/box.js';
import fs from 'fs';

describe('Mat4', () => {

  it('should default to identity', () => {
    const m = new Mat4().toArray();
    expect(Array.from(m)).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  });

  it('should compose translate after rotate', () => {
    const m = new Mat4().rotateZ(Math.PI / 2).translate(new Vec3(2, 0, 0)).toArray();
    expect(m[12]).toBeCloseTo(0, 3);
    expect(m[13]).toBeCloseTo(2, 3);
    expect(m[14]).toBeCloseTo(0, 3);
    expect(m[15]).toBe(1);
  });

  it('should multiply a perspective matrix without forcing an affine last row', () => {
    const perspective = new Mat4().perspective(90, 1, 0.1, 100);
    const product = new Mat4().multiply(perspective).toArray();
    const source = perspective.toArray();
    expect(product[11]).toBe(source[11]);
    expect(product[15]).toBe(source[15]);
    expect(product[11]).toBe(-1);
    expect(product[15]).toBe(0);
  });

  it('should return the live buffer and copy into a provided array', () => {
    const matrix = new Mat4();
    const live = matrix.toArray();
    const snapshot = new Float32Array(16);
    expect(matrix.toArray(snapshot)).toBe(snapshot);
    expect(snapshot[0]).toBe(1);
    live[12] = 7;
    expect(matrix.toArray()[12]).toBe(7);
    expect(snapshot[12]).toBe(0);
  });

  it('should match Mat4x3 lookAtRH in the affine slots', () => {
    const eye = new Vec3(0, 0, 5);
    const target = new Vec3(0, 0, 0);
    const up = new Vec3(0, 1, 0);
    const a = new Mat4().lookAtRH(eye, target, up).toArray();
    const b = new Mat4x3().lookAtRH(eye, target, up).toArray();
    for (let i = 0; i < 16; i++)
      expect(a[i]).toBeCloseTo(b[i], 5);
  });

  it('should invert a perspective matrix so the product is identity', () => {
    const original = new Mat4().perspective(90, 1, 0.1, 100);
    const product = new Mat4().copy(original).invert().multiply(original).toArray();
    expect(product[0]).toBeCloseTo(1, 5);
    expect(product[5]).toBeCloseTo(1, 5);
    expect(product[10]).toBeCloseTo(1, 5);
    expect(product[15]).toBeCloseTo(1, 5);
  });

  it('should compose scale and rotateX or rotateY', () => {
    const scaled = new Mat4().scale(new Vec3(2, 3, 4)).toArray();
    expect(scaled[0]).toBeCloseTo(2, 5);
    expect(scaled[5]).toBeCloseTo(3, 5);
    expect(scaled[10]).toBeCloseTo(4, 5);
    const aroundX = new Mat4().rotateX(Math.PI / 2).translate(new Vec3(0, 2, 0)).toArray();
    expect(aroundX[13]).toBeCloseTo(0, 3);
    expect(aroundX[14]).toBeCloseTo(2, 3);
    const aroundY = new Mat4().rotateY(Math.PI / 2).translate(new Vec3(2, 0, 0)).toArray();
    expect(aroundY[12]).toBeCloseTo(0, 3);
    expect(aroundY[14]).toBeCloseTo(-2, 3);
  });

  it('should build an orthographic projection and transpose it', () => {
    const ortho = new Mat4().orthographic(-1, 1, 1, -1, 1, 3).toArray();
    expect(ortho[0]).toBeCloseTo(1, 5);
    expect(ortho[5]).toBeCloseTo(1, 5);
    expect(ortho[10]).toBeCloseTo(-1, 5);
    expect(ortho[15]).toBe(1);
    const transposed = new Mat4(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1).transpose().toArray();
    expect(transposed[1]).toBe(0);
    expect(transposed[4]).toBe(1);
    expect(new Mat4().determinant()).toBeCloseTo(1, 5);
    expect(new Mat4().toString()).toContain('1');
    const singular = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const before = Array.from(singular.toArray());
    singular.invert();
    expect(Array.from(singular.toArray())).toEqual(before);
  });

  it('should become identity when lookAt eye equals target', () => {
    const m = new Mat4().lookAtRH(
      new Vec3(1, 2, 3),
      new Vec3(1, 2, 3),
      new Vec3(0, 1, 0)
    ).toArray();
    expect(m[0]).toBe(1);
    expect(m[15]).toBe(1);
    expect(m[12]).toBe(0);
  });

  it('AC-1: setLookAtAxes generates valid orthonormal bases when the eye-to-target view vector is collinear with (0, 1, 0) and (0, -1, 0)', () => {
    // Looking straight down along Y axis with up (0, 1, 0)
    const downY = new Mat4().lookAtRH(
      new Vec3(0, 10, 0),
      new Vec3(0, 0, 0),
      new Vec3(0, 1, 0)
    ).toArray();
    for (let i = 0; i < 16; i++) {
      expect(Number.isNaN(downY[i])).toBe(false);
      expect(Number.isFinite(downY[i])).toBe(true);
    }
    // Check right/x-axis length is 1, up/y-axis length is 1, forward/z-axis length is 1
    const xLenSq1 = downY[0] * downY[0] + downY[1] * downY[1] + downY[2] * downY[2];
    const yLenSq1 = downY[4] * downY[4] + downY[5] * downY[5] + downY[6] * downY[6];
    const zLenSq1 = downY[8] * downY[8] + downY[9] * downY[9] + downY[10] * downY[10];
    expect(xLenSq1).toBeCloseTo(1, 5);
    expect(yLenSq1).toBeCloseTo(1, 5);
    expect(zLenSq1).toBeCloseTo(1, 5);

    // Looking straight up along Y axis with up (0, -1, 0)
    const upY = new Mat4().lookAtRH(
      new Vec3(0, -10, 0),
      new Vec3(0, 0, 0),
      new Vec3(0, -1, 0)
    ).toArray();
    for (let i = 0; i < 16; i++) {
      expect(Number.isNaN(upY[i])).toBe(false);
      expect(Number.isFinite(upY[i])).toBe(true);
    }
    const xLenSq2 = upY[0] * upY[0] + upY[1] * upY[1] + upY[2] * upY[2];
    const yLenSq2 = upY[4] * upY[4] + upY[5] * upY[5] + upY[6] * upY[6];
    const zLenSq2 = upY[8] * upY[8] + upY[9] * upY[9] + upY[10] * upY[10];
    expect(xLenSq2).toBeCloseTo(1, 5);
    expect(yLenSq2).toBeCloseTo(1, 5);
    expect(zLenSq2).toBeCloseTo(1, 5);
  });

  it('AC-3: Mat4 multi-argument constructor correctly populates entries and defaults omitted arguments to 0', () => {
    const full = new Mat4(
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ).toArray();
    expect(Array.from(full)).toEqual([
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ]);

    const partial = new Mat4(1, 2, 3).toArray();
    expect(Array.from(partial)).toEqual([
      1, 2, 3, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ]);
  });

  it('AC-4: Mat4.perspective produces expected frustum projection matrix components', () => {
    const fovy = 60;
    const aspect = 16 / 9;
    const near = 0.5;
    const far = 500;

    const m = new Mat4().perspective(fovy, aspect, near, far).toArray();

    const rad = (fovy * Math.PI) / 180;
    const expectedF = 1 / Math.tan(rad / 2);
    const expectedRangeInv = 1 / (near - far);

    expect(m[0]).toBeCloseTo(expectedF / aspect, 5);
    expect(m[1]).toBe(0);
    expect(m[2]).toBe(0);
    expect(m[3]).toBe(0);

    expect(m[4]).toBe(0);
    expect(m[5]).toBeCloseTo(expectedF, 5);
    expect(m[6]).toBe(0);
    expect(m[7]).toBe(0);

    expect(m[8]).toBe(0);
    expect(m[9]).toBe(0);
    expect(m[10]).toBeCloseTo((near + far) * expectedRangeInv, 5);
    expect(m[11]).toBe(-1);

    expect(m[12]).toBe(0);
    expect(m[13]).toBe(0);
    expect(m[14]).toBeCloseTo(near * far * expectedRangeInv * 2, 5);
    expect(m[15]).toBe(0);
  });

  it('AC-1 orthographicBox builds the expected matrix for a symmetric Box', () => {
    const m = new Mat4().orthographicBox(new Box(new Vec3(-1, -1, 1), new Vec3(1, 1, 3))).toArray();
    expect(m[0]).toBeCloseTo(1, 5);
    expect(m[5]).toBeCloseTo(1, 5);
    expect(m[10]).toBeCloseTo(-1, 5);
    expect(m[12]).toBeCloseTo(0, 5);
    expect(m[13]).toBeCloseTo(0, 5);
    expect(m[14]).toBeCloseTo(-2, 5);
    expect(m[15]).toBeCloseTo(1, 5);
  });

  it('AC-2 orthographicBox matches scalar orthographic for an asymmetric Box', () => {
    const a = new Mat4().orthographicBox(new Box(new Vec3(-2, -1, 0.5), new Vec3(6, 3, 10))).toArray();
    const b = new Mat4().orthographic(-2, 6, 3, -1, 0.5, 10).toArray();
    for (let i = 0; i < 16; i++)
      expect(a[i]).toBe(b[i]);
  });

  it('AC-3 orthographicBox returns the same instance and does not mutate the Box', () => {
    const box = new Box(new Vec3(-2, -1, 0.5), new Vec3(6, 3, 10));
    const m = new Mat4();
    expect(m.orthographicBox(box)).toBe(m);
    expect([box.min.x, box.min.y, box.min.z]).toEqual([-2, -1, 0.5]);
    expect([box.max.x, box.max.y, box.max.z]).toEqual([6, 3, 10]);
  });

  it('AC-4 scalar orthographic output is unchanged', () => {
    const m = new Mat4().orthographic(-1, 1, 1, -1, 1, 3).toArray();
    expect(m[12]).toBeCloseTo(0, 5);
    expect(m[13]).toBeCloseTo(0, 5);
    expect(m[14]).toBeCloseTo(-2, 5);
  });

  it('AC-5 orthographicBox on the default Box does not throw and yields non-finite entries', () => {
    let m;
    expect(() => { m = new Mat4().orthographicBox(new Box()).toArray(); }).not.toThrow();
    expect(Array.from(m).some((v) => !Number.isFinite(v))).toBe(true);
  });

  it('AC-6 orthographic is deprecated and Box is a type-only import', () => {
    const src = fs.readFileSync('src/matrices/mat4.ts', 'utf8');
    const doc = src.slice(src.lastIndexOf('/**', src.indexOf('public orthographic(')), src.indexOf('public orthographic('));
    expect(doc).toContain('@deprecated');
    expect(doc).toContain('orthographicBox');
    expect(src).toContain('import type { Box }');
  });

  it('AC-7 docs and changelog mention orthographicBox and deprecate scalar orthographic', () => {
    for (const f of ['website/docs/api/mat4.md', 'website/docs/api/index.md', 'website/scripts/generate-docs.mjs', 'CHANGELOG.md']) {
      const t = fs.readFileSync(f, 'utf8');
      expect(t).toContain('orthographicBox');
      expect(t.toLowerCase()).toContain('deprecated');
    }
  });

});
