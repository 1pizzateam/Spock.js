/** Convert between milliseconds, seconds, and frame rates. */
export const Time = {

  /** Milliseconds to seconds. */
  millisecToSec(millisecond: number): number {
    return millisecond * 0.001;
  },

  /** Seconds to milliseconds. */
  secToMillisec(second: number): number {
    return second * 1000;
  },

  /** Frame duration in ms to frames per second. */
  millisecToFps(millisecond: number): number {
    if (millisecond === 0) return 0;
    return 1000 / millisecond;
  },

  /** Frames per second to frame duration in ms. */
  fpsToMillisec(refreshRate: number): number {
    if (refreshRate === 0) return 0;
    return 1000 / refreshRate;
  },

  /** Monotonic timestamp in milliseconds across environments. */
  now(): number {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
  },

  /** Clamp frame delta duration in milliseconds to prevent lag spikes. */
  clampDelta(delta: number, maxMs: number = 100, minMs: number = 0): number {
    if (delta < minMs) return minMs;
    if (delta > maxMs) return maxMs;
    return delta;
  },

  /** Exponential moving average for smooth instantaneous FPS updates. */
  smoothFps(currentFps: number, instantFps: number, alpha: number = 0.05): number {
    return currentFps * (1 - alpha) + instantFps * alpha;
  },

  /** Compute fixed-timestep simulation sub-steps and accumulator remainder. */
  subSteps(delta: number, fixedStep: number, maxSubSteps: number = 4, target?: { steps: number; remainder: number }): { steps: number; remainder: number } {
    const out = target ?? { steps: 0, remainder: 0 };
    if (fixedStep <= 0) {
      out.steps = 0;
      out.remainder = delta;
      return out;
    }
    const steps = Math.min(Math.floor(delta / fixedStep), maxSubSteps);
    out.steps = steps;
    out.remainder = delta - steps * fixedStep;
    return out;
  },

};

/** Reusable fixed-timestep accumulator for physics simulations and game loops. */
export class Accumulator {

  public fixedStep: number;
  public maxSubSteps: number;
  public value: number = 0;

  constructor(fixedStep: number = 1 / 60, maxSubSteps: number = 5) {
    this.fixedStep = fixedStep;
    this.maxSubSteps = maxSubSteps;
  }

  /**
   * Advance simulation using accumulated fixed sub-steps.
   * Clamps accumulated time to (fixedStep * maxSubSteps) to prevent spiral of death.
   * @param delta - Elapsed frame delta time in seconds.
   * @param tick - Callback invoked for each fixed substep.
   * @returns Number of fixed simulation substeps executed.
   */
  public step(delta: number, tick: (fixedStep: number) => void): number {
    if (delta <= 0) return 0;
    this.value += delta;
    const maxAccumulated = this.fixedStep * this.maxSubSteps;
    if (this.value > maxAccumulated)
      this.value = maxAccumulated;

    let subStepsTaken = 0;
    while (this.value >= this.fixedStep && subStepsTaken < this.maxSubSteps) {
      tick(this.fixedStep);
      this.value -= this.fixedStep;
      subStepsTaken++;
    }
    return subStepsTaken;
  }

  /** Interpolation factor alpha in [0, 1] between previous and current state. */
  public get alpha(): number {
    return this.fixedStep > 0 ? this.value / this.fixedStep : 0;
  }

  /** Reset accumulator. */
  public reset(): void {
    this.value = 0;
  }

}
