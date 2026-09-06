/** 10^decimals, including negative exponents. */
function pow10(decimals: number): number {
  let scale = 1;
  const n = decimals < 0 ? -decimals : decimals;
  for (let i = 0; i < n; i++)
    scale *= 10;
  return decimals < 0 ? 1 / scale : scale;
}

/** Apply map() at the given decimal scale. */
function scaled(x: number, decimals: number, map: (value: number) => number): number {
  const scale = pow10(decimals);
  return map(x * scale) / scale;
}

/** Linear interpolate from min to max by amount. */
function lerp(min: number, max: number, amount: number): number {
  return (max - min) * amount + min;
}

/** Map x from [min, max] into [0, 1]. */
function normalize(x: number, min: number, max: number): number {
  if (min === max) return 0;
  return (x - min) / (max - min);
}

/** Scalar helpers: rounding, mix, clamp, range tests. */
export const Utils = {

  /** Round x to the given number of decimals. */
  round(x: number, decimals: number): number {
    return scaled(x, decimals, Math.round);
  },

  /** Floor x to the given number of decimals. */
  floor(x: number, decimals: number): number {
    return scaled(x, decimals, Math.floor);
  },

  /** Ceil x to the given number of decimals. */
  ceil(x: number, decimals: number): number {
    return scaled(x, decimals, Math.ceil);
  },

  /** Truncate x to the given number of decimals. */
  trunc(x: number, decimals: number): number {
    decimals = pow10(decimals);
    const v = +x * decimals;
    if (!isFinite(v))
      return v;

    return ((v - v % 1) / decimals) || (v < 0 ? -0 : v === 0 ? v : 0);
  },

  /** Round x to the nearest multiple of nearest. */
  roundToNearest(x: number, nearest: number): number {
    return Math.round(x / nearest) * nearest;
  },

  /** Mix x and y by ratio (0 = x, 1 = y). */
  mix(x: number, y: number, ratio: number): number {
    return (1 - ratio) * x + ratio * y;
  },

  /** Sign of x: -1, 0, 1, or NaN. */
  getSign(x: number): number {
    return Math.sign(x);
  },

  /** Negate x. */
  opposite(x: number): number {
    return -x;
  },

  /** Clamp x to [min, max]. */
  clamp(x: number, min: number, max: number): number {
    return Math.min(Math.max(x, min), max);
  },

  /** Map x from [min, max] into [0, 1]. */
  normalize,

  /** Linear interpolate from min to max by amount. */
  lerp,

  /** Map x from [sourceMin, sourceMax] into [destMin, destMax]. */
  map(x: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number {
    return lerp(destMin, destMax, normalize(x, sourceMin, sourceMax));
  },

  /** True if x is inside [min, max]. */
  isIn(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
  },

  /** True if x is outside [min, max]. */
  isOut(x: number, min: number, max: number): boolean {
    return x < min || x > max;
  },

};
