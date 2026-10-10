import { Vec3 } from '../vectors/vec3';
import type { Box } from './box';
import type { Sphere } from './sphere';

/** 3D ray with a unit direction. */
export class Ray3 {

  public origin: Vec3;
  public direction: Vec3;

  private static _v1 = new Vec3();
  private static _edge1 = new Vec3();
  private static _edge2 = new Vec3();
  private static _pvec = new Vec3();
  private static _tvec = new Vec3();
  private static _qvec = new Vec3();
  private static _inv = new Vec3();
  private static _t1 = new Vec3();
  private static _t2 = new Vec3();

  /** Ray along -Z from the origin by default. The direction is normalized. */
  constructor(origin: Vec3 = new Vec3(), direction: Vec3 = new Vec3(0, 0, -1)) {
    this.origin = origin.clone();
    this.direction = direction.clone().normalize();
  }

  /** Set origin and direction (normalized). */
  public set(origin: Vec3, direction: Vec3): this {
    this.origin.copy(origin);
    this.direction.copy(direction).normalize();
    return this;
  }

  /** Write the point at distance t along the ray into target. */
  public at(t: number, target: Vec3 = new Vec3()): Vec3 {
    return target.copy(this.origin).addScaledVector(this.direction, t);
  }

  /** True if the ray hits the box. */
  public intersectsBox(box: Box): boolean {
    return this.intersectBox(box) !== null;
  }

  private static safeInverse(d: number): number {
    return 1 / (Math.abs(d) < 1e-15 ? (d < 0 ? -1e-15 : 1e-15) : d);
  }

  /** Slab test: first hit point on the box (or the exit point from inside), else null. */
  public intersectBox(box: Box, target: Vec3 = new Vec3()): Vec3 | null {
    const inv = Ray3._inv.setScalar(
      Ray3.safeInverse(this.direction.x),
      Ray3.safeInverse(this.direction.y),
      Ray3.safeInverse(this.direction.z)
    );
    const t1 = Ray3._t1.subVectors(box.min, this.origin).multiply(inv);
    const t2 = Ray3._t2.subVectors(box.max, this.origin).multiply(inv);

    const near = Ray3._inv.minVectors(t1, t2).maxComponent();
    const far = t1.maxVectors(t1, t2).minComponent();

    if (near > far || far < 0) return null;

    return this.at(near >= 0 ? near : far, target);
  }

  /** True if the ray hits the sphere. */
  public intersectsSphere(sphere: Sphere): boolean {
    return this.intersectSphere(sphere) !== null;
  }

  /** First hit point on the sphere, else null. */
  public intersectSphere(sphere: Sphere, target: Vec3 = new Vec3()): Vec3 | null {
    const v1 = Ray3._v1.subVectors(sphere.center, this.origin);
    const tca = v1.dotProduct(this.direction);
    const d2 = v1.getMagnitude(true) - tca * tca;
    const radius2 = sphere.radius * sphere.radius;

    if (d2 > radius2) return null;

    const thc = Math.sqrt(radius2 - d2);
    const t0 = tca - thc;
    const t1 = tca + thc;

    if (t0 < 0 && t1 < 0) return null;
    const t = t0 < 0 ? t1 : t0;
    return this.at(t, target);
  }

  /** Möller-Trumbore ray/triangle test; hit point or null. */
  public intersectTriangle(
    a: Vec3,
    b: Vec3,
    c: Vec3,
    backfaceCulling: boolean = false,
    target: Vec3 = new Vec3()
  ): Vec3 | null {
    const edge1 = Ray3._edge1.subVectors(b, a);
    const edge2 = Ray3._edge2.subVectors(c, a);
    const pvec = Ray3._pvec.crossVectors(this.direction, edge2);
    const det = edge1.dotProduct(pvec);

    if (backfaceCulling ? det < 1e-6 : Math.abs(det) < 1e-6) return null;

    const invDet = 1.0 / det;
    const tvec = Ray3._tvec.subVectors(this.origin, a);
    const u = tvec.dotProduct(pvec) * invDet;
    if (u < 0 || u > 1) return null;

    const qvec = Ray3._qvec.crossVectors(tvec, edge1);
    const v = this.direction.dotProduct(qvec) * invDet;
    if (v < 0 || u + v > 1) return null;

    const t = edge2.dotProduct(qvec) * invDet;
    if (t < 0) return null;

    return this.at(t, target);
  }

  /** Independent copy. */
  public clone(): Ray3 {
    return new Ray3(this.origin, this.direction);
  }

  /** Copy another ray into this one. */
  public copy(ray: Ray3): this {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);
    return this;
  }

}
