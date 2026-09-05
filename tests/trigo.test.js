import { Trigo } from '../build/es6/trigo.js';

describe('Trigo', () => {

  it('should convert degrees to radians using Math.PI', () => {
    expect(Trigo.degreeToRadian(180)).toBeCloseTo(Math.PI, 12);
    expect(Trigo.pi).toBe(Math.PI);
  });

  it('should convert radians to degrees using Math.PI', () => {
    expect(Trigo.radianToDegree(Math.PI)).toBeCloseTo(180, 12);
  });

  it('should wrap an angle into [-pi, pi]', () => {
    expect(Trigo.normalizeRadian(3 * Math.PI)).toBeCloseTo(-Math.PI, 12);
    expect(Trigo.normalizeRadian(0.5)).toBe(0.5);
  });

  it('should approximate sine and cosine closely enough for realtime use', () => {
    expect(Trigo.sine(0)).toBeCloseTo(0, 3);
    expect(Trigo.cosine(0)).toBeCloseTo(1, 3);
    expect(Trigo.sine(Math.PI / 2)).toBeCloseTo(1, 3);
    expect(Trigo.cosine(Math.PI / 2)).toBeCloseTo(0, 3);
    expect(Trigo.sine(1.234)).toBeCloseTo(Math.sin(1.234), 3);
    expect(Trigo.cosine(1.234)).toBeCloseTo(Math.cos(1.234), 3);
  });

  it('should match native trig on the precise API', () => {
    expect(Trigo.sinePrecise(1.234)).toBe(Math.sin(1.234));
    expect(Trigo.cosinePrecise(1.234)).toBe(Math.cos(1.234));
  });

  it('should use native arctan', () => {
    expect(Trigo.arctan(1)).toBe(Math.atan(1));
    expect(Trigo.arctan(0)).toBe(0);
  });

  it('should return 0 for a right-pointing pair like Math.atan2(0, 1)', () => {
    expect(Trigo.arctan2(0, 1)).toBeCloseTo(0, 3);
  });

  it('should return half pi for an up-pointing pair like Math.atan2(1, 0)', () => {
    expect(Trigo.arctan2(1, 0)).toBeCloseTo(Trigo.halfpi, 3);
  });

  it('should match Math.atan2 argument order', () => {
    expect(Trigo.arctan2(2, 1)).toBe(Math.atan2(2, 1));
  });

  it('should return false at the origin', () => {
    expect(Trigo.arctan2(0, 0)).toBe(false);
  });

});
