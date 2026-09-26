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

  it('should test overlapsRect', () => {
    const r1 = new Rect(10, 10, 0, 0); // [-5, 5] x [-5, 5]
    const r2 = new Rect(10, 10, 4, 0); // [-1, 9] x [-5, 5] (overlapping)
    const r3 = new Rect(10, 10, 20, 0); // disjoint

    expect(r1.overlapsRect(r2)).toBe(true);
    expect(r1.overlapsRect(r3)).toBe(false);
  });

  it('should test overlapsCircle with center+radius and Circ instance', () => {
    const rect = new Rect(10, 10, 0, 0); // [-5, 5] x [-5, 5]
    // Circle overlapping top-right edge
    expect(rect.overlapsCircle(new Vec2(7, 0), 3)).toBe(true);
    expect(rect.overlapsCircle(new Vec2(15, 0), 2)).toBe(false);

    // Overlapping corner
    expect(rect.overlapsCircle(new Vec2(8, 8), 5)).toBe(true);
    expect(rect.overlapsCircle(new Vec2(8, 8), 1)).toBe(false);
  });

  it('should test overlapsBounds with min and max vectors', () => {
    const rect = new Rect(10, 10, 0, 0); // [-5, 5] x [-5, 5]
    const min1 = new Vec2(3, -2);
    const max1 = new Vec2(10, 2);
    expect(rect.overlapsBounds(min1, max1)).toBe(true);

    const min2 = new Vec2(10, 10);
    const max2 = new Vec2(20, 20);
    expect(rect.overlapsBounds(min2, max2)).toBe(false);
  });

  it('should support vector-first constructor and setSize(Vec2)', () => {
    const size = new Vec2(40, 20);
    const pos = new Vec2(100, 50);
    const rect = new Rect(size, pos);
    expect(rect.size.x).toBe(40);
    expect(rect.size.y).toBe(20);
    expect(rect.position.x).toBe(100);
    expect(rect.position.y).toBe(50);
    expect(rect.halfSize.x).toBe(20);
    expect(rect.halfSize.y).toBe(10);
    expect(rect.topLeftCorner.x).toBe(80);
    expect(rect.bottomRightCorner.x).toBe(120);

    rect.setSize(new Vec2(60, 30));
    expect(rect.size.x).toBe(60);
    expect(rect.size.y).toBe(30);
    expect(rect.halfSize.x).toBe(30);
    expect(rect.halfSize.y).toBe(15);
  });

  it('should compute bounds with getBounds, boundsMin, and boundsMax', () => {
    const rect = new Rect(20, 40, 10, 20);
    const min = new Vec2();
    const max = new Vec2();
    rect.getBounds(min, max);
    expect(min.x).toBe(0);
    expect(min.y).toBe(0);
    expect(max.x).toBe(20);
    expect(max.y).toBe(40);

    expect(rect.boundsMin.x).toBe(0);
    expect(rect.boundsMin.y).toBe(0);
    expect(rect.boundsMax.x).toBe(20);
    expect(rect.boundsMax.y).toBe(40);
  });

  it('should raycast against rectangle with hit, miss, and inside start', () => {
    // Rect from x=[40, 60], y=[-10, 10]
    const rect = new Rect(20, 20, 50, 0);

    // Hit from left
    const hit = rect.raycast(new Vec2(0, 0), new Vec2(100, 0));
    expect(hit).not.toBeNull();
    expect(hit.fraction).toBeCloseTo(0.4, 5);
    expect(hit.point.x).toBeCloseTo(40, 5);
    expect(hit.point.y).toBeCloseTo(0, 5);
    expect(hit.normal.x).toBe(-1);
    expect(hit.normal.y).toBe(0);

    // Miss above
    const miss = rect.raycast(new Vec2(0, 30), new Vec2(100, 30));
    expect(miss).toBeNull();

    // Start inside AABB
    const inside = rect.raycast(new Vec2(55, 0), new Vec2(100, 0));
    expect(inside).not.toBeNull();
    expect(inside.fraction).toBe(0);
    expect(inside.point.x).toBe(55);
    expect(inside.point.y).toBe(0);
    expect(inside.normal.x).toBe(1); // Closest to right face (dist 5 vs dist 15)
    expect(inside.normal.y).toBe(0);

    // Target reuse
    const target = { fraction: 0, point: new Vec2(), normal: new Vec2() };
    const res = rect.raycast(new Vec2(0, 0), new Vec2(100, 0), target);
    expect(res).toBe(target);
    expect(target.point.x).toBeCloseTo(40, 5);
  });

});
