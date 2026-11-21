import { Mat3 } from '../../build/es6/matrices/mat3.js';
import { Mat4 } from '../../build/es6/matrices/mat4.js';
import { Vec2 } from '../../build/es6/vectors/vec2.js';
import { Vec3 } from '../../build/es6/vectors/vec3.js';

describe('Mat3', () => {

  it('should default to identity', () => {
    const m = new Mat3().toArray();
    expect(Array.from(m)).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

  it('should keep 0 values instead of treating them as missing', () => {
    const m = new Mat3(0, 0, 0, 0, 1, 0, 2, 3, 1).toArray();
    expect(m[0]).toBe(0);
    expect(m[6]).toBe(2);
    expect(m[7]).toBe(3);
  });

  it('should keep NaN instead of coercing it to 0', () => {
    const m = new Mat3(Number.NaN, 0, 0, 0, 1, 0, 0, 0, 1).toArray();
    expect(Number.isNaN(m[0])).toBe(true);
  });

  it('should compose rotate then translate', () => {
    const m = new Mat3().rotate(0).translate(new Vec2(2, 3)).toArray();
    expect(m[0]).toBeCloseTo(1, 5);
    expect(m[4]).toBeCloseTo(1, 5);
    expect(m[6]).toBeCloseTo(2, 5);
    expect(m[7]).toBeCloseTo(3, 5);
  });

  it('should compose scale then translate', () => {
    const m = new Mat3()
      .scale(new Vec2(2, 1))
      .translate(new Vec2(2, 0))
      .toArray();
    expect(m[0]).toBeCloseTo(2, 5);
    expect(m[6]).toBeCloseTo(4, 5);
  });

  it('should rotate a later translation', () => {
    const m = new Mat3()
      .rotate(Math.PI / 2)
      .translate(new Vec2(2, 0))
      .toArray();
    expect(m[6]).toBeCloseTo(0, 3);
    expect(m[7]).toBeCloseTo(2, 3);
  });

  it('should invert a scale so the product is identity', () => {
    const original = new Mat3().scale(new Vec2(2, 4));
    const inverse = new Mat3().copy(original).invert();
    const product = inverse.multiply(original).toArray();
    expect(original.determinant()).toBeCloseTo(8, 5);
    expect(product[0]).toBeCloseTo(1, 5);
    expect(product[4]).toBeCloseTo(1, 5);
    expect(product[8]).toBeCloseTo(1, 5);
  });

  it('should transpose off-diagonal entries', () => {
    const m = new Mat3(0, 1, 0, 0, 0, 0, 0, 0, 1).transpose().toArray();
    expect(m[1]).toBe(0);
    expect(m[3]).toBe(1);
  });

  it('should copy, stringify and leave a singular matrix unchanged', () => {
    const source = new Mat3().scale(new Vec2(2, 3));
    const copy = new Mat3().copy(source);
    expect(copy.toArray()[0]).toBeCloseTo(2, 5);
    expect(copy.toString()).toContain('2');
    expect(Array.from(source.identity().toArray())).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    const singular = new Mat3(0, 0, 0, 0, 0, 0, 0, 0, 1);
    const before = Array.from(singular.toArray());
    singular.invert();
    expect(Array.from(singular.toArray())).toEqual(before);
  });

  it('should multiply two translations', () => {
    const m = new Mat3()
      .translate(new Vec2(1, 0))
      .multiply(new Mat3().translate(new Vec2(0, 2)))
      .toArray();
    expect(m[6]).toBeCloseTo(1, 5);
    expect(m[7]).toBeCloseTo(2, 5);
  });

  it('AC-2: Mat3 multi-argument constructor correctly populates entries and defaults omitted arguments to 0', () => {
    const full = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9).toArray();
    expect(Array.from(full)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const partial = new Mat3(1, 2, 3).toArray();
    expect(Array.from(partial)).toEqual([1, 2, 3, 0, 0, 0, 0, 0, 0]);
  });

  it('AC-1: Unit tests verify setLookAtAxes generates valid orthonormal bases when the eye-to-target view vector is collinear with (0, 1, 0) and (0, -1, 0)', () => {
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

  it('AC-3: Unit tests verify Mat4 multi-argument constructor correctly populates entries and defaults omitted arguments to 0', () => {
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

  it('AC-4: Unit tests verify Mat4.perspective produces expected frustum projection matrix components', () => {
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

});
