import { Vector2 } from '../../build/es6/vectors/vector2.js';
import { Rectangle } from '../../build/es6/geometry/rectangle.js';

describe('Vector2', () => {

  it('should construct with the given components', () => {
    const v = new Vector2(2, 2.2);
    expect(v.x).toBe(2);
    expect(v.y).toBe(2.2);
  });

  it('should add another vector', () => {
    const v = new Vector2(2, 2.2).add(new Vector2(1, 3));
    expect(v.x).toBe(3);
    expect(v.y).toBe(5.2);
  });

  it('should detect origin', () => {
    const v = new Vector2(1, 1);
    expect(v.isOrigin()).toBe(false);
    v.origin();
    expect(v.isOrigin()).toBe(true);
  });

  it('should copy and clone', () => {
    const a = new Vector2(4, 5);
    const b = new Vector2().copy(a);
    const c = a.clone();
    expect(b.x).toBe(4);
    expect(b.y).toBe(5);
    expect(c.x).toBe(4);
    expect(c.y).toBe(5);
    expect(new Vector2(4, 5).equals(new Vector2(4, 5))).toBe(true);
    expect(new Vector2(4, 5).equals(new Vector2(4, 6))).toBe(false);
    expect(c).not.toBe(a);
  });

  it('should report magnitude', () => {
    const v = new Vector2(3, 4);
    expect(v.getMagnitude(true)).toBe(25);
    expect(v.getMagnitude(false)).toBe(5);
  });

  it('should compute distance without mutating either vector', () => {
    const a = new Vector2(3, 4);
    const b = new Vector2(0, 0);
    expect(a.getDistance(b)).toBe(5);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(0);
    expect(b.y).toBe(0);
  });

  it('should apply setRadian(0) instead of no-op', () => {
    const v = new Vector2(0, 2);
    v.setRadian(0);
    expect(v.x).toBeCloseTo(2, 5);
    expect(v.y).toBeCloseTo(0, 5);
  });

  it('should apply setDegree(0) instead of no-op', () => {
    const v = new Vector2(0, 2);
    v.setDegree(0);
    expect(v.x).toBeCloseTo(2, 5);
    expect(v.y).toBeCloseTo(0, 5);
  });

  it('should return 0 for a vector along +X', () => {
    expect(new Vector2(1, 0).getAngle()).toBeCloseTo(0, 5);
  });

  it('should lerp between two vectors', () => {
    const v = new Vector2().lerp(new Vector2(0, 0), new Vector2(10, 10), 0.5);
    expect(v.x).toBe(5);
    expect(v.y).toBe(5);
  });

  it('should clamp to a rectangle', () => {
    const rect = new Rectangle(10, 10, 5, 5);
    const v = new Vector2(20, -4).clamp(rect);
    expect(v.x).toBe(10);
    expect(v.y).toBe(0);
  });

  it('should write components into a provided array', () => {
    const out = [9, 9, 9];
    const result = new Vector2(1, 2).toArray(out);
    expect(result).toBe(out);
    expect(out).toEqual([1, 2]);
  });

  it('should split a quadratic bezier into two curves that meet', () => {
    const p0 = new Vector2(0, 0);
    const p1 = new Vector2(0, 10);
    const p2 = new Vector2(10, 0);
    const left = [];
    const right = [];
    new Vector2().quadraticBezierSplit(p0, p1, p2, 0.5, left, right);
    expect(left).toHaveLength(3);
    expect(right).toHaveLength(3);
    const mid = new Vector2().quadraticBezier(p0, p1, p2, 0.5);
    expect(left[2].x).toBeCloseTo(mid.x, 5);
    expect(left[2].y).toBeCloseTo(mid.y, 5);
    expect(right[0].x).toBeCloseTo(mid.x, 5);
    expect(right[0].y).toBeCloseTo(mid.y, 5);
  });

  it('should approximate the length of a straight quadratic bezier', () => {
    const length = new Vector2().quadraticBezierLength(
      new Vector2(0, 0),
      new Vector2(5, 0),
      new Vector2(10, 0)
    );
    expect(length).toBeCloseTo(10, 5);
    expect(new Vector2().quadraticBezierParameterAtLength(
      new Vector2(0, 0),
      new Vector2(5, 0),
      new Vector2(10, 0),
      5
    )).toBeCloseTo(0.5, 5);
  });

  it('should set components from scalars and arrays', () => {
    const v = new Vector2(1, 2).setScalar(null, 8);
    expect(v.x).toBe(1);
    expect(v.y).toBe(8);
    v.setArray([4, 5, 6], 1);
    expect(v.x).toBe(5);
    expect(v.y).toBe(6);
  });

  it('should compare against a scalar and report a positive vector', () => {
    expect(new Vector2(2, 2).isEqualTo(2)).toBe(true);
    expect(new Vector2(2, 3).isEqualTo(2)).toBe(false);
    expect(new Vector2(1, 0).isPositive()).toBe(true);
    expect(new Vector2(-1, 0).isPositive()).toBe(false);
  });

  it('should add, subtract, multiply and divide component-wise', () => {
    expect(new Vector2(1, 2).addScalar(3)).toEqual(expect.objectContaining({ x: 4, y: 5 }));
    expect(new Vector2(1, 2).addScaledVector(new Vector2(2, 3), 2)).toEqual(expect.objectContaining({ x: 5, y: 8 }));
    expect(new Vector2(4, 6).addComponents()).toBe(10);
    expect(new Vector2(5, 7).subtract(new Vector2(1, 2))).toEqual(expect.objectContaining({ x: 4, y: 5 }));
    expect(new Vector2(5, 7).subtractScalar(1)).toEqual(expect.objectContaining({ x: 4, y: 6 }));
    expect(new Vector2(5, 7).subtractScaledVector(new Vector2(1, 2), 2)).toEqual(expect.objectContaining({ x: 3, y: 3 }));
    expect(new Vector2(2, 3).multiply(new Vector2(4, 5))).toEqual(expect.objectContaining({ x: 8, y: 15 }));
    expect(new Vector2(2, 3).multiplyScaledVector(new Vector2(2, 2), 2)).toEqual(expect.objectContaining({ x: 8, y: 12 }));
    expect(new Vector2(8, 6).divide(new Vector2(2, 3))).toEqual(expect.objectContaining({ x: 4, y: 2 }));
    expect(new Vector2(8, 6).divideScalar(2)).toEqual(expect.objectContaining({ x: 4, y: 3 }));
    expect(new Vector2(8, 6).divideScaledVector(new Vector2(2, 3), 2)).toEqual(expect.objectContaining({ x: 2, y: 1 }));
    expect(new Vector2(4, 6).halve()).toEqual(expect.objectContaining({ x: 2, y: 3 }));
  });

  it('should scale one axis or both', () => {
    expect(new Vector2(2, 3).scale(2)).toEqual(expect.objectContaining({ x: 4, y: 6 }));
    expect(new Vector2(2, 3).scale(2, 'x')).toEqual(expect.objectContaining({ x: 4, y: 3 }));
    expect(new Vector2(2, 3).scale(2, 'y')).toEqual(expect.objectContaining({ x: 2, y: 6 }));
  });

  it('should clamp axes with min and max helpers', () => {
    expect(new Vector2(1, 5).max(new Vector2(3, 2))).toEqual(expect.objectContaining({ x: 3, y: 5 }));
    expect(new Vector2(1, 5).min(new Vector2(3, 2))).toEqual(expect.objectContaining({ x: 1, y: 2 }));
    expect(new Vector2(1, 5).maxScalar(3)).toEqual(expect.objectContaining({ x: 3, y: 5 }));
    expect(new Vector2(1, 5).minScalar(3)).toEqual(expect.objectContaining({ x: 1, y: 3 }));
  });

  it('should normalize, flip signs and round axes', () => {
    const unit = new Vector2(3, 4).normalize();
    expect(unit.getMagnitude()).toBeCloseTo(1, 5);
    expect(new Vector2(0, 0).normalize().isOrigin()).toBe(true);
    expect(new Vector2(-2, 3).absolute()).toEqual(expect.objectContaining({ x: 2, y: 3 }));
    expect(new Vector2(-2, 3).absolute('x')).toEqual(expect.objectContaining({ x: 2, y: 3 }));
    expect(new Vector2(-2, -3).absolute('y')).toEqual(expect.objectContaining({ x: -2, y: 3 }));
    expect(new Vector2(1, -2).opposite()).toEqual(expect.objectContaining({ x: -1, y: 2 }));
    expect(new Vector2(1, -2).opposite('y')).toEqual(expect.objectContaining({ x: 1, y: 2 }));
    expect(new Vector2(1.8, 2.2).floor()).toEqual(expect.objectContaining({ x: 1, y: 2 }));
    expect(new Vector2(1.8, 2.2).ceil()).toEqual(expect.objectContaining({ x: 2, y: 3 }));
    expect(new Vector2(1.8, 2.2).floor('x')).toEqual(expect.objectContaining({ x: 1, y: 2.2 }));
    expect(new Vector2(1.8, 2.2).ceil('y')).toEqual(expect.objectContaining({ x: 1.8, y: 3 }));
  });

  it('should report min and max axes and the dot product', () => {
    expect(new Vector2(1, 4).getMaxAxis()).toBe('y');
    expect(new Vector2(1, 4).getMinAxis()).toBe('x');
    expect(new Vector2(2, 2).getMaxAxis()).toBe('x');
    expect(new Vector2(1, 2).dotProduct(new Vector2(3, 4))).toBe(11);
  });

  it('should set the min, max and opposite axes', () => {
    expect(new Vector2(1, 4).setMinAxis(9)).toEqual(expect.objectContaining({ x: 9, y: 4 }));
    expect(new Vector2(1, 4).setMaxAxis(9)).toEqual(expect.objectContaining({ x: 1, y: 9 }));
    expect(new Vector2(1, 4).setOppositeAxis('x', 7)).toEqual(expect.objectContaining({ x: 1, y: 7 }));
  });

  it('should evaluate cubic beziers and split them', () => {
    const p0 = new Vector2(0, 0);
    const p1 = new Vector2(0, 0);
    const p2 = new Vector2(10, 0);
    const p3 = new Vector2(10, 0);
    const point = new Vector2().cubicBezier(p0, p1, p2, p3, 0.5);
    expect(point.x).toBeCloseTo(5, 5);
    expect(point.y).toBeCloseTo(0, 5);
    const tangent = new Vector2().cubicBezierDerivative(p0, p1, p2, p3, 0);
    expect(tangent.x).toBeCloseTo(0, 5);
    const left = [];
    const right = [];
    new Vector2().cubicBezierSplit(p0, p1, p2, p3, 0.5, left, right);
    expect(left).toHaveLength(4);
    expect(right[0].x).toBeCloseTo(left[3].x, 5);
    expect(new Vector2().cubicBezierLength(p0, p1, p2, p3)).toBeCloseTo(10, 5);
    expect(new Vector2().cubicBezierParameterAtLength(p0, p1, p2, p3, 5)).toBeCloseTo(0.5, 5);
  });

  it('should export a string and a quadratic tangent', () => {
    expect(new Vector2(1, 2).toString()).toBe('(x = 1; y = 2)');
    expect(new Vector2(3, 4).getMagnitude(true)).toBe(25);
    expect(new Vector2(0, 0).getDistance(new Vector2(3, 4), true)).toBe(25);
    const tangent = new Vector2().quadraticBezierDerivative(
      new Vector2(0, 0),
      new Vector2(1, 0),
      new Vector2(2, 0),
      0
    );
    expect(tangent.x).toBe(2);
    expect(tangent.y).toBe(0);
  });

});
