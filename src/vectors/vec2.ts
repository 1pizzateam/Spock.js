import { Trigo, applySineCosine } from '../trigo';
import { Bezier, sampleCurveLength, sampleCurveParameterAtLength } from '../bezier';
import type { Rect } from '../geometry/rect';
import { Utils } from '../utils';

/** Mutable 2D vector. */
export class Vec2 {
  public x: number;
  public y: number;

  private static readonly scratchSplit1 = new Vec2();

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

  /** Set this vector to a + b. */
  public addVectors(a: Vec2, b: Vec2): Vec2 {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
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

  /** Set this vector to a - b. */
  public subVectors(a: Vec2, b: Vec2): Vec2 {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
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

  /** Set this vector to component-wise a * b. */
  public multiplyVectors(a: Vec2, b: Vec2): Vec2 {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
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

  /** Set this vector to vector * scalar. */
  public scaleVector(vector: Vec2, scalar: number): Vec2 {
    this.x = vector.x * scalar;
    this.y = vector.y * scalar;
    return this;
  }

  /** Component-wise divide. */
  public divide(vector: Vec2): Vec2 {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
  }

  /** Set this vector to component-wise a / b. */
  public divideVectors(a: Vec2, b: Vec2): Vec2 {
    this.x = a.x / b.x;
    this.y = a.y / b.y;
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

  /** Set this vector to component-wise min(a, b). */
  public minVectors(a: Vec2, b: Vec2): Vec2 {
    this.x = Math.min(a.x, b.x);
    this.y = Math.min(a.y, b.y);
    return this;
  }

  /** Set this vector to component-wise max(a, b). */
  public maxVectors(a: Vec2, b: Vec2): Vec2 {
    this.x = Math.max(a.x, b.x);
    this.y = Math.max(a.y, b.y);
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

  /** Scale to unit length. If length is 0 and fallback is provided, sets to fallback. */
  public normalize(fallback?: Vec2): Vec2 {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    if (length) {
      if (length !== 1) {
        const inv = 1 / length;
        this.x *= inv;
        this.y *= inv;
      }
    } else if (fallback) {
      this.x = fallback.x;
      this.y = fallback.y;
    }
    return this;
  }

  /** Set this vector to normalized vector. If length is 0 and fallback is provided, sets to fallback. */
  public normalizeVector(vector: Vec2, fallback?: Vec2): Vec2 {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    if (length) {
      const inv = 1 / length;
      this.x = vector.x * inv;
      this.y = vector.y * inv;
    } else if (fallback) {
      this.x = fallback.x;
      this.y = fallback.y;
    } else {
      this.x = 0;
      this.y = 0;
    }
    return this;
  }

  /** Scale this vector to the given length in place. */
  public setLength(length: number): Vec2 {
    return this.normalize().scale(length);
  }

  /** Set this vector to vector scaled to the given length. */
  public setLengthVector(vector: Vec2, length: number): Vec2 {
    return this.normalizeVector(vector).scale(length);
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

  /** Set this vector to component-wise Math.abs(vector). */
  public absoluteVector(vector: Vec2): Vec2 {
    this.x = Math.abs(vector.x);
    this.y = Math.abs(vector.y);
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

  /** Set this vector to -vector. */
  public oppositeVector(vector: Vec2): Vec2 {
    this.x = -vector.x;
    this.y = -vector.y;
    return this;
  }

  /** Set each component to its Math.sign (-1, 0, or 1). */
  public sign(): Vec2 {
    this.x = Math.sign(this.x);
    this.y = Math.sign(this.y);
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

  /** 2D cross product / determinant (this.x * vector.y - this.y * vector.x). */
  public crossProduct(vector: Vec2): number {
    return this.x * vector.y - this.y * vector.x;
  }

  /** Rotate 90 degrees counter-clockwise in-place (-y, x). */
  public perp(): Vec2 {
    const x = this.x;
    this.x = -this.y;
    this.y = x;
    return this;
  }

  /** Rotate 90 degrees clockwise in-place (y, -x). */
  public perpCW(): Vec2 {
    const x = this.x;
    this.x = this.y;
    this.y = -x;
    return this;
  }

  /** Set this vector to perpendicular of vector (-y, x). */
  public perpVector(vector: Vec2): Vec2 {
    const x = vector.x;
    this.x = -vector.y;
    this.y = x;
    return this;
  }

  /** Set this vector to clockwise perpendicular of vector (y, -x). */
  public perpCWVector(vector: Vec2): Vec2 {
    const x = vector.x;
    this.x = vector.y;
    this.y = -x;
    return this;
  }

  /** Project this vector onto a normal in-place. */
  public project(normal: Vec2): Vec2 {
    return this.scaleVector(normal, this.dotProduct(normal));
  }

  /** Set this vector to vector projected onto a normal. */
  public projectVector(vector: Vec2, normal: Vec2): Vec2 {
    return this.scaleVector(normal, vector.dotProduct(normal));
  }

  /** Reflect this vector across a surface normal in-place. */
  public reflect(normal: Vec2): Vec2 {
    return this.subtractScaledVector(normal, 2 * this.dotProduct(normal));
  }

  /** Set this vector to vector reflected across a surface normal. */
  public reflectVector(vector: Vec2, normal: Vec2): Vec2 {
    return this.copy(vector).subtractScaledVector(normal, 2 * vector.dotProduct(normal));
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

  /** Zero the larger component in-place and return the shallowest axis name. */
  public isolateMinAxis(): 'x' | 'y' {
    if (this.y < this.x) {
      this.x = 0;
      return 'y';
    }
    this.y = 0;
    return 'x';
  }

  /** Zero the smaller component in-place and return the largest axis name. */
  public isolateMaxAxis(): 'x' | 'y' {
    if (this.y > this.x) {
      this.x = 0;
      return 'y';
    }
    this.y = 0;
    return 'x';
  }

  /** Zero the larger component in-place, keeping only the minimum axis. If reference is provided, applies reference's sign along that axis. */
  public projectToMinAxis(reference?: Vec2): Vec2 {
    if (Math.abs(this.y) < Math.abs(this.x)) {
      this.x = 0;
      if (reference)
        this.y = reference.y < 0 ? -Math.abs(this.y) : Math.abs(this.y);
    } else {
      this.y = 0;
      if (reference)
        this.x = reference.x < 0 ? -Math.abs(this.x) : Math.abs(this.x);
    }
    return this;
  }

  /** Zero the smaller component in-place, keeping only the maximum axis. If reference is provided, applies reference's sign along that axis. */
  public projectToMaxAxis(reference?: Vec2): Vec2 {
    if (Math.abs(this.y) > Math.abs(this.x)) {
      this.x = 0;
      if (reference)
        this.y = reference.y < 0 ? -Math.abs(this.y) : Math.abs(this.y);
    } else {
      this.y = 0;
      if (reference)
        this.x = reference.x < 0 ? -Math.abs(this.x) : Math.abs(this.x);
    }
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
    if (!left[0])
      left[0] = new Vec2();
    if (!left[1])
      left[1] = new Vec2();
    if (!left[2])
      left[2] = new Vec2();
    if (!right[0])
      right[0] = new Vec2();
    if (!right[1])
      right[1] = new Vec2();
    if (!right[2])
      right[2] = new Vec2();

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
  public cubicBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number, left: Vec2[], right: Vec2[]): void {
    if (!left[0])
      left[0] = new Vec2();
    if (!left[1])
      left[1] = new Vec2();
    if (!left[2])
      left[2] = new Vec2();
    if (!left[3])
      left[3] = new Vec2();
    if (!right[0])
      right[0] = new Vec2();
    if (!right[1])
      right[1] = new Vec2();
    if (!right[2])
      right[2] = new Vec2();
    if (!right[3])
      right[3] = new Vec2();

    left[0].copy(p0);
    const p01 = left[1].lerpVectors(p0, p1, t);
    const p12 = Vec2.scratchSplit1.lerpVectors(p1, p2, t);
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

  /** Clamp this point inside a rectangle or between min and max bounds. */
  public clamp(rect: Rect): Vec2;
  public clamp(min: Vec2, max: Vec2): Vec2;
  public clamp(minOrRect: Vec2 | Rect, max?: Vec2): Vec2 {
    if (max !== undefined)
      return this.clampVectors(this, minOrRect as Vec2, max);
    const rect = minOrRect as Rect;
    return this.clampVectors(this, rect.topLeftCorner, rect.bottomRightCorner);
  }

  /** Set this vector to value clamped between min and max bounds. */
  public clampVectors(value: Vec2, min: Vec2, max: Vec2): Vec2 {
    this.x = Utils.clamp(value.x, min.x, max.x);
    this.y = Utils.clamp(value.y, min.y, max.y);
    return this;
  }

  /** Clamp each component between min and max scalars. */
  public clampScalar(min: number, max: number): Vec2 {
    this.x = Utils.clamp(this.x, min, max);
    this.y = Utils.clamp(this.y, min, max);
    return this;
  }

  /** Clamp this vector component-wise to [-extent, extent]. */
  public clampToExtent(extent: Vec2): Vec2 {
    this.x = Utils.clamp(this.x, -extent.x, extent.x);
    this.y = Utils.clamp(this.y, -extent.y, extent.y);
    return this;
  }

  /** Set this vector to vector clamped component-wise to [-extent, extent]. */
  public clampToExtentVectors(vector: Vec2, extent: Vec2): Vec2 {
    this.x = Utils.clamp(vector.x, -extent.x, extent.x);
    this.y = Utils.clamp(vector.y, -extent.y, extent.y);
    return this;
  }

  /** True if this point lies inside or on an axis-aligned bounding box or Rect. */
  public isInBounds(rect: Rect): boolean;
  public isInBounds(min: Vec2, max: Vec2): boolean;
  public isInBounds(minOrRect: Vec2 | Rect, max?: Vec2): boolean {
    if (max !== undefined) {
      const min = minOrRect as Vec2;
      const minX = Math.min(min.x, max.x);
      const maxX = Math.max(min.x, max.x);
      const minY = Math.min(min.y, max.y);
      const maxY = Math.max(min.y, max.y);
      return this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY;
    }
    const rect = minOrRect as Rect;
    return this.x >= rect.topLeftCorner.x && this.x <= rect.bottomRightCorner.x &&
           this.y >= rect.topLeftCorner.y && this.y <= rect.bottomRightCorner.y;
  }

  /** Linear interpolate toward target by amount, or from min to max by amount. */
  public lerp(target: Vec2, amount: number): Vec2;
  public lerp(min: Vec2, max: Vec2, amount: number): Vec2;
  public lerp(minOrTarget: Vec2, maxOrAmount: Vec2 | number, amount?: number): Vec2 {
    if (typeof maxOrAmount === 'number') {
      this.x = Utils.lerp(this.x, minOrTarget.x, maxOrAmount);
      this.y = Utils.lerp(this.y, minOrTarget.y, maxOrAmount);
      return this;
    }
    this.x = Utils.lerp(minOrTarget.x, maxOrAmount.x, amount!);
    this.y = Utils.lerp(minOrTarget.y, maxOrAmount.y, amount!);
    return this;
  }

  /** Set this vector to linear interpolation between min and max by amount. */
  public lerpVectors(min: Vec2, max: Vec2, amount: number): Vec2 {
    this.x = Utils.lerp(min.x, max.x, amount);
    this.y = Utils.lerp(min.y, max.y, amount);
    return this;
  }

}
