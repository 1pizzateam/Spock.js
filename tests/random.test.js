import { Random } from '../build/es6/random.js';

describe('Random', () => {

  it('should return a float in [min, max)', () => {
    for (let i = 0; i < 50; i++) {
      const value = Random.float(2, 5);
      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThan(5);
    }
  });

  it('should return an integer in [min, max]', () => {
    for (let i = 0; i < 50; i++) {
      const value = Random.integer(1, 3);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(3);
    }
  });

  it('should return a distribution average inside the range', () => {
    const value = Random.distribution(0, 10, 40);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(10);
  });

  it('should pick one of the two provided values', () => {
    for (let i = 0; i < 20; i++) {
      expect([1, 2]).toContain(Random.pick(1, 2));
    }
  });

  it('should replay the same sequence for a given seed', () => {
    const a = Random.create(1);
    const b = Random.create(1);
    expect(a.float(0, 1)).toBe(b.float(0, 1));
    expect(a.integer(0, 10)).toBe(b.integer(0, 10));
    expect(a.pick(1, 2)).toBe(b.pick(1, 2));
  });

  it('should differ across seeds', () => {
    expect(Random.create(1).float(0, 1)).not.toBe(Random.create(2).float(0, 1));
  });

  it('should match create() after Random.seed()', () => {
    const isolated = Random.create(7);
    Random.seed(7);
    try {
      expect(Random.float(0, 1)).toBe(isolated.float(0, 1));
    } finally {
      Random.seed();
    }
  });

});
