import { Bezier, sampleCurveLength, sampleCurveParameterAtLength } from '../bezier';
import { Utils } from '../utils';

/** Mutable 3D vector. */
export class Vec3 {
  public x: number;
  public y: number;
  public z: number;

  private static readonly scratchSplit1 = new Vec3();

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

  /** Set this vector to a + b. */
  public addVectors(a: Vec3, b: Vec3): Vec3 {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
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

  /** Set this vector to a - b. */
  public subVectors(a: Vec3, b: Vec3): Vec3 {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
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

  /** Set this vector to component-wise a * b. */
  public multiplyVectors(a: Vec3, b: Vec3): Vec3 {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
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

  /** Set this vector to vector * scalar. */
  public scaleVector(vector: Vec3, scalar: number): Vec3 {
    this.x = vector.x * scalar;
    this.y = vector.y * scalar;
    this.z = vector.z * scalar;
    return this;
  }

  /** Component-wise divide. */
  public divide(vector: Vec3): Vec3 {
    this.x /= vector.x;
    this.y /= vector.y;
    this.z /= vector.z;
    return this;
  }

  /** Set this vector to component-wise a / b. */
  public divideVectors(a: Vec3, b: Vec3): Vec3 {
    this.x = a.x / b.x;
    this.y = a.y / b.y;
    this.z = a.z / b.z;
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

  /** Set this vector to component-wise min(a, b). */
  public minVectors(a: Vec3, b: Vec3): Vec3 {
    this.x = Math.min(a.x, b.x);
    this.y = Math.min(a.y, b.y);
    this.z = Math.min(a.z, b.z);
    return this;
  }

  /** Set this vector to component-wise max(a, b). */
  public maxVectors(a: Vec3, b: Vec3): Vec3 {
    this.x = Math.max(a.x, b.x);
    this.y = Math.max(a.y, b.y);
    this.z = Math.max(a.z, b.z);
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

  /** Scale to unit length. If length is 0 and fallback is provided, sets to fallback. */
  public normalize(fallback?: Vec3): Vec3 {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (length) {
      if (length !== 1) {
        const inv = 1 / length;
        this.x *= inv;
        this.y *= inv;
        this.z *= inv;
      }
    } else if (fallback) {
      this.x = fallback.x;
      this.y = fallback.y;
      this.z = fallback.z;
    }
    return this;
  }

  /** Set this vector to normalized vector. If length is 0 and fallback is provided, sets to fallback. */
  public normalizeVector(vector: Vec3, fallback?: Vec3): Vec3 {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    if (length) {
      const inv = 1 / length;
      this.x = vector.x * inv;
      this.y = vector.y * inv;
      this.z = vector.z * inv;
    } else if (fallback) {
      this.x = fallback.x;
      this.y = fallback.y;
      this.z = fallback.z;
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
    return this;
  }

  /** Scale this vector to the given length in place. */
  public setLength(length: number): Vec3 {
    return this.normalize().scale(length);
  }

  /** Set this vector to vector scaled to the given length. */
  public setLengthVector(vector: Vec3, length: number): Vec3 {
    return this.normalizeVector(vector).scale(length);
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

  /** Set this vector to component-wise Math.abs(vector). */
  public absoluteVector(vector: Vec3): Vec3 {
    this.x = Math.abs(vector.x);
    this.y = Math.abs(vector.y);
    this.z = Math.abs(vector.z);
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

  /** Set this vector to -vector. */
  public oppositeVector(vector: Vec3): Vec3 {
    this.x = -vector.x;
    this.y = -vector.y;
    this.z = -vector.z;
    return this;
  }

  /** Set each component to its Math.sign (-1, 0, or 1). */
  public sign(): Vec3 {
    this.x = Math.sign(this.x);
    this.y = Math.sign(this.y);
    this.z = Math.sign(this.z);
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

  /** Set this vector to cross product a x b. */
  public crossVectors(a: Vec3, b: Vec3): Vec3 {
    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
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
    if (!left[0])
      left[0] = new Vec3();
    if (!left[1])
      left[1] = new Vec3();
    if (!left[2])
      left[2] = new Vec3();
    if (!right[0])
      right[0] = new Vec3();
    if (!right[1])
      right[1] = new Vec3();
    if (!right[2])
      right[2] = new Vec3();

    left[0].copy(p0);
    const p01 = left[1].lerpVectors(p0, p1, t);
    const p12 = right[1].lerpVectors(p1, p2, t);
    const mid = left[2].lerpVectors(p01, p12, t);
    right[0].copy(mid);
    right[2].copy(p2);

    left.length = 3;
    right.length = 3;
  }

  /** Split a cubic at t into left and right. */
  public cubicBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number, left: Vec3[], right: Vec3[]): void {
    if (!left[0])
      left[0] = new Vec3();
    if (!left[1])
      left[1] = new Vec3();
    if (!left[2])
      left[2] = new Vec3();
    if (!left[3])
      left[3] = new Vec3();
    if (!right[0])
      right[0] = new Vec3();
    if (!right[1])
      right[1] = new Vec3();
    if (!right[2])
      right[2] = new Vec3();
    if (!right[3])
      right[3] = new Vec3();

    left[0].copy(p0);
    const p01 = left[1].lerpVectors(p0, p1, t);
    const p12 = Vec3.scratchSplit1.lerpVectors(p1, p2, t);
    const p23 = right[2].lerpVectors(p2, p3, t);

    const p012 = left[2].lerpVectors(p01, p12, t);
    const p123 = right[1].lerpVectors(p12, p23, t);

    const mid = left[3].lerpVectors(p012, p123, t);
    right[0].copy(mid);
    right[3].copy(p3);

    left.length = 4;
    right.length = 4;
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
    return this.clampVectors(this, min, max);
  }

  /** Set this vector to value clamped between min and max bounds. */
  public clampVectors(value: Vec3, min: Vec3, max: Vec3): Vec3 {
    this.x = Utils.clamp(value.x, min.x, max.x);
    this.y = Utils.clamp(value.y, min.y, max.y);
    this.z = Utils.clamp(value.z, min.z, max.z);
    return this;
  }

  /** Project this vector onto a normal in-place. */
  public project(normal: Vec3): Vec3 {
    return this.scaleVector(normal, this.dotProduct(normal));
  }

  /** Set this vector to vector projected onto a normal. */
  public projectVector(vector: Vec3, normal: Vec3): Vec3 {
    return this.scaleVector(normal, vector.dotProduct(normal));
  }

  /** Reflect this vector across a surface normal in-place. */
  public reflect(normal: Vec3): Vec3 {
    return this.subtractScaledVector(normal, 2 * this.dotProduct(normal));
  }

  /** Set this vector to vector reflected across a surface normal. */
  public reflectVector(vector: Vec3, normal: Vec3): Vec3 {
    return this.copy(vector).subtractScaledVector(normal, 2 * vector.dotProduct(normal));
  }

  /** Clamp each component between min and max scalars. */
  public clampScalar(min: number, max: number): Vec3 {
    this.x = Utils.clamp(this.x, min, max);
    this.y = Utils.clamp(this.y, min, max);
    this.z = Utils.clamp(this.z, min, max);
    return this;
  }

  /** Clamp this vector component-wise to [-extent, extent]. */
  public clampToExtent(extent: Vec3): Vec3 {
    this.x = Utils.clamp(this.x, -extent.x, extent.x);
    this.y = Utils.clamp(this.y, -extent.y, extent.y);
    this.z = Utils.clamp(this.z, -extent.z, extent.z);
    return this;
  }

  /** Set this vector to vector clamped component-wise to [-extent, extent]. */
  public clampToExtentVectors(vector: Vec3, extent: Vec3): Vec3 {
    this.x = Utils.clamp(vector.x, -extent.x, extent.x);
    this.y = Utils.clamp(vector.y, -extent.y, extent.y);
    this.z = Utils.clamp(vector.z, -extent.z, extent.z);
    return this;
  }

  /** True if this point lies inside or on the axis-aligned bounds defined by min and max corners. */
  public isInBounds(min: Vec3, max: Vec3): boolean {
    const minX = Math.min(min.x, max.x);
    const maxX = Math.max(min.x, max.x);
    const minY = Math.min(min.y, max.y);
    const maxY = Math.max(min.y, max.y);
    const minZ = Math.min(min.z, max.z);
    const maxZ = Math.max(min.z, max.z);
    return (
      this.x >= minX && this.x <= maxX &&
      this.y >= minY && this.y <= maxY &&
      this.z >= minZ && this.z <= maxZ
    );
  }

  /** Linear interpolate toward target by amount, or from min to max by amount. */
  public lerp(target: Vec3, amount: number): Vec3;
  public lerp(min: Vec3, max: Vec3, amount: number): Vec3;
  public lerp(minOrTarget: Vec3, maxOrAmount: Vec3 | number, amount?: number): Vec3 {
    if (typeof maxOrAmount === 'number') {
      this.x = Utils.lerp(this.x, minOrTarget.x, maxOrAmount);
      this.y = Utils.lerp(this.y, minOrTarget.y, maxOrAmount);
      this.z = Utils.lerp(this.z, minOrTarget.z, maxOrAmount);
      return this;
    }
    this.x = Utils.lerp(minOrTarget.x, maxOrAmount.x, amount!);
    this.y = Utils.lerp(minOrTarget.y, maxOrAmount.y, amount!);
    this.z = Utils.lerp(minOrTarget.z, maxOrAmount.z, amount!);
    return this;
  }

  /** Set this vector to linear interpolation between min and max by amount. */
  public lerpVectors(min: Vec3, max: Vec3, amount: number): Vec3 {
    this.x = Utils.lerp(min.x, max.x, amount);
    this.y = Utils.lerp(min.y, max.y, amount);
    this.z = Utils.lerp(min.z, max.z, amount);
    return this;
  }

}
