# Time

Conversions between milliseconds, seconds, and frame rates.

Four one-line conversions that keep the ×1000 and 1000÷ constants out of animation code. `millisecToSec()` and `secToMillisec()` handle units; `fpsToMillisec()` and `millisecToFps()` translate between a frame rate and a frame budget.

The common use is turning a target rate into the duration you compare against elapsed time, so the constant reads as a rate instead of an unexplained decimal.

```js
import { Time } from '@1pizzateam/spockjs';

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
import { Time } from '@1pizzateam/spockjs';


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
import { Time } from '@1pizzateam/spockjs';


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
import { Time } from '@1pizzateam/spockjs';


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
import { Time } from '@1pizzateam/spockjs';


const result = Time.fpsToMillisec(1);
```

