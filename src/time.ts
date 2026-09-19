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
  subSteps(delta: number, fixedStep: number, maxSubSteps: number = 4): { steps: number; remainder: number } {
    if (fixedStep <= 0) return { steps: 0, remainder: delta };
    const steps = Math.min(Math.floor(delta / fixedStep), maxSubSteps);
    return { steps, remainder: delta - steps * fixedStep };
  },

};
