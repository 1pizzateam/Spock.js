import {Trigonometry} from '../trigonometry';
import { type Grid, fillGridCells, clearGridCells, GRID_EMPTY_CELL } from './grid';
import { applyCanvasStyle } from './canvas';
import {Vector2} from '../vectors/vector2';

/** Circle with optional grid occupancy. */
export class Circle {

  public position: Vector2;
  public gridCells: number[] = [GRID_EMPTY_CELL];
  private grid: Grid | null;
  private _radius: number;
  private _diameter: number;
  readonly shape: 'circle' = 'circle';

  /** Circle of radius at (positionX, positionY). Occupancy is opt-in via setGrid(). */
  constructor(radius: number, positionX: number, positionY: number) {
    this.position = new Vector2(positionX, positionY);
    this._radius = radius;
    this._diameter = radius * 2;
    this.grid = null;
  }

  /** Set radius and refresh occupancy. */
  set radius(radius : number) {
    this._radius   = radius;
    this._diameter = this._radius * 2;
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
    this.setGridPos();
  }

  /** Current diameter. */
  get diameter(): number {
    return this._diameter;
  }

  /** Copy with the same grid. */
  public clone(): Circle {
    return new Circle(this.radius, this.position.x, this.position.y).setGrid(this.grid);
  }

  /** Copy size, position, and grid from another circle. */
  public copy( circle: Circle ): Circle {
    this.position.copy(circle.position);
    this._radius = circle.radius;
    this._diameter = circle.diameter;
    return this.setGrid(circle.grid);
  }

  /** Attach a grid for occupancy, or clear it. */
  public setGrid(grid: Grid | null): Circle {
    this.grid = grid;
    if (grid)
      this.setGridPos();
    else
      clearGridCells(this.gridCells);
    return this;
  }

  /** Move the center and refresh occupancy. */
  public setPosition( positionX: number, positionY: number ): Circle {
    this.position.setScalar(positionX, positionY);
    this.setGridPos();
    return this;
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
  public scale(scalar: number): Circle {
    this.radius *= scalar;
    return this;
  }

  /** True if the point lies inside or on the circle. */
  public isIn(v: Vector2): boolean {
    return v.getDistance(this.position, true) <= this.radius * this.radius;
  }

  /** Draw the circle on a canvas. */
  draw( context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number ): void {
    context.beginPath();
    context.arc(  this.position.x,
                  this.position.y,
                  this.radius,
                  0,
                  Trigonometry.twopi,
                  false
                );
    applyCanvasStyle(context, fillColor, strokeColor, strokeWidth);
  }

  /** Record occupied AABB cells on the attached grid. */
  private setGridPos(): void {
    if (this.grid)
      fillGridCells(
        this.grid,
        this.position.x - this._radius,
        this.position.y - this._radius,
        this.position.x + this._radius,
        this.position.y + this._radius,
        this.gridCells
      );
  }

};
