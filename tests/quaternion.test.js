import { Quaternion } from '../build/es6/quaternion.js';
import { Vector3 } from '../build/es6/vectors/vector3.js';
import { Matrix4x4 } from '../build/es6/matrices/matrix4x4.js';

describe('Quaternion', () => {

  it('should default to identity', () => {
    const q = new Quaternion();
    expect(q.w).toBe(1);
    expect(q.vector.isOrigin()).toBe(true);
    expect(q.isIdentity()).toBe(true);
  });

  it('should set from axis-angle', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    expect(q.w).toBeCloseTo(Math.cos(Math.PI / 4), 10);
    expect(q.vector.x).toBeCloseTo(0, 10);
    expect(q.vector.y).toBeCloseTo(0, 10);
    expect(q.vector.z).toBeCloseTo(Math.sin(Math.PI / 4), 10);
  });

  it('should become identity when the axis is zero', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 0), 1);
    expect(q.isIdentity()).toBe(true);
  });

  it('should use the Hamilton product scalar sign', () => {
    const q1 = new Quaternion();
    const q2 = new Quaternion();
    q1.multiply(q2);
    expect(q1.w).toBeCloseTo(1, 10);
    expect(q1.vector.isOrigin()).toBe(true);
  });

  it('should compose two 90 degree Z rotations into 180 degrees', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    q.multiply(new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2));
    const rotated = q.multiplyVector(new Vector3(1, 0, 0));
    expect(rotated.x).toBeCloseTo(-1, 6);
    expect(rotated.y).toBeCloseTo(0, 6);
    expect(rotated.z).toBeCloseTo(0, 6);
  });

  it('should rotate a vector around Z', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    const rotated = q.multiplyVector(new Vector3(1, 0, 0));
    expect(rotated.x).toBeCloseTo(0, 6);
    expect(rotated.y).toBeCloseTo(1, 6);
    expect(rotated.z).toBeCloseTo(0, 6);
  });

  it('should not mutate the input vector when rotating', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    const input = new Vector3(1, 0, 0);
    q.multiplyVector(input);
    expect(input.x).toBe(1);
    expect(input.y).toBe(0);
    expect(input.z).toBe(0);
  });

  it('should write a rotated vector into the provided target', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    const target = new Vector3();
    const result = q.multiplyVector(new Vector3(0, 0, 1), target);
    expect(result).toBe(target);
    expect(target.x).toBeCloseTo(1, 6);
    expect(target.y).toBeCloseTo(0, 6);
    expect(target.z).toBeCloseTo(0, 6);
  });

  it('should invert a unit quaternion back to identity', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 1, 0), 0.7);
    const inverse = q.clone().invert();
    q.multiply(inverse);
    expect(q.isIdentity()).toBe(true);
  });

  it('should conjugate by negating the vector part', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), 1);
    const z = q.vector.z;
    q.conjugate();
    expect(q.vector.z).toBeCloseTo(-z, 10);
  });

  it('should slerp to the endpoints', () => {
    const a = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), 0);
    const b = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    const start = a.clone().slerp(b, 0);
    const end = a.clone().slerp(b, 1);
    expect(start.w).toBeCloseTo(a.w, 10);
    expect(end.w).toBeCloseTo(b.w, 10);
    expect(end.vector.z).toBeCloseTo(b.vector.z, 10);
  });

  it('should slerp halfway between identity and a 90 degree rotation', () => {
    const q = new Quaternion().slerp(
      new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2),
      0.5
    );
    const rotated = q.multiplyVector(new Vector3(1, 0, 0));
    expect(rotated.x).toBeCloseTo(Math.cos(Math.PI / 4), 6);
    expect(rotated.y).toBeCloseTo(Math.sin(Math.PI / 4), 6);
  });

  it('should recover axis and angle', () => {
    const axis = new Vector3();
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 3);
    const angle = q.getAxisAngle(axis);
    expect(angle).toBeCloseTo(Math.PI / 3, 6);
    expect(axis.x).toBeCloseTo(0, 6);
    expect(axis.y).toBeCloseTo(0, 6);
    expect(axis.z).toBeCloseTo(1, 6);
  });

  it('should convert a Z rotation to a matrix', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    const m = q.toMatrix4x4().toArray();
    expect(m[0]).toBeCloseTo(0, 6);
    expect(m[1]).toBeCloseTo(1, 6);
    expect(m[4]).toBeCloseTo(-1, 6);
    expect(m[5]).toBeCloseTo(0, 6);
    expect(m[10]).toBeCloseTo(1, 6);
    expect(m[15]).toBe(1);
  });

  it('should write a rotation into a provided matrix', () => {
    const q = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    const target = new Matrix4x4().translate(new Vector3(9, 9, 9));
    const m = q.toMatrix4x4(target).toArray();
    expect(target.toArray()).toBe(m);
    expect(m[12]).toBe(0);
    expect(m[13]).toBe(0);
    expect(m[15]).toBe(1);
  });

  it('should match Euler Z rotation with axis-angle Z', () => {
    const fromEuler = new Quaternion().setFromEuler(0, 0, Math.PI / 2);
    const fromAxis = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    expect(fromEuler.w).toBeCloseTo(fromAxis.w, 6);
    expect(fromEuler.vector.z).toBeCloseTo(fromAxis.vector.z, 6);
  });

  it('should clone without sharing the vector', () => {
    const q = new Quaternion(0.5, 1, 2, 3);
    const clone = q.clone();
    q.vector.x = 9;
    expect(clone.vector.x).toBe(1);
    expect(clone.w).toBe(0.5);
  });

  it('should return components in constructor order [w, x, y, z]', () => {
    expect(new Quaternion(1, 2, 3, 4).toArray()).toEqual([1, 2, 3, 4]);
  });

  it('should write components into a provided array', () => {
    const out = [0, 0, 0, 0];
    const result = new Quaternion(1, 2, 3, 4).toArray(out);
    expect(result).toBe(out);
    expect(out).toEqual([1, 2, 3, 4]);
  });

  it('should compose rotateZ like multiply with a Z quaternion', () => {
    const a = new Quaternion().rotateZ(Math.PI / 2);
    const b = new Quaternion().setAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    expect(a.w).toBeCloseTo(b.w, 10);
    expect(a.vector.z).toBeCloseTo(b.vector.z, 10);
  });

});
