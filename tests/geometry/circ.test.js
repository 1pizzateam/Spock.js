import { Circle } from '../../build/es6/geometry/circle.js';
import { Grid } from '../../build/es6/geometry/grid.js';
import { Vector2 } from '../../build/es6/vectors/vector2.js';

describe('Circle', () => {

  it('should construct with radius and position', () => {
    const circle = new Circle(10, 4, 6);
    expect(circle.radius).toBe(10);
    expect(circle.diameter).toBe(20);
    expect(circle.position.x).toBe(4);
    expect(circle.position.y).toBe(6);
    expect(circle.gridCells).toEqual([Grid.emptyCell]);
  });

  it('should keep radius and diameter in sync', () => {
    const circle = new Circle(10, 0, 0);
    circle.diameter = 8;
    expect(circle.radius).toBe(4);
    circle.setRadius(3);
    expect(circle.diameter).toBe(6);
  });

  it('should report points inside using squared distance', () => {
    const circle = new Circle(5, 0, 0);
    expect(circle.isIn(new Vector2(3, 4))).toBe(true);
    expect(circle.isIn(new Vector2(5, 1))).toBe(false);
  });

  it('should update grid cells when the diameter changes', () => {
    const grid = new Grid(100, 100, 10);
    const circle = new Circle(1, 5, 5).setGrid(grid);
    const before = circle.gridCells.slice();
    circle.setDiameter(40);
    expect(circle.gridCells).not.toEqual(before);
  });

  it('should update grid cells when scaled', () => {
    const grid = new Grid(100, 100, 10);
    const circle = new Circle(1, 5, 5).setGrid(grid);
    const before = circle.gridCells.slice();
    circle.scale(20);
    expect(circle.gridCells).not.toEqual(before);
  });

  it('should not treat unoccupied shapes as sharing cell 0', () => {
    const grid = new Grid(100, 100, 10);
    const a = new Circle(1, 5, 5);
    const b = new Circle(1, 50, 50);
    expect(grid.testCells(a.gridCells, b.gridCells)).toBe(false);
  });

  it('should not alias off-grid shapes onto in-grid cells', () => {
    const grid = new Grid(100, 100, 10);
    const outside = new Circle(1, -5, 25).setGrid(grid);
    const inside = new Circle(1, 95, 15).setGrid(grid);
    expect(grid.testCells(outside.gridCells, inside.gridCells)).toBe(false);
    expect(outside.gridCells.every(cell => cell === Grid.emptyCell)).toBe(true);
  });

  it('should copy position, size and grid cells', () => {
    const grid = new Grid(100, 100, 10);
    const source = new Circle(20, 25, 25).setGrid(grid);
    const dest = new Circle(1, 0, 0);
    dest.copy(source);
    expect(dest.radius).toBe(20);
    expect(dest.position.x).toBe(25);
    expect(dest.gridCells).toEqual(source.gridCells);
  });

});
