# Time

Conversions between milliseconds, seconds, and frame rates.

<TimeDemo />

Four one-line conversions that keep the ×1000 and 1000÷ constants out of animation code. `millisecToSec()` and `secToMillisec()` handle units; `fpsToMillisec()` and `millisecToFps()` translate between a frame rate and a frame budget.

The common use is turning a target rate into the duration you compare against elapsed time, so the constant reads as a rate instead of an unexplained decimal.

```js
import { Time } from '@1pizzateam/spock';

const frameBudget = Time.fpsToMillisec(60); // 16.67 ms
const actualFps = Time.millisecToFps(20);   // 50

// "three steps a second", in seconds
const stepDuration = Time.millisecToSec(Time.fpsToMillisec(3));
```

## Time.millisecToSec()

Milliseconds to seconds.

Divides by 1000. Browser timestamps arrive in milliseconds while animation maths usually runs in seconds.

```ts
millisecToSec(millisecond: number): number
```

### Parameters

- `millisecond` — `number`.

### Returns

`number` — the time in second

### Example

```js
import { Time } from '@1pizzateam/spock';


const result = Time.millisecToSec(1);
```

## Time.secToMillisec()

Seconds to milliseconds.

Multiplies by 1000, for APIs such as `setTimeout` that expect milliseconds.

```ts
secToMillisec(second: number): number
```

### Parameters

- `second` — `number`.

### Returns

`number` — the time in milliseconds

### Example

```js
import { Time } from '@1pizzateam/spock';


const result = Time.secToMillisec(1);
```

## Time.millisecToFps()

Frame duration in ms to frames per second.

Turns a frame duration into a rate, which is how a measured frame time becomes a readable FPS number.

```ts
millisecToFps(millisecond: number): number
```

### Parameters

- `millisecond` — `number`. the time in frame to second

### Returns

`number`

### Example

```js
import { Time } from '@1pizzateam/spock';


const result = Time.millisecToFps(1);
```

## Time.fpsToMillisec()

Frames per second to frame duration in ms.

Turns a target rate into the milliseconds each frame gets: the budget you compare elapsed time against when capping a loop.

```ts
fpsToMillisec(refreshRate: number): number
```

### Parameters

- `refreshRate` — `number`.

### Returns

`number` — the time in millisecond

### Example

```js
import { Time } from '@1pizzateam/spock';


const result = Time.fpsToMillisec(1);
```

## Time.now()

High-resolution monotonic timestamp in milliseconds across environments.

Uses `performance.now()` when available with a fallback to `Date.now()`.

```ts
now(): number
```

### Returns

`number` — monotonic millisecond timestamp

### Example

```js
import { Time } from '@1pizzateam/spock';

const start = Time.now();
```

## Time.clampDelta()

Clamp frame delta duration in milliseconds to prevent simulation instability.

Protects animation and physics updates against massive lag spikes or tab switching.

```ts
clampDelta(delta: number, maxMs?: number, minMs?: number): number
```

### Parameters

- `delta` — `number`. Frame duration in milliseconds.
- `maxMs` — `number`. Maximum allowed duration in ms (default: `100`).
- `minMs` — `number`. Minimum allowed duration in ms (default: `0`).

### Returns

`number` — the clamped delta in milliseconds

## Time.smoothFps()

Exponential moving average for smooth instantaneous FPS updates.

Provides zero-allocation, instantaneous framerate smoothing without needing ring buffers.

```ts
smoothFps(currentFps: number, instantFps: number, alpha?: number): number
```

### Parameters

- `currentFps` — `number`. Current smoothed FPS.
- `instantFps` — `number`. Measured FPS of the latest frame.
- `alpha` — `number`. Smoothing weight factor between 0 and 1 (default: `0.05`).

### Returns

`number` — updated smoothed FPS

## Time.subSteps()

Compute fixed-timestep simulation sub-steps and accumulator remainder.

Facilitates deterministic, fixed-timestep game loops and physics accumulators.

```ts
subSteps(delta: number, fixedStep: number, maxSubSteps?: number): { steps: number; remainder: number }
```

### Parameters

- `delta` — `number`. Elapsed duration in milliseconds.
- `fixedStep` — `number`. Fixed step duration in milliseconds (e.g. `16.666`).
- `maxSubSteps` — `number`. Maximum sub-steps permitted (default: `4`).

### Returns

`{ steps: number, remainder: number }`


