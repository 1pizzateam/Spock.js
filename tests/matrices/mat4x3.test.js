import { Mat4x3 } from '../../build/es6/matrices/mat4x3.js';
import { Vec3 } from '../../build/es6/vectors/vec3.js';

describe('Mat4x3', () => {

  it('should default to identity', () => {
    const m = new Mat4x3().toArray();
    expect(m[0]).toBe(1);
    expect(m[5]).toBe(1);
    expect(m[10]).toBe(1);
    expect(m[15]).toBe(1);
  });

  it('should compose translate after rotateX', () => {
    const m = new Mat4x3().rotateX(Math.PI / 2).translate(new Vec3(0, 2, 0)).toArray();
    expect(m[12]).toBeCloseTo(0, 3);
    expect(m[13]).toBeCloseTo(0, 3);
    expect(m[14]).toBeCloseTo(2, 3);
  });

  it('should invert a translation so the product is identity', () => {
    const original = new Mat4x3().translate(new Vec3(3, 4, 5));
    const product = new Mat4x3().copy(original).invertAffine().multiply(original).toArray();
    expect(product[0]).toBeCloseTo(1, 5);
    expect(product[12]).toBeCloseTo(0, 5);
    expect(product[13]).toBeCloseTo(0, 5);
    expect(product[14]).toBeCloseTo(0, 5);
  });

  it('should report the linear determinant', () => {
    expect(new Mat4x3().scale(new Vec3(2, 3, 4)).determinantLinear()).toBeCloseTo(24, 5);
  });

  it('should still produce a basis when up is parallel to the view axis', () => {
    const m = new Mat4x3().lookAtRH(
      new Vec3(0, 5, 0),
      new Vec3(0, 0, 0),
      new Vec3(0, 1, 0)
    ).toArray();
    expect(Number.isFinite(m[0])).toBe(true);
    expect(m[0] * m[0] + m[1] * m[1] + m[2] * m[2]).toBeCloseTo(1, 5);
  });

  it('should become identity when eye and target coincide', () => {
    const m = new Mat4x3().lookAtRH(
      new Vec3(1, 2, 3),
      new Vec3(1, 2, 3),
      new Vec3(0, 1, 0)
    ).toArray();
    expect(m[0]).toBe(1);
    expect(m[5]).toBe(1);
    expect(m[10]).toBe(1);
    expect(m[12]).toBe(0);
  });

  it('should compose scale and rotateY then rotateZ', () => {
    const scaled = new Mat4x3().scale(new Vec3(2, 3, 4)).toArray();
    expect(scaled[0]).toBeCloseTo(2, 5);
    expect(scaled[5]).toBeCloseTo(3, 5);
    expect(scaled[10]).toBeCloseTo(4, 5);
    const aroundY = new Mat4x3().rotateY(Math.PI / 2).translate(new Vec3(2, 0, 0)).toArray();
    expect(aroundY[12]).toBeCloseTo(0, 3);
    expect(aroundY[14]).toBeCloseTo(-2, 3);
    const aroundZ = new Mat4x3().rotateZ(Math.PI / 2).translate(new Vec3(2, 0, 0)).toArray();
    expect(aroundZ[12]).toBeCloseTo(0, 3);
    expect(aroundZ[13]).toBeCloseTo(2, 3);
  });

  it('should transpose the linear part and stringify', () => {
    const m = new Mat4x3(0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0).transposeLinear();
    expect(m.toArray()[1]).toBe(0);
    expect(m.toArray()[4]).toBe(1);
    expect(m.toString()).toContain('1');
  });

  it('should leave a singular affine matrix unchanged', () => {
    const singular = new Mat4x3(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3);
    const before = Array.from(singular.toArray());
    singular.invertAffine();
    expect(Array.from(singular.toArray())).toEqual(before);
  });

  it('should invert arbitrary rotations and translations so the product is identity', () => {
    for (let deg = 0; deg <= 360; deg += 30) {
      const rad = deg * Math.PI / 180;
      const original = new Mat4x3().translate(new Vec3(1, 2, 3)).rotateY(rad).rotateX(rad * 0.5);
      const product = new Mat4x3().copy(original).invertAffine().multiply(original).toArray();
      expect(product[0]).toBeCloseTo(1, 4);
      expect(product[5]).toBeCloseTo(1, 4);
      expect(product[10]).toBeCloseTo(1, 4);
      expect(product[12]).toBeCloseTo(0, 4);
      expect(product[13]).toBeCloseTo(0, 4);
      expect(product[14]).toBeCloseTo(0, 4);
    }
  });


  describe('bulk transforms', () => {
    const m = new Mat4x3().rotateY(Math.PI / 2).translate(new Vec3(1, 2, 3));
    const pts = [[1, 0, 0], [0, 1, 0], [2, -1, 5]];

    it('transformPoints matches per-point math, indexed and weighted', () => {
      const a = new Float32Array(pts.flat());
      const b = new Float32Array(pts.flat());
      // reference: full transform of all points
      m.transformPoints(a);
      const e = m.toArray();
      pts.forEach(([x, y, z], i) => {
        expect(a[i * 3]).toBeCloseTo(e[0] * x + e[4] * y + e[8] * z + e[12], 5);
        expect(a[i * 3 + 1]).toBeCloseTo(e[1] * x + e[5] * y + e[9] * z + e[13], 5);
        expect(a[i * 3 + 2]).toBeCloseTo(e[2] * x + e[6] * y + e[10] * z + e[14], 5);
      });
      // indexed + weighted: only vertex 2 at half strength, others untouched
      m.transformPoints(b, [2], [0.5]);
      expect(Array.from(b.slice(0, 6))).toEqual([1, 0, 0, 0, 1, 0]);
      expect(b[6]).toBeCloseTo(2 + (a[6] - 2) * 0.5, 5);
      expect(b[8]).toBeCloseTo(5 + (a[8] - 5) * 0.5, 5);
    });

    it('transformDirections ignores translation and skips zero weights', () => {
      const a = new Float32Array([1, 0, 0, 1, 0, 0]);
      new Mat4x3().translate(new Vec3(9, 9, 9)).transformDirections(a);
      expect(Array.from(a)).toEqual([1, 0, 0, 1, 0, 0]);
      const b = new Float32Array([1, 0, 0, 1, 0, 0]);
      new Mat4x3().rotateZ(Math.PI / 2).transformDirections(b, undefined, [0, 1]);
      expect(Array.from(b.slice(0, 3))).toEqual([1, 0, 0]);
      expect(Math.abs(b[3])).toBeLessThan(1e-5);
    });
  });
});
