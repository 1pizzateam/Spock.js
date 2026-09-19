import { Rect } from '../../build/es6/geometry/rect.js';
import { Grid } from '../../build/es6/geometry/grid.js';
import { Vec2 } from '../../build/es6/vectors/vec2.js';

describe('Rect', () => {

  it('should set corners from center position and size', () => {
    const rect = new Rect(10, 6, 5, 5);
    expect(rect.topLeftCorner.x).toBe(0);
    expect(rect.topLeftCorner.y).toBe(2);
    expect(rect.bottomRightCorner.x).toBe(10);
    expect(rect.bottomRightCorner.y).toBe(8);
  });

  it('should detect a point inside the aabb', () => {
    const rect = new Rect(10, 10, 5, 5);
    expect(rect.isIn(new Vec2(5, 5))).toBe(true);
    expect(rect.isIn(new Vec2(20, 5))).toBe(false);
  });

  it('should store every occupied cell without duplicates', () => {
    const grid = new Grid(100, 100, 10);
    const rect = new Rect(5, 15, 5, 10).setGrid(grid);
    expect(rect.gridCells).toEqual([0, 10]);
  });

  it('should include middle cells for shapes larger than one cell', () => {
    const grid = new Grid(100, 100, 10);
    const rect = new Rect(50, 10, 30, 15).setGrid(grid);
    expect(rect.gridCells).toEqual([10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25]);
  });

  it('should copy size, position and grid cells', () => {
    const grid = new Grid(100, 100, 10);
    const source = new Rect(5, 15, 5, 10).setGrid(grid);
    const dest = new Rect(2, 2, 0, 0);
    dest.copy(source);
    expect(dest.size.x).toBe(5);
    expect(dest.position.y).toBe(10);
    expect(dest.gridCells).toEqual(source.gridCells);
  });

  it('should chain setPosition and setSize', () => {
    const rect = new Rect(2, 2, 0, 0).setSize(10, 6).setPosition(new Vec2(5, 5));
    expect(rect.size.x).toBe(10);
    expect(rect.position.x).toBe(5);
    expect(rect.topLeftCorner.x).toBe(0);
  });

  it('should support vector setPosition and translate', () => {
    const grid = new Grid(100, 100, 10);
    const rect = new Rect(10, 10, 20, 20).setGrid(grid);

    rect.setPosition(new Vec2(30, 40));
    expect(rect.position.x).toBe(30);
    expect(rect.position.y).toBe(40);
    expect(rect.topLeftCorner.x).toBe(25);
    expect(rect.topLeftCorner.y).toBe(35);
    expect(rect.bottomRightCorner.x).toBe(35);
    expect(rect.bottomRightCorner.y).toBe(45);

    rect.translate(new Vec2(-10, 5));
    expect(rect.position.x).toBe(20);
    expect(rect.position.y).toBe(45);
    expect(rect.topLeftCorner.x).toBe(15);
    expect(rect.topLeftCorner.y).toBe(40);
    expect(rect.bottomRightCorner.x).toBe(25);
    expect(rect.bottomRightCorner.y).toBe(50);
  });

  it('should compute closest point on or inside rect', () => {
    const rect = new Rect(20, 10, 0, 0); // [-10, -5] to [10, 5]

    // Point inside remains unchanged
    const inside = rect.getClosestPoint(new Vec2(2, 3));
    expect(inside.x).toBe(2);
    expect(inside.y).toBe(3);

    // Point outside is clamped to closest corner/edge
    const outside = rect.getClosestPoint(new Vec2(15, -20));
    expect(outside.x).toBe(10);
    expect(outside.y).toBe(-5);
  });

});
