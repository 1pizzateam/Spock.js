import { Vec2 } from '../vectors/vec2';
import { type Grid, fillGridCells, clearGridCells, GRID_EMPTY_CELL } from './grid';
import { applyCanvasStyle } from './canvas';
import { Utils }   from '../utils';

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

  /** Rect of width × height centered at (positionX, positionY). */
  constructor( width: number, height: number, positionX: number, positionY: number ) {
    this.position = new Vec2(positionX, positionY);
    this.size = new Vec2( width, height );
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
    this.size.setScalar(rect.size.x, rect.size.y);
    this.position.setScalar(rect.position.x, rect.position.y);
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

  /** Move the center and refresh corners and occupancy. */
  public setPosition(positionX: number, positionY: number): Rect {
    this.position.setScalar( positionX, positionY );
    this.setCorners();
    this.setGridPos();
    return this;
  }

  /** Resize and refresh corners and occupancy. */
  public setSize(width: number, height: number): Rect {
    this.size.setScalar(width, height);
    this.setHalfSize();
    this.setCorners();
    this.setGridPos();
    return this;
  }

  /** True if the point lies inside or on the rectangle. */
  public isIn(vector: Vec2): boolean {
    return (Utils.isIn(vector.x, this.topLeftCorner.x, this.bottomRightCorner.x)
            && Utils.isIn(vector.y, this.topLeftCorner.y, this.bottomRightCorner.y));
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
    this.topLeftCorner.copy(this.position).subtract(this.halfSize);
    this.bottomRightCorner.copy(this.position).add(this.halfSize);
  }

  /** Cache half of the current size. */
  private setHalfSize(): void {
    this.halfSize.copy(this.size).halve();
  }

  /** Record occupied cells on the attached grid. */
  private setGridPos(): void {
    if (this.grid)
      fillGridCells(
        this.grid,
        this.topLeftCorner.x,
        this.topLeftCorner.y,
        this.bottomRightCorner.x,
        this.bottomRightCorner.y,
        this.gridCells
      );
  }

};
