import { Box, Vec3, Mat4x3, Quat } from '../../build/es6/spock.js';

describe('Box', () => {
  test('creates empty box by default', () => {
    const box = new Box();
    expect(box.isEmpty()).toBe(true);
  });

  test('setFromPoints computes correct min and max', () => {
    const points = [new Vec3(-5, 2, 3), new Vec3(10, -8, 1), new Vec3(0, 12, -4)];
    const box = new Box().setFromPoints(points);
    expect(box.min.toArray()).toEqual([-5, -8, -4]);
    expect(box.max.toArray()).toEqual([10, 12, 3]);
  });

  test('setFromPoints accepts Vec3 lists with z = 0 planar points', () => {
    const fromVectors = new Box().setFromPoints([new Vec3(1, 2, 3), new Vec3(-1, 0, 5)]);
    expect(fromVectors.min.toArray()).toEqual([-1, 0, 3]);
    expect(fromVectors.max.toArray()).toEqual([1, 2, 5]);

    const typed = new Box().setFromPoints([new Vec3(0, 0, 0), new Vec3(1, 2, 3)]);
    expect(typed.max.toArray()).toEqual([1, 2, 3]);

    const flat = new Box().setFromPoints([new Vec3(0, 0, 0), new Vec3(4, 2, 0)]);
    expect(flat.min.toArray()).toEqual([0, 0, 0]);
    expect(flat.max.toArray()).toEqual([4, 2, 0]);
  });

  test('getCenter and getSize', () => {
    const box = new Box(new Vec3(-2, -2, -2), new Vec3(4, 6, 8));
    expect(box.getCenter().toArray()).toEqual([1, 2, 3]);
    expect(box.getSize().toArray()).toEqual([6, 8, 10]);
    expect(new Box().getCenter().toArray()).toEqual([0, 0, 0]);
    expect(new Box().getSize().toArray()).toEqual([0, 0, 0]);
  });

  test('containsPoint and intersectsBox', () => {
    const box = new Box(new Vec3(0, 0, 0), new Vec3(10, 10, 10));
    expect(box.containsPoint(new Vec3(5, 5, 5))).toBe(true);
    expect(box.containsPoint(new Vec3(11, 5, 5))).toBe(false);

    const overlapping = new Box(new Vec3(5, 5, 5), new Vec3(15, 15, 15));
    expect(box.intersectsBox(overlapping)).toBe(true);

    const separate = new Box(new Vec3(20, 20, 20), new Vec3(30, 30, 30));
    expect(box.intersectsBox(separate)).toBe(false);
  });

  test('clone and copy are independent', () => {
    const box = new Box(new Vec3(0, 0, 0), new Vec3(1, 1, 1));
    const clone = box.clone();
    clone.expandByPoint(new Vec3(5, 5, 5));
    expect(box.max.x).toBe(1);
    expect(new Box().copy(clone).max.x).toBe(5);
  });

  test('applyMatrix4 translates and bounds box correctly', () => {
    const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    box.applyMatrix4(new Mat4x3().translate(new Vec3(10, 0, 0)));
    expect(box.min.x).toBe(9);
    expect(box.max.x).toBe(11);
    expect(box.min.y).toBe(-1);
    expect(box.max.y).toBe(1);
  });

  test('applyMatrix4 works with a translated Mat4x3', () => {
    const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    const mat = new Mat4x3();
    mat.translate(new Vec3(0, 5, 0));
    box.applyMatrix4(mat);
    expect(box.min.y).toBe(4);
    expect(box.max.y).toBe(6);
  });

  test('applyMatrix4 matches transforming every corner', () => {
    const box = new Box(new Vec3(-1, -2, -3), new Vec3(2, 1, 4));
    const m = new Mat4x3().compose(new Vec3(5, -1, 2), new Quat().setFromEuler(new Vec3(0.4, 0.9, -0.3)), new Vec3(2, 1, 3));
    const expected = new Box();
    for (const x of [box.min.x, box.max.x])
      for (const y of [box.min.y, box.max.y])
        for (const z of [box.min.z, box.max.z])
          expected.expandByPoint(m.transformPoint(new Vec3(x, y, z)));
    const result = box.clone().applyMatrix4(m);
    for (const axis of ['x', 'y', 'z']) {
      expect(result.min[axis]).toBeCloseTo(expected.min[axis], 4);
      expect(result.max[axis]).toBeCloseTo(expected.max[axis], 4);
    }
  });

  test('applyMatrix4 leaves an empty box empty', () => {
    expect(new Box().applyMatrix4(new Mat4x3().translate(new Vec3(1, 1, 1))).isEmpty()).toBe(true);
  });

  test('AC-4 setFromPoints on Vec3[] fits single, negative and empty inputs', () => {
    const single = new Box().setFromPoints([new Vec3(1, 2, 3)]);
    expect(single.min.toArray()).toEqual([1, 2, 3]);
    expect(single.max.toArray()).toEqual([1, 2, 3]);
    const neg = new Box().setFromPoints([new Vec3(-1, -2, -3), new Vec3(-4, -5, -6)]);
    expect(neg.min.toArray()).toEqual([-4, -5, -6]);
    expect(neg.max.toArray()).toEqual([-1, -2, -3]);
    const empty = new Box();
    expect(empty.setFromPoints([])).toBe(empty);
    expect(empty.isEmpty()).toBe(true);
    const a = new Box().setFromPoints([new Vec3(100, 100, 100), new Vec3(50, 50, 50)]);
    const b = new Box().setFromPoints([new Vec3(-1, -2, -3)]);
    a.setFromPoints([new Vec3(1, 2, 3), new Vec3(2, 3, 4)]);
    expect(a.min.toArray()).toEqual([1, 2, 3]);
    expect(a.max.toArray()).toEqual([2, 3, 4]);
    expect(b.max.toArray()).toEqual([-1, -2, -3]);
  });

  test('setFromPoints keeps results independent of the input vectors and of prior calls', () => {
    const p0 = new Vec3(1, 2, 3);
    const p1 = new Vec3(-4, 5, 6);
    const p2 = new Vec3(0, -1, 9);
    const box = new Box().setFromPoints([p0, p1, p2]);
    expect(box.min.toArray()).toEqual([-4, -1, 3]);
    expect(box.max.toArray()).toEqual([1, 5, 9]);
    expect(box.min).not.toBe(p0);
    expect(box.min).not.toBe(p1);
    expect(box.min).not.toBe(p2);
    expect(box.max).not.toBe(p0);
    expect(box.max).not.toBe(p1);
    expect(box.max).not.toBe(p2);
    expect(p0.toArray()).toEqual([1, 2, 3]);
    expect(p1.toArray()).toEqual([-4, 5, 6]);
    expect(p2.toArray()).toEqual([0, -1, 9]);
    box.setFromPoints([new Vec3(7, 7, 7)]);
    expect(box.min.toArray()).toEqual([7, 7, 7]);
    expect(box.max.toArray()).toEqual([7, 7, 7]);
  });

  test('AC-5 applyMatrix4 with a rotating Mat4x3 matches transforming every corner and keeps an empty box empty', () => {
    const box = new Box(new Vec3(-1, -2, -3), new Vec3(2, 1, 4));
    const m = new Mat4x3().compose(new Vec3(5, -1, 2), new Quat().setFromEuler(new Vec3(0.4, 0.9, -0.3)), new Vec3(2, 1, 3));
    const expected = new Box();
    for (const x of [box.min.x, box.max.x])
      for (const y of [box.min.y, box.max.y])
        for (const z of [box.min.z, box.max.z])
          expected.expandByPoint(m.transformPoint(new Vec3(x, y, z)));
    const result = box.clone().applyMatrix4(m);
    for (const axis of ['x', 'y', 'z']) {
      expect(result.min[axis]).toBeCloseTo(expected.min[axis], 4);
      expect(result.max[axis]).toBeCloseTo(expected.max[axis], 4);
    }
    expect(new Box().applyMatrix4(m).isEmpty()).toBe(true);
  });
});
