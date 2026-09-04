import { NumArray } from '../build/es6/array.js';

describe('NumArray', () => {

  it('should return the min value', () => {
    expect(NumArray.min([3, 1, 4])).toBe(1);
    expect(NumArray.min([])).toBeNaN();
  });

  it('should return the max value', () => {
    expect(NumArray.max([3, 1, 4])).toBe(4);
    expect(NumArray.max([])).toBeNaN();
  });

  it('should return the sum', () => {
    expect(NumArray.sum([1, 2, 3])).toBe(6);
    expect(NumArray.sum([])).toBe(0);
  });

  it('should return the product', () => {
    expect(NumArray.multiply([2, 3, 4])).toBe(24);
    expect(NumArray.multiply([5])).toBe(5);
  });

  it('should return 1 for an empty product', () => {
    expect(NumArray.multiply([])).toBe(1);
  });

  it('should return the average using the array length', () => {
    expect(NumArray.average([2, 4, 6])).toBe(4);
    expect(NumArray.average([])).toBeNaN();
  });

});
