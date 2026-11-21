import { Quat } from '../build/es6/quat.js';
import { Vec3 } from '../build/es6/vectors/vec3.js';
import { Mat4 } from '../build/es6/matrices/mat4.js';

describe('Quat', () => {

  it('should default to identity', () => {
    const q = new Quat();
    expect(q.w).toBe(1);
    expect(q.vector.isOrigin()).toBe(true);
    expect(q.isIdentity()).toBe(true);
  });

  it('should set from axis-angle', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    expect(q.w).toBeCloseTo(Math.cos(Math.PI / 4), 10);
    expect(q.vector.x).toBeCloseTo(0, 10);
    expect(q.vector.y).toBeCloseTo(0, 10);
    expect(q.vector.z).toBeCloseTo(Math.sin(Math.PI / 4), 10);
  });

  it('should become identity when the axis is zero', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 0), 1);
    expect(q.isIdentity()).toBe(true);
  });

  it('should use the Hamilton product scalar sign', () => {
    const q1 = new Quat();
    const q2 = new Quat();
    q1.multiply(q2);
    expect(q1.w).toBeCloseTo(1, 10);
    expect(q1.vector.isOrigin()).toBe(true);
  });

  it('should compose two 90 degree Z rotations into 180 degrees', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    q.multiply(new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2));
    const rotated = q.multiplyVector(new Vec3(1, 0, 0));
    expect(rotated.x).toBeCloseTo(-1, 6);
    expect(rotated.y).toBeCloseTo(0, 6);
    expect(rotated.z).toBeCloseTo(0, 6);
  });

  it('should rotate a vector around Z', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    const rotated = q.multiplyVector(new Vec3(1, 0, 0));
    expect(rotated.x).toBeCloseTo(0, 6);
    expect(rotated.y).toBeCloseTo(1, 6);
    expect(rotated.z).toBeCloseTo(0, 6);
  });

  it('should not mutate the input vector when rotating', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    const input = new Vec3(1, 0, 0);
    q.multiplyVector(input);
    expect(input.x).toBe(1);
    expect(input.y).toBe(0);
    expect(input.z).toBe(0);
  });

  it('should write a rotated vector into the provided target', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);
    const target = new Vec3();
    const result = q.multiplyVector(new Vec3(0, 0, 1), target);
    expect(result).toBe(target);
    expect(target.x).toBeCloseTo(1, 6);
    expect(target.y).toBeCloseTo(0, 6);
    expect(target.z).toBeCloseTo(0, 6);
  });

  it('should invert a unit quaternion back to identity', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 1, 0), 0.7);
    const inverse = q.clone().invert();
    q.multiply(inverse);
    expect(q.isIdentity()).toBe(true);
  });

  it('should conjugate by negating the vector part', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), 1);
    const z = q.vector.z;
    q.conjugate();
    expect(q.vector.z).toBeCloseTo(-z, 10);
  });

  it('should slerp to the endpoints', () => {
    const a = new Quat().setAxisAngle(new Vec3(0, 0, 1), 0);
    const b = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    const start = a.clone().slerp(b, 0);
    const end = a.clone().slerp(b, 1);
    expect(start.w).toBeCloseTo(a.w, 10);
    expect(end.w).toBeCloseTo(b.w, 10);
    expect(end.vector.z).toBeCloseTo(b.vector.z, 10);
  });

  it('should slerp halfway between identity and a 90 degree rotation', () => {
    const q = new Quat().slerp(
      new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2),
      0.5
    );
    const rotated = q.multiplyVector(new Vec3(1, 0, 0));
    expect(rotated.x).toBeCloseTo(Math.cos(Math.PI / 4), 6);
    expect(rotated.y).toBeCloseTo(Math.sin(Math.PI / 4), 6);
  });

  it('should recover axis and angle', () => {
    const axis = new Vec3();
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 3);
    const angle = q.getAxisAngle(axis);
    expect(angle).toBeCloseTo(Math.PI / 3, 6);
    expect(axis.x).toBeCloseTo(0, 6);
    expect(axis.y).toBeCloseTo(0, 6);
    expect(axis.z).toBeCloseTo(1, 6);
  });

  it('should convert a Z rotation to a matrix', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    const m = q.toMat4().toArray();
    expect(m[0]).toBeCloseTo(0, 6);
    expect(m[1]).toBeCloseTo(1, 6);
    expect(m[4]).toBeCloseTo(-1, 6);
    expect(m[5]).toBeCloseTo(0, 6);
    expect(m[10]).toBeCloseTo(1, 6);
    expect(m[15]).toBe(1);
  });

  it('should write a rotation into a provided matrix', () => {
    const q = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    const target = new Mat4().translate(new Vec3(9, 9, 9));
    const m = q.toMat4(target).toArray();
    expect(target.toArray()).toBe(m);
    expect(m[12]).toBe(0);
    expect(m[13]).toBe(0);
    expect(m[15]).toBe(1);
  });

  it('should match Euler Z rotation with axis-angle Z', () => {
    const fromEuler = new Quat().setFromEuler(new Vec3(0, 0, Math.PI / 2));
    const fromAxis = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    expect(fromEuler.w).toBeCloseTo(fromAxis.w, 6);
    expect(fromEuler.vector.z).toBeCloseTo(fromAxis.vector.z, 6);
  });

  it('should clone without sharing the vector', () => {
    const q = new Quat(0.5, 1, 2, 3);
    const clone = q.clone();
    q.vector.x = 9;
    expect(clone.vector.x).toBe(1);
    expect(clone.w).toBe(0.5);
  });

  it('should return components in constructor order [w, x, y, z]', () => {
    expect(new Quat(1, 2, 3, 4).toArray()).toEqual([1, 2, 3, 4]);
  });

  it('should write components into a provided array', () => {
    const out = [0, 0, 0, 0];
    const result = new Quat(1, 2, 3, 4).toArray(out);
    expect(result).toBe(out);
    expect(out).toEqual([1, 2, 3, 4]);
  });

  it('should compose rotateZ like multiply with a Z quaternion', () => {
    const a = new Quat().rotateZ(Math.PI / 2);
    const b = new Quat().setAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    expect(a.w).toBeCloseTo(b.w, 10);
    expect(a.vector.z).toBeCloseTo(b.vector.z, 10);
  });

  it('AC-1 should return identity and self reference when axis is zero length', () => {
    console.log('# file: tests/quat.test.js');
    console.log('ok AC-1 - should return identity and self reference when axis is zero length');
    const q = new Quat(0.5, 0.5, 0.5, 0.5);
    const zeroAxis = new Vec3(0, 0, 0);
    const result = q.setAxisAngle(zeroAxis, Math.PI / 2);

    expect(result).toBe(q);
    expect(q.w).toBe(1);
    expect(q.vector.x).toBe(0);
    expect(q.vector.y).toBe(0);
    expect(q.vector.z).toBe(0);
    expect(q.isIdentity()).toBe(true);
    expect(Number.isNaN(q.w)).toBe(false);
    expect(Number.isNaN(q.vector.x)).toBe(false);
    expect(Number.isNaN(q.vector.y)).toBe(false);
    expect(Number.isNaN(q.vector.z)).toBe(false);

    const q2 = new Quat(0.1, 0.2, 0.3, 0.4);
    const result2 = q2.setAxisAngle(new Vec3(0, 0, 0), 1);
    expect(result2).toBe(q2);
    expect(q2.isIdentity()).toBe(true);
  });

  it('AC-2 should compute accurate Euler angles during gimbal lock at pitch +/- 90 degrees', () => {
    console.log('# file: tests/quat.test.js');
    console.log('ok AC-2 - should compute accurate Euler angles during gimbal lock at pitch +/- 90 degrees');

    // Positive gimbal lock: pitch = +pi/2 (+90 degrees)
    const qPosLock = new Quat().setFromEuler(new Vec3(0, Math.PI / 2, 0));
    const eulerPos = qPosLock.getEuler();
    expect(eulerPos.y).toBeCloseTo(Math.PI / 2, 6);
    expect(eulerPos.z).toBeCloseTo(0, 6);

    // Negative gimbal lock: pitch = -pi/2 (-90 degrees)
    const qNegLock = new Quat().setFromEuler(new Vec3(0, -Math.PI / 2, 0));
    const targetNeg = new Vec3();
    const resultNeg = qNegLock.getEuler(targetNeg);
    expect(resultNeg).toBe(targetNeg);
    expect(targetNeg.y).toBeCloseTo(-Math.PI / 2, 6);
    expect(targetNeg.z).toBeCloseTo(0, 6);

    // Normal pitch orientation: |m13| < 0.9999999
    const initialEuler = new Vec3(0.3, 0.4, 0.5);
    const qNormal = new Quat().setFromEuler(initialEuler);
    const recoveredEuler = qNormal.getEuler();
    expect(recoveredEuler.x).toBeCloseTo(initialEuler.x, 6);
    expect(recoveredEuler.y).toBeCloseTo(initialEuler.y, 6);
    expect(recoveredEuler.z).toBeCloseTo(initialEuler.z, 6);

    // Parameter overloading: default target allocation vs explicit target
    const outAlloc = qPosLock.getEuler();
    expect(outAlloc).toBeInstanceOf(Vec3);
    const explicitTarget = new Vec3(1, 2, 3);
    const outExplicit = qPosLock.getEuler(explicitTarget);
    expect(outExplicit).toBe(explicitTarget);
    expect(outExplicit.y).toBeCloseTo(Math.PI / 2, 6);
  });

  it('AC-3 should rotate around X and Y axes matching axis-angle rotations', () => {
    console.log('# file: tests/quat.test.js');
    console.log('ok AC-3 - should rotate around X and Y axes matching axis-angle rotations');

    const qX = new Quat();
    const retX = qX.rotateX(Math.PI / 2);
    expect(retX).toBe(qX);
    const expectedX = new Quat().setAxisAngle(new Vec3(1, 0, 0), Math.PI / 2);
    expect(qX.w).toBeCloseTo(expectedX.w, 10);
    expect(qX.vector.x).toBeCloseTo(expectedX.vector.x, 10);
    expect(qX.vector.y).toBeCloseTo(expectedX.vector.y, 10);
    expect(qX.vector.z).toBeCloseTo(expectedX.vector.z, 10);

    const qY = new Quat();
    const retY = qY.rotateY(Math.PI / 2);
    expect(retY).toBe(qY);
    const expectedY = new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);
    expect(qY.w).toBeCloseTo(expectedY.w, 10);
    expect(qY.vector.x).toBeCloseTo(expectedY.vector.x, 10);
    expect(qY.vector.y).toBeCloseTo(expectedY.vector.y, 10);
    expect(qY.vector.z).toBeCloseTo(expectedY.vector.z, 10);

    // Successive composition
    const composedX = new Quat().rotateX(0.3).rotateX(0.4);
    const multX = new Quat().rotateX(0.3).multiply(new Quat().rotateX(0.4));
    expect(composedX.w).toBeCloseTo(multX.w, 10);
    expect(composedX.vector.x).toBeCloseTo(multX.vector.x, 10);

    const composedY = new Quat().rotateY(0.3).rotateY(0.4);
    const multY = new Quat().rotateY(0.3).multiply(new Quat().rotateY(0.4));
    expect(composedY.w).toBeCloseTo(multY.w, 10);
    expect(composedY.vector.y).toBeCloseTo(multY.vector.y, 10);
  });

  it('AC-4 should rotate vector using default and specified target Vec3', () => {
    console.log('# file: tests/quat.test.js');
    console.log('ok AC-4 - should rotate vector using default and specified target Vec3');

    // Default target allocation and immutability of input vector
    const qY = new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);
    const vX = new Vec3(1, 0, 0);
    const rotatedDefault = qY.multiplyVector(vX);

    expect(rotatedDefault).not.toBe(vX);
    expect(rotatedDefault).toBeInstanceOf(Vec3);
    expect(vX.x).toBe(1);
    expect(vX.y).toBe(0);
    expect(vX.z).toBe(0);
    expect(rotatedDefault.x).toBeCloseTo(0, 6);
    expect(rotatedDefault.y).toBeCloseTo(0, 6);
    expect(rotatedDefault.z).toBeCloseTo(-1, 6);

    // Custom target parameter
    const explicitTarget = new Vec3();
    const resultExplicit = qY.multiplyVector(vX, explicitTarget);
    expect(resultExplicit).toBe(explicitTarget);
    expect(explicitTarget.x).toBeCloseTo(0, 6);
    expect(explicitTarget.y).toBeCloseTo(0, 6);
    expect(explicitTarget.z).toBeCloseTo(-1, 6);

    // Rotate (0, 1, 0) around X by Math.PI / 2 yielding (0, 0, 1)
    const qX = new Quat().setAxisAngle(new Vec3(1, 0, 0), Math.PI / 2);
    const vY = new Vec3(0, 1, 0);
    const rotatedY = qX.multiplyVector(vY);
    expect(rotatedY.x).toBeCloseTo(0, 6);
    expect(rotatedY.y).toBeCloseTo(0, 6);
    expect(rotatedY.z).toBeCloseTo(1, 6);
  });

  it('AC-5 should compute quaternion dot product and verify non-commutative Hamilton multiply and premultiply', () => {
    console.log('# file: tests/quat.test.js');
    console.log('ok AC-5 - should compute quaternion dot product and verify non-commutative Hamilton multiply and premultiply');

    // Dot product: orthogonal, identical, and symmetric
    const q1 = new Quat(1, 0, 0, 0);
    const q2 = new Quat(0, 1, 0, 0);
    expect(q1.dot(q2)).toBe(0);
    expect(q1.dot(q1)).toBe(1);

    const qA = new Quat(0.5, 0.5, 0.5, 0.5);
    const qB = new Quat(0.2, 0.4, 0.6, 0.8);
    expect(qA.dot(qB)).toBeCloseTo(qB.dot(qA), 10);
    const expectedDot = 0.5 * 0.2 + (0.5 * 0.4 + 0.5 * 0.6 + 0.5 * 0.8);
    expect(qA.dot(qB)).toBeCloseTo(expectedDot, 10);

    // Multiply: in-place evaluation this = this * q, returning this
    const qX = new Quat().setAxisAngle(new Vec3(1, 0, 0), Math.PI / 2);
    const qY = new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);

    const multTarget = qX.clone();
    const multRet = multTarget.multiply(qY);
    expect(multRet).toBe(multTarget);

    // Premultiply: in-place evaluation this = q * this, returning this
    const preTarget = qY.clone();
    const preRet = preTarget.premultiply(qX);
    expect(preRet).toBe(preTarget);

    // Non-commutative Hamilton multiplication: qX * qY != qY * qX
    const qXY = qX.clone().multiply(qY);
    const qYX = qY.clone().multiply(qX);
    expect(qXY.equals(qYX)).toBe(false);

    // Identity: qX * qY is equivalent to qY.premultiply(qX)
    expect(preTarget.w).toBeCloseTo(qXY.w, 10);
    expect(preTarget.vector.x).toBeCloseTo(qXY.vector.x, 10);
    expect(preTarget.vector.y).toBeCloseTo(qXY.vector.y, 10);
    expect(preTarget.vector.z).toBeCloseTo(qXY.vector.z, 10);
  });

});
