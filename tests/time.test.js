import { Time, Accumulator } from '../build/es6/time.js';

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

    // Reusable target
    const target = { steps: 0, remainder: 0 };
    Time.subSteps(50, 16, 4, target);
    expect(target.steps).toBe(3);
    expect(target.remainder).toBeCloseTo(2);

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

describe('Accumulator', () => {

  it('should step with fixed timestep and compute alpha', () => {
    const fixedStep = 1 / 60;
    const acc = new Accumulator(fixedStep, 5);
    let ticks = 0;

    // Advance by half a step: 0 ticks, alpha ~ 0.5
    const steps1 = acc.step(0.5 * fixedStep, () => ticks++);
    expect(steps1).toBe(0);
    expect(ticks).toBe(0);
    expect(acc.alpha).toBeCloseTo(0.5);

    // Advance by another step: 1 tick, alpha ~ 0.5
    const steps2 = acc.step(fixedStep, () => ticks++);
    expect(steps2).toBe(1);
    expect(ticks).toBe(1);
    expect(acc.alpha).toBeCloseTo(0.5);

    // Negative or 0 delta does nothing
    expect(acc.step(0, () => ticks++)).toBe(0);
    expect(acc.step(-1, () => ticks++)).toBe(0);

    // Cap at maxSubSteps
    acc.reset();
    expect(acc.value).toBe(0);
    expect(acc.alpha).toBe(0);
    const stepsCapped = acc.step(10 * fixedStep, () => ticks++);
    expect(stepsCapped).toBe(5);
  });

});
