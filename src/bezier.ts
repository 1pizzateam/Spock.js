/** Clamp sample count to a positive integer (default 16). */
export function bezierSampleCount(samples?: number): number {
  if (samples === undefined)
    return 16;
  return samples < 1 ? 1 : samples | 0;
}

/** Approximate arc length of a 1D curve by polyline samples. */
function polylineLength(at: (t: number) => number, samples?: number): number {
  const n = bezierSampleCount(samples);
  let prev = at(0);
  let length = 0;
  for (let i = 1; i <= n; i++) {
    const curr = at(i / n);
    length += curr > prev ? curr - prev : prev - curr;
    prev = curr;
  }
  return length;
}

/** Parameter t where sampled 1D arc length reaches distance. */
function parameterAtLength(at: (t: number) => number, distance: number, samples?: number): number {
  if (distance <= 0)
    return 0;
  const n = bezierSampleCount(samples);
  let traveled = 0;
  let prev = at(0);
  for (let i = 1; i <= n; i++) {
    const curr = at(i / n);
    const segment = curr > prev ? curr - prev : prev - curr;
    if (traveled + segment >= distance) {
      const u = segment === 0 ? 0 : (distance - traveled) / segment;
      return (i - 1 + u) / n;
    }
    traveled += segment;
    prev = curr;
  }
  return 1;
}

/** Approximate 2D/3D curve length from coordinate samplers. */
export function sampleCurveLength(
  atX: (t: number) => number,
  atY: (t: number) => number,
  atZ?: (t: number) => number,
  samples?: number
): number {
  const n = bezierSampleCount(samples);
  let px = atX(0), py = atY(0), pz = atZ ? atZ(0) : 0;
  let length = 0;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = atX(t), y = atY(t), z = atZ ? atZ(t) : 0;
    const dx = x - px, dy = y - py, dz = z - pz;
    length += Math.sqrt(dx * dx + dy * dy + dz * dz);
    px = x;
    py = y;
    pz = z;
  }
  return length;
}

/** Parameter t where sampled 2D/3D arc length reaches distance. */
export function sampleCurveParameterAtLength(
  atX: (t: number) => number,
  atY: (t: number) => number,
  atZ: ((t: number) => number) | undefined,
  distance: number,
  samples?: number
): number {
  if (distance <= 0)
    return 0;
  const n = bezierSampleCount(samples);
  let traveled = 0;
  let px = atX(0), py = atY(0), pz = atZ ? atZ(0) : 0;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = atX(t), y = atY(t), z = atZ ? atZ(t) : 0;
    const dx = x - px, dy = y - py, dz = z - pz;
    const segment = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (traveled + segment >= distance) {
      const u = segment === 0 ? 0 : (distance - traveled) / segment;
      return (i - 1 + u) / n;
    }
    traveled += segment;
    px = x;
    py = y;
    pz = z;
  }
  return 1;
}

/** Scalar Bézier evaluation, derivatives, splits, and sampled length. */
export const Bezier = {

  /** Quadratic Bézier at t. */
  quadratic(p0: number, p1: number, p2: number, t: number): number {
    const oneMinusT = 1 - t;
    return  oneMinusT * oneMinusT * p0 +
            oneMinusT * 2 * t * p1 +
            t * t * p2;
  },

  /** Cubic Bézier at t. */
  cubic(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const oneMinusT = 1 - t;
    const tByT = t * t;
    return  oneMinusT * oneMinusT * oneMinusT * p0 +
            oneMinusT * oneMinusT * 3 * t * p1 +
            oneMinusT * 3 * tByT * p2 +
            tByT * t * p3;
  },

  /** First derivative of a quadratic Bézier at t. */
  quadraticDerivative(p0: number, p1: number, p2: number, t: number): number {
    return 2 * (1 - t) * (p1 - p0) + 2 * t * (p2 - p1);
  },

  /** First derivative of a cubic Bézier at t. */
  cubicDerivative(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const oneMinusT = 1 - t;
    return 3 * oneMinusT * oneMinusT * (p1 - p0)
         + 6 * oneMinusT * t * (p2 - p1)
         + 3 * t * t * (p3 - p2);
  },

  /** Split a quadratic at t into left and right control polygons. */
  quadraticSplit(p0: number, p1: number, p2: number, t: number, left: number[], right: number[]): void {
    const p01 = p0 + (p1 - p0) * t;
    const p12 = p1 + (p2 - p1) * t;
    const mid = p01 + (p12 - p01) * t;
    left[0] = p0;
    left[1] = p01;
    left[2] = mid;
    right[0] = mid;
    right[1] = p12;
    right[2] = p2;
  },

  /** Split a cubic at t into left and right control polygons. */
  cubicSplit(p0: number, p1: number, p2: number, p3: number, t: number, left: number[], right: number[]): void {
    const p01 = p0 + (p1 - p0) * t;
    const p12 = p1 + (p2 - p1) * t;
    const p23 = p2 + (p3 - p2) * t;
    const p012 = p01 + (p12 - p01) * t;
    const p123 = p12 + (p23 - p12) * t;
    const mid = p012 + (p123 - p012) * t;
    left[0] = p0;
    left[1] = p01;
    left[2] = p012;
    left[3] = mid;
    right[0] = mid;
    right[1] = p123;
    right[2] = p23;
    right[3] = p3;
  },

  /** Sampled arc length of a 1D quadratic. */
  quadraticLength(p0: number, p1: number, p2: number, samples?: number): number {
    return polylineLength(t => Bezier.quadratic(p0, p1, p2, t), samples);
  },

  /** Sampled arc length of a 1D cubic. */
  cubicLength(p0: number, p1: number, p2: number, p3: number, samples?: number): number {
    return polylineLength(t => Bezier.cubic(p0, p1, p2, p3, t), samples);
  },

  /** Parameter t at the given 1D quadratic arc length. */
  quadraticParameterAtLength(p0: number, p1: number, p2: number, distance: number, samples?: number): number {
    return parameterAtLength(t => Bezier.quadratic(p0, p1, p2, t), distance, samples);
  },

  /** Parameter t at the given 1D cubic arc length. */
  cubicParameterAtLength(p0: number, p1: number, p2: number, p3: number, distance: number, samples?: number): number {
    return parameterAtLength(t => Bezier.cubic(p0, p1, p2, p3, t), distance, samples);
  },

};
