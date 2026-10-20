import { Circ, Grid, Ray2, RightTriangle, Vec2, raycastSegment } from '../../build/es6/spock.js';

describe('RightTriangle', () => {
  test('vertices, normals, opposite corner, hypotenuse helpers, and point containment for all 4 corners', () => {
    const nw = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
    expect(nw.shape).toBe('triangle-nw');
    expect(nw.hypNormal.x).toBeCloseTo(Math.SQRT1_2, 5);
    expect(nw.hypNormal.y).toBeCloseTo(Math.SQRT1_2, 5);
    const vertsNW = nw.getVertices();
    expect(vertsNW.s.toArray()).toEqual([0, 0]);
    expect(vertsNW.a.toArray()).toEqual([0, 64]);
    expect(vertsNW.b.toArray()).toEqual([64, 0]);
    const opp = new Vec2();
    expect(nw.getOppositeCorner(opp)).toBe(opp);
    expect(opp.toArray()).toEqual([64, 64]);
    expect(nw.getOppositeCorner().toArray()).toEqual([64, 64]);
    expect(nw.hypLength).toBeCloseTo(64 * Math.SQRT2, 5);
    expect(nw.signedDistanceToHypotenuse(new Vec2(32, 32))).toBeCloseTo(0, 5);
    expect(nw.signedDistanceToHypotenuse(new Vec2(64, 64))).toBeGreaterThan(0);

    const proj = new Vec2();
    expect(nw.projectOntoHypotenuse(new Vec2(40, 24), 2, proj)).toBe(proj);
    expect(proj.x + proj.y).toBeCloseTo(64, 5);
    expect(nw.projectOntoHypotenuse(new Vec2(40, 24)).x + nw.projectOntoHypotenuse(new Vec2(40, 24)).y).toBeCloseTo(64, 5);

    expect(nw.isIn(new Vec2(10, 10))).toBe(true);
    expect(nw.isIn(new Vec2(54, 54))).toBe(false);
    expect(nw.isIn(new Vec2(-5, 10))).toBe(false);

    const ne = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'ne');
    expect(ne.shape).toBe('triangle-ne');
    expect(ne.isIn(new Vec2(54, 10))).toBe(true);
    expect(ne.isIn(new Vec2(10, 54))).toBe(false);

    const sw = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'sw');
    expect(sw.shape).toBe('triangle-sw');
    expect(sw.isIn(new Vec2(10, 54))).toBe(true);
    expect(sw.isIn(new Vec2(54, 10))).toBe(false);

    const se = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'se');
    expect(se.shape).toBe('triangle-se');
    expect(se.isIn(new Vec2(54, 54))).toBe(true);
    expect(se.isIn(new Vec2(10, 10))).toBe(false);
  });

  test('clone, copy, setSize, getClosestPoint, overlapsCircle, and overlapsBounds', () => {
    const grid = new Grid(new Vec2(128, 128), 64);
    const nw = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
    nw.setGrid(grid);
    expect(nw.getGrid()).toBe(grid);

    const cloned = nw.clone();
    expect(cloned.shape).toBe('triangle-nw');
    expect(cloned.getGrid()).toBe(grid);

    const copied = new RightTriangle(new Vec2(10, 10)).copy(nw);
    expect(copied.shape).toBe('triangle-nw');
    expect(copied.size.toArray()).toEqual([64, 64]);

    copied.setSize(new Vec2(128, 128));
    expect(copied.halfSize.toArray()).toEqual([64, 64]);
    copied.setSize(new Vec2(64, 64));
    expect(copied.halfSize.toArray()).toEqual([32, 32]);

    // getClosestPoint inside and on all 3 edges
    expect(nw.getClosestPoint(new Vec2(10, 10)).toArray()).toEqual([10, 10]);
    const cpHyp = nw.getClosestPoint(new Vec2(48, 48));
    expect(cpHyp.x).toBeCloseTo(32, 4);
    expect(cpHyp.y).toBeCloseTo(32, 4);
    expect(nw.getClosestPoint(new Vec2(-10, 20)).toArray()).toEqual([0, 20]);
    expect(nw.getClosestPoint(new Vec2(20, -10)).toArray()).toEqual([20, 0]);

    expect(nw.overlapsCircle(new Circ(5, new Vec2(10, 10)))).toBe(true);
    expect(nw.overlapsCircle(new Circ(10, new Vec2(36, 36)))).toBe(true);
    expect(nw.overlapsCircle(new Circ(5, new Vec2(60, 60)))).toBe(false);
    expect(nw.overlapsCircle(new Circ(6, new Vec2(-5, 20)))).toBe(true);
    expect(nw.overlapsCircle(new Circ(6, new Vec2(20, -5)))).toBe(true);
    expect(nw.overlapsCircle(new Circ(-1, new Vec2(10, 10)))).toBe(false);
    expect(nw.overlapsCircle(new Circ(5, new Vec2(200, 200)))).toBe(false);

    expect(nw.overlapsBounds(new Vec2(5, 5), new Vec2(15, 15))).toBe(true);
    expect(nw.overlapsBounds(new Vec2(50, 50), new Vec2(62, 62))).toBe(false);
    expect(nw.overlapsBounds(new Vec2(100, 100), new Vec2(120, 120))).toBe(false);
    const se = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'se');
    expect(se.overlapsBounds(new Vec2(50, 50), new Vec2(62, 62))).toBe(true);
  });

  test('raycast, Ray2.intersectTriangle, and draw', () => {
    const nw = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
    const hitHyp = nw.raycast(new Vec2(60, 60), new Vec2(10, 10));
    expect(hitHyp).not.toBeNull();
    expect(hitHyp.point.x).toBeCloseTo(32, 3);
    expect(hitHyp.point.y).toBeCloseTo(32, 3);
    expect(hitHyp.normal.x).toBeCloseTo(Math.SQRT1_2, 4);

    const target = { fraction: 0, point: new Vec2(), normal: new Vec2() };
    expect(nw.raycast(new Vec2(60, 60), new Vec2(10, 10), target)).toBe(target);

    const hitLegX = nw.raycast(new Vec2(-10, 20), new Vec2(20, 20));
    expect(hitLegX.normal.x).toBe(-1);

    const hitLegY = nw.raycast(new Vec2(20, -10), new Vec2(20, 20));
    expect(hitLegY.normal.y).toBe(-1);

    expect(nw.raycast(new Vec2(30, 30), new Vec2(60, 60)).normal.x).toBeCloseTo(Math.SQRT1_2, 4);
    expect(nw.raycast(new Vec2(1, 20), new Vec2(60, 20), target).normal.x).toBe(-1);
    expect(nw.raycast(new Vec2(20, 1), new Vec2(20, 60)).normal.y).toBe(-1);
    expect(nw.raycast(new Vec2(50, 60), new Vec2(60, 50))).toBeNull();
    expect(raycastSegment(new Vec2(0, 0), new Vec2(10, 0), new Vec2(0, 5), new Vec2(10, 5), new Vec2(0, 1))).toBeNull();
    expect(raycastSegment(new Vec2(0, 0), new Vec2(10, 10), new Vec2(0, 10), new Vec2(10, 0), new Vec2(0, 1), target)).toBe(target);

    const ray = new Ray2(new Vec2(60, 60), new Vec2(-1, -1));
    expect(ray.intersectsTriangle(nw, 100)).toBe(true);
    expect(ray.intersectTriangle(nw, 100).point.x).toBeCloseTo(32, 3);
    expect(new Ray2(new Vec2(60, 60), new Vec2(1, 1)).intersectsTriangle(nw, 100)).toBe(false);

    const ctx = {
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      fill: () => {},
      stroke: () => {},
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0
    };
    nw.draw(ctx, '#ff0000', '#00ff00', 2);
  });
});
