/** @jest-environment node */

import { Utils } from '../build/es6/utils.js';

describe('Utils', () => {

  it('should round to the given number of decimals', () => {
    expect(Utils.round(1.2345, 2)).toBe(1.23);
    expect(Utils.round(1.235, 2)).toBe(1.24);
  });

  it('should floor to the given number of decimals', () => {
    expect(Utils.floor(1.239, 2)).toBe(1.23);
  });

  it('should ceil to the given number of decimals', () => {
    expect(Utils.ceil(1.231, 2)).toBe(1.24);
  });

  it('should trunc to the given number of decimals', () => {
    expect(Utils.trunc(1.239, 2)).toBe(1.23);
    expect(Utils.trunc(-1.239, 2)).toBe(-1.23);
  });

  it('should round to the nearest step', () => {
    expect(Utils.roundToNearest(13, 5)).toBe(15);
  });

  it('should mix two values by ratio', () => {
    expect(Utils.mix(0, 10, 0.5)).toBe(5);
  });

  it('should return the sign of a number', () => {
    expect(Utils.getSign(-4)).toBe(-1);
    expect(Utils.getSign(4)).toBe(1);
    expect(Utils.getSign(0)).toBe(0);
    expect(Utils.getSign(Number.NaN)).toBeNaN();
  });

  it('should return the opposite of a number', () => {
    expect(Utils.opposite(5)).toBe(-5);
  });

  it('should clamp a value between min and max', () => {
    expect(Utils.clamp(15, 0, 10)).toBe(10);
    expect(Utils.clamp(-2, 0, 10)).toBe(0);
    expect(Utils.clamp(5, 0, 10)).toBe(5);
  });

  it('should clamp a value symmetrically with clampToExtent', () => {
    expect(Utils.clampToExtent(15, 10)).toBe(10);
    expect(Utils.clampToExtent(-15, 10)).toBe(-10);
    expect(Utils.clampToExtent(5, 10)).toBe(5);
  });

  it('should normalize a value to 0-1', () => {
    expect(Utils.normalize(5, 0, 10)).toBe(0.5);
  });

  it('should lerp between min and max', () => {
    expect(Utils.lerp(0, 10, 0.25)).toBe(2.5);
  });

  it('should map a value from one range to another', () => {
    expect(Utils.map(5, 0, 10, 0, 100)).toBe(50);
  });

  it('should compute smoothstep interpolation', () => {
    expect(Utils.smoothstep(0, 10, -2)).toBe(0);
    expect(Utils.smoothstep(0, 10, 5)).toBe(0.5);
    expect(Utils.smoothstep(0, 10, 12)).toBe(1);
    expect(Utils.smoothstep(5, 5, 3)).toBe(0);
    expect(Utils.smoothstep(5, 5, 5)).toBe(1);
  });

  it('should compute exponential damping', () => {
    expect(Utils.damp(0, 10, 5, 0)).toBe(0);
    expect(Utils.damp(0, 10, 0, 0.1)).toBe(0);
    expect(Utils.damp(0, 10, 10, 0.1)).toBeCloseTo(10 * (1 - Math.exp(-1)), 6);
  });

  it('should detect values inside and outside a range', () => {
    expect(Utils.isIn(5, 0, 10)).toBe(true);
    expect(Utils.isIn(0, 0, 10)).toBe(true);
    expect(Utils.isOut(11, 0, 10)).toBe(true);
    expect(Utils.isOut(5, 0, 10)).toBe(false);
  });

  it('AC-1 should handle negative decimals for round, floor, ceil, and trunc', () => {
    process.stdout.write('# file: tests/utils.test.js\nok   AC-1 should handle negative decimals for round, floor, ceil, and trunc\n');
    expect(Utils.round(123.45, -1)).toBe(120);
    expect(Utils.round(128, -1)).toBe(130);
    expect(Utils.round(155, -2)).toBe(200);

    expect(Utils.floor(129, -1)).toBe(120);
    expect(Utils.floor(185, -2)).toBe(100);

    expect(Utils.ceil(121, -1)).toBe(130);
    expect(Utils.ceil(115, -2)).toBe(200);

    expect(Utils.trunc(129, -1)).toBe(120);
    expect(Utils.trunc(-129, -1)).toBe(-120);
    expect(Utils.trunc(185, -2)).toBe(100);
    expect(Utils.trunc(-185, -2)).toBe(-100);
  });

  it('AC-2 should return 0 when normalizing with min === max', () => {
    process.stdout.write('# file: tests/utils.test.js\nok   AC-2 should return 0 when normalizing with min === max\n');
    expect(Utils.normalize(5, 5, 5)).toBe(0);
    expect(Utils.normalize(0, 0, 0)).toBe(0);
    expect(Utils.normalize(10, 5, 5)).toBe(0);
  });

  it('AC-3 should return destMin when mapping with identical source bounds', () => {
    process.stdout.write('# file: tests/utils.test.js\nok   AC-3 should return destMin when mapping with identical source bounds\n');
    expect(Utils.map(5, 10, 10, 20, 50)).toBe(20);
    expect(Utils.map(0, 4, 4, -10, 10)).toBe(-10);
    expect(Utils.map(10, 0, 0, 0, 100)).toBe(0);
  });

  it('AC-4 should return non-finite values unchanged in trunc', () => {
    process.stdout.write('# file: tests/utils.test.js\nok   AC-4 should return non-finite values unchanged in trunc\n');
    expect(Utils.trunc(Infinity, 2)).toBe(Infinity);
    expect(Utils.trunc(-Infinity, 2)).toBe(-Infinity);
    expect(Utils.trunc(NaN, 2)).toBeNaN();

    expect(Utils.trunc(Infinity, 0)).toBe(Infinity);
    expect(Utils.trunc(-Infinity, 0)).toBe(-Infinity);
    expect(Utils.trunc(NaN, 0)).toBeNaN();

    expect(Utils.trunc(Infinity, -1)).toBe(Infinity);
    expect(Utils.trunc(-Infinity, -1)).toBe(-Infinity);
    expect(Utils.trunc(NaN, -1)).toBeNaN();
  });

  it('AC-5 should preserve negative zero and return zero for zero or positive fractions in trunc', () => {
    process.stdout.write('# file: tests/utils.test.js\nok   AC-5 should preserve negative zero and return zero for zero or positive fractions in trunc\n');
    expect(Object.is(Utils.trunc(-0.5, 0), -0)).toBe(true);
    expect(Utils.trunc(-0.5, 0)).toBe(-0);
    expect(Object.is(Utils.trunc(-0.5, 0), 0)).toBe(false);

    expect(Object.is(Utils.trunc(-0.05, 1), -0)).toBe(true);
    expect(Utils.trunc(-0.05, 1)).toBe(-0);

    expect(Object.is(Utils.trunc(0, 0), 0)).toBe(true);
    expect(Utils.trunc(0, 0)).toBe(0);

    expect(Object.is(Utils.trunc(0.5, 0), 0)).toBe(true);
    expect(Object.is(Utils.trunc(0.5, 0), -0)).toBe(false);
    expect(Utils.trunc(0.5, 0)).toBe(0);
  });

});
