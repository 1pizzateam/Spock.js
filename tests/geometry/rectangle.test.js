import { Rectangle } from '../../build/es6/geometry/rectangle.js';
import { Grid } from '../../build/es6/geometry/grid.js';
import { Vector2 } from '../../build/es6/vectors/vector2.js';

describe('Rectangle', () => {

  it('should set corners from center position and size', () => {
    const rect = new Rectangle(10, 6, 5, 5);
    expect(rect.topLeftCorner.x).toBe(0);
    expect(rect.topLeftCorner.y).toBe(2);
    expect(rect.bottomRightCorner.x).toBe(10);
    expect(rect.bottomRightCorner.y).toBe(8);
  });

  it('should detect a point inside the aabb', () => {
    const rect = new Rectangle(10, 10, 5, 5);
    expect(rect.isIn(new Vector2(5, 5))).toBe(true);
    expect(rect.isIn(new Vector2(20, 5))).toBe(false);
  });

  it('should store every occupied cell without duplicates', () => {
    const grid = new Grid(100, 100, 10);
    const rect = new Rectangle(5, 15, 5, 10).setGrid(grid);
    expect(rect.gridCells).toEqual([0, 10]);
  });

  it('should include middle cells for shapes larger than one cell', () => {
    const grid = new Grid(100, 100, 10);
    const rect = new Rectangle(50, 10, 30, 15).setGrid(grid);
    expect(rect.gridCells).toEqual([10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25]);
  });

  it('should copy size, position and grid cells', () => {
    const grid = new Grid(100, 100, 10);
    const source = new Rectangle(5, 15, 5, 10).setGrid(grid);
    const dest = new Rectangle(2, 2, 0, 0);
    dest.copy(source);
    expect(dest.size.x).toBe(5);
    expect(dest.position.y).toBe(10);
    expect(dest.gridCells).toEqual(source.gridCells);
  });

  it('should chain setPosition and setSize', () => {
    const rect = new Rectangle(2, 2, 0, 0).setSize(10, 6).setPosition(5, 5);
    expect(rect.size.x).toBe(10);
    expect(rect.position.x).toBe(5);
    expect(rect.topLeftCorner.x).toBe(0);
  });

});
