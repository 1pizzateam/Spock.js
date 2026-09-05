import { Mat4 } from '../../build/es6/matrices/mat4.js';
import { Mat4x3 } from '../../build/es6/matrices/mat4x3.js';
import { Vec3 } from '../../build/es6/vectors/vec3.js';

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

});
