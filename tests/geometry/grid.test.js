import { Grid } from '../../build/es6/geometry/grid.js';

describe('Grid', () => {

  it('should compute cell counts from size and cell size', () => {
    const grid = new Grid(100, 50, 10);
    expect(grid.cellSize).toBe(10);
    expect(grid.len.x).toBe(10);
    expect(grid.len.y).toBe(5);
  });

  it('should detect overlapping positive cell indexes', () => {
    const grid = new Grid(100, 100, 10);
    expect(grid.testCells([1, Grid.emptyCell, 4], [4, 8])).toBe(true);
  });

  it('should ignore empty-cell placeholders', () => {
    const grid = new Grid(100, 100, 10);
    expect(Grid.emptyCell).toBe(-1);
    expect(grid.testCells([Grid.emptyCell, 2], [Grid.emptyCell, 3])).toBe(false);
  });

  it('should fill the bounds and stroke the cell lines', () => {
    const moves = [];
    const lines = [];
    const context = {
      beginPath() {},
      fillRect(x, y, w, h) {
        this.filled = [x, y, w, h];
      },
      moveTo(x, y) { moves.push([x, y]); },
      lineTo(x, y) { lines.push([x, y]); },
      stroke() { this.stroked = true; },
    };
    new Grid(20, 10, 10).draw(context, '#ccc', '#000', 1);
    expect(context.fillStyle).toBe('#ccc');
    expect(context.filled).toEqual([0, 0, 20, 10]);
    expect(context.strokeStyle).toBe('#000');
    expect(context.lineWidth).toBe(1);
    expect(context.stroked).toBe(true);
    expect(moves).toEqual([
      [0, 0], [10, 0], [20, 0],
      [0, 0], [0, 10],
    ]);
    expect(lines).toEqual([
      [0, 10], [10, 10], [20, 10],
      [20, 0], [20, 10],
    ]);
  });

  it('should report totalCells', () => {
    const grid = new Grid(100, 50, 10);
    expect(grid.totalCells).toBe(50);
  });

  it('should find first common cell or return sentinel', () => {
    const grid = new Grid(100, 100, 10);
    expect(grid.getFirstCommonCell([1, 4, 7], [2, 4, 6])).toBe(4);
    expect(grid.getFirstCommonCell([1, 2], [3, 4])).toBe(Grid.emptyCell);
    expect(grid.getFirstCommonCell([], [1])).toBe(Grid.emptyCell);
    expect(grid.getFirstCommonCell([Grid.emptyCell], [1])).toBe(Grid.emptyCell);
  });

  it('should check if cell is first common cell for deduplication', () => {
    const grid = new Grid(100, 100, 10);
    expect(grid.isFirstCommonCell([2, 5], [5, 8], 2)).toBe(true);
    expect(grid.isFirstCommonCell([1, 4, 7], [4, 7], 4)).toBe(true);
    expect(grid.isFirstCommonCell([1, 4, 7], [4, 7], 7)).toBe(false);
  });

  it('should convert coordinates to cell index and back', () => {
    const grid = new Grid(100, 50, 10); // 10 cols, 5 rows
    expect(grid.getCell(0, 0)).toBe(0);
    expect(grid.getCell(25, 15)).toBe(12); // col 2, row 1 -> 1*10 + 2 = 12
    expect(grid.getCell(-5, 10)).toBe(Grid.emptyCell);
    expect(grid.getCell(150, 10)).toBe(Grid.emptyCell);
    expect(grid.getCell(10, 80)).toBe(Grid.emptyCell);

    const coords = grid.getCellCoords(12);
    expect(coords.x).toBe(2);
    expect(coords.y).toBe(1);

    const outOfBounds = grid.getCellCoords(999);
    expect(outOfBounds.x).toBe(Grid.emptyCell);
    expect(outOfBounds.y).toBe(Grid.emptyCell);
  });

});
