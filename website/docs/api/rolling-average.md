# RollingAverage

Fixed-size circular buffer for $O(1)$ real-time rolling average calculations with zero runtime memory allocations.

<RollingAverageDemo />

```js
import { RollingAverage } from '@1pizzateam/spock';

// Create a window that tracks the last 60 samples
const fpsAverage = new RollingAverage(60);

function onFrame(deltaMs) {
  const instantFps = 1000 / deltaMs;
  // Push in O(1) time and read the smoothed average
  const smoothedFps = fpsAverage.push(instantFps);
  console.log(`Current FPS: ${Math.round(smoothedFps)}`);
}
```

---

## Why RollingAverage?

In animation loops, game physics, and user input tracking, raw signals frequently oscillate or suffer from intermittent spikes (e.g. garbage collection pauses or noisy sensors). A rolling (moving) average dampens jitter to yield a clean, legible value.

However, naive implementations in JavaScript suffer from severe performance drawbacks:

| Approach | Time Complexity | Memory / Garbage Collection | Startup Bias |
|---|---|---|---|
| **`Array.push()` + `Array.shift()`** | $O(N)$ per frame (array re-indexing) | Continuous heap allocations and GC spikes | Manual tracking needed |
| **Summing over an array every frame** | $O(N)$ per frame | Extra loop iterations every frame | Manual tracking needed |
| **Naive circular ring buffer** | $O(1)$ | Fixed memory, but divides by capacity from frame 1 | **Biased**: first 10 frames are artificially diluted by unused slots |
| **`RollingAverage` (Spock)** | **$O(1)$ constant time** | **Pre-allocated `Float64Array`, zero GC** | **Unbiased**: divides by actual sample count until full |

### How It Works

1. **Pre-allocated typed buffer**: `RollingAverage` allocates a single `Float64Array` of the requested capacity once at construction. It never resizes, shrinks, or allocates objects during execution.
2. **Incremental running sum**: When a new value arrives, `RollingAverage` subtracts the evicted value at the circular head pointer and adds the incoming value:
   $$\text{sum}_{\text{new}} = \text{sum}_{\text{old}} - \text{evicted} + \text{incoming}$$
   This arithmetic takes constant $O(1)$ time regardless of whether your window size is 10 or 10,000.
3. **No startup dilution**: During the warmup phase when fewer than `size` values have been pushed, `average` divides by the true active sample `count` rather than total capacity.

---

## When to Use: `RollingAverage` vs `NumArray.average()`

| Feature | `RollingAverage` | `NumArray.average()` |
|---|---|---|
| **Data type** | Streaming, continuous data (time series, FPS, physics) | Static batch collections (levels, high scores, static datasets) |
| **Execution** | Called repeatedly once per tick or frame | Called once on an existing array |
| **Complexity** | $O(1)$ per sample | $O(N)$ per array pass |
| **Allocation** | Pre-allocated static typed array | Operates on standard JS or typed arrays |
| **Windowing** | Automatic FIFO circular eviction | Requires manual array slicing |

---

## Constructor

Create a rolling average window with a maximum capacity (default: `60`).

```ts
new RollingAverage(size: number = 60)
```

### Parameters

- `size` — `number` (optional, default: `60`). The maximum number of samples held in the rolling window. Automatically clamped to at least `1`.

### Example

```js
import { RollingAverage } from '@1pizzateam/spock';

// Tracks a 30-sample window
const smooth = new RollingAverage(30);
```

---

## Properties

### size

```ts
get size(): number
```

The maximum capacity of the circular buffer.

### count

```ts
get count(): number
```

The number of samples currently stored in the window (ranges from `0` up to `size`).

### sum

```ts
get sum(): number
```

The exact cumulative sum of all active samples currently inside the window.

### average

```ts
get average(): number
```

The current arithmetic mean ($\text{sum} / \text{count}$), or `0` if empty. Calculated in $O(1)$ time without traversing the buffer.

```js
const roll = new RollingAverage(3);
roll.push(10);
console.log(roll.average); // 10 (count is 1, not divided by 3)

roll.push(20);
console.log(roll.average); // 15 (sum 30 / count 2)

roll.push(30);
console.log(roll.average); // 20 (sum 60 / count 3)

roll.push(40); // evicts 10
console.log(roll.average); // 30 (sum 90 / count 3)
```

---

## Methods

### push()

Append a new sample to the window in $O(1)$ time, evicting the oldest value if capacity is reached, and return the updated average.

```ts
push(value: number): number
```

#### Parameters

- `value` — `number`. The incoming data point.

#### Returns

- `number` — the updated running average ($\text{sum} / \text{count}$).

#### Example

```js
const roll = new RollingAverage(5);
const currentMean = roll.push(42.5);
```

---

### reset()

Clear the buffer, resetting `head`, `count`, `sum`, and all internal values to zero.

```ts
reset(): void
```

#### Example

```js
const roll = new RollingAverage(60);
roll.push(100);

roll.reset();
console.log(roll.count);   // 0
console.log(roll.average); // 0
```

---

## Common Use Cases

### 1. Jitter-Free FPS Display

Display a smooth frame rate in a rendering loop without oscillating frantically each frame:

```js
import { RollingAverage, Time } from '@1pizzateam/spock';

const fpsTracker = new RollingAverage(60);
let lastTime = Time.now();

function animate() {
  const now = Time.now();
  const delta = Time.clampDelta(now - lastTime, 100, 1);
  lastTime = now;

  const instantFps = 1000 / delta;
  const displayFps = fpsTracker.push(instantFps);

  fpsElement.textContent = `${Math.round(displayFps)} FPS`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

### 2. Damping Mouse / Touch Velocity

Smooth erratic pointer movements to prevent jerky camera controls or cursor inertia:

```js
import { RollingAverage } from '@1pizzateam/spock';

const speedX = new RollingAverage(10);
const speedY = new RollingAverage(10);

window.addEventListener('pointermove', (e) => {
  const smoothVx = speedX.push(e.movementX);
  const smoothVy = speedY.push(e.movementY);
  camera.pan(smoothVx * 0.1, smoothVy * 0.1);
});
```
