import { Vec2 } from '../vectors/vec2';
import type { Circ } from './circ';
import type { RayHit2D } from './ray';
import { type Grid, clearGridCells, GRID_EMPTY_CELL } from './grid';
import { applyCanvasStyle } from './canvas';

/** Axis-aligned rectangle with optional grid occupancy. */
export class Rect {

  public position : Vec2;
  public topLeftCorner : Vec2;
  public bottomRightCorner : Vec2;
  public size : Vec2;
  public halfSize : Vec2;
  public gridCells: number[] = [GRID_EMPTY_CELL];
  private grid: Grid | null;
  readonly shape: 'aabb' = 'aabb';

  private static readonly scratchMin = new Vec2();
  private static readonly scratchMax = new Vec2();
  private static readonly scratchClosest = new Vec2();

  /** Rect centered at position. Supports (size: Vec2, position?: Vec2) or (width, height, positionX?, positionY?). */
  constructor(size: Vec2, position?: Vec2);
  constructor(width: number, height: number, positionX?: number, positionY?: number);
  constructor(width: number, height: number, position?: Vec2);
  constructor(
    sizeOrWidth: Vec2 | number,
    heightOrPosition?: number | Vec2,
    positionXOrPosition?: number | Vec2,
    positionY?: number
  ) {
    if (sizeOrWidth instanceof Vec2) {
      const pos = heightOrPosition instanceof Vec2 ? heightOrPosition : new Vec2();
      this.position = new Vec2(pos.x, pos.y);
      this.size = new Vec2(sizeOrWidth.x, sizeOrWidth.y);
    } else {
      const w = sizeOrWidth;
      const h = typeof heightOrPosition === 'number' ? heightOrPosition : w;
      if (positionXOrPosition instanceof Vec2)
        this.position = new Vec2(positionXOrPosition.x, positionXOrPosition.y);
      else {
        const px = typeof positionXOrPosition === 'number' ? positionXOrPosition : 0;
        const py = typeof positionY === 'number' ? positionY : 0;
        this.position = new Vec2(px, py);
      }
      this.size = new Vec2(w, h);
    }
    this.halfSize = new Vec2();
    this.topLeftCorner = new Vec2();
    this.bottomRightCorner = new Vec2();
    this.grid = null;
    this.setHalfSize();
    this.setCorners();
  }

  /** Copy with the same grid. */
  public clone(): Rect {
    return new Rect(this.size.x, this.size.y, this.position.x, this.position.y).setGrid(this.grid);
  }

  /** Copy size, position, and grid from another rectangle. */
  public copy( rect: Rect ): Rect {
    this.size.copy(rect.size);
    this.position.copy(rect.position);
    this.setHalfSize();
    this.setCorners();
    return this.setGrid(rect.grid);
  }

  /** Attach a grid for occupancy, or clear it. */
  public setGrid(grid: Grid | null): Rect {
    this.grid = grid;
    if (grid)
      this.setGridPos();
    else
      clearGridCells(this.gridCells);
    return this;
  }

  /** Move the center to a position vector and refresh corners and occupancy. */
  public setPosition(position: Vec2): Rect {
    this.position.copy(position);
    this.setCorners();
    this.setGridPos();
    return this;
  }

  /** Translate center and corners by offset vector in-place and refresh occupancy. */
  public translate(offset: Vec2): Rect {
    this.position.add(offset);
    this.topLeftCorner.add(offset);
    this.bottomRightCorner.add(offset);
    this.setGridPos();
    return this;
  }

  /** Closest point on or within the rectangle to an external point. */
  public getClosestPoint(point: Vec2, target: Vec2 = new Vec2()): Vec2 {
    return target.clampVectors(point, this.topLeftCorner, this.bottomRightCorner);
  }

  /** Resize and refresh corners and occupancy. Accepts Vec2 or (width, height). */
  public setSize(size: Vec2): Rect;
  public setSize(width: number, height?: number): Rect;
  public setSize(sizeOrWidth: Vec2 | number, height?: number): Rect {
    if (sizeOrWidth instanceof Vec2)
      this.size.copy(sizeOrWidth);
    else
      this.size.setScalar(sizeOrWidth, height ?? sizeOrWidth);
    this.setHalfSize();
    this.setCorners();
    this.setGridPos();
    return this;
  }

  /** True if the point lies inside or on the rectangle. */
  public isIn(vector: Vec2): boolean {
    return vector.isInBounds(this.topLeftCorner, this.bottomRightCorner);
  }

  /** True if this rectangle overlaps another rectangle. */
  public overlapsRect(rect: Rect): boolean {
    return (
      this.topLeftCorner.x <= rect.bottomRightCorner.x &&
      this.bottomRightCorner.x >= rect.topLeftCorner.x &&
      this.topLeftCorner.y <= rect.bottomRightCorner.y &&
      this.bottomRightCorner.y >= rect.topLeftCorner.y
    );
  }

  /** True if this rectangle overlaps an axis-aligned bounding box defined by min and max corners. */
  public overlapsBounds(min: Vec2, max: Vec2): boolean {
    Rect.scratchMin.minVectors(min, max);
    Rect.scratchMax.maxVectors(min, max);
    return (
      this.topLeftCorner.x <= Rect.scratchMax.x &&
      this.bottomRightCorner.x >= Rect.scratchMin.x &&
      this.topLeftCorner.y <= Rect.scratchMax.y &&
      this.bottomRightCorner.y >= Rect.scratchMin.y
    );
  }

  /** True if this rectangle overlaps a circle. */
  public overlapsCircle(center: Vec2, radius: number): boolean;
  public overlapsCircle(circ: Circ): boolean;
  public overlapsCircle(centerOrCirc: Vec2 | Circ, radius?: number): boolean {
    const center = 'position' in centerOrCirc ? centerOrCirc.position : centerOrCirc;
    const r = 'radius' in centerOrCirc ? centerOrCirc.radius : (radius ?? 0);
    Rect.scratchClosest.clampVectors(center, this.topLeftCorner, this.bottomRightCorner);
    return center.getDistance(Rect.scratchClosest, true) <= r * r;
  }

  /** Write minimum and maximum bounding corners into outMin and outMax. */
  public getBounds(outMin: Vec2, outMax: Vec2): void {
    outMin.copy(this.topLeftCorner);
    outMax.copy(this.bottomRightCorner);
  }

  /** Minimum corner of the axis-aligned bounding box. */
  public get boundsMin(): Vec2 {
    return this.topLeftCorner;
  }

  /** Maximum corner of the axis-aligned bounding box. */
  public get boundsMax(): Vec2 {
    return this.bottomRightCorner;
  }

  /** Raycast a line segment against this rectangle. */
  public raycast(start: Vec2, end: Vec2, target?: RayHit2D): RayHit2D | null {
    const minX = this.topLeftCorner.x;
    const maxX = this.bottomRightCorner.x;
    const minY = this.topLeftCorner.y;
    const maxY = this.bottomRightCorner.y;

    // Start inside AABB
    if (start.isInBounds(this.topLeftCorner, this.bottomRightCorner)) {
      const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
      out.fraction = 0;
      out.point.copy(start);
      const distLeft = start.x - minX;
      const distRight = maxX - start.x;
      const distTop = start.y - minY;
      const distBottom = maxY - start.y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);
      if (minDist === distLeft)
        out.normal.setScalar(-1, 0);
      else if (minDist === distRight)
        out.normal.setScalar(1, 0);
      else if (minDist === distTop)
        out.normal.setScalar(0, -1);
      else
        out.normal.setScalar(0, 1);
      return out;
    }

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    let tMin = 0;
    let tMax = 1;
    let normalX = 0;
    let normalY = 0;

    // X slab
    if (Math.abs(dx) < 1e-8 && (start.x < minX || start.x > maxX))
      return null;
    if (Math.abs(dx) >= 1e-8) {
      const invD = 1 / dx;
      let t1 = (minX - start.x) * invD;
      let t2 = (maxX - start.x) * invD;
      let sign = -1;
      if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
        sign = 1;
      }
      if (t1 > tMin) {
        tMin = t1;
        normalX = sign;
        normalY = 0;
      }
      if (t2 < tMax)
        tMax = t2;
      if (tMin > tMax)
        return null;
    }

    // Y slab
    if (Math.abs(dy) < 1e-8 && (start.y < minY || start.y > maxY))
      return null;
    if (Math.abs(dy) >= 1e-8) {
      const invD = 1 / dy;
      let t1 = (minY - start.y) * invD;
      let t2 = (maxY - start.y) * invD;
      let sign = -1;
      if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
        sign = 1;
      }
      if (t1 > tMin) {
        tMin = t1;
        normalX = 0;
        normalY = sign;
      }
      if (t2 < tMax)
        tMax = t2;
      if (tMin > tMax)
        return null;
    }

    const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
    out.fraction = tMin;
    out.point.lerpVectors(start, end, tMin);
    out.normal.x = normalX;
    out.normal.y = normalY;
    return out;
  }

  /** Draw the rectangle on a canvas. */
  public draw( context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number ): void {
    context.beginPath();
    context.rect( this.topLeftCorner.x,
                  this.topLeftCorner.y,
                  this.size.x,
                  this.size.y
                );
    applyCanvasStyle(context, fillColor, strokeColor, strokeWidth);
  }

  /** Update top-left and bottom-right from center and half-size. */
  private setCorners(): void {
    this.topLeftCorner.subVectors(this.position, this.halfSize);
    this.bottomRightCorner.addVectors(this.position, this.halfSize);
  }

  /** Cache half of the current size. */
  private setHalfSize(): void {
    this.halfSize.scaleVector(this.size, 0.5);
  }

  /** Record occupied cells on the attached grid. */
  private setGridPos(): void {
    if (this.grid)
      this.grid.getCellsForBounds(this.topLeftCorner, this.bottomRightCorner, this.gridCells);
  }

};
