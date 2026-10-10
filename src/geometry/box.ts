import { Vec3 } from '../vectors/vec3';
import type { Mat4x3 } from '../matrices/mat4x3';
import type { Mat4 } from '../matrices/mat4';
import { readPoint, asAffine, type PointSource } from './points';

/** Axis-aligned 3D bounding box; empty while max < min. */
export class Box {

  public min: Vec3;
  public max: Vec3;

  private static _center = new Vec3();
  private static _extent = new Vec3();
  private static _column = new Vec3();

  /** Empty box by default. */
  constructor(min: Vec3 = new Vec3(Infinity, Infinity, Infinity), max: Vec3 = new Vec3(-Infinity, -Infinity, -Infinity)) {
    this.min = min.clone();
    this.max = max.clone();
  }

  /** Set the corners. */
  public set(min: Vec3, max: Vec3): this {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  }

  /** Fit around Vec3 points or a flat array read with the given stride (2 or 3). */
  public setFromPoints(points: PointSource, stride: number = 3): this {
    this.makeEmpty();
    if (points.length === 0) return this;

    if (points[0] instanceof Vec3)
      for (const p of <Vec3[]>points)
        this.expandByPoint(p);
    else {
      const arr = <number[] | Float32Array>points;
      const tmp = new Vec3();
      for (let i = 0; i + stride <= arr.length; i += stride)
        this.expandByPoint(readPoint(arr, i, stride, tmp));
    }
    return this;
  }

  /** Reset to the empty box. */
  public makeEmpty(): this {
    this.min.setScalar(Infinity, Infinity, Infinity);
    this.max.setScalar(-Infinity, -Infinity, -Infinity);
    return this;
  }

  /** True if max is below min on any axis. */
  public isEmpty(): boolean {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }

  /** Write the center into target (the origin if empty). */
  public getCenter(target: Vec3 = new Vec3()): Vec3 {
    if (this.isEmpty()) return target.setScalar(0, 0, 0);
    return target.addVectors(this.min, this.max).halve();
  }

  /** Write max - min into target (the origin if empty). */
  public getSize(target: Vec3 = new Vec3()): Vec3 {
    if (this.isEmpty()) return target.setScalar(0, 0, 0);
    return target.subVectors(this.max, this.min);
  }

  /** Grow to include point. */
  public expandByPoint(point: Vec3): this {
    this.min.min(point);
    this.max.max(point);
    return this;
  }

  /** True if point is inside or on the box. */
  public containsPoint(point: Vec3): boolean {
    return point.isInBounds(this.min, this.max);
  }

  /** True if the boxes overlap. */
  public intersectsBox(box: Box): boolean {
    return !(
      box.max.x < this.min.x || box.min.x > this.max.x ||
      box.max.y < this.min.y || box.min.y > this.max.y ||
      box.max.z < this.min.z || box.min.z > this.max.z
    );
  }

  /** Independent copy. */
  public clone(): Box {
    return new Box(this.min, this.max);
  }

  /** Copy another box into this one. */
  public copy(box: Box): this {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  }

  /** Transform and refit around the result (center + abs(axis column) * half extent). */
  public applyMatrix4(matrix: Mat4x3 | Mat4): this {
    if (this.isEmpty()) return this;

    const affine = asAffine(matrix);
    const center = this.getCenter(Box._center);
    const extent = Box._extent.subVectors(this.max, this.min).halve();
    const column = Box._column;

    affine.transformPoint(center, center);
    this.min.copy(center);
    this.max.copy(center);

    for (let axis = 0 as 0 | 1 | 2; axis < 3; axis++) {
      const half = axis === 0 ? extent.x : axis === 1 ? extent.y : extent.z;
      affine.getColumn(axis, column).absolute().scale(half);
      this.min.subtract(column);
      this.max.add(column);
    }
    return this;
  }

}
