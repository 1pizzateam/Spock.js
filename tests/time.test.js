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

});
