import { Vec2 } from '../vectors/vec2';
import type { Rect } from './rect';
import type { Circ } from './circ';
import type { RayHit2D } from './rayhit';

/**
 * 2D ray with a unit direction. Intersection tests run against the segment from the origin
 * to `maxDistance` along the ray, and report hits as a `RayHit2D` whose `fraction` is
 * relative to that segment: distance = fraction * maxDistance.
 */
export class Ray2 {

  public origin: Vec2;
  public direction: Vec2;

  private static _end = new Vec2();

  /** Ray along +X from the origin by default. The direction is normalized. */
  constructor(origin: Vec2 = new Vec2(), direction: Vec2 = new Vec2(1, 0)) {
    this.origin = origin.clone();
    this.direction = direction.clone().normalize();
  }

  /** Set origin and direction (normalized). */
  public set(origin: Vec2, direction: Vec2): this {
    this.origin.copy(origin);
    this.direction.copy(direction).normalize();
    return this;
  }

  /** Write the point at distance t along the ray into target. */
  public at(t: number, target: Vec2 = new Vec2()): Vec2 {
    return target.copy(this.origin).addScaledVector(this.direction, t);
  }

  /** First hit on the rectangle within maxDistance, else null. */
  public intersectRect(rect: Rect, maxDistance: number, target?: RayHit2D): RayHit2D | null {
    return rect.raycast(this.origin, this.at(maxDistance, Ray2._end), target);
  }

  /** True if the ray hits the rectangle within maxDistance. */
  public intersectsRect(rect: Rect, maxDistance: number): boolean {
    return this.intersectRect(rect, maxDistance) !== null;
  }

  /** First hit on the circle within maxDistance, else null. */
  public intersectCirc(circ: Circ, maxDistance: number, target?: RayHit2D): RayHit2D | null {
    return circ.raycast(this.origin, this.at(maxDistance, Ray2._end), target);
  }

  /** True if the ray hits the circle within maxDistance. */
  public intersectsCirc(circ: Circ, maxDistance: number): boolean {
    return this.intersectCirc(circ, maxDistance) !== null;
  }

  /** Independent copy. */
  public clone(): Ray2 {
    return new Ray2(this.origin, this.direction);
  }

  /** Copy another ray into this one. */
  public copy(ray: Ray2): this {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);
    return this;
  }

}
