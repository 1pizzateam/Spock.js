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

  it('should normalize a value to 0-1', () => {
    expect(Utils.normalize(5, 0, 10)).toBe(0.5);
  });

  it('should lerp between min and max', () => {
    expect(Utils.lerp(0, 10, 0.25)).toBe(2.5);
  });

  it('should map a value from one range to another', () => {
    expect(Utils.map(5, 0, 10, 0, 100)).toBe(50);
  });

  it('should detect values inside and outside a range', () => {
    expect(Utils.isIn(5, 0, 10)).toBe(true);
    expect(Utils.isIn(0, 0, 10)).toBe(true);
    expect(Utils.isOut(11, 0, 10)).toBe(true);
    expect(Utils.isOut(5, 0, 10)).toBe(false);
  });

});
