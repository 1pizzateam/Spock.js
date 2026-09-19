import { Vec2 } from '../vectors/vec2';

export const GRID_EMPTY_CELL = -1;

/** Fill gridCells with every cell overlapping the AABB, or the empty sentinel. */
export function fillGridCells(
  grid: Grid,
  left: number,
  top: number,
  right: number,
  bottom: number,
  gridCells: number[]
): void {
  const size = grid.cellSize;
  const cols = grid.len.x;
  const rows = grid.len.y;
  const minCol = Math.max(0, Math.floor(Math.min(left, right) / size));
  const maxCol = Math.min(cols - 1, Math.floor(Math.max(left, right) / size));
  const minRow = Math.max(0, Math.floor(Math.min(top, bottom) / size));
  const maxRow = Math.min(rows - 1, Math.floor(Math.max(top, bottom) / size));

  if (maxCol < minCol || maxRow < minRow ||
      Math.max(left, right) < 0 || Math.min(left, right) >= cols * size ||
      Math.max(top, bottom) < 0 || Math.min(top, bottom) >= rows * size) {
    clearGridCells(gridCells);
    return;
  }

  let index = 0;
  for (let row = minRow; row <= maxRow; row++)
    for (let col = minCol; col <= maxCol; col++)
      gridCells[index++] = row * cols + col;
  gridCells.length = index;
}

/** Reset occupancy to a single empty-cell sentinel. */
export function clearGridCells(gridCells: number[]): void {
  gridCells[0] = GRID_EMPTY_CELL;
  gridCells.length = 1;
}

/** Uniform cell lattice over a width × height area. */
export class Grid {

  static readonly emptyCell = GRID_EMPTY_CELL;

  cellSize: number;
  len: Vec2;

  /** Divide width × height into cells of cellSize. */
  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.len = new Vec2(
      Math.ceil(width / cellSize),
      Math.ceil(height / cellSize)
    );
  }

  /** Total number of cells in the lattice (cols × rows). */
  get totalCells(): number {
    return this.len.x * this.len.y;
  }

  /** True if the sorted occupancy lists share a real cell. */
  public testCells(aCells: number[], bCells: number[]): boolean {
    const aLen = aCells.length;
    const bLen = bCells.length;
    if (!aLen || !bLen) return false;

    let a = 0;
    let b = 0;
    while (a < aLen && aCells[a] === GRID_EMPTY_CELL) a++;
    while (b < bLen && bCells[b] === GRID_EMPTY_CELL) b++;
    if (a === aLen || b === bLen || aCells[a] > bCells[bLen - 1] || bCells[b] > aCells[aLen - 1])
      return false;

    while (a < aLen && b < bLen) {
      const ca = aCells[a];
      const cb = bCells[b];
      if (ca === cb) return true;
      if (ca < cb) a++;
      else b++;
    }
    return false;
  }

  /** Return the lowest common cell shared by both sorted lists, or -1 if disjoint. */
  public getFirstCommonCell(aCells: number[], bCells: number[]): number {
    const aLen = aCells.length;
    const bLen = bCells.length;
    if (!aLen || !bLen) return GRID_EMPTY_CELL;

    let a = 0;
    let b = 0;
    while (a < aLen && aCells[a] === GRID_EMPTY_CELL) a++;
    while (b < bLen && bCells[b] === GRID_EMPTY_CELL) b++;
    if (a === aLen || b === bLen || aCells[a] > bCells[bLen - 1] || bCells[b] > aCells[aLen - 1])
      return GRID_EMPTY_CELL;

    while (a < aLen && b < bLen) {
      const ca = aCells[a];
      const cb = bCells[b];
      if (ca === cb) return ca;
      if (ca < cb) a++;
      else b++;
    }
    return GRID_EMPTY_CELL;
  }

  /** Fast deduplication check: true if cellId is the first common cell between a and b. */
  public isFirstCommonCell(aCells: number[], bCells: number[], cellId: number): boolean {
    if (aCells[0] === cellId || bCells[0] === cellId) return true;
    return this.getFirstCommonCell(aCells, bCells) === cellId;
  }

  /** Get cell index at (x, y) coordinates, or -1 if out of bounds. */
  public getCell(x: number, y: number): number {
    if (x < 0 || y < 0) return GRID_EMPTY_CELL;
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    if (col >= this.len.x || row >= this.len.y) return GRID_EMPTY_CELL;
    return row * this.len.x + col;
  }

  /** Decompose a cell index into (col, row) coordinates. */
  public getCellCoords(cellId: number, target: Vec2 = new Vec2()): Vec2 {
    if (cellId < 0 || cellId >= this.totalCells)
      return target.setScalar(GRID_EMPTY_CELL, GRID_EMPTY_CELL);
    const cols = this.len.x;
    return target.setScalar(cellId % cols, Math.floor(cellId / cols));
  }

  /** Draw the lattice on a canvas. */
  public draw(context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number): void {
    const size = this.cellSize;
    const cols = this.len.x;
    const rows = this.len.y;
    const width = cols * size;
    const height = rows * size;

    if (fillColor) {
      context.fillStyle = fillColor;
      context.fillRect(0, 0, width, height);
    }

    if (strokeColor) {
      context.beginPath();
      for (let i = 0; i <= cols; i++) {
        const x = i * size;
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      for (let j = 0; j <= rows; j++) {
        const y = j * size;
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      context.strokeStyle = strokeColor;
      context.lineWidth = strokeWidth;
      context.stroke();
    }
  }

}
