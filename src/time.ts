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

};
