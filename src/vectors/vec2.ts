import { Trigo, applySineCosine } from '../trigo';
import { Bezier, sampleCurveLength, sampleCurveParameterAtLength } from '../bezier';
import type { Rect } from '../geometry/rect';
import { Utils } from '../utils';

/** Mutable 2D vector. */
export class Vec2 {
  public x: number;
  public y: number;

  /** Create a 2D vector (defaults to the origin). */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /** Set x and/or y; omitted axes are unchanged. */
  public setScalar(x?: number | null, y?: number | null): Vec2 {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    return this;
  }

  /** Set x, y from array at offset. */
  public setArray(array: number[], offset: number = 0): Vec2 {
    this.x = array[offset] ?? this.x;
    this.y = array[offset + 1] ?? this.y;
    return this;
  }

  /** Copy another vector into this one. */
  public copy(vector: Vec2): Vec2 {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  /** True if both components are >= 0. */
  public isPositive(): boolean {
    return this.x >= 0 && this.y >= 0;
  }

  /** True if both components equal scalar. */
  public isEqualTo(scalar: number): boolean {
    return this.x === scalar && this.y === scalar;
  }

  /** True if both components match the other vector. */
  public equals(vector: Vec2): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  /** True if both components are 0. */
  public isOrigin(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /** Write [x, y] into target (or a new array). */
  public toArray(target: number[] = []): number[] {
    target[0] = this.x;
    target[1] = this.y;
    target.length = 2;
    return target;
  }

  /** Human-readable (x, y) string. */
  public toString(): string {
    return `(x = ${this.x}; y = ${this.y})`;
  }

  /** Set both components to 0. */
  public origin(): Vec2 {
    this.x = 0;
    this.y = 0;
    return this;
  }

  /** Length, or squared length if square is true. */
  public getMagnitude(square: boolean = false): number {
    const squared = this.x * this.x + this.y * this.y;
    return square ? squared : Math.sqrt(squared);
  }

  /** Distance to vector; squared if square is true. */
  public getDistance(vector: Vec2, square: boolean = false): number {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    const squared = dx * dx + dy * dy;
    return square ? squared : Math.sqrt(squared);
  }

  /** Add vector in place. */
  public add(vector: Vec2): Vec2 {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  /** Add vector scaled by scalar. */
  public addScaledVector(vector: Vec2, scalar: number): Vec2 {
    this.x += vector.x * scalar;
    this.y += vector.y * scalar;
    return this;
  }

  /** Add scalar to both components. */
  public addScalar(scalar: number): Vec2 {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  /** Sum of x and y. */
  public addComponents(): number {
    return this.x + this.y;
  }

  /** Subtract vector in place. */
  public subtract(vector: Vec2): Vec2 {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  /** Subtract vector scaled by scalar. */
  public subtractScaledVector(vector: Vec2, scalar: number): Vec2 {
    this.x -= vector.x * scalar;
    this.y -= vector.y * scalar;
    return this;
  }

  /** Subtract scalar from both components. */
  public subtractScalar(scalar: number): Vec2 {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  }

  /** Component-wise multiply. */
  public multiply(vector: Vec2): Vec2 {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }

  /** Component-wise multiply by vector * scalar. */
  public multiplyScaledVector(vector: Vec2, scalar: number): Vec2 {
    this.x *= vector.x * scalar;
    this.y *= vector.y * scalar;
    return this;
  }

  /** Multiply by scalar, optionally on one axis. */
  public scale(scalar: number, axis?: 'x' | 'y'): Vec2 {
    if (!axis) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
    if (axis === 'x')
      this.x *= scalar;
    else
      this.y *= scalar;
    return this;
  }

  /** Component-wise divide. */
  public divide(vector: Vec2): Vec2 {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
  }

  /** Component-wise divide by vector * scalar. */
  public divideScaledVector(vector: Vec2, scalar: number): Vec2 {
    this.x /= vector.x * scalar;
    this.y /= vector.y * scalar;
    return this;
  }

  /** Divide both components by scalar. */
  public divideScalar(scalar: number): Vec2 {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /** Scale by 1/2. */
  public halve(): Vec2 {
    this.x *= 0.5;
    this.y *= 0.5;
    return this;
  }

  /** Component-wise maximum with vector. */
  public max(vector: Vec2): Vec2 {
    this.x = Math.max(this.x, vector.x);
    this.y = Math.max(this.y, vector.y);
    return this;
  }

  /** Component-wise minimum with vector. */
  public min(vector: Vec2): Vec2 {
    this.x = Math.min(this.x, vector.x);
    this.y = Math.min(this.y, vector.y);
    return this;
  }

  /** Raise each component to at least scalar. */
  public maxScalar(scalar: number): Vec2 {
    this.x = Math.max(this.x, scalar);
    this.y = Math.max(this.y, scalar);
    return this;
  }

  /** Lower each component to at most scalar. */
  public minScalar(scalar: number): Vec2 {
    this.x = Math.min(this.x, scalar);
    this.y = Math.min(this.y, scalar);
    return this;
  }

  /** Scale to unit length. */
  public normalize(): Vec2 {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    if (length && length !== 1) {
      const inv = 1 / length;
      this.x *= inv;
      this.y *= inv;
    }
    return this;
  }

  /** Absolute value, optionally on one axis. */
  public absolute(axis?: 'x' | 'y'): Vec2 {
    if (!axis) {
      this.x = Math.abs(this.x);
      this.y = Math.abs(this.y);
      return this;
    }
    if (axis === 'x')
      this.x = Math.abs(this.x);
    else
      this.y = Math.abs(this.y);
    return this;
  }

  /** Negate, optionally on one axis. */
  public opposite(axis?: 'x' | 'y'): Vec2 {
    if (!axis) {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    }
    if (axis === 'x')
      this.x = -this.x;
    else
      this.y = -this.y;
    return this;
  }

  /** Floor, optionally on one axis. */
  public floor(axis?: 'x' | 'y'): Vec2 {
    if (!axis) {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
    }
    if (axis === 'x')
      this.x = Math.floor(this.x);
    else
      this.y = Math.floor(this.y);
    return this;
  }

  /** Ceil, optionally on one axis. */
  public ceil(axis?: 'x' | 'y'): Vec2 {
    if (!axis) {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
    }
    if (axis === 'x')
      this.x = Math.ceil(this.x);
    else
      this.y = Math.ceil(this.y);
    return this;
  }

  /** Dot product with vector. */
  public dotProduct(vector: Vec2): number {
    return this.x * vector.x + this.y * vector.y;
  }

  /** Keep length; set heading in radians. */
  public setRadian(angle: number): Vec2 {
    applySineCosine(this, angle, Math.sqrt(this.x * this.x + this.y * this.y));
    return this;
  }

  /** Keep length; set heading in degrees. */
  public setDegree(angle: number): Vec2 {
    return this.setRadian(Trigo.degreeToRadian(angle));
  }

  /** Set the smaller component to scalar. */
  public setMinAxis(scalar: number): Vec2 {
    if (this.y < this.x)
      this.y = scalar;
    else
      this.x = scalar;
    return this;
  }

  /** Set the larger component to scalar. */
  public setMaxAxis(scalar: number): Vec2 {
    if (this.y > this.x)
      this.y = scalar;
    else
      this.x = scalar;
    return this;
  }

  /** Set the other axis to value. */
  public setOppositeAxis(axis: 'x' | 'y', value: number): Vec2 {
    if (axis === 'y')
      this.x = value;
    else
      this.y = value;
    return this;
  }

  /** Independent copy. */
  public clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  /** Heading in radians, or false at the origin. */
  public getAngle(): number | false {
    return Trigo.arctan2(this.y, this.x);
  }

  /** Evaluate a quadratic Bézier at t into this vector. */
  public quadraticBezier(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2 {
    this.x = Bezier.quadratic(p0.x, p1.x, p2.x, t);
    this.y = Bezier.quadratic(p0.y, p1.y, p2.y, t);
    return this;
  }

  /** Evaluate a cubic Bézier at t into this vector. */
  public cubicBezier(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
    this.x = Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t);
    this.y = Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t);
    return this;
  }

  /** Quadratic Bézier tangent at t. */
  public quadraticBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2 {
    this.x = Bezier.quadraticDerivative(p0.x, p1.x, p2.x, t);
    this.y = Bezier.quadraticDerivative(p0.y, p1.y, p2.y, t);
    return this;
  }

  /** Cubic Bézier tangent at t. */
  public cubicBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
    this.x = Bezier.cubicDerivative(p0.x, p1.x, p2.x, p3.x, t);
    this.y = Bezier.cubicDerivative(p0.y, p1.y, p2.y, p3.y, t);
    return this;
  }

  /** Split a quadratic at t into left and right. */
  public quadraticBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, t: number, left: Vec2[], right: Vec2[]): void {
    const lx: number[] = [];
    const ly: number[] = [];
    const rx: number[] = [];
    const ry: number[] = [];
    Bezier.quadraticSplit(p0.x, p1.x, p2.x, t, lx, rx);
    Bezier.quadraticSplit(p0.y, p1.y, p2.y, t, ly, ry);
    for (let i = 0; i < 3; i++) {
      left[i] ??= new Vec2();
      right[i] ??= new Vec2();
      left[i].setScalar(lx[i], ly[i]);
      right[i].setScalar(rx[i], ry[i]);
    }
    left.length = right.length = 3;
  }

  /** Split a cubic at t into left and right. */
  public cubicBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number, left: Vec2[], right: Vec2[]): void {
    const lx: number[] = [];
    const ly: number[] = [];
    const rx: number[] = [];
    const ry: number[] = [];
    Bezier.cubicSplit(p0.x, p1.x, p2.x, p3.x, t, lx, rx);
    Bezier.cubicSplit(p0.y, p1.y, p2.y, p3.y, t, ly, ry);
    for (let i = 0; i < 4; i++) {
      left[i] ??= new Vec2();
      right[i] ??= new Vec2();
      left[i].setScalar(lx[i], ly[i]);
      right[i].setScalar(rx[i], ry[i]);
    }
    left.length = right.length = 4;
  }

  /** Sampled arc length of a quadratic. */
  public quadraticBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, samples?: number): number {
    return sampleCurveLength(
      t => Bezier.quadratic(p0.x, p1.x, p2.x, t),
      t => Bezier.quadratic(p0.y, p1.y, p2.y, t),
      undefined,
      samples
    );
  }

  /** Sampled arc length of a cubic. */
  public cubicBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, samples?: number): number {
    return sampleCurveLength(
      t => Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t),
      t => Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t),
      undefined,
      samples
    );
  }

  /** Parameter t at the given quadratic arc length. */
  public quadraticBezierParameterAtLength(p0: Vec2, p1: Vec2, p2: Vec2, distance: number, samples?: number): number {
    return sampleCurveParameterAtLength(
      t => Bezier.quadratic(p0.x, p1.x, p2.x, t),
      t => Bezier.quadratic(p0.y, p1.y, p2.y, t),
      undefined,
      distance,
      samples
    );
  }

  /** Parameter t at the given cubic arc length. */
  public cubicBezierParameterAtLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, distance: number, samples?: number): number {
    return sampleCurveParameterAtLength(
      t => Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t),
      t => Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t),
      undefined,
      distance,
      samples
    );
  }

  /** Name of the larger component. */
  public getMaxAxis(): 'x' | 'y' {
    return this.y > this.x ? 'y' : 'x';
  }

  /** Name of the smaller component. */
  public getMinAxis(): 'x' | 'y' {
    return this.y < this.x ? 'y' : 'x';
  }

  /** Clamp this point inside a rectangle. */
  public clamp(rect: Rect): Vec2 {
    this.x = Utils.clamp(this.x, rect.topLeftCorner.x, rect.bottomRightCorner.x);
    this.y = Utils.clamp(this.y, rect.topLeftCorner.y, rect.bottomRightCorner.y);
    return this;
  }

  /** Linear interpolate from min to max by amount. */
  public lerp(min: Vec2, max: Vec2, amount: number): Vec2 {
    this.x = Utils.lerp(min.x, max.x, amount);
    this.y = Utils.lerp(min.y, max.y, amount);
    return this;
  }

}
