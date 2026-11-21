import { sampleCurveLength } from '../build/es6/bezier.js';
import { Vec2 } from '../build/es6/vectors/vec2.js';
import { Bezier } from '../build/es6/bezier.js';

describe('Bezier', () => {

  it('should return the start point at t = 0 for a quadratic curve', () => {
    expect(Bezier.quadratic(0, 10, 20, 0)).toBe(0);
  });

  it('should return the end point at t = 1 for a quadratic curve', () => {
    expect(Bezier.quadratic(0, 10, 20, 1)).toBe(20);
  });

  it('should return the midpoint control blend at t = 0.5 for a quadratic curve', () => {
    expect(Bezier.quadratic(0, 10, 0, 0.5)).toBe(5);
  });

  it('should return the start point at t = 0 for a cubic curve', () => {
    expect(Bezier.cubic(0, 10, 20, 30, 0)).toBe(0);
  });

  it('should return the end point at t = 1 for a cubic curve', () => {
    expect(Bezier.cubic(0, 10, 20, 30, 1)).toBe(30);
  });

  it('should return twice the first control offset as the quadratic derivative at t = 0', () => {
    expect(Bezier.quadraticDerivative(0, 10, 20, 0)).toBe(20);
  });

  it('should return three times the first control offset as the cubic derivative at t = 0', () => {
    expect(Bezier.cubicDerivative(0, 10, 20, 30, 0)).toBe(30);
  });

  it('should split a quadratic so both halves meet the original curve', () => {
    const left = [];
    const right = [];
    Bezier.quadraticSplit(0, 10, 0, 0.5, left, right);
    expect(Bezier.quadratic(left[0], left[1], left[2], 1)).toBe(Bezier.quadratic(0, 10, 0, 0.5));
    expect(Bezier.quadratic(right[0], right[1], right[2], 0)).toBe(Bezier.quadratic(0, 10, 0, 0.5));
  });

  it('should split a cubic so both halves meet the original curve', () => {
    const left = [];
    const right = [];
    Bezier.cubicSplit(0, 10, 20, 0, 0.25, left, right);
    expect(Bezier.cubic(left[0], left[1], left[2], left[3], 1)).toBe(Bezier.cubic(0, 10, 20, 0, 0.25));
    expect(Bezier.cubic(right[0], right[1], right[2], right[3], 0)).toBe(Bezier.cubic(0, 10, 20, 0, 0.25));
  });

  it('should approximate the length of a straight quadratic', () => {
    expect(Bezier.quadraticLength(0, 5, 10)).toBeCloseTo(10, 5);
  });

  it('should map half the length of a straight quadratic to t = 0.5', () => {
    expect(Bezier.quadraticParameterAtLength(0, 5, 10, 5)).toBeCloseTo(0.5, 5);
  });

  it('AC-1 sampleCurveLength accepts a Vec2 vector sampler with scratch vectors', () => {
    const length = sampleCurveLength(
      (t, target) => target.setScalar(3 * t, 4 * t),
      new Vec2(),
      new Vec2(),
      4
    );
    expect(length).toBeCloseTo(5, 12);
  });

  it('AC-1 quadratic and cubic length of straight curves', () => {
    expect(Bezier.quadraticLength(0, 5, 10)).toBeCloseTo(10, 5);
    expect(Bezier.cubicLength(0, 10, 20, 30)).toBeCloseTo(30, 5);
    expect(Bezier.quadraticLength(0, 5, 10, 8)).toBeCloseTo(10, 5);
    expect(Bezier.cubicLength(0, 10, 20, 30, 8)).toBeCloseTo(30, 5);
  });

  it('AC-2 parameterAtLength of half length returns 0.5', () => {
    expect(Bezier.quadraticParameterAtLength(0, 5, 10, 5)).toBeCloseTo(0.5, 5);
    expect(Bezier.cubicParameterAtLength(0, 10, 20, 30, 15)).toBeCloseTo(0.5, 5);
  });

  it('AC-3 non-monotonic length matches reference polyline sum', () => {
    const n = 8;
    let cubic = 0;
    let quad = 0;
    for (let i = 1; i <= n; i++) {
      cubic += Math.abs(Bezier.cubic(0, 10, -10, 0, i / n) - Bezier.cubic(0, 10, -10, 0, (i - 1) / n));
      quad += Math.abs(Bezier.quadratic(0, 10, 0, i / n) - Bezier.quadratic(0, 10, 0, (i - 1) / n));
    }
    expect(Bezier.cubicLength(0, 10, -10, 0, n)).toBeCloseTo(cubic, 10);
    expect(Bezier.quadraticLength(0, 10, 0, n)).toBeCloseTo(quad, 10);
  });

  it('AC-4 parameterAtLength clamps to 0 and 1', () => {
    expect(Bezier.quadraticParameterAtLength(0, 5, 10, 0)).toBe(0);
    expect(Bezier.quadraticParameterAtLength(0, 5, 10, -3)).toBe(0);
    expect(Bezier.quadraticParameterAtLength(0, 5, 10, 100)).toBe(1);
    expect(Bezier.cubicParameterAtLength(0, 10, 20, 30, 0)).toBe(0);
    expect(Bezier.cubicParameterAtLength(0, 10, 20, 30, -3)).toBe(0);
    expect(Bezier.cubicParameterAtLength(0, 10, 20, 30, 100)).toBe(1);
  });

  it('AC-5 sample count clamping matches explicit counts', () => {
    expect(Bezier.cubicLength(0, 10, -10, 0)).toBe(Bezier.cubicLength(0, 10, -10, 0, 16));
    expect(Bezier.cubicLength(0, 10, -10, 0, 0.5)).toBe(Bezier.cubicLength(0, 10, -10, 0, 1));
    expect(Bezier.quadraticLength(0, 10, 0, 4.9)).toBe(Bezier.quadraticLength(0, 10, 0, 4));
    expect(Bezier.quadraticParameterAtLength(0, 10, 0, 3, 4.9)).toBe(Bezier.quadraticParameterAtLength(0, 10, 0, 3, 4));
    expect(Bezier.cubicParameterAtLength(0, 10, -10, 0, 3, 0.5)).toBe(Bezier.cubicParameterAtLength(0, 10, -10, 0, 3, 1));
  });

});
