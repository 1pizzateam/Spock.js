/** Bind float/integer/pick helpers to a 0–1 generator. */
function fromNext(next: () => number) {
  /** Uniform float in [min, max). */
  function float(min: number, max: number): number {
    return min + next() * (max - min);
  }

  return {
    float,

    /** Uniform integer in [min, max]. */
    integer(min: number, max: number): number {
      return Math.floor(min + next() * (max - min + 1));
    },

    /** Average of iterations uniform samples in [min, max). */
    distribution(min: number, max: number, iterations: number): number {
      let total = 0;
      for (let i = 0; i < iterations; i++)
        total += float(min, max);
      return total / iterations;
    },

    /** Pick value1 or value2 with equal chance. */
    pick(value1: number, value2: number): number {
      return next() < 0.5 ? value1 : value2;
    },
  };
}

/** Seeded 0–1 generator (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

let next = Math.random;
const methods = fromNext(() => next());

/** Random numbers; unseeded calls use Math.random(). */
export const Rand = {

  /** Uniform float in [min, max). */
  float: methods.float,
  /** Uniform integer in [min, max]. */
  integer: methods.integer,
  /** Average of iterations uniform samples in [min, max). */
  distribution: methods.distribution,
  /** Pick value1 or value2 with equal chance. */
  pick: methods.pick,

  /** Seed the default generator, or restore Math.random if omitted. */
  seed(value?: number): void {
    next = value === undefined ? Math.random : mulberry32(value);
  },

  /** Independent generator from seed. */
  create(seed: number) {
    return fromNext(mulberry32(seed));
  },

};
