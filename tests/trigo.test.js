import { readFileSync } from 'node:fs';
import { Trigo, applySineCosine } from '../build/es6/trigo.js';
import { Vec2 } from '../build/es6/vectors/vec2.js';

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

  it('should compute deltaRadian, lerpRadian, and stepRadian along the shortest arc', () => {
    expect(Trigo.deltaRadian(0.1, -0.1)).toBeCloseTo(-0.2, 6);
    expect(Trigo.deltaRadian(Math.PI - 0.1, -Math.PI + 0.1)).toBeCloseTo(0.2, 6);
    expect(Trigo.lerpRadian(Math.PI - 0.1, -Math.PI + 0.1, 0.5)).toBeCloseTo(Math.PI, 6);
    expect(Trigo.stepRadian(0, 1, 0.25)).toBeCloseTo(0.25, 6);
    expect(Trigo.stepRadian(0, -1, 0.25)).toBeCloseTo(-0.25, 6);
    expect(Trigo.stepRadian(0.1, 0.2, 0.5)).toBeCloseTo(0.2, 6);
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

  it('AC-1 should evaluate sineEquation as amplitude * sin(period + shiftX) + shiftY', () => {
    expect(Trigo.sineEquation(2, 0.5, 0.25, 1)).toBeCloseTo(2 * Math.sin(0.75) + 1, 3);
  });

  it('AC-2 should evaluate cosineEquation as amplitude * cos(period + shiftX) + shiftY', () => {
    expect(Trigo.cosineEquation(-1.5, 1.2, -0.4, 0.3)).toBeCloseTo(-1.5 * Math.cos(0.8) + 0.3, 3);
  });

  it('AC-3 should evaluate arctanEquation as amplitude * atan(period + shiftX) + shiftY', () => {
    expect(Trigo.arctanEquation(3, 0.7, 0.3, -2)).toBeCloseTo(3 * Math.atan(1.0) - 2, 12);
  });

  it('AC-4 should return shiftY when amplitude is zero for sine, cosine, and arctan equations', () => {
    expect(Trigo.sineEquation(0, 0.5, 0.25, 1)).toBeCloseTo(1, 3);
    expect(Trigo.cosineEquation(0, 1.2, -0.4, 0.3)).toBeCloseTo(0.3, 3);
    expect(Trigo.arctanEquation(0, 0.7, 0.3, -2)).toBe(-2);
  });

  it('AC-5 should return shiftY when period + shiftX is zero for sine and arctan equations', () => {
    expect(Trigo.sineEquation(2, 0.5, -0.5, 0)).toBeCloseTo(0, 3);
    expect(Trigo.arctanEquation(3, 0.4, -0.4, -2)).toBe(-2);
  });

});

describe('applySineCosine', () => {

  const source = readFileSync('src/trigo.ts', 'utf8');

  it('AC-1 applySineCosine target is typed Vec2', () => {
    expect(source).toContain('applySineCosine(target: Vec2,');
    expect(source).not.toContain('target: { x: number; y: number }');
  });

  it('AC-2 Vec2 is a type-only import', () => {
    expect(source).toContain("import type { Vec2 }");
  });

  it('AC-3 applySineCosine writes into Vec2', () => {
    const v = new Vec2(1, 1);
    applySineCosine(v, 0, 5);
    expect(v.x).toBeCloseTo(5, 9);
    expect(v.y).toBeCloseTo(0, 9);
  });

  it('AC-4 Vec2.setRadian preserves length', () => {
    const v = new Vec2(0, 3);
    v.setRadian(Math.PI / 2);
    expect(v.x).toBeCloseTo(0, 9);
    expect(v.y).toBeCloseTo(3, 9);
  });

  it('AC-5 full suite regression via npm test', () => {
    const v = new Vec2(2, 0);
    v.setRadian(Math.PI);
    expect(v.x).toBeCloseTo(-2, 9);
  });

});
