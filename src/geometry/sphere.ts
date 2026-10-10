import { Vec3 } from '../vectors/vec3';
import type { Mat4x3 } from '../matrices/mat4x3';
import type { Mat4 } from '../matrices/mat4';
import { readPoint, asAffine, type PointSource } from './points';
import { Box } from './box';

/** 3D bounding sphere. */
export class Sphere {

  public center: Vec3;
  public radius: number;

  private static _scratchClamp = new Vec3();
  private static _scale = new Vec3();

  /** Sphere at the origin with radius 0 by default. */
  constructor(center: Vec3 = new Vec3(), radius: number = 0) {
    this.center = center.clone();
    this.radius = radius;
  }

  /** Set center and radius. */
  public set(center: Vec3, radius: number): this {
    this.center.copy(center);
    this.radius = radius;
    return this;
  }

  /** Enclose points around their box center (or optionalCenter). */
  public setFromPoints(points: PointSource, optionalCenter?: Vec3, stride: number = 3): this {
    const box = new Box().setFromPoints(points, stride);
    if (optionalCenter)
      this.center.copy(optionalCenter);
    else
      box.getCenter(this.center);

    let maxRadiusSq = 0;
    if (points.length > 0 && points[0] instanceof Vec3)
      for (const p of <Vec3[]>points)
        maxRadiusSq = Math.max(maxRadiusSq, this.center.getDistance(p, true));
    else {
      const arr = <number[] | Float32Array>points;
      const tmp = new Vec3();
      for (let i = 0; i + stride <= arr.length; i += stride)
        maxRadiusSq = Math.max(maxRadiusSq, this.center.getDistance(readPoint(arr, i, stride, tmp), true));
    }

    this.radius = Math.sqrt(maxRadiusSq);
    return this;
  }

  /** True if point is inside or on the sphere. */
  public containsPoint(point: Vec3): boolean {
    return this.center.getDistance(point, true) <= this.radius * this.radius;
  }

  /** True if the spheres overlap. */
  public intersectsSphere(sphere: Sphere): boolean {
    const radiusSum = this.radius + sphere.radius;
    return this.center.getDistance(sphere.center, true) <= radiusSum * radiusSum;
  }

  /** True if the sphere overlaps the box. */
  public intersectsBox(box: Box): boolean {
    const closest = Sphere._scratchClamp.copy(this.center).clamp(box.min, box.max);
    return this.center.getDistance(closest, true) <= this.radius * this.radius;
  }

  /** Transform the center and scale the radius by the largest axis scale. */
  public applyMatrix4(matrix: Mat4x3 | Mat4): this {
    const affine = asAffine(matrix);
    affine.transformPoint(this.center, this.center);
    this.radius *= affine.getScale(Sphere._scale).maxComponent();
    return this;
  }

  /** Independent copy. */
  public clone(): Sphere {
    return new Sphere(this.center, this.radius);
  }

  /** Copy another sphere into this one. */
  public copy(sphere: Sphere): this {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  }

}
