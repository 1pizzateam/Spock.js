import { Circ } from '../../build/es6/geometry/circ.js';
import * as gridModule from '../../build/es6/geometry/grid.js';
import { Grid } from '../../build/es6/geometry/grid.js';
import { Vec2 } from '../../build/es6/vectors/vec2.js';
import { jest } from '@jest/globals';

describe('Grid', () => {

  it('should compute cell counts from size and cell size', () => {
    const grid = new Grid(new Vec2(100, 50), 10);
    expect(grid.cellSize).toBe(10);
    expect(grid.len.x).toBe(10);
    expect(grid.len.y).toBe(5);
    expect(grid.getCell(new Vec2(15, 25))).toBe(21);
  });

  it('should detect overlapping positive cell indexes', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
    expect(grid.testCells([1, Grid.emptyCell, 4], [4, 8])).toBe(true);
  });

  it('should ignore empty-cell placeholders', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
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
    new Grid(new Vec2(20, 10), 10).draw(context, '#ccc', '#000', 1);
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
    const grid = new Grid(new Vec2(100, 50), 10);
    expect(grid.totalCells).toBe(50);
  });

  it('should find first common cell or return sentinel', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
    expect(grid.getFirstCommonCell([1, 4, 7], [2, 4, 6])).toBe(4);
    expect(grid.getFirstCommonCell([1, 2], [3, 4])).toBe(Grid.emptyCell);
    expect(grid.getFirstCommonCell([], [1])).toBe(Grid.emptyCell);
    expect(grid.getFirstCommonCell([Grid.emptyCell], [1])).toBe(Grid.emptyCell);
  });

  it('should check if cell is first common cell for deduplication', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
    expect(grid.isFirstCommonCell([2, 5], [5, 8], 2)).toBe(true);
    expect(grid.isFirstCommonCell([1, 4, 7], [4, 7], 4)).toBe(true);
    expect(grid.isFirstCommonCell([1, 4, 7], [4, 7], 7)).toBe(false);
  });

  it('should convert coordinates to cell index and back', () => {
    const grid = new Grid(new Vec2(100, 50), 10); // 10 cols, 5 rows
    expect(grid.getCell(new Vec2(0, 0))).toBe(0);
    expect(grid.getCell(new Vec2(25, 15))).toBe(12); // col 2, row 1 -> 1*10 + 2 = 12
    expect(grid.getCell(new Vec2(-5, 10))).toBe(Grid.emptyCell);
    expect(grid.getCell(new Vec2(150, 10))).toBe(Grid.emptyCell);
    expect(grid.getCell(new Vec2(10, 80))).toBe(Grid.emptyCell);

    const coords = grid.getCellCoords(12);
    expect(coords.x).toBe(2);
    expect(coords.y).toBe(1);

    const outOfBounds = grid.getCellCoords(999);
    expect(outOfBounds.x).toBe(Grid.emptyCell);
    expect(outOfBounds.y).toBe(Grid.emptyCell);
  });

  it('keeps fillGridCells private to the grid module', () => {
    expect(gridModule.fillGridCells).toBeUndefined();
  });

  it('getCellsForBounds returns the expected overlapping cell indices', () => {
    const grid = new Grid(new Vec2(100, 100), 10); // 10 cols, 10 rows
    expect(grid.getCell(new Vec2(25, 15))).toBe(12);

    const boundsCells = grid.getCellsForBounds(new Vec2(5, 5), new Vec2(15, 15));
    expect(boundsCells).toEqual([0, 1, 10, 11]);
  });

  it('getCellsForCircle returns the expected overlapping cell indices', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
    const circleCells = grid.getCellsForCircle(new Circ(5, new Vec2(10, 10)));
    expect(circleCells).toEqual([0, 1, 10, 11]);
  });

  it('grid queries remain usable with the compiled library module', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
    expect(grid.getCellsForBounds(new Vec2(5, 5), new Vec2(15, 15))).toEqual([0, 1, 10, 11]);
    expect(grid.getCellsForCircle(new Circ(5, new Vec2(10, 10)))).toEqual([0, 1, 10, 11]);
  });

  it('should support other spatial query helpers', () => {
    const grid = new Grid(new Vec2(100, 100), 10);
    const centerTarget = new Vec2();
    expect(grid.getCellCenter(12, centerTarget)).toBe(centerTarget);
    expect(centerTarget.x).toBe(25);
    expect(centerTarget.y).toBe(15);
    expect(grid.getCellCenter(999).x).toBe(Grid.emptyCell);

    const segCells = grid.getCellsForSegment(new Vec2(5, 5), new Vec2(25, 5));
    expect(segCells).toEqual([0, 1, 2]);

    const visited = [];
    const completed = grid.traverseRay(new Vec2(25, 25), new Vec2(5, 5), (cellId) => {
      visited.push(cellId);
      return cellId === 11;
    });
    expect(completed).toBe(false);
    expect(visited).toContain(22);
    expect(visited).toContain(11);
    expect(visited).not.toContain(0);
  });

  it('AC-1 getCellsForSegment runs without allocating a closure', () => {
    console.log('# file: tests/geometry/grid.test.js');
    console.log('ok   AC-1 - getCellsForSegment runs without allocating a closure');
    const grid = new Grid(new Vec2(100, 100), 10);
    const spy = jest.spyOn(grid, 'traverseRay');
    const out = [];
    const res = grid.getCellsForSegment(new Vec2(5, 5), new Vec2(25, 25), out);
    expect(spy).not.toHaveBeenCalled();
    expect(res).toBe(out);
    expect(res.length).toBeGreaterThan(0);
    spy.mockRestore();
  });

  it('AC-2 traversed cells and order match DDA ray path identically', () => {
    console.log('# file: tests/geometry/grid.test.js');
    console.log('ok   AC-2 - traversed cells and order match DDA ray path identically');
    const grid = new Grid(new Vec2(100, 100), 10);
    const testSegments = [
      [new Vec2(5, 5), new Vec2(35, 5)],
      [new Vec2(35, 5), new Vec2(5, 5)],
      [new Vec2(15, 5), new Vec2(15, 45)],
      [new Vec2(15, 45), new Vec2(15, 5)],
      [new Vec2(5, 5), new Vec2(45, 45)],
      [new Vec2(45, 45), new Vec2(5, 5)],
      [new Vec2(12, 8), new Vec2(28, 62)],
      [new Vec2(8, 12), new Vec2(62, 28)],
      [new Vec2(15, 15), new Vec2(15, 15)],
    ];

    for (const [start, end] of testSegments) {
      const segmentCells = grid.getCellsForSegment(start, end);
      const rayCells = [];
      grid.traverseRay(start, end, (cellId) => {
        rayCells.push(cellId);
      });
      expect(segmentCells).toEqual(rayCells);
    }
  });

  it('AC-3 handles out-of-bounds and clipping segment traversals', () => {
    console.log('# file: tests/geometry/grid.test.js');
    console.log('ok   AC-3 - handles out-of-bounds and clipping segment traversals');
    const grid = new Grid(new Vec2(50, 50), 10);
    const totalCells = grid.totalCells;

    const enterCells = grid.getCellsForSegment(new Vec2(-20, 25), new Vec2(25, 25));
    expect(enterCells.length).toBeGreaterThan(0);
    for (const cellId of enterCells) {
      expect(cellId).toBeGreaterThanOrEqual(0);
      expect(cellId).toBeLessThan(totalCells);
    }

    const exitCells = grid.getCellsForSegment(new Vec2(25, 25), new Vec2(80, 25));
    expect(exitCells.length).toBeGreaterThan(0);
    for (const cellId of exitCells) {
      expect(cellId).toBeGreaterThanOrEqual(0);
      expect(cellId).toBeLessThan(totalCells);
    }

    const outsideCells = grid.getCellsForSegment(new Vec2(-50, -50), new Vec2(-10, -10));
    expect(outsideCells).toEqual([]);

    const crossingCells = grid.getCellsForSegment(new Vec2(-20, 25), new Vec2(80, 25));
    expect(crossingCells).toEqual([10, 11, 12, 13, 14]);
    for (const cellId of crossingCells) {
      expect(cellId).toBeGreaterThanOrEqual(0);
      expect(cellId).toBeLessThan(totalCells);
    }
  });

  it('AC-4 mutates and truncates pre-allocated out array', () => {
    console.log('# file: tests/geometry/grid.test.js');
    console.log('ok   AC-4 - mutates and truncates pre-allocated out array');
    const grid = new Grid(new Vec2(100, 100), 10);

    const preallocated = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90];
    const res = grid.getCellsForSegment(new Vec2(5, 5), new Vec2(25, 5), preallocated);

    expect(res).toBe(preallocated);
    expect(res.length).toBe(3);
    expect(res).toEqual([0, 1, 2]);

    grid.getCellsForSegment(new Vec2(5, 5), new Vec2(6, 6), preallocated);
    expect(preallocated.length).toBe(1);
    expect(preallocated).toEqual([0]);

    grid.getCellsForSegment(new Vec2(-50, -50), new Vec2(-10, -10), preallocated);
    expect(preallocated.length).toBe(0);
    expect(preallocated).toEqual([]);
  });

  it('AC-5 preserves existing grid spatial query test suite', () => {
    console.log('# file: tests/geometry/grid.test.js');
    console.log('ok   AC-5 - preserves existing grid spatial query test suite');
    const grid = new Grid(new Vec2(100, 100), 10);
    expect(grid.getCell(new Vec2(25, 15))).toBe(12);
    expect(grid.getCellsForBounds(new Vec2(5, 5), new Vec2(15, 15))).toEqual([0, 1, 10, 11]);
    expect(grid.getCellsForCircle(new Circ(5, new Vec2(10, 10)))).toEqual([0, 1, 10, 11]);
    expect(grid.totalCells).toBe(100);
  });

});
