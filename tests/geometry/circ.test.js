import { Circ } from '../../build/es6/geometry/circ.js';
import { Rect } from '../../build/es6/geometry/rect.js';
import { Grid } from '../../build/es6/geometry/grid.js';
import { Vec2 } from '../../build/es6/vectors/vec2.js';

describe('Circ', () => {

  it('should construct with radius and position', () => {
    const circle = new Circ(10, 4, 6);
    expect(circle.radius).toBe(10);
    expect(circle.diameter).toBe(20);
    expect(circle.position.x).toBe(4);
    expect(circle.position.y).toBe(6);
    expect(circle.gridCells).toEqual([Grid.emptyCell]);
  });

  it('should keep radius and diameter in sync', () => {
    const circle = new Circ(10, 0, 0);
    circle.diameter = 8;
    expect(circle.radius).toBe(4);
    circle.setRadius(3);
    expect(circle.diameter).toBe(6);
  });

  it('should report points inside using squared distance', () => {
    const circle = new Circ(5, 0, 0);
    expect(circle.isIn(new Vec2(3, 4))).toBe(true);
    expect(circle.isIn(new Vec2(5, 1))).toBe(false);
  });

  it('should update grid cells when the diameter changes', () => {
    const grid = new Grid(100, 100, 10);
    const circle = new Circ(1, 5, 5).setGrid(grid);
    const before = circle.gridCells.slice();
    circle.setDiameter(40);
    expect(circle.gridCells).not.toEqual(before);
  });

  it('should update grid cells when scaled', () => {
    const grid = new Grid(100, 100, 10);
    const circle = new Circ(1, 5, 5).setGrid(grid);
    const before = circle.gridCells.slice();
    circle.scale(20);
    expect(circle.gridCells).not.toEqual(before);
  });

  it('should not treat unoccupied shapes as sharing cell 0', () => {
    const grid = new Grid(100, 100, 10);
    const a = new Circ(1, 5, 5);
    const b = new Circ(1, 50, 50);
    expect(grid.testCells(a.gridCells, b.gridCells)).toBe(false);
  });

  it('should not alias off-grid shapes onto in-grid cells', () => {
    const grid = new Grid(100, 100, 10);
    const outside = new Circ(1, -5, 25).setGrid(grid);
    const inside = new Circ(1, 95, 15).setGrid(grid);
    expect(grid.testCells(outside.gridCells, inside.gridCells)).toBe(false);
    expect(outside.gridCells.every(cell => cell === Grid.emptyCell)).toBe(true);
  });

  it('should copy position, size and grid cells', () => {
    const grid = new Grid(100, 100, 10);
    const source = new Circ(20, 25, 25).setGrid(grid);
    const dest = new Circ(1, 0, 0);
    dest.copy(source);
    expect(dest.radius).toBe(20);
    expect(dest.position.x).toBe(25);
    expect(dest.gridCells).toEqual(source.gridCells);
  });

  it('should support vector setPosition and translate', () => {
    const grid = new Grid(100, 100, 10);
    const circle = new Circ(5, 10, 10).setGrid(grid);

    circle.setPosition(new Vec2(25, 25));
    expect(circle.position.x).toBe(25);
    expect(circle.position.y).toBe(25);

    circle.translate(new Vec2(-5, 10));
    expect(circle.position.x).toBe(20);
    expect(circle.position.y).toBe(35);
  });

  it('should compute closest point on or inside circle', () => {
    const circle = new Circ(10, 0, 0);

    // Point inside remains unchanged
    const inside = circle.getClosestPoint(new Vec2(3, 4));
    expect(inside.x).toBe(3);
    expect(inside.y).toBe(4);

    // Point outside is projected onto boundary
    const outside = circle.getClosestPoint(new Vec2(30, 40));
    expect(outside.x).toBeCloseTo(6);
    expect(outside.y).toBeCloseTo(8);
  });

  it('should test overlapsCircle with center+radius and Circ instance', () => {
    const c1 = new Circ(5, 0, 0);
    const c2 = new Circ(5, 8, 0); // distance 8 <= 10 (overlaps)
    const c3 = new Circ(5, 12, 0); // distance 12 > 10 (disjoint)

    expect(c1.overlapsCircle(c2)).toBe(true);
    expect(c1.overlapsCircle(c3)).toBe(false);
    expect(c1.overlapsCircle(new Vec2(8, 0), 5)).toBe(true);
    expect(c1.overlapsCircle(new Vec2(12, 0), 5)).toBe(false);
  });

  it('should test overlapsRect', () => {
    const circle = new Circ(5, 0, 0);
    const r1 = new Rect(4, 4, 6, 0); // overlaps circle boundary
    const r2 = new Rect(4, 4, 20, 0); // disjoint

    expect(circle.overlapsRect(r1)).toBe(true);
    expect(circle.overlapsRect(r2)).toBe(false);
  });

  it('should maintain halfSize in sync with radius and diameter', () => {
    const circle = new Circ(10, 5, 5);
    expect(circle.halfSize.x).toBe(10);
    expect(circle.halfSize.y).toBe(10);

    circle.radius = 15;
    expect(circle.halfSize.x).toBe(15);
    expect(circle.halfSize.y).toBe(15);

    circle.diameter = 20;
    expect(circle.halfSize.x).toBe(10);
    expect(circle.halfSize.y).toBe(10);

    const copyTarget = new Circ(1, 0, 0);
    copyTarget.copy(circle);
    expect(copyTarget.halfSize.x).toBe(10);
    expect(copyTarget.halfSize.y).toBe(10);
  });

  it('should test overlapsBounds with min and max vectors', () => {
    const circle = new Circ(5, 0, 0);
    const min1 = new Vec2(3, -2);
    const max1 = new Vec2(10, 2);
    expect(circle.overlapsBounds(min1, max1)).toBe(true);

    const min2 = new Vec2(10, 10);
    const max2 = new Vec2(20, 20);
    expect(circle.overlapsBounds(min2, max2)).toBe(false);
  });

  it('should support vector-first constructor (radius, position: Vec2)', () => {
    const pos = new Vec2(25, 30);
    const circle = new Circ(12, pos);
    expect(circle.radius).toBe(12);
    expect(circle.position.x).toBe(25);
    expect(circle.position.y).toBe(30);
    expect(circle.halfSize.x).toBe(12);
    expect(circle.halfSize.y).toBe(12);
  });

  it('should compute bounds with getBounds, boundsMin, and boundsMax', () => {
    const circle = new Circ(10, 15, 25);
    const min = new Vec2();
    const max = new Vec2();
    circle.getBounds(min, max);
    expect(min.x).toBe(5);
    expect(min.y).toBe(15);
    expect(max.x).toBe(25);
    expect(max.y).toBe(35);

    expect(circle.boundsMin.x).toBe(5);
    expect(circle.boundsMin.y).toBe(15);
    expect(circle.boundsMax.x).toBe(25);
    expect(circle.boundsMax.y).toBe(35);
  });

  it('should raycast against circle with hit, miss, and inside start', () => {
    const circle = new Circ(10, 50, 0);

    // Hit from left
    const hit = circle.raycast(new Vec2(0, 0), new Vec2(100, 0));
    expect(hit).not.toBeNull();
    expect(hit.fraction).toBeCloseTo(0.4, 5);
    expect(hit.point.x).toBeCloseTo(40, 5);
    expect(hit.point.y).toBeCloseTo(0, 5);
    expect(hit.normal.x).toBeCloseTo(-1, 5);
    expect(hit.normal.y).toBeCloseTo(0, 5);

    // Miss above
    const miss = circle.raycast(new Vec2(0, 20), new Vec2(100, 20));
    expect(miss).toBeNull();

    // Start inside circle
    const inside = circle.raycast(new Vec2(50, 5), new Vec2(100, 5));
    expect(inside).not.toBeNull();
    expect(inside.fraction).toBe(0);
    expect(inside.point.x).toBe(50);
    expect(inside.point.y).toBe(5);
    expect(inside.normal.x).toBeCloseTo(0, 5);
    expect(inside.normal.y).toBeCloseTo(1, 5);

    // Target reuse
    const target = { fraction: 0, point: new Vec2(), normal: new Vec2() };
    const res = circle.raycast(new Vec2(0, 0), new Vec2(100, 0), target);
    expect(res).toBe(target);
    expect(target.point.x).toBeCloseTo(40, 5);
  });

});
