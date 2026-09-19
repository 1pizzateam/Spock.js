import { NumArray, RollingAverage } from '../build/es6/array.js';

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

describe('RollingAverage', () => {

  it('should initialize empty with 0 average', () => {
    const roll = new RollingAverage(3);
    expect(roll.size).toBe(3);
    expect(roll.count).toBe(0);
    expect(roll.sum).toBe(0);
    expect(roll.average).toBe(0);
  });

  it('should accumulate values and calculate true running average without bias', () => {
    const roll = new RollingAverage(3);
    expect(roll.push(10)).toBe(10);
    expect(roll.count).toBe(1);
    expect(roll.sum).toBe(10);

    expect(roll.push(20)).toBe(15);
    expect(roll.count).toBe(2);
    expect(roll.sum).toBe(30);

    expect(roll.push(30)).toBe(20);
    expect(roll.count).toBe(3);
    expect(roll.sum).toBe(60);

    // Roll over: replaces 10 with 40 -> sum is 20 + 30 + 40 = 90 / 3 = 30
    expect(roll.push(40)).toBe(30);
    expect(roll.count).toBe(3);
    expect(roll.sum).toBe(90);
    expect(roll.average).toBe(30);
  });

  it('should reset properly', () => {
    const roll = new RollingAverage(3);
    roll.push(10);
    roll.push(20);
    roll.reset();
    expect(roll.count).toBe(0);
    expect(roll.sum).toBe(0);
    expect(roll.average).toBe(0);
  });

});
