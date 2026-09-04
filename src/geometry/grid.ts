import { Vector2 } from '../vectors/vector2';

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
  len: Vector2;

  /** Divide width × height into cells of cellSize. */
  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.len = new Vector2(
      Math.ceil(width / cellSize),
      Math.ceil(height / cellSize)
    );
  }

  /** True if the occupancy lists share a real cell. */
  public testCells(aCells: number[], bCells: number[]): boolean {
    for (const aCell of aCells) {
      if (aCell !== GRID_EMPTY_CELL)
        for (const bCell of bCells) {
          if (bCell !== GRID_EMPTY_CELL && aCell === bCell)
            return true;
        }
    }
    return false;
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
