/** Sum of every value in array. */
function sum(array: number[]): number {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
}

/** Numeric-array reductions. */
export const NumArray = {

  /** Smallest value, or NaN if array is empty. */
  min(array: number[]): number {
    if (array.length === 0)
      return NaN;
    let m = Infinity;
    for (let i = 0; i < array.length; i++) {
      if (array[i] < m)
        m = array[i];
    }
    return m;
  },

  /** Largest value, or NaN if array is empty. */
  max(array: number[]): number {
    if (array.length === 0)
      return NaN;
    let m = -Infinity;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > m)
        m = array[i];
    }
    return m;
  },

  /** Sum of every value. */
  sum,

  /** Product of every value. */
  multiply(array: number[]): number {
    let product = 1;
    for (let i = 0; i < array.length; i++) {
      product *= array[i];
    }
    return product;
  },

  /** Arithmetic mean, or NaN if array is empty. */
  average(array: number[]): number {
    return sum(array) / array.length;
  },

};
