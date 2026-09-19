import { Time } from '../build/es6/time.js';

describe('Time', () => {

  it('should convert milliseconds to seconds', () => {
    expect(Time.millisecToSec(1500)).toBe(1.5);
  });

  it('should convert seconds to milliseconds', () => {
    expect(Time.secToMillisec(1.5)).toBe(1500);
  });

  it('should convert a frame duration to fps', () => {
    expect(Time.millisecToFps(16)).toBe(62.5);
  });

  it('should convert fps to a frame duration', () => {
    expect(Time.fpsToMillisec(50)).toBe(20);
  });

  it('should return monotonic timestamp with now', () => {
    const t1 = Time.now();
    expect(typeof t1).toBe('number');
    expect(t1).toBeGreaterThan(0);
  });

  it('should clamp delta duration', () => {
    expect(Time.clampDelta(50, 100, 0)).toBe(50);
    expect(Time.clampDelta(250, 100, 0)).toBe(100);
    expect(Time.clampDelta(-10, 100, 0)).toBe(0);
  });

  it('should compute smoothFps using exponential moving average', () => {
    // 60 * 0.9 + 30 * 0.1 = 54 + 3 = 57
    expect(Time.smoothFps(60, 30, 0.1)).toBeCloseTo(57);
  });

  it('should compute subSteps and remainder for fixed timestep', () => {
    // 50ms delta with 16ms fixed step -> 3 steps (48ms), 2ms remainder
    const { steps, remainder } = Time.subSteps(50, 16, 4);
    expect(steps).toBe(3);
    expect(remainder).toBeCloseTo(2);

    // Capped by maxSubSteps
    const capped = Time.subSteps(100, 16, 2);
    expect(capped.steps).toBe(2);
    expect(capped.remainder).toBeCloseTo(68);

    // Invalid step returns 0 steps
    const zeroStep = Time.subSteps(50, 0);
    expect(zeroStep.steps).toBe(0);
    expect(zeroStep.remainder).toBe(50);
  });

});
