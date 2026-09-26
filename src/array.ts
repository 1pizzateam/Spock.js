/** Sum of every value in array. */
function sum(array: number[]): number {
  let total = 0;
  for (let i = 0; i < array.length; i++)
    total += array[i];
  return total;
}

/** Numeric-array reductions. */
export const NumArray = {

  /** Smallest value, or NaN if array is empty. */
  min(array: number[]): number {
    if (array.length === 0)
      return NaN;
    let m = Infinity;
    for (let i = 0; i < array.length; i++)
      if (array[i] < m)
        m = array[i];
    return m;
  },

  /** Largest value, or NaN if array is empty. */
  max(array: number[]): number {
    if (array.length === 0)
      return NaN;
    let m = -Infinity;
    for (let i = 0; i < array.length; i++)
      if (array[i] > m)
        m = array[i];
    return m;
  },

  /** Sum of every value. */
  sum,

  /** Product of every value. */
  multiply(array: number[]): number {
    let product = 1;
    for (let i = 0; i < array.length; i++)
      product *= array[i];
    return product;
  },

  /** Arithmetic mean, or NaN if array is empty. */
  average(array: number[]): number {
    return sum(array) / array.length;
  },

};

/** Fixed-size circular buffer for O(1) rolling average calculations. */
export class RollingAverage {

  private values: Float64Array;
  private head: number = 0;
  private itemsCount: number = 0;
  private totalSum: number = 0;

  constructor(size: number = 60) {
    const capacity = Math.max(1, Math.floor(size));
    this.values = new Float64Array(capacity);
  }

  /** Capacity of the rolling window. */
  get size(): number {
    return this.values.length;
  }

  /** Number of values collected so far (up to capacity). */
  get count(): number {
    return this.itemsCount;
  }

  /** Sum of all values currently in the rolling window. */
  get sum(): number {
    return this.totalSum;
  }

  /** Current arithmetic mean of the rolling window, or 0 if empty. */
  get average(): number {
    return this.itemsCount ? this.totalSum / this.itemsCount : 0;
  }

  /** Add a value to the window in O(1) and return the updated average. */
  public push(value: number): number {
    if (this.itemsCount < this.values.length)
      this.itemsCount++;
    this.totalSum -= this.values[this.head];
    this.values[this.head] = value;
    this.totalSum += value;
    this.head = (this.head + 1) % this.values.length;
    return this.average;
  }

  /** Reset the buffer to empty state. */
  public reset(): void {
    this.values.fill(0);
    this.head = 0;
    this.itemsCount = 0;
    this.totalSum = 0;
  }

}
