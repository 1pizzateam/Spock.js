import { Ray2, Rect, Circ, RightTriangle, Vec2 } from '../../build/es6/spock.js';

describe('Ray2', () => {
  test('defaults to +X from the origin', () => {
    const ray = new Ray2();
    expect(ray.origin.toArray()).toEqual([0, 0]);
    expect(ray.direction.toArray()).toEqual([1, 0]);
  });

  test('normalizes the direction and copies its inputs', () => {
    const origin = new Vec2(1, 2);
    const direction = new Vec2(0, 5);
    const ray = new Ray2(origin, direction);
    expect(ray.direction.toArray()).toEqual([0, 1]);
    origin.x = 99;
    direction.y = 99;
    expect(ray.origin.x).toBe(1);
    expect(ray.direction.y).toBe(1);
  });

  test('at returns the point along the ray, optionally into a target', () => {
    const ray = new Ray2(new Vec2(1, 2), new Vec2(0, 1));
    expect(ray.at(3).toArray()).toEqual([1, 5]);
    const target = new Vec2();
    expect(ray.at(2, target)).toBe(target);
    expect(target.toArray()).toEqual([1, 4]);
  });

  test('set, clone and copy stay independent', () => {
    const ray = new Ray2().set(new Vec2(3, 3), new Vec2(-4, 0));
    expect(ray.direction.toArray()).toEqual([-1, 0]);
    const clone = ray.clone();
    clone.origin.x = 0;
    expect(ray.origin.x).toBe(3);
    expect(new Ray2().copy(ray).direction.x).toBe(-1);
  });

  test('intersectRect reports the hit with a fraction of maxDistance', () => {
    const rect = new Rect(new Vec2(2, 2), new Vec2(10, 0));
    const ray = new Ray2(new Vec2(0, 0), new Vec2(1, 0));
    const hit = ray.intersectRect(rect, 20);
    expect(hit).not.toBeNull();
    expect(hit.point.x).toBeCloseTo(9);
    expect(hit.fraction * 20).toBeCloseTo(9);
    expect(hit.normal.toArray()).toEqual([-1, 0]);
    expect(ray.intersectsRect(rect, 20)).toBe(true);
  });

  test('intersectRect misses when out of range or pointing away', () => {
    const rect = new Rect(new Vec2(2, 2), new Vec2(10, 0));
    expect(new Ray2(new Vec2(0, 0), new Vec2(1, 0)).intersectRect(rect, 5)).toBeNull();
    expect(new Ray2(new Vec2(0, 0), new Vec2(-1, 0)).intersectRect(rect, 50)).toBeNull();
    expect(new Ray2(new Vec2(0, 5), new Vec2(1, 0)).intersectsRect(rect, 50)).toBe(false);
  });

  test('intersectCirc reports the hit and normal', () => {
    const circ = new Circ(2, new Vec2(10, 0));
    const ray = new Ray2(new Vec2(0, 0), new Vec2(1, 0));
    const hit = ray.intersectCirc(circ, 30);
    expect(hit).not.toBeNull();
    expect(hit.point.x).toBeCloseTo(8);
    expect(hit.fraction * 30).toBeCloseTo(8);
    expect(hit.normal.x).toBeCloseTo(-1);
    expect(ray.intersectsCirc(circ, 30)).toBe(true);
    expect(new Ray2(new Vec2(0, 5), new Vec2(1, 0)).intersectCirc(circ, 30)).toBeNull();
  });

  test('works with diagonal rays and writes into a provided hit', () => {
    const rect = new Rect(new Vec2(2, 2), new Vec2(5, 5));
    const ray = new Ray2(new Vec2(0, 0), new Vec2(1, 1));
    const target = { fraction: 0, point: new Vec2(), normal: new Vec2() };
    const hit = ray.intersectRect(rect, 20, target);
    expect(hit).toBe(target);
    expect(hit.point.x).toBeCloseTo(4);
    expect(hit.point.y).toBeCloseTo(4);
  });

  test('a ray starting inside a shape hits immediately', () => {
    const hit = new Ray2(new Vec2(10, 0), new Vec2(1, 0)).intersectRect(new Rect(new Vec2(2, 2), new Vec2(10, 0)), 5);
    expect(hit.fraction).toBe(0);
  });

  describe('boolean queries use a scratch target', () => {
    const spy = (shape, targets) => {
      const orig = shape.raycast;
      shape.raycast = function (a, b, target) {
        targets.push(target);
        return orig.call(this, a, b, target);
      };
      return () => { shape.raycast = orig; };
    };
    const hitRay = () => new Ray2(new Vec2(0, 0), new Vec2(1, 0));
    const missRay = () => new Ray2(new Vec2(0, 100), new Vec2(1, 0));
    const cases = [
      ['AC-1 intersectsRect passes a scratch target to raycast', () => new Rect(new Vec2(2, 2), new Vec2(5, 0)), 'Rect'],
      ['AC-2 intersectsCirc passes a scratch target to raycast', () => new Circ(2, new Vec2(5, 0)), 'Circ'],
      ['AC-3 intersectsTriangle passes a scratch target to raycast', () => new RightTriangle(new Vec2(4, 4), new Vec2(4, -2), 'nw'), 'Triangle'],
    ];

    cases.forEach(([name, make, kind]) => {
      test(name, () => {
        const shape = make();
        const targets = [];
        const restore = spy(shape, targets);
        const hit = hitRay()[`intersects${kind}`](shape, 20);
        const miss = missRay()[`intersects${kind}`](shape, 20);
        restore();
        expect(targets.length).toBe(2);
        targets.forEach(t => {
          expect(t).toBeDefined();
          expect(t.point).toBeDefined();
          expect(t.normal).toBeDefined();
        });
        expect(hit).toBe(hitRay()[`intersect${kind}`](shape, 20) !== null);
        expect(miss).toBe(missRay()[`intersect${kind}`](shape, 20) !== null);
      });
    });

    test('AC-4 boolean queries reuse the same scratch target', () => {
      const targets = [];
      const shapes = cases.map(c => c[1]());
      const restores = shapes.map(sh => spy(sh, targets));
      [hitRay(), missRay(), new Ray2(new Vec2(1, 0), new Vec2(1, 0))].forEach(r => {
        r.intersectsRect(shapes[0], 20);
        r.intersectsCirc(shapes[1], 20);
        r.intersectsTriangle(shapes[2], 20);
      });
      restores.forEach(r => r());
      expect(targets.length).toBe(9);
      targets.forEach(t => expect(t).toBe(targets[0]));
    });

    test('AC-5 boolean results correct and caller targets not clobbered', () => {
      const rect = new Rect(new Vec2(2, 2), new Vec2(5, 0));
      expect(hitRay().intersectsRect(rect, 20)).toBe(true);
      expect(missRay().intersectsRect(rect, 20)).toBe(false);
      const target = { fraction: 0, point: new Vec2(), normal: new Vec2() };
      const hit = hitRay().intersectRect(rect, 20, target);
      const fraction = hit.fraction;
      const px = hit.point.x;
      new Ray2(new Vec2(0, 1), new Vec2(1, 0)).intersectsRect(rect, 20);
      expect(hit).toBe(target);
      expect(hit.fraction).toBe(fraction);
      expect(hit.point.x).toBe(px);
    });

    test('AC-6 existing Ray2 tests remain green: boolean and hit queries agree', () => {
      const rect = new Rect(new Vec2(2, 2), new Vec2(5, 0));
      expect(hitRay().intersectsRect(rect, 20)).toBe(hitRay().intersectRect(rect, 20) !== null);
      expect(missRay().intersectsRect(rect, 20)).toBe(missRay().intersectRect(rect, 20) !== null);
    });
  });
});
