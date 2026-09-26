import { Vec2 } from '../../build/es6/vectors/vec2.js';
import { Rect } from '../../build/es6/geometry/rect.js';

describe('Vec2', () => {

  it('should construct with the given components', () => {
    const v = new Vec2(2, 2.2);
    expect(v.x).toBe(2);
    expect(v.y).toBe(2.2);
  });

  it('should add another vector', () => {
    const v = new Vec2(2, 2.2).add(new Vec2(1, 3));
    expect(v.x).toBe(3);
    expect(v.y).toBe(5.2);
  });

  it('should detect origin', () => {
    const v = new Vec2(1, 1);
    expect(v.isOrigin()).toBe(false);
    v.origin();
    expect(v.isOrigin()).toBe(true);
  });

  it('should copy and clone', () => {
    const a = new Vec2(4, 5);
    const b = new Vec2().copy(a);
    const c = a.clone();
    expect(b.x).toBe(4);
    expect(b.y).toBe(5);
    expect(c.x).toBe(4);
    expect(c.y).toBe(5);
    expect(new Vec2(4, 5).equals(new Vec2(4, 5))).toBe(true);
    expect(new Vec2(4, 5).equals(new Vec2(4, 6))).toBe(false);
    expect(c).not.toBe(a);
  });

  it('should report magnitude', () => {
    const v = new Vec2(3, 4);
    expect(v.getMagnitude(true)).toBe(25);
    expect(v.getMagnitude(false)).toBe(5);
  });

  it('should compute distance without mutating either vector', () => {
    const a = new Vec2(3, 4);
    const b = new Vec2(0, 0);
    expect(a.getDistance(b)).toBe(5);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(0);
    expect(b.y).toBe(0);
  });

  it('should apply setRadian(0) instead of no-op', () => {
    const v = new Vec2(0, 2);
    v.setRadian(0);
    expect(v.x).toBeCloseTo(2, 5);
    expect(v.y).toBeCloseTo(0, 5);
  });

  it('should apply setDegree(0) instead of no-op', () => {
    const v = new Vec2(0, 2);
    v.setDegree(0);
    expect(v.x).toBeCloseTo(2, 5);
    expect(v.y).toBeCloseTo(0, 5);
  });

  it('should return 0 for a vector along +X', () => {
    expect(new Vec2(1, 0).getAngle()).toBeCloseTo(0, 5);
  });

  it('should lerp between two vectors', () => {
    const v = new Vec2().lerp(new Vec2(0, 0), new Vec2(10, 10), 0.5);
    expect(v.x).toBe(5);
    expect(v.y).toBe(5);
  });

  it('should clamp to a rectangle', () => {
    const rect = new Rect(10, 10, 5, 5);
    const v = new Vec2(20, -4).clamp(rect);
    expect(v.x).toBe(10);
    expect(v.y).toBe(0);
  });

  it('should write components into a provided array', () => {
    const out = [9, 9, 9];
    const result = new Vec2(1, 2).toArray(out);
    expect(result).toBe(out);
    expect(out).toEqual([1, 2]);
  });

  it('should split a quadratic bezier into two curves that meet', () => {
    const p0 = new Vec2(0, 0);
    const p1 = new Vec2(0, 10);
    const p2 = new Vec2(10, 0);
    const left = [];
    const right = [];
    new Vec2().quadraticBezierSplit(p0, p1, p2, 0.5, left, right);
    expect(left).toHaveLength(3);
    expect(right).toHaveLength(3);
    const mid = new Vec2().quadraticBezier(p0, p1, p2, 0.5);
    expect(left[2].x).toBeCloseTo(mid.x, 5);
    expect(left[2].y).toBeCloseTo(mid.y, 5);
    expect(right[0].x).toBeCloseTo(mid.x, 5);
    expect(right[0].y).toBeCloseTo(mid.y, 5);
  });

  it('should approximate the length of a straight quadratic bezier', () => {
    const length = new Vec2().quadraticBezierLength(
      new Vec2(0, 0),
      new Vec2(5, 0),
      new Vec2(10, 0)
    );
    expect(length).toBeCloseTo(10, 5);
    expect(new Vec2().quadraticBezierParameterAtLength(
      new Vec2(0, 0),
      new Vec2(5, 0),
      new Vec2(10, 0),
      5
    )).toBeCloseTo(0.5, 5);
  });

  it('should set components from scalars and arrays', () => {
    const v = new Vec2(1, 2).setScalar(null, 8);
    expect(v.x).toBe(1);
    expect(v.y).toBe(8);
    v.setArray([4, 5, 6], 1);
    expect(v.x).toBe(5);
    expect(v.y).toBe(6);
  });

  it('should compare against a scalar and report a positive vector', () => {
    expect(new Vec2(2, 2).isEqualTo(2)).toBe(true);
    expect(new Vec2(2, 3).isEqualTo(2)).toBe(false);
    expect(new Vec2(1, 0).isPositive()).toBe(true);
    expect(new Vec2(-1, 0).isPositive()).toBe(false);
  });

  it('should add, subtract, multiply and divide component-wise', () => {
    expect(new Vec2(1, 2).addScalar(3)).toEqual(expect.objectContaining({ x: 4, y: 5 }));
    expect(new Vec2(1, 2).addScaledVector(new Vec2(2, 3), 2)).toEqual(expect.objectContaining({ x: 5, y: 8 }));
    expect(new Vec2(4, 6).addComponents()).toBe(10);
    expect(new Vec2(5, 7).subtract(new Vec2(1, 2))).toEqual(expect.objectContaining({ x: 4, y: 5 }));
    expect(new Vec2(5, 7).subtractScalar(1)).toEqual(expect.objectContaining({ x: 4, y: 6 }));
    expect(new Vec2(5, 7).subtractScaledVector(new Vec2(1, 2), 2)).toEqual(expect.objectContaining({ x: 3, y: 3 }));
    expect(new Vec2(2, 3).multiply(new Vec2(4, 5))).toEqual(expect.objectContaining({ x: 8, y: 15 }));
    expect(new Vec2(2, 3).multiplyScaledVector(new Vec2(2, 2), 2)).toEqual(expect.objectContaining({ x: 8, y: 12 }));
    expect(new Vec2(8, 6).divide(new Vec2(2, 3))).toEqual(expect.objectContaining({ x: 4, y: 2 }));
    expect(new Vec2(8, 6).divideScalar(2)).toEqual(expect.objectContaining({ x: 4, y: 3 }));
    expect(new Vec2(8, 6).divideScaledVector(new Vec2(2, 3), 2)).toEqual(expect.objectContaining({ x: 2, y: 1 }));
    expect(new Vec2(4, 6).halve()).toEqual(expect.objectContaining({ x: 2, y: 3 }));
  });

  it('should scale one axis or both', () => {
    expect(new Vec2(2, 3).scale(2)).toEqual(expect.objectContaining({ x: 4, y: 6 }));
    expect(new Vec2(2, 3).scale(2, 'x')).toEqual(expect.objectContaining({ x: 4, y: 3 }));
    expect(new Vec2(2, 3).scale(2, 'y')).toEqual(expect.objectContaining({ x: 2, y: 6 }));
  });

  it('should clamp axes with min and max helpers', () => {
    expect(new Vec2(1, 5).max(new Vec2(3, 2))).toEqual(expect.objectContaining({ x: 3, y: 5 }));
    expect(new Vec2(1, 5).min(new Vec2(3, 2))).toEqual(expect.objectContaining({ x: 1, y: 2 }));
    expect(new Vec2(1, 5).maxScalar(3)).toEqual(expect.objectContaining({ x: 3, y: 5 }));
    expect(new Vec2(1, 5).minScalar(3)).toEqual(expect.objectContaining({ x: 1, y: 3 }));
  });

  it('should normalize, flip signs and round axes', () => {
    const unit = new Vec2(3, 4).normalize();
    expect(unit.getMagnitude()).toBeCloseTo(1, 5);
    expect(new Vec2(0, 0).normalize().isOrigin()).toBe(true);
    expect(new Vec2(-2, 3).absolute()).toEqual(expect.objectContaining({ x: 2, y: 3 }));
    expect(new Vec2(-2, 3).absolute('x')).toEqual(expect.objectContaining({ x: 2, y: 3 }));
    expect(new Vec2(-2, -3).absolute('y')).toEqual(expect.objectContaining({ x: -2, y: 3 }));
    expect(new Vec2(1, -2).opposite()).toEqual(expect.objectContaining({ x: -1, y: 2 }));
    expect(new Vec2(1, -2).opposite('y')).toEqual(expect.objectContaining({ x: 1, y: 2 }));
    expect(new Vec2(1.8, 2.2).floor()).toEqual(expect.objectContaining({ x: 1, y: 2 }));
    expect(new Vec2(1.8, 2.2).ceil()).toEqual(expect.objectContaining({ x: 2, y: 3 }));
    expect(new Vec2(1.8, 2.2).floor('x')).toEqual(expect.objectContaining({ x: 1, y: 2.2 }));
    expect(new Vec2(1.8, 2.2).ceil('y')).toEqual(expect.objectContaining({ x: 1.8, y: 3 }));
  });

  it('should report min and max axes and the dot product', () => {
    expect(new Vec2(1, 4).getMaxAxis()).toBe('y');
    expect(new Vec2(1, 4).getMinAxis()).toBe('x');
    expect(new Vec2(2, 2).getMaxAxis()).toBe('x');
    expect(new Vec2(1, 2).dotProduct(new Vec2(3, 4))).toBe(11);
  });

  it('should set the min, max and opposite axes', () => {
    expect(new Vec2(1, 4).setMinAxis(9)).toEqual(expect.objectContaining({ x: 9, y: 4 }));
    expect(new Vec2(1, 4).setMaxAxis(9)).toEqual(expect.objectContaining({ x: 1, y: 9 }));
    expect(new Vec2(1, 4).setOppositeAxis('x', 7)).toEqual(expect.objectContaining({ x: 1, y: 7 }));
  });

  it('should evaluate cubic beziers and split them', () => {
    const p0 = new Vec2(0, 0);
    const p1 = new Vec2(0, 0);
    const p2 = new Vec2(10, 0);
    const p3 = new Vec2(10, 0);
    const point = new Vec2().cubicBezier(p0, p1, p2, p3, 0.5);
    expect(point.x).toBeCloseTo(5, 5);
    expect(point.y).toBeCloseTo(0, 5);
    const tangent = new Vec2().cubicBezierDerivative(p0, p1, p2, p3, 0);
    expect(tangent.x).toBeCloseTo(0, 5);
    const left = [];
    const right = [];
    new Vec2().cubicBezierSplit(p0, p1, p2, p3, 0.5, left, right);
    expect(left).toHaveLength(4);
    expect(right[0].x).toBeCloseTo(left[3].x, 5);
    expect(new Vec2().cubicBezierLength(p0, p1, p2, p3)).toBeCloseTo(10, 5);
    expect(new Vec2().cubicBezierParameterAtLength(p0, p1, p2, p3, 5)).toBeCloseTo(0.5, 5);
  });

  it('should export a string and a quadratic tangent', () => {
    expect(new Vec2(1, 2).toString()).toBe('(x = 1; y = 2)');
    expect(new Vec2(3, 4).getMagnitude(true)).toBe(25);
    expect(new Vec2(0, 0).getDistance(new Vec2(3, 4), true)).toBe(25);
    const tangent = new Vec2().quadraticBezierDerivative(
      new Vec2(0, 0),
      new Vec2(1, 0),
      new Vec2(2, 0),
      0
    );
    expect(tangent.x).toBe(2);
    expect(tangent.y).toBe(0);
  });

  it('should compute 2D crossProduct, perp, and perpCW', () => {
    const a = new Vec2(3, 4);
    const b = new Vec2(2, -1);
    // a.x * b.y - a.y * b.x = 3 * (-1) - 4 * 2 = -3 - 8 = -11
    expect(a.crossProduct(b)).toBe(-11);

    const v1 = new Vec2(3, 4).perp();
    expect(v1.x).toBe(-4);
    expect(v1.y).toBe(3);

    const v2 = new Vec2(3, 4).perpCW();
    expect(v2.x).toBe(4);
    expect(v2.y).toBe(-3);
  });

  it('should project and reflect across a normal', () => {
    // Normal along +Y
    const normalY = new Vec2(0, 1);
    const v = new Vec2(3, 4);

    const proj = v.clone().project(normalY);
    expect(proj.x).toBe(0);
    expect(proj.y).toBe(4);

    const refl = v.clone().reflect(normalY);
    expect(refl.x).toBe(3);
    expect(refl.y).toBe(-4);

    // Normal along +X
    const normalX = new Vec2(1, 0);
    const reflX = v.clone().reflect(normalX);
    expect(reflX.x).toBe(-3);
    expect(reflX.y).toBe(4);
  });

  it('should isolate min and max axes in place', () => {
    const v1 = new Vec2(5, 2);
    expect(v1.isolateMinAxis()).toBe('y');
    expect(v1.x).toBe(0);
    expect(v1.y).toBe(2);

    const v2 = new Vec2(1, 8);
    expect(v2.isolateMinAxis()).toBe('x');
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(0);

    const v3 = new Vec2(5, 2);
    expect(v3.isolateMaxAxis()).toBe('x');
    expect(v3.x).toBe(5);
    expect(v3.y).toBe(0);

    const v4 = new Vec2(1, 8);
    expect(v4.isolateMaxAxis()).toBe('y');
    expect(v4.x).toBe(0);
    expect(v4.y).toBe(8);
  });

  it('should compute sign component-wise in-place', () => {
    const v = new Vec2(-10.5, 4.2).sign();
    expect(v.x).toBe(-1);
    expect(v.y).toBe(1);

    const zero = new Vec2(0, -0).sign();
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(-0);
  });

  it('should project to min and max axes with optional reference signs', () => {
    // Min axis without reference
    const a = new Vec2(10, 4).projectToMinAxis();
    expect(a.x).toBe(0);
    expect(a.y).toBe(4);

    const b = new Vec2(2, 9).projectToMinAxis();
    expect(b.x).toBe(2);
    expect(b.y).toBe(0);

    // Min axis with reference
    const c = new Vec2(5, 3).projectToMinAxis(new Vec2(-1, -1));
    expect(c.x).toBe(0);
    expect(c.y).toBe(-3);

    const d = new Vec2(2, 7).projectToMinAxis(new Vec2(-10, 5));
    expect(d.x).toBe(-2);
    expect(d.y).toBe(0);

    // Max axis without reference
    const e = new Vec2(10, 4).projectToMaxAxis();
    expect(e.x).toBe(10);
    expect(e.y).toBe(0);

    const f = new Vec2(2, 9).projectToMaxAxis();
    expect(f.x).toBe(0);
    expect(f.y).toBe(9);

    // Max axis with reference
    const g = new Vec2(10, 4).projectToMaxAxis(new Vec2(-1, 1));
    expect(g.x).toBe(-10);
    expect(g.y).toBe(0);

    const h = new Vec2(2, 9).projectToMaxAxis(new Vec2(1, -5));
    expect(h.x).toBe(0);
    expect(h.y).toBe(-9);
  });

  it('should clamp inside a Rect or between min and max Vec2', () => {
    const rect = new Rect(10, 10, 0, 0); // [-5, 5] x [-5, 5]
    const v1 = new Vec2(12, -8).clamp(rect);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(-5);

    const min = new Vec2(-10, 0);
    const max = new Vec2(10, 20);
    const v2 = new Vec2(-15, 25).clamp(min, max);
    expect(v2.x).toBe(-10);
    expect(v2.y).toBe(20);
  });

  it('should clampScalar between min and max numbers', () => {
    const v = new Vec2(-5, 15).clampScalar(0, 10);
    expect(v.x).toBe(0);
    expect(v.y).toBe(10);
  });

  it('should check isInBounds for points within or outside bounds', () => {
    const min = new Vec2(-5, -5);
    const max = new Vec2(5, 5);

    expect(new Vec2(0, 0).isInBounds(min, max)).toBe(true);
    expect(new Vec2(-5, 5).isInBounds(min, max)).toBe(true);
    expect(new Vec2(5.1, 0).isInBounds(min, max)).toBe(false);
    expect(new Vec2(0, -5.1).isInBounds(min, max)).toBe(false);

    // Reversed bounds order
    expect(new Vec2(0, 0).isInBounds(max, min)).toBe(true);
  });

  it('should support binary target operations (addVectors, subVectors, etc.)', () => {
    const a = new Vec2(10, 20);
    const b = new Vec2(3, 4);
    const dest = new Vec2();

    expect(dest.addVectors(a, b)).toBe(dest);
    expect(dest.x).toBe(13);
    expect(dest.y).toBe(24);

    dest.subVectors(a, b);
    expect(dest.x).toBe(7);
    expect(dest.y).toBe(16);

    dest.multiplyVectors(a, b);
    expect(dest.x).toBe(30);
    expect(dest.y).toBe(80);

    dest.scaleVector(a, 0.5);
    expect(dest.x).toBe(5);
    expect(dest.y).toBe(10);

    dest.divideVectors(a, b);
    expect(dest.x).toBeCloseTo(10 / 3);
    expect(dest.y).toBe(5);

    dest.minVectors(new Vec2(1, 10), new Vec2(5, 2));
    expect(dest.x).toBe(1);
    expect(dest.y).toBe(2);

    dest.maxVectors(new Vec2(1, 10), new Vec2(5, 2));
    expect(dest.x).toBe(5);
    expect(dest.y).toBe(10);

    dest.clampVectors(new Vec2(-10, 50), new Vec2(0, 0), new Vec2(10, 20));
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(20);
  });

  it('should support unary target operations (oppositeVector, absoluteVector, normalizeVector, perpVector, perpCWVector)', () => {
    const v = new Vec2(-3, 4);
    const dest = new Vec2();

    expect(dest.oppositeVector(v)).toBe(dest);
    expect(dest.x).toBe(3);
    expect(dest.y).toBe(-4);

    dest.absoluteVector(v);
    expect(dest.x).toBe(3);
    expect(dest.y).toBe(4);

    dest.normalizeVector(v);
    expect(dest.x).toBeCloseTo(-0.6);
    expect(dest.y).toBeCloseTo(0.8);
    expect(dest.getMagnitude()).toBeCloseTo(1);

    dest.normalizeVector(new Vec2(0, 0));
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(0);

    dest.perpVector(v);
    expect(dest.x).toBe(-4);
    expect(dest.y).toBe(-3);

    dest.perpCWVector(v);
    expect(dest.x).toBe(4);
    expect(dest.y).toBe(3);
  });

  it('should scale to exact length with setLength and setLengthVector', () => {
    const v = new Vec2(3, 4);
    expect(v.setLength(10)).toBe(v);
    expect(v.x).toBeCloseTo(6);
    expect(v.y).toBeCloseTo(8);
    expect(v.getMagnitude()).toBeCloseTo(10);

    const dest = new Vec2();
    expect(dest.setLengthVector(new Vec2(0, 5), 2)).toBe(dest);
    expect(dest.x).toBeCloseTo(0);
    expect(dest.y).toBeCloseTo(2);
    expect(dest.getMagnitude()).toBeCloseTo(2);
  });

  it('should support target projectVector and reflectVector', () => {
    const v = new Vec2(3, 4);
    const normalY = new Vec2(0, 1);
    const dest = new Vec2();

    expect(dest.projectVector(v, normalY)).toBe(dest);
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(4);

    expect(dest.reflectVector(v, normalY)).toBe(dest);
    expect(dest.x).toBe(3);
    expect(dest.y).toBe(-4);
  });

  it('should clamp to symmetric extent with clampToExtent and clampToExtentVectors', () => {
    const v = new Vec2(15, -25);
    const extent = new Vec2(10, 20);

    expect(v.clampToExtent(extent)).toBe(v);
    expect(v.x).toBe(10);
    expect(v.y).toBe(-20);

    const dest = new Vec2();
    expect(dest.clampToExtentVectors(new Vec2(-50, 50), extent)).toBe(dest);
    expect(dest.x).toBe(-10);
    expect(dest.y).toBe(20);
  });

  it('should support in-place lerp and target lerpVectors', () => {
    const a = new Vec2(0, 10);
    const b = new Vec2(10, 20);

    // In-place lerp towards target
    a.lerp(b, 0.5);
    expect(a.x).toBe(5);
    expect(a.y).toBe(15);

    // Backwards-compatible 3-argument lerp
    const c = new Vec2();
    c.lerp(new Vec2(0, 0), new Vec2(100, 200), 0.25);
    expect(c.x).toBe(25);
    expect(c.y).toBe(50);

    // Explicit lerpVectors
    const dest = new Vec2();
    expect(dest.lerpVectors(new Vec2(0, 0), new Vec2(10, 20), 0.5)).toBe(dest);
    expect(dest.x).toBe(5);
    expect(dest.y).toBe(10);
  });

  it('should support fallback in normalize and normalizeVector when length is 0', () => {
    const v = new Vec2(0, 0);
    const fallback = new Vec2(1, 0);

    v.normalize(fallback);
    expect(v.x).toBe(1);
    expect(v.y).toBe(0);

    const dest = new Vec2();
    dest.normalizeVector(new Vec2(0, 0), new Vec2(0, 1));
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(1);

    // Normalizing non-zero vector ignores fallback
    const v2 = new Vec2(10, 0);
    v2.normalize(new Vec2(0, 1));
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(0);
  });

  it('should support quadratic bezier split', () => {
    const p0 = new Vec2(0, 0);
    const p1 = new Vec2(5, 10);
    const p2 = new Vec2(10, 0);
    const left = [];
    const right = [];
    new Vec2().quadraticBezierSplit(p0, p1, p2, 0.5, left, right);
    expect(left).toHaveLength(3);
    expect(right).toHaveLength(3);
    expect(left[0].x).toBe(0);
    expect(right[2].x).toBe(10);
    expect(left[2].x).toBeCloseTo(right[0].x, 5);
    expect(left[2].y).toBeCloseTo(right[0].y, 5);
  });

  it('should support isInBounds with Rect', () => {
    const rect = {
      topLeftCorner: new Vec2(10, 10),
      bottomRightCorner: new Vec2(20, 20)
    };
    expect(new Vec2(15, 15).isInBounds(rect)).toBe(true);
    expect(new Vec2(5, 15).isInBounds(rect)).toBe(false);
  });

});
