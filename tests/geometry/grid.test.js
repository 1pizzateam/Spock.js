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

});
