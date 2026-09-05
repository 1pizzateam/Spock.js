# Utils

Scalar helpers that sit between `Math` and your own code: rounding, mixing, clamping, and range tests.

`clamp()`, `lerp()`, `mix()`, `normalize()`, and `map()` are the interpolation set. `normalize()` takes a value from a range into 0–1, `map()` moves it from one range straight into another, and `lerp()` and `mix()` blend two values, differing only in argument order.

The rounding group — `round()`, `floor()`, `ceil()`, and `trunc()` — takes a decimal count, so you can snap to two decimals without the usual multiply-and-divide dance. `roundToNearest()` snaps to an arbitrary step instead. `isIn()` and `isOut()` are readable range tests.

```js
import { Utils } from '@1pizzateam/spockjs';

const opacity = Utils.clamp(1.25, 0, 1);       // 1
const eased = Utils.lerp(0, 100, 0.25);        // 25
const gauge = Utils.map(72, 0, 120, 0, 360);   // 216
const snapped = Utils.roundToNearest(147, 25); // 150
```

## Utils.round()

Round x to the given number of decimals.

Rounds to a number of decimal places rather than to a whole number. Negative decimals round to tens, hundreds, and so on.

```ts
round(x: number, decimals: number): number
```

### Parameters

- `x` — `number`.
- `decimals` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.round(1, 1);
```

## Utils.floor()

Floor x to the given number of decimals.

Rounds down to a number of decimal places.

```ts
floor(x: number, decimals: number): number
```

### Parameters

- `x` — `number`.
- `decimals` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.floor(1, 1);
```

## Utils.ceil()

Ceil x to the given number of decimals.

Rounds up to a number of decimal places.

```ts
ceil(x: number, decimals: number): number
```

### Parameters

- `x` — `number`.
- `decimals` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.ceil(1, 1);
```

## Utils.trunc()

Truncate x to the given number of decimals.

Drops the extra decimals without rounding, so it always moves toward zero regardless of sign.

```ts
trunc(x: number, decimals: number): number
```

### Parameters

- `x` — `number`.
- `decimals` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.trunc(1, 1);
```

## Utils.roundToNearest()

Round x to the nearest multiple of nearest.

Snaps to the closest multiple of a step, which is what grid snapping and quantized sliders need.

```ts
roundToNearest(x: number, nearest: number): number
```

### Parameters

- `x` — `number`.
- `nearest` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.roundToNearest(1, 1);
```

## Utils.mix()

Mix x and y by ratio (0 = x, 1 = y).

Blends `x` and `y`, where a ratio of 0 gives `x` and 1 gives `y`. Same maths as `lerp()`, with the arguments in a different order.

```ts
mix(x: number, y: number, ratio: number): number
```

### Parameters

- `x` — `number`.
- `y` — `number`.
- `ratio` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.mix(1, 1, 0.5);
```

## Utils.getSign()

Sign of x: -1, 0, 1, or NaN.

Matches `Math.sign`, returning -1, 0, 1, or `NaN`.

```ts
getSign(x: number): number
```

### Parameters

- `x` — `number`.

### Returns

`number` — the sign

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.getSign(1);
```

## Utils.opposite()

Negate x.

Negates the number.

```ts
opposite(x: number): number
```

### Parameters

- `x` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.opposite(1);
```

## Utils.clamp()

Clamp x to [min, max].

Confines a value to a range. This is the guard to reach for before indexing an array or setting an opacity.

```ts
clamp(x: number, min: number, max: number): number
```

### Parameters

- `x` — `number`.
- `min` — `number`.
- `max` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.clamp(1, 1, 1);
```

## Utils.normalize()

Map x from [min, max] into [0, 1].

Maps a value from a range onto 0–1, the inverse of `lerp()`. A value outside the range comes back outside 0–1.

```ts
normalize(x: number, min: number, max: number): number
```

### Parameters

- `x` — `number`.
- `min` — `number`.
- `max` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.normalize(1, 1, 1);
```

## Utils.lerp()

Linear interpolate from min to max by amount.

Interpolates from `min` to `max` by `amount`. It is not clamped, so amounts beyond 0–1 extrapolate past the ends.

```ts
lerp(min: number, max: number, amount: number): number
```

### Parameters

- `min` — `number`.
- `max` — `number`.
- `amount` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.lerp(1, 1, 0.5);
```

## Utils.map()

Map x from [sourceMin, sourceMax] into [destMin, destMax].

Moves a value from one range straight into another: `normalize()` followed by `lerp()`. This is the one-liner for turning data into pixels, degrees, or colour channels.

```ts
map(x: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number
```

### Parameters

- `x` — `number`.
- `sourceMin` — `number`.
- `sourceMax` — `number`.
- `destMin` — `number`.
- `destMax` — `number`.

### Returns

`number` — the result

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.map(1, 1, 1, 1, 1);
```

## Utils.isIn()

True if x is inside [min, max].

Inclusive range test, easier to read at a glance than two comparisons.

```ts
isIn(x: number, min: number, max: number): boolean
```

### Parameters

- `x` — `number`.
- `min` — `number`.
- `max` — `number`.

### Returns

`boolean` — the result of the test

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.isIn(1, 1, 1);
```

## Utils.isOut()

True if x is outside [min, max].

The negation of `isIn()`, for guard clauses that bail out early.

```ts
isOut(x: number, min: number, max: number): boolean
```

### Parameters

- `x` — `number`.
- `min` — `number`.
- `max` — `number`.

### Returns

`boolean` — the result of the test

### Example

```js
import { Utils } from '@1pizzateam/spockjs';


const result = Utils.isOut(1, 1, 1);
```

