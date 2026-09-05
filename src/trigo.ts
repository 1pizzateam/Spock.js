const SIN_LUT_SIZE = 16384;
const SIN_LUT_MASK = SIN_LUT_SIZE - 1;
const SIN_LUT_QUARTER = SIN_LUT_SIZE >> 2;
const INV_TWOPI = 1 / (Math.PI * 2);
const SIN_LUT = new Float32Array(SIN_LUT_SIZE);

for (let i = 0; i < SIN_LUT_SIZE; i++) {
  SIN_LUT[i] = Math.sin(i * Math.PI * 2 / SIN_LUT_SIZE);
}

/** Wrap angle in radians into a sine lookup-table index. */
function lutIndex(angle: number): number {
  const u = angle * INV_TWOPI;
  return ((u - Math.floor(u)) * SIN_LUT_SIZE) & SIN_LUT_MASK;
}

/** Fast sine from the lookup table. */
function fastSine(angle: number): number {
  return SIN_LUT[lutIndex(angle)];
}

/** Fast cosine from the lookup table. */
function fastCosine(angle: number): number {
  return SIN_LUT[(lutIndex(angle) + SIN_LUT_QUARTER) & SIN_LUT_MASK];
}

/** Set target to a vector of the given length at angle (radians). */
export function applySineCosine(target: { x: number; y: number }, angle: number, length: number): void {
  target.x = Math.cos(angle) * length;
  target.y = Math.sin(angle) * length;
}

const PI = Math.PI;
const TWOPI = PI * 2;
const HALFPI = PI * 0.5;

/** Angles, LUT sine/cosine, and wave equations. */
export const Trigonometry = {

  pi: PI,
  twopi: TWOPI,
  halfpi: HALFPI,

  /** Degrees to radians. */
  degreeToRadian(degree: number): number {
    return degree * 0.017453292519943295;
  },

  /** Radians to degrees. */
  radianToDegree(radian: number): number {
    return radian * 57.29577951308232;
  },

  /** Wrap radians into (-π, π]. */
  normalizeRadian(angle: number): number {
    if (angle > PI || angle < -PI)
      return angle - TWOPI * Math.floor((angle + PI) / TWOPI);
    return angle;
  },

  /** Fast sine of angle in radians. */
  sine(angle: number): number {
    return fastSine(angle);
  },

  /** Fast cosine of angle in radians. */
  cosine(angle: number): number {
    return fastCosine(angle);
  },

  /** Arctangent of angle (Math.atan). */
  arctan(angle: number): number {
    return Math.atan(angle);
  },

  /** atan2(y, x), or false at the origin. */
  arctan2(y: number, x: number): number | false {
    if (x === 0 && y === 0)
      return false;
    return Math.atan2(y, x);
  },

  /** Precise sine (Math.sin). */
  sinePrecise(angle: number): number {
    return Math.sin(angle);
  },

  /** Precise cosine (Math.cos). */
  cosinePrecise(angle: number): number {
    return Math.cos(angle);
  },

  /** amplitude * sin(period + shiftX) + shiftY. */
  sineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number {
    return amplitude * fastSine(period + shiftX) + shiftY;
  },

  /** amplitude * cos(period + shiftX) + shiftY. */
  cosineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number {
    return amplitude * fastCosine(period + shiftX) + shiftY;
  },

  /** amplitude * atan(period + shiftX) + shiftY. */
  arctanEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number {
    return amplitude * Math.atan(period + shiftX) + shiftY;
  },

};
