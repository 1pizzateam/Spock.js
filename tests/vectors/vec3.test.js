import { Vec3 } from '../../build/es6/vectors/vec3.js';

describe('Vec3', () => {

  it('should construct with x, y and z', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('should add including z', () => {
    const v = new Vec3(1, 2, 3).add(new Vec3(4, 5, 6));
    expect(v.x).toBe(5);
    expect(v.y).toBe(7);
    expect(v.z).toBe(9);
  });

  it('should compute a right-handed cross product', () => {
    const v = new Vec3(1, 0, 0).cross(new Vec3(0, 1, 0));
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(1);
  });

  it('should clone all three components', () => {
    const v = new Vec3(1, 2, 3).clone();
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
    expect(v.equals(new Vec3(1, 2, 3))).toBe(true);
    expect(v.equals(new Vec3(1, 2, 0))).toBe(false);
  });

  it('should include z in magnitude', () => {
    expect(new Vec3(2, 3, 6).getMagnitude()).toBe(7);
  });

  it('should compute distance without mutating either vector', () => {
    const a = new Vec3(1, 2, 2);
    const b = new Vec3(1, 2, 6);
    expect(a.getDistance(b)).toBe(4);
    expect(a.getDistance(b, true)).toBe(16);
    expect(a.z).toBe(2);
    expect(b.z).toBe(6);
  });

  it('should write components into a provided array', () => {
    const out = [0, 0, 0, 0];
    const result = new Vec3(1, 2, 3).toArray(out);
    expect(result).toBe(out);
    expect(out).toEqual([1, 2, 3]);
  });

  it('should report the angle between two vectors', () => {
    expect(new Vec3(1, 0, 0).getAngle(new Vec3(0, 1, 0))).toBeCloseTo(Math.PI / 2, 5);
    expect(new Vec3().getAngle(new Vec3(1, 0, 0))).toBe(false);
  });

  it('should lerp between two vectors', () => {
    const v = new Vec3().lerp(new Vec3(0, 0, 0), new Vec3(10, 20, 30), 0.5);
    expect(v.x).toBe(5);
    expect(v.y).toBe(10);
    expect(v.z).toBe(15);
  });

  it('should clamp to a min/max box', () => {
    const v = new Vec3(2, -1, 0.5).clamp(new Vec3(0, 0, 0), new Vec3(1, 1, 1));
    expect(v.x).toBe(1);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0.5);
  });

  it('should evaluate a quadratic bezier', () => {
    const v = new Vec3().quadraticBezier(
      new Vec3(0, 0, 0),
      new Vec3(0, 2, 0),
      new Vec3(2, 2, 2),
      0.5
    );
    expect(v.x).toBe(0.5);
    expect(v.y).toBe(1.5);
    expect(v.z).toBe(0.5);
  });

  it('should return the quadratic tangent at t = 0', () => {
    const v = new Vec3().quadraticBezierDerivative(
      new Vec3(0, 0, 0),
      new Vec3(1, 0, 0),
      new Vec3(2, 0, 0),
      0
    );
    expect(v.x).toBe(2);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
  });

  it('should set components from scalars and arrays', () => {
    const v = new Vec3(1, 2, 3).setScalar(null, 8);
    expect(v.x).toBe(1);
    expect(v.y).toBe(8);
    expect(v.z).toBe(3);
    v.setArray([4, 5, 6, 7], 1);
    expect(v.x).toBe(5);
    expect(v.y).toBe(6);
    expect(v.z).toBe(7);
  });

  it('should compare against a scalar and report origin and sign', () => {
    expect(new Vec3(2, 2, 2).isEqualTo(2)).toBe(true);
    expect(new Vec3(2, 2, 1).isEqualTo(2)).toBe(false);
    expect(new Vec3(1, 0, 0).isPositive()).toBe(true);
    expect(new Vec3(-1, 0, 0).isPositive()).toBe(false);
    expect(new Vec3().isOrigin()).toBe(true);
  });

  it('should add, subtract, multiply and divide including z', () => {
    expect(new Vec3(1, 2, 3).addScalar(1)).toEqual(expect.objectContaining({ x: 2, y: 3, z: 4 }));
    expect(new Vec3(1, 2, 3).addScaledVector(new Vec3(1, 1, 1), 2)).toEqual(expect.objectContaining({ x: 3, y: 4, z: 5 }));
    expect(new Vec3(1, 2, 3).addComponents()).toBe(6);
    expect(new Vec3(5, 7, 9).subtract(new Vec3(1, 2, 3))).toEqual(expect.objectContaining({ x: 4, y: 5, z: 6 }));
    expect(new Vec3(5, 7, 9).subtractScalar(1)).toEqual(expect.objectContaining({ x: 4, y: 6, z: 8 }));
    expect(new Vec3(5, 7, 9).subtractScaledVector(new Vec3(1, 1, 1), 2)).toEqual(expect.objectContaining({ x: 3, y: 5, z: 7 }));
    expect(new Vec3(2, 3, 4).multiply(new Vec3(2, 2, 2))).toEqual(expect.objectContaining({ x: 4, y: 6, z: 8 }));
    expect(new Vec3(2, 3, 4).multiplyScaledVector(new Vec3(2, 1, 1), 2)).toEqual(expect.objectContaining({ x: 8, y: 6, z: 8 }));
    expect(new Vec3(8, 6, 4).divide(new Vec3(2, 3, 4))).toEqual(expect.objectContaining({ x: 4, y: 2, z: 1 }));
    expect(new Vec3(8, 6, 4).divideScalar(2)).toEqual(expect.objectContaining({ x: 4, y: 3, z: 2 }));
    expect(new Vec3(8, 6, 4).divideScaledVector(new Vec3(2, 3, 1), 2)).toEqual(expect.objectContaining({ x: 2, y: 1, z: 2 }));
    expect(new Vec3(4, 6, 8).halve()).toEqual(expect.objectContaining({ x: 2, y: 3, z: 4 }));
  });

  it('should scale one axis or all three', () => {
    expect(new Vec3(1, 2, 3).scale(2)).toEqual(expect.objectContaining({ x: 2, y: 4, z: 6 }));
    expect(new Vec3(1, 2, 3).scale(2, 'x')).toEqual(expect.objectContaining({ x: 2, y: 2, z: 3 }));
    expect(new Vec3(1, 2, 3).scale(2, 'y')).toEqual(expect.objectContaining({ x: 1, y: 4, z: 3 }));
    expect(new Vec3(1, 2, 3).scale(2, 'z')).toEqual(expect.objectContaining({ x: 1, y: 2, z: 6 }));
  });

  it('should clamp axes, normalize and round', () => {
    expect(new Vec3(1, 5, 0).max(new Vec3(3, 2, 4))).toEqual(expect.objectContaining({ x: 3, y: 5, z: 4 }));
    expect(new Vec3(1, 5, 0).min(new Vec3(3, 2, 4))).toEqual(expect.objectContaining({ x: 1, y: 2, z: 0 }));
    expect(new Vec3(1, 5, 0).maxScalar(2)).toEqual(expect.objectContaining({ x: 2, y: 5, z: 2 }));
    expect(new Vec3(1, 5, 0).minScalar(2)).toEqual(expect.objectContaining({ x: 1, y: 2, z: 0 }));
    expect(new Vec3(0, 3, 4).normalize().getMagnitude()).toBeCloseTo(1, 5);
    expect(new Vec3(-1, 2, -3).absolute()).toEqual(expect.objectContaining({ x: 1, y: 2, z: 3 }));
    expect(new Vec3(-1, 2, -3).absolute('x')).toEqual(expect.objectContaining({ x: 1, y: 2, z: -3 }));
    expect(new Vec3(-1, 2, -3).opposite('z')).toEqual(expect.objectContaining({ x: -1, y: 2, z: 3 }));
    expect(new Vec3(1, -2, 3).opposite()).toEqual(expect.objectContaining({ x: -1, y: 2, z: -3 }));
    expect(new Vec3(1.2, 2.8, 3.1).floor()).toEqual(expect.objectContaining({ x: 1, y: 2, z: 3 }));
    expect(new Vec3(1.2, 2.8, 3.1).floor('y')).toEqual(expect.objectContaining({ x: 1.2, y: 2, z: 3.1 }));
    expect(new Vec3(1.2, 2.8, 3.1).ceil()).toEqual(expect.objectContaining({ x: 2, y: 3, z: 4 }));
    expect(new Vec3(1.2, 2.8, 3.1).ceil('z')).toEqual(expect.objectContaining({ x: 1.2, y: 2.8, z: 4 }));
  });

  it('should copy, stringify and report a cubic bezier', () => {
    const source = new Vec3(1, 2, 3);
    expect(new Vec3().copy(source).toString()).toBe('(x = 1; y = 2; z = 3)');
    expect(new Vec3(1, 0, 0).dotProduct(new Vec3(0, 1, 0))).toBe(0);
    const p0 = new Vec3(0, 0, 0);
    const p1 = new Vec3(0, 0, 0);
    const p2 = new Vec3(0, 0, 10);
    const p3 = new Vec3(0, 0, 10);
    const point = new Vec3().cubicBezier(p0, p1, p2, p3, 0.5);
    expect(point.z).toBeCloseTo(5, 5);
    const left = [];
    const right = [];
    new Vec3().cubicBezierSplit(p0, p1, p2, p3, 0.5, left, right);
    expect(left).toHaveLength(4);
    expect(new Vec3().cubicBezierLength(p0, p1, p2, p3)).toBeCloseTo(10, 5);
    expect(new Vec3().cubicBezierParameterAtLength(p0, p1, p2, p3, 5)).toBeCloseTo(0.5, 5);
    const tangent = new Vec3().cubicBezierDerivative(p0, p1, p2, p3, 0);
    expect(tangent.z).toBeCloseTo(0, 5);
  });

  it('should split a quadratic bezier and report its length', () => {
    const p0 = new Vec3(0, 0, 0);
    const p1 = new Vec3(5, 0, 0);
    const p2 = new Vec3(10, 0, 0);
    const left = [];
    const right = [];
    new Vec3().quadraticBezierSplit(p0, p1, p2, 0.5, left, right);
    expect(left[2].x).toBeCloseTo(5, 5);
    expect(new Vec3().quadraticBezierLength(p0, p1, p2)).toBeCloseTo(10, 5);
    expect(new Vec3().quadraticBezierParameterAtLength(p0, p1, p2, 5)).toBeCloseTo(0.5, 5);
  });

  it('should compute sign component-wise in-place', () => {
    const v = new Vec3(-8.2, 0, 4.5).sign();
    expect(v.x).toBe(-1);
    expect(v.y).toBe(0);
    expect(v.z).toBe(1);
  });

  it('should clampScalar between min and max numbers', () => {
    const v = new Vec3(-5, 15, 8).clampScalar(0, 10);
    expect(v.x).toBe(0);
    expect(v.y).toBe(10);
    expect(v.z).toBe(8);
  });

  it('should check isInBounds for points in 3D box', () => {
    const min = new Vec3(-5, -5, -5);
    const max = new Vec3(5, 5, 5);

    expect(new Vec3(0, 0, 0).isInBounds(min, max)).toBe(true);
    expect(new Vec3(-5, 5, 0).isInBounds(min, max)).toBe(true);
    expect(new Vec3(0, 0, 5.1).isInBounds(min, max)).toBe(false);

    // Reversed bounds order
    expect(new Vec3(1, 2, 3).isInBounds(max, min)).toBe(true);
  });

  it('should support binary target operations (addVectors, subVectors, etc.)', () => {
    const a = new Vec3(10, 20, 30);
    const b = new Vec3(3, 4, 5);
    const dest = new Vec3();

    expect(dest.addVectors(a, b)).toBe(dest);
    expect(dest.x).toBe(13);
    expect(dest.y).toBe(24);
    expect(dest.z).toBe(35);

    dest.subVectors(a, b);
    expect(dest.x).toBe(7);
    expect(dest.y).toBe(16);
    expect(dest.z).toBe(25);

    dest.multiplyVectors(a, b);
    expect(dest.x).toBe(30);
    expect(dest.y).toBe(80);
    expect(dest.z).toBe(150);

    dest.scaleVector(a, 0.5);
    expect(dest.x).toBe(5);
    expect(dest.y).toBe(10);
    expect(dest.z).toBe(15);

    dest.divideVectors(a, b);
    expect(dest.x).toBeCloseTo(10 / 3);
    expect(dest.y).toBe(5);
    expect(dest.z).toBe(6);

    dest.minVectors(new Vec3(1, 10, 50), new Vec3(5, 2, 100));
    expect(dest.x).toBe(1);
    expect(dest.y).toBe(2);
    expect(dest.z).toBe(50);

    dest.maxVectors(new Vec3(1, 10, 50), new Vec3(5, 2, 100));
    expect(dest.x).toBe(5);
    expect(dest.y).toBe(10);
    expect(dest.z).toBe(100);

    dest.clampVectors(new Vec3(-10, 50, 5), new Vec3(0, 0, 0), new Vec3(10, 20, 10));
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(20);
    expect(dest.z).toBe(5);
  });

  it('should support unary target operations and crossVectors (oppositeVector, absoluteVector, normalizeVector, crossVectors)', () => {
    const v = new Vec3(-2, 3, -6);
    const dest = new Vec3();

    expect(dest.oppositeVector(v)).toBe(dest);
    expect(dest.x).toBe(2);
    expect(dest.y).toBe(-3);
    expect(dest.z).toBe(6);

    dest.absoluteVector(v);
    expect(dest.x).toBe(2);
    expect(dest.y).toBe(3);
    expect(dest.z).toBe(6);

    dest.normalizeVector(v);
    // |-2, 3, -6| = sqrt(4 + 9 + 36) = sqrt(49) = 7
    expect(dest.x).toBeCloseTo(-2 / 7);
    expect(dest.y).toBeCloseTo(3 / 7);
    expect(dest.z).toBeCloseTo(-6 / 7);
    expect(dest.getMagnitude()).toBeCloseTo(1);

    dest.normalizeVector(new Vec3(0, 0, 0));
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(0);
    expect(dest.z).toBe(0);

    const a = new Vec3(1, 0, 0);
    const b = new Vec3(0, 1, 0);
    dest.crossVectors(a, b);
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(0);
    expect(dest.z).toBe(1);
  });

  it('should scale to exact length with setLength and setLengthVector', () => {
    const v = new Vec3(0, 3, 4);
    expect(v.setLength(10)).toBe(v);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(6);
    expect(v.z).toBeCloseTo(8);
    expect(v.getMagnitude()).toBeCloseTo(10);

    const dest = new Vec3();
    expect(dest.setLengthVector(new Vec3(0, 0, 5), 2)).toBe(dest);
    expect(dest.x).toBeCloseTo(0);
    expect(dest.y).toBeCloseTo(0);
    expect(dest.z).toBeCloseTo(2);
    expect(dest.getMagnitude()).toBeCloseTo(2);
  });

  it('should project and reflect with in-place and target operations', () => {
    const v = new Vec3(1, 2, 3);
    const normalZ = new Vec3(0, 0, 1);

    const proj = v.clone().project(normalZ);
    expect(proj.x).toBe(0);
    expect(proj.y).toBe(0);
    expect(proj.z).toBe(3);

    const refl = v.clone().reflect(normalZ);
    expect(refl.x).toBe(1);
    expect(refl.y).toBe(2);
    expect(refl.z).toBe(-3);

    const dest = new Vec3();
    expect(dest.projectVector(v, normalZ)).toBe(dest);
    expect(dest.x).toBe(0);
    expect(dest.y).toBe(0);
    expect(dest.z).toBe(3);

    expect(dest.reflectVector(v, normalZ)).toBe(dest);
    expect(dest.x).toBe(1);
    expect(dest.y).toBe(2);
    expect(dest.z).toBe(-3);
  });

  it('should clamp to symmetric extent with clampToExtent and clampToExtentVectors', () => {
    const v = new Vec3(15, -25, 35);
    const extent = new Vec3(10, 20, 30);

    expect(v.clampToExtent(extent)).toBe(v);
    expect(v.x).toBe(10);
    expect(v.y).toBe(-20);
    expect(v.z).toBe(30);

    const dest = new Vec3();
    expect(dest.clampToExtentVectors(new Vec3(-50, 50, -50), extent)).toBe(dest);
    expect(dest.x).toBe(-10);
    expect(dest.y).toBe(20);
    expect(dest.z).toBe(-30);
  });

  it('should support in-place lerp and target lerpVectors', () => {
    const a = new Vec3(0, 10, 20);
    const b = new Vec3(10, 20, 30);

    a.lerp(b, 0.5);
    expect(a.x).toBe(5);
    expect(a.y).toBe(15);
    expect(a.z).toBe(25);

    const dest = new Vec3();
    expect(dest.lerpVectors(new Vec3(0, 0, 0), new Vec3(10, 20, 30), 0.5)).toBe(dest);
    expect(dest.x).toBe(5);
    expect(dest.y).toBe(10);
    expect(dest.z).toBe(15);
  });

  it('should support fallback in normalize and normalizeVector when length is 0', () => {
    const v = new Vec3(0, 0, 0);
    const fallback = new Vec3(0, 0, 1);

    v.normalize(fallback);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(1);

    const dest = new Vec3();
    dest.normalizeVector(new Vec3(0, 0, 0), new Vec3(1, 0, 0));
    expect(dest.x).toBe(1);
    expect(dest.y).toBe(0);
    expect(dest.z).toBe(0);
  });

  it('should support quadratic and cubic bezier split', () => {
    const p0 = new Vec3(0, 0, 0);
    const p1 = new Vec3(5, 10, 5);
    const p2 = new Vec3(10, 0, 10);
    const leftQuad = [];
    const rightQuad = [];
    new Vec3().quadraticBezierSplit(p0, p1, p2, 0.5, leftQuad, rightQuad);
    expect(leftQuad).toHaveLength(3);
    expect(rightQuad).toHaveLength(3);
    expect(leftQuad[0].x).toBe(0);
    expect(rightQuad[2].z).toBe(10);
    expect(leftQuad[2].x).toBeCloseTo(rightQuad[0].x, 5);

    const p3 = new Vec3(15, 5, 15);
    const leftCubic = [];
    const rightCubic = [];
    new Vec3().cubicBezierSplit(p0, p1, p2, p3, 0.5, leftCubic, rightCubic);
    expect(leftCubic).toHaveLength(4);
    expect(rightCubic).toHaveLength(4);
    expect(leftCubic[0].x).toBe(0);
    expect(rightCubic[3].z).toBe(15);
    expect(leftCubic[3].x).toBeCloseTo(rightCubic[0].x, 5);
  });

});
