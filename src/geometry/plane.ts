import { Vec3 } from '../vectors/vec3';

/** Plane defined by unit normal and constant: points with normal · p + constant = 0. */
export class Plane {

  public normal: Vec3;
  public constant: number;

  /** Plane x = 0 by default. */
  constructor(normal: Vec3 = new Vec3(1, 0, 0), constant: number = 0) {
    this.normal = normal.clone();
    this.constant = constant;
  }

  /** Set normal and constant. */
  public set(normal: Vec3, constant: number): this {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  }

  /** Set from (a, b, c, d) plane coefficients and normalize. */
  public setComponents(x: number, y: number, z: number, w: number): this {
    this.normal.setScalar(x, y, z);
    this.constant = w;
    return this.normalize();
  }

  /** Scale so the normal has unit length. */
  public normalize(): this {
    const len = this.normal.getMagnitude() || 1.0;
    this.normal.divideScalar(len);
    this.constant /= len;
    return this;
  }

  /** Signed distance to point (positive on the normal side). */
  public distanceToPoint(point: Vec3): number {
    return this.normal.dotProduct(point) + this.constant;
  }

}
