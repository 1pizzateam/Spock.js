import {Trigo} from '../trigo';
import { type Grid, fillGridCells, clearGridCells, GRID_EMPTY_CELL } from './grid';
import { applyCanvasStyle } from './canvas';
import {Vec2} from '../vectors/vec2';

/** Circ with optional grid occupancy. */
export class Circ {

  public position: Vec2;
  public gridCells: number[] = [GRID_EMPTY_CELL];
  private grid: Grid | null;
  private _radius: number;
  private _diameter: number;
  readonly shape: 'circle' = 'circle';

  /** Circ of radius at (positionX, positionY). Occupancy is opt-in via setGrid(). */
  constructor(radius: number, positionX: number, positionY: number) {
    this.position = new Vec2(positionX, positionY);
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
  public clone(): Circ {
    return new Circ(this.radius, this.position.x, this.position.y).setGrid(this.grid);
  }

  /** Copy size, position, and grid from another circle. */
  public copy( circ: Circ ): Circ {
    this.position.copy(circ.position);
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

  /** Move the center and refresh occupancy. */
  public setPosition( positionX: number, positionY: number ): Circ {
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
  public scale(scalar: number): Circ {
    this.radius *= scalar;
    return this;
  }

  /** True if the point lies inside or on the circle. */
  public isIn(v: Vec2): boolean {
    return v.getDistance(this.position, true) <= this.radius * this.radius;
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
