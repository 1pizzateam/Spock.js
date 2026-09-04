import { Matrix4x4 } from '../../build/es6/matrices/matrix4x4.js';
import { Matrix4x3 } from '../../build/es6/matrices/matrix4x3.js';
import { Vector3 } from '../../build/es6/vectors/vector3.js';

describe('Matrix4x4', () => {

  it('should default to identity', () => {
    const m = new Matrix4x4().toArray();
    expect(Array.from(m)).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  });

  it('should compose translate after rotate', () => {
    const m = new Matrix4x4().rotateZ(Math.PI / 2).translate(new Vector3(2, 0, 0)).toArray();
    expect(m[12]).toBeCloseTo(0, 3);
    expect(m[13]).toBeCloseTo(2, 3);
    expect(m[14]).toBeCloseTo(0, 3);
    expect(m[15]).toBe(1);
  });

  it('should multiply a perspective matrix without forcing an affine last row', () => {
    const perspective = new Matrix4x4().perspective(90, 1, 0.1, 100);
    const product = new Matrix4x4().multiply(perspective).toArray();
    const source = perspective.toArray();
    expect(product[11]).toBe(source[11]);
    expect(product[15]).toBe(source[15]);
    expect(product[11]).toBe(-1);
    expect(product[15]).toBe(0);
  });

  it('should return the live buffer and copy into a provided array', () => {
    const matrix = new Matrix4x4();
    const live = matrix.toArray();
    const snapshot = new Float32Array(16);
    expect(matrix.toArray(snapshot)).toBe(snapshot);
    expect(snapshot[0]).toBe(1);
    live[12] = 7;
    expect(matrix.toArray()[12]).toBe(7);
    expect(snapshot[12]).toBe(0);
  });

  it('should match Matrix4x3 lookAtRH in the affine slots', () => {
    const eye = new Vector3(0, 0, 5);
    const target = new Vector3(0, 0, 0);
    const up = new Vector3(0, 1, 0);
    const a = new Matrix4x4().lookAtRH(eye, target, up).toArray();
    const b = new Matrix4x3().lookAtRH(eye, target, up).toArray();
    for (let i = 0; i < 16; i++)
      expect(a[i]).toBeCloseTo(b[i], 5);
  });

  it('should invert a perspective matrix so the product is identity', () => {
    const original = new Matrix4x4().perspective(90, 1, 0.1, 100);
    const product = new Matrix4x4().copy(original).invert().multiply(original).toArray();
    expect(product[0]).toBeCloseTo(1, 5);
    expect(product[5]).toBeCloseTo(1, 5);
    expect(product[10]).toBeCloseTo(1, 5);
    expect(product[15]).toBeCloseTo(1, 5);
  });

  it('should compose scale and rotateX or rotateY', () => {
    const scaled = new Matrix4x4().scale(new Vector3(2, 3, 4)).toArray();
    expect(scaled[0]).toBeCloseTo(2, 5);
    expect(scaled[5]).toBeCloseTo(3, 5);
    expect(scaled[10]).toBeCloseTo(4, 5);
    const aroundX = new Matrix4x4().rotateX(Math.PI / 2).translate(new Vector3(0, 2, 0)).toArray();
    expect(aroundX[13]).toBeCloseTo(0, 3);
    expect(aroundX[14]).toBeCloseTo(2, 3);
    const aroundY = new Matrix4x4().rotateY(Math.PI / 2).translate(new Vector3(2, 0, 0)).toArray();
    expect(aroundY[12]).toBeCloseTo(0, 3);
    expect(aroundY[14]).toBeCloseTo(-2, 3);
  });

  it('should build an orthographic projection and transpose it', () => {
    const ortho = new Matrix4x4().orthographic(-1, 1, 1, -1, 1, 3).toArray();
    expect(ortho[0]).toBeCloseTo(1, 5);
    expect(ortho[5]).toBeCloseTo(1, 5);
    expect(ortho[10]).toBeCloseTo(-1, 5);
    expect(ortho[15]).toBe(1);
    const transposed = new Matrix4x4(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1).transpose().toArray();
    expect(transposed[1]).toBe(0);
    expect(transposed[4]).toBe(1);
    expect(new Matrix4x4().determinant()).toBeCloseTo(1, 5);
    expect(new Matrix4x4().toString()).toContain('1');
    const singular = new Matrix4x4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const before = Array.from(singular.toArray());
    singular.invert();
    expect(Array.from(singular.toArray())).toEqual(before);
  });

  it('should become identity when lookAt eye equals target', () => {
    const m = new Matrix4x4().lookAtRH(
      new Vector3(1, 2, 3),
      new Vector3(1, 2, 3),
      new Vector3(0, 1, 0)
    ).toArray();
    expect(m[0]).toBe(1);
    expect(m[15]).toBe(1);
    expect(m[12]).toBe(0);
  });

});
