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

});
