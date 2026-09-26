import {Trigo} from '../trigo';
import type { Rect } from './rect';
import type { RayHit2D } from './ray';
import { type Grid, clearGridCells, GRID_EMPTY_CELL } from './grid';
import { applyCanvasStyle } from './canvas';
import {Vec2} from '../vectors/vec2';

/** Circ with optional grid occupancy. */
export class Circ {

  public position: Vec2;
  public halfSize: Vec2;
  public gridCells: number[] = [GRID_EMPTY_CELL];
  private grid: Grid | null;
  private _radius: number;
  private _diameter: number;
  readonly shape: 'circle' = 'circle';

  private static readonly scratchMin = new Vec2();
  private static readonly scratchMax = new Vec2();
  private static readonly scratchClosest = new Vec2();
  private static readonly scratchD = new Vec2();
  private static readonly scratchM = new Vec2();

  /** Circ of radius at position. Supports (radius, position: Vec2) or (radius, positionX, positionY). */
  constructor(radius: number, position?: Vec2);
  constructor(radius: number, positionX: number, positionY: number);
  constructor(radius: number, positionOrX?: Vec2 | number, positionY?: number) {
    if (positionOrX instanceof Vec2)
      this.position = new Vec2(positionOrX.x, positionOrX.y);
    else
      this.position = new Vec2(typeof positionOrX === 'number' ? positionOrX : 0, typeof positionY === 'number' ? positionY : 0);
    this.halfSize = new Vec2(radius, radius);
    this._radius = radius;
    this._diameter = radius * 2;
    this.grid = null;
  }

  /** Set radius and refresh occupancy. */
  set radius(radius : number) {
    this._radius   = radius;
    this._diameter = this._radius * 2;
    this.halfSize.setScalar(this._radius, this._radius);
    this.setGridPos();
  }

  /** Current radius. */
  get radius(): number {
    return this._radius;
  }

  /** Set diameter and refresh occupancy. */
  set diameter(diameter : number) {
    this._diameter = diameter;
    this._radius = this._diameter * 0.5;
    this.halfSize.setScalar(this._radius, this._radius);
    this.setGridPos();
  }

  /** Current diameter. */
  get diameter(): number {
    return this._diameter;
  }

  /** Copy with the same grid. */
  public clone(): Circ {
    return new Circ(this.radius, this.position.x, this.position.y).setGrid(this.grid);
  }

  /** Copy size, position, and grid from another circle. */
  public copy( circ: Circ ): Circ {
    this.position.copy(circ.position);
    this.halfSize.copy(circ.halfSize);
    this._radius = circ.radius;
    this._diameter = circ.diameter;
    return this.setGrid(circ.grid);
  }

  /** Attach a grid for occupancy, or clear it. */
  public setGrid(grid: Grid | null): Circ {
    this.grid = grid;
    if (grid)
      this.setGridPos();
    else
      clearGridCells(this.gridCells);
    return this;
  }

  /** Move the center to a position vector and refresh occupancy. */
  public setPosition(position: Vec2): Circ {
    this.position.copy(position);
    this.setGridPos();
    return this;
  }

  /** Translate center by offset vector in-place and refresh occupancy. */
  public translate(offset: Vec2): Circ {
    this.position.add(offset);
    this.setGridPos();
    return this;
  }

  /** Closest point on or within the circle to an external point. */
  public getClosestPoint(point: Vec2, target: Vec2 = new Vec2()): Vec2 {
    const dSq = point.getDistance(this.position, true);
    if (dSq <= this.radius * this.radius)
      return target.copy(point);
    const d = Math.sqrt(dSq);
    return target.subVectors(point, this.position).scale(this.radius / d).add(this.position);
  }

  /** Set radius. */
  public setRadius( radius: number ) {
    this.radius = radius;
    return this;
  }

  /** Set diameter. */
  public setDiameter( diameter: number ) {
    this.diameter = diameter;
    return this;
  }

  /** Multiply radius by scalar. */
  public scale(scalar: number): Circ {
    this.radius *= scalar;
    return this;
  }

  /** True if the point lies inside or on the circle. */
  public isIn(v: Vec2): boolean {
    return v.getDistance(this.position, true) <= this.radius * this.radius;
  }

  /** True if this circle overlaps another circle. */
  public overlapsCircle(center: Vec2, radius: number): boolean;
  public overlapsCircle(circ: Circ): boolean;
  public overlapsCircle(centerOrCirc: Vec2 | Circ, radius?: number): boolean {
    const center = 'position' in centerOrCirc ? centerOrCirc.position : centerOrCirc;
    const r = 'radius' in centerOrCirc ? centerOrCirc.radius : (radius ?? 0);
    const totalR = this.radius + r;
    return this.position.getDistance(center, true) <= totalR * totalR;
  }

  /** True if this circle overlaps a rectangle. */
  public overlapsRect(rect: Rect): boolean {
    return rect.overlapsCircle(this.position, this.radius);
  }

  /** True if this circle overlaps an axis-aligned bounding box defined by min and max corners. */
  public overlapsBounds(min: Vec2, max: Vec2): boolean {
    Circ.scratchMin.minVectors(min, max);
    Circ.scratchMax.maxVectors(min, max);
    Circ.scratchClosest.clampVectors(this.position, Circ.scratchMin, Circ.scratchMax);
    return this.position.getDistance(Circ.scratchClosest, true) <= this._radius * this._radius;
  }

  /** Write minimum and maximum bounding corners into outMin and outMax. */
  public getBounds(outMin: Vec2, outMax: Vec2): void {
    outMin.subVectors(this.position, this.halfSize);
    outMax.addVectors(this.position, this.halfSize);
  }

  /** Minimum corner of the axis-aligned bounding box. */
  public get boundsMin(): Vec2 {
    return new Vec2().subVectors(this.position, this.halfSize);
  }

  /** Maximum corner of the axis-aligned bounding box. */
  public get boundsMax(): Vec2 {
    return new Vec2().addVectors(this.position, this.halfSize);
  }

  /** Raycast a line segment against this circle. */
  public raycast(start: Vec2, end: Vec2, target?: RayHit2D): RayHit2D | null {
    const d = Circ.scratchD.subVectors(end, start);
    const a = d.getMagnitude(true);

    const m = Circ.scratchM.subVectors(start, this.position);
    const c = m.getMagnitude(true) - this._radius * this._radius;

    // Start inside or on circle boundary
    if (c <= 0) {
      const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
      out.fraction = 0;
      out.point.copy(start);
      if (m.getMagnitude(true) > 0)
        out.normal.normalizeVector(m);
      else if (a > 0)
        out.normal.normalizeVector(d).opposite();
      else
        out.normal.setScalar(0, -1);
      return out;
    }

    if (a === 0)
      return null;

    const halfB = m.dotProduct(d);
    if (halfB > 0)
      return null;

    const discriminant = halfB * halfB - a * c;
    if (discriminant < 0)
      return null;

    const t = (-halfB - Math.sqrt(discriminant)) / a;
    if (t < 0 || t > 1)
      return null;

    const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
    out.fraction = t;
    out.point.lerpVectors(start, end, t);

    if (this._radius > 0)
      out.normal.subVectors(out.point, this.position).divideScalar(this._radius);
    else
      out.normal.normalizeVector(d).opposite();
    return out;
  }

  /** Draw the circle on a canvas. */
  draw( context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number ): void {
    context.beginPath();
    context.arc(  this.position.x,
                  this.position.y,
                  this.radius,
                  0,
                  Trigo.twopi,
                  false
                );
    applyCanvasStyle(context, fillColor, strokeColor, strokeWidth);
  }

  /** Record occupied AABB cells on the attached grid. */
  private setGridPos(): void {
    if (!this.grid) return;
    this.getBounds(Circ.scratchMin, Circ.scratchMax);
    this.grid.getCellsForBounds(Circ.scratchMin, Circ.scratchMax, this.gridCells);
  }

};
