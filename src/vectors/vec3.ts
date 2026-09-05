import { Bezier, sampleCurveLength, sampleCurveParameterAtLength } from '../bezier';
import { Utils } from '../utils';

/** Mutable 3D vector. */
export class Vec3 {
  public x: number;
  public y: number;
  public z: number;

  /** Create a 3D vector (defaults to the origin). */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /** Set x, y, and/or z; omitted axes are unchanged. */
  public setScalar(x?: number | null, y?: number | null, z?: number | null): Vec3 {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.z = z ?? this.z;
    return this;
  }

  /** Set x, y, z from array at offset. */
  public setArray(array: number[], offset: number = 0): Vec3 {
    this.x = array[offset] ?? this.x;
    this.y = array[offset + 1] ?? this.y;
    this.z = array[offset + 2] ?? this.z;
    return this;
  }

  /** Copy another vector into this one. */
  public copy(vector: Vec3): Vec3 {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    return this;
  }

  /** True if all components are >= 0. */
  public isPositive(): boolean {
    return this.x >= 0 && this.y >= 0 && this.z >= 0;
  }

  /** True if all components equal scalar. */
  public isEqualTo(scalar: number): boolean {
    return this.x === scalar && this.y === scalar && this.z === scalar;
  }

  /** True if all components match the other vector. */
  public equals(vector: Vec3): boolean {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }

  /** True if all components are 0. */
  public isOrigin(): boolean {
    return this.x === 0 && this.y === 0 && this.z === 0;
  }

  /** Write [x, y, z] into target (or a new array). */
  public toArray(target: number[] = []): number[] {
    target[0] = this.x;
    target[1] = this.y;
    target[2] = this.z;
    target.length = 3;
    return target;
  }

  /** Human-readable (x, y, z) string. */
  public toString(): string {
    return `(x = ${this.x}; y = ${this.y}; z = ${this.z})`;
  }

  /** Set all components to 0. */
  public origin(): Vec3 {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
  }

  /** Length, or squared length if square is true. */
  public getMagnitude(square: boolean = false): number {
    const squared = this.x * this.x + this.y * this.y + this.z * this.z;
    return square ? squared : Math.sqrt(squared);
  }

  /** Distance to vector; squared if square is true. */
  public getDistance(vector: Vec3, square: boolean = false): number {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    const dz = this.z - vector.z;
    const squared = dx * dx + dy * dy + dz * dz;
    return square ? squared : Math.sqrt(squared);
  }

  /** Add vector in place. */
  public add(vector: Vec3): Vec3 {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  }

  /** Add vector scaled by scalar. */
  public addScaledVector(vector: Vec3, scalar: number): Vec3 {
    this.x += vector.x * scalar;
    this.y += vector.y * scalar;
    this.z += vector.z * scalar;
    return this;
  }

  /** Add scalar to all components. */
  public addScalar(scalar: number): Vec3 {
    this.x += scalar;
    this.y += scalar;
    this.z += scalar;
    return this;
  }

  /** Sum of x, y, and z. */
  public addComponents(): number {
    return this.x + this.y + this.z;
  }

  /** Subtract vector in place. */
  public subtract(vector: Vec3): Vec3 {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  }

  /** Subtract vector scaled by scalar. */
  public subtractScaledVector(vector: Vec3, scalar: number): Vec3 {
    this.x -= vector.x * scalar;
    this.y -= vector.y * scalar;
    this.z -= vector.z * scalar;
    return this;
  }

  /** Subtract scalar from all components. */
  public subtractScalar(scalar: number): Vec3 {
    this.x -= scalar;
    this.y -= scalar;
    this.z -= scalar;
    return this;
  }

  /** Component-wise multiply. */
  public multiply(vector: Vec3): Vec3 {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    return this;
  }

  /** Component-wise multiply by vector * scalar. */
  public multiplyScaledVector(vector: Vec3, scalar: number): Vec3 {
    this.x *= vector.x * scalar;
    this.y *= vector.y * scalar;
    this.z *= vector.z * scalar;
    return this;
  }

  /** Multiply by scalar, optionally on one axis. */
  public scale(scalar: number, axis?: 'x' | 'y' | 'z'): Vec3 {
    if (!axis) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
    this[axis] *= scalar;
    return this;
  }

  /** Component-wise divide. */
  public divide(vector: Vec3): Vec3 {
    this.x /= vector.x;
    this.y /= vector.y;
    this.z /= vector.z;
    return this;
  }

  /** Component-wise divide by vector * scalar. */
  public divideScaledVector(vector: Vec3, scalar: number): Vec3 {
    this.x /= vector.x * scalar;
    this.y /= vector.y * scalar;
    this.z /= vector.z * scalar;
    return this;
  }

  /** Divide all components by scalar. */
  public divideScalar(scalar: number): Vec3 {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    return this;
  }

  /** Scale by 1/2. */
  public halve(): Vec3 {
    this.x *= 0.5;
    this.y *= 0.5;
    this.z *= 0.5;
    return this;
  }

  /** Component-wise maximum with vector. */
  public max(vector: Vec3): Vec3 {
    this.x = Math.max(this.x, vector.x);
    this.y = Math.max(this.y, vector.y);
    this.z = Math.max(this.z, vector.z);
    return this;
  }

  /** Component-wise minimum with vector. */
  public min(vector: Vec3): Vec3 {
    this.x = Math.min(this.x, vector.x);
    this.y = Math.min(this.y, vector.y);
    this.z = Math.min(this.z, vector.z);
    return this;
  }

  /** Raise each component to at least scalar. */
  public maxScalar(scalar: number): Vec3 {
    this.x = Math.max(this.x, scalar);
    this.y = Math.max(this.y, scalar);
    this.z = Math.max(this.z, scalar);
    return this;
  }

  /** Lower each component to at most scalar. */
  public minScalar(scalar: number): Vec3 {
    this.x = Math.min(this.x, scalar);
    this.y = Math.min(this.y, scalar);
    this.z = Math.min(this.z, scalar);
    return this;
  }

  /** Scale to unit length. */
  public normalize(): Vec3 {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (length && length !== 1) {
      const inv = 1 / length;
      this.x *= inv;
      this.y *= inv;
      this.z *= inv;
    }
    return this;
  }

  /** Absolute value, optionally on one axis. */
  public absolute(axis?: 'x' | 'y' | 'z'): Vec3 {
    if (!axis) {
      this.x = Math.abs(this.x);
      this.y = Math.abs(this.y);
      this.z = Math.abs(this.z);
      return this;
    }
    this[axis] = Math.abs(this[axis]);
    return this;
  }

  /** Negate, optionally on one axis. */
  public opposite(axis?: 'x' | 'y' | 'z'): Vec3 {
    if (!axis) {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
    this[axis] = -this[axis];
    return this;
  }

  /** Floor, optionally on one axis. */
  public floor(axis?: 'x' | 'y' | 'z'): Vec3 {
    if (!axis) {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }
    this[axis] = Math.floor(this[axis]);
    return this;
  }

  /** Ceil, optionally on one axis. */
  public ceil(axis?: 'x' | 'y' | 'z'): Vec3 {
    if (!axis) {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }
    this[axis] = Math.ceil(this[axis]);
    return this;
  }

  /** Dot product with vector. */
  public dotProduct(vector: Vec3): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  /** Independent copy. */
  public clone(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  /** Cross product with v, in place. */
  public cross(v: Vec3): Vec3 {
    const x = this.x, y = this.y, z = this.z;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
  }

  /** Angle in radians between this and vector, or false if either is zero. */
  public getAngle(vector: Vec3): number | false {
    const magnitudes = this.getMagnitude() * vector.getMagnitude();
    if (!magnitudes)
      return false;
    return Math.acos(Utils.clamp(this.dotProduct(vector) / magnitudes, -1, 1));
  }

  /** Evaluate a quadratic Bézier at t into this vector. */
  public quadraticBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
    this.x = Bezier.quadratic(p0.x, p1.x, p2.x, t);
    this.y = Bezier.quadratic(p0.y, p1.y, p2.y, t);
    this.z = Bezier.quadratic(p0.z, p1.z, p2.z, t);
    return this;
  }

  /** Evaluate a cubic Bézier at t into this vector. */
  public cubicBezier(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
    this.x = Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t);
    this.y = Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t);
    this.z = Bezier.cubic(p0.z, p1.z, p2.z, p3.z, t);
    return this;
  }

  /** Quadratic Bézier tangent at t. */
  public quadraticBezierDerivative(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
    this.x = Bezier.quadraticDerivative(p0.x, p1.x, p2.x, t);
    this.y = Bezier.quadraticDerivative(p0.y, p1.y, p2.y, t);
    this.z = Bezier.quadraticDerivative(p0.z, p1.z, p2.z, t);
    return this;
  }

  /** Cubic Bézier tangent at t. */
  public cubicBezierDerivative(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
    this.x = Bezier.cubicDerivative(p0.x, p1.x, p2.x, p3.x, t);
    this.y = Bezier.cubicDerivative(p0.y, p1.y, p2.y, p3.y, t);
    this.z = Bezier.cubicDerivative(p0.z, p1.z, p2.z, p3.z, t);
    return this;
  }

  /** Split a quadratic at t into left and right. */
  public quadraticBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, t: number, left: Vec3[], right: Vec3[]): void {
    const lx: number[] = [];
    const ly: number[] = [];
    const lz: number[] = [];
    const rx: number[] = [];
    const ry: number[] = [];
    const rz: number[] = [];
    Bezier.quadraticSplit(p0.x, p1.x, p2.x, t, lx, rx);
    Bezier.quadraticSplit(p0.y, p1.y, p2.y, t, ly, ry);
    Bezier.quadraticSplit(p0.z, p1.z, p2.z, t, lz, rz);
    for (let i = 0; i < 3; i++) {
      left[i] ??= new Vec3();
      right[i] ??= new Vec3();
      left[i].setScalar(lx[i], ly[i], lz[i]);
      right[i].setScalar(rx[i], ry[i], rz[i]);
    }
    left.length = right.length = 3;
  }

  /** Split a cubic at t into left and right. */
  public cubicBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number, left: Vec3[], right: Vec3[]): void {
    const lx: number[] = [];
    const ly: number[] = [];
    const lz: number[] = [];
    const rx: number[] = [];
    const ry: number[] = [];
    const rz: number[] = [];
    Bezier.cubicSplit(p0.x, p1.x, p2.x, p3.x, t, lx, rx);
    Bezier.cubicSplit(p0.y, p1.y, p2.y, p3.y, t, ly, ry);
    Bezier.cubicSplit(p0.z, p1.z, p2.z, p3.z, t, lz, rz);
    for (let i = 0; i < 4; i++) {
      left[i] ??= new Vec3();
      right[i] ??= new Vec3();
      left[i].setScalar(lx[i], ly[i], lz[i]);
      right[i].setScalar(rx[i], ry[i], rz[i]);
    }
    left.length = right.length = 4;
  }

  /** Sampled arc length of a quadratic. */
  public quadraticBezierLength(p0: Vec3, p1: Vec3, p2: Vec3, samples?: number): number {
    return sampleCurveLength(
      t => Bezier.quadratic(p0.x, p1.x, p2.x, t),
      t => Bezier.quadratic(p0.y, p1.y, p2.y, t),
      t => Bezier.quadratic(p0.z, p1.z, p2.z, t),
      samples
    );
  }

  /** Sampled arc length of a cubic. */
  public cubicBezierLength(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, samples?: number): number {
    return sampleCurveLength(
      t => Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t),
      t => Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t),
      t => Bezier.cubic(p0.z, p1.z, p2.z, p3.z, t),
      samples
    );
  }

  /** Parameter t at the given quadratic arc length. */
  public quadraticBezierParameterAtLength(p0: Vec3, p1: Vec3, p2: Vec3, distance: number, samples?: number): number {
    return sampleCurveParameterAtLength(
      t => Bezier.quadratic(p0.x, p1.x, p2.x, t),
      t => Bezier.quadratic(p0.y, p1.y, p2.y, t),
      t => Bezier.quadratic(p0.z, p1.z, p2.z, t),
      distance,
      samples
    );
  }

  /** Parameter t at the given cubic arc length. */
  public cubicBezierParameterAtLength(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, distance: number, samples?: number): number {
    return sampleCurveParameterAtLength(
      t => Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t),
      t => Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t),
      t => Bezier.cubic(p0.z, p1.z, p2.z, p3.z, t),
      distance,
      samples
    );
  }

  /** Clamp each component between min and max. */
  public clamp(min: Vec3, max: Vec3): Vec3 {
    this.x = Utils.clamp(this.x, min.x, max.x);
    this.y = Utils.clamp(this.y, min.y, max.y);
    this.z = Utils.clamp(this.z, min.z, max.z);
    return this;
  }

  /** Linear interpolate from min to max by amount. */
  public lerp(min: Vec3, max: Vec3, amount: number): Vec3 {
    this.x = Utils.lerp(min.x, max.x, amount);
    this.y = Utils.lerp(min.y, max.y, amount);
    this.z = Utils.lerp(min.z, max.z, amount);
    return this;
  }

}
