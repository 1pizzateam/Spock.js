import { Matrix3x3 } from '../../build/es6/matrices/matrix3x3.js';
import { Vector2 } from '../../build/es6/vectors/vector2.js';

describe('Matrix3x3', () => {

  it('should default to identity', () => {
    const m = new Matrix3x3().toArray();
    expect(Array.from(m)).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

  it('should keep 0 values instead of treating them as missing', () => {
    const m = new Matrix3x3(0, 0, 0, 0, 1, 0, 2, 3, 1).toArray();
    expect(m[0]).toBe(0);
    expect(m[6]).toBe(2);
    expect(m[7]).toBe(3);
  });

  it('should keep NaN instead of coercing it to 0', () => {
    const m = new Matrix3x3(Number.NaN, 0, 0, 0, 1, 0, 0, 0, 1).toArray();
    expect(Number.isNaN(m[0])).toBe(true);
  });

  it('should compose rotate then translate', () => {
    const m = new Matrix3x3().rotate(0).translate(new Vector2(2, 3)).toArray();
    expect(m[0]).toBeCloseTo(1, 5);
    expect(m[4]).toBeCloseTo(1, 5);
    expect(m[6]).toBeCloseTo(2, 5);
    expect(m[7]).toBeCloseTo(3, 5);
  });

  it('should compose scale then translate', () => {
    const m = new Matrix3x3()
      .scale(new Vector2(2, 1))
      .translate(new Vector2(2, 0))
      .toArray();
    expect(m[0]).toBeCloseTo(2, 5);
    expect(m[6]).toBeCloseTo(4, 5);
  });

  it('should rotate a later translation', () => {
    const m = new Matrix3x3()
      .rotate(Math.PI / 2)
      .translate(new Vector2(2, 0))
      .toArray();
    expect(m[6]).toBeCloseTo(0, 3);
    expect(m[7]).toBeCloseTo(2, 3);
  });

  it('should invert a scale so the product is identity', () => {
    const original = new Matrix3x3().scale(new Vector2(2, 4));
    const inverse = new Matrix3x3().copy(original).invert();
    const product = inverse.multiply(original).toArray();
    expect(original.determinant()).toBeCloseTo(8, 5);
    expect(product[0]).toBeCloseTo(1, 5);
    expect(product[4]).toBeCloseTo(1, 5);
    expect(product[8]).toBeCloseTo(1, 5);
  });

  it('should transpose off-diagonal entries', () => {
    const m = new Matrix3x3(0, 1, 0, 0, 0, 0, 0, 0, 1).transpose().toArray();
    expect(m[1]).toBe(0);
    expect(m[3]).toBe(1);
  });

  it('should copy, stringify and leave a singular matrix unchanged', () => {
    const source = new Matrix3x3().scale(new Vector2(2, 3));
    const copy = new Matrix3x3().copy(source);
    expect(copy.toArray()[0]).toBeCloseTo(2, 5);
    expect(copy.toString()).toContain('2');
    expect(Array.from(source.identity().toArray())).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    const singular = new Matrix3x3(0, 0, 0, 0, 0, 0, 0, 0, 1);
    const before = Array.from(singular.toArray());
    singular.invert();
    expect(Array.from(singular.toArray())).toEqual(before);
  });

  it('should multiply two translations', () => {
    const m = new Matrix3x3()
      .translate(new Vector2(1, 0))
      .multiply(new Matrix3x3().translate(new Vector2(0, 2)))
      .toArray();
    expect(m[6]).toBeCloseTo(1, 5);
    expect(m[7]).toBeCloseTo(2, 5);
  });

});
