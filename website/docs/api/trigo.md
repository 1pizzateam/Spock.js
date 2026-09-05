# Trigo

Angle constants, conversions, and wave equations, with both fast and precise sine and cosine.

`sine()` and `cosine()` read from a 16k-entry lookup table: fast enough to call per particle per frame, and accurate enough for motion. When you need full precision, such as building a matrix or a quaternion, use `sinePrecise()` and `cosinePrecise()`, which call `Math.sin` and `Math.cos` directly.

The constants `pi`, `twopi`, and `halfpi` save recomputing them, `degreeToRadian()` and `radianToDegree()` convert, and `normalizeRadian()` wraps an angle into (-π, π]. The `*Equation` helpers evaluate `amplitude * f(period + shiftX) + shiftY` in one call, which is the shape most oscillations take.

```js
import { Trigo } from '@1pizzateam/spockjs';

const angle = Trigo.degreeToRadian(45);
const wrapped = Trigo.normalizeRadian(angle + Trigo.twopi);

// 20 pixels of vertical wobble around y = 100
const y = Trigo.sineEquation(20, performance.now() * 0.002, 0, 100);
```

## Trigo.degreeToRadian()

Degrees to radians.

Multiplies by π/180. Every angle in this library is in radians, so this is the conversion to do at the edge of degree-based input.

```ts
degreeToRadian(degree: number): number
```

### Parameters

- `degree` — `number`.

### Returns

`number` — the radian

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.degreeToRadian(1);
```

## Trigo.radianToDegree()

Radians to degrees.

Converts back to degrees, mostly for display.

```ts
radianToDegree(radian: number): number
```

### Parameters

- `radian` — `number`.

### Returns

`number` — the degree

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.radianToDegree(Math.PI / 4);
```

## Trigo.normalizeRadian()

Wrap radians into (-π, π].

Wraps any angle into (-π, π]. Do this before comparing or interpolating angles, otherwise a value just past π looks far from one just below it when the two are neighbours.

```ts
normalizeRadian(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the radian

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.normalizeRadian(Math.PI / 4);
```

## Trigo.sine()

Fast sine of angle in radians.

Reads from a 16384-entry lookup table instead of calling `Math.sin`. Fast enough to run per particle per frame, and accurate enough for motion; use `sinePrecise()` when the small error would accumulate.

```ts
sine(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the sine of the angle

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.sine(Math.PI / 4);
```

## Trigo.cosine()

Fast cosine of angle in radians.

Lookup-table cosine, with the same trade-off as `sine()`.

```ts
cosine(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the cosine of the angle

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.cosine(Math.PI / 4);
```

## Trigo.arctan()

Arctangent of angle (Math.atan).

Delegates to `Math.atan`, returning an angle in (-π/2, π/2).

```ts
arctan(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the arctan of the angle

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.arctan(Math.PI / 4);
```

## Trigo.arctan2()

atan2(y, x), or false at the origin.

Delegates to `Math.atan2(y, x)` for a full-circle angle, but returns `false` at the origin where the angle is undefined. Note the y-then-x argument order.

```ts
arctan2(y: number, x: number): number | false
```

### Parameters

- `y` — `number`.
- `x` — `number`.

### Returns

`number | false` — the arctan2 of the angle or false

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.arctan2(1, 1);
```

## Trigo.sinePrecise()

Precise sine (Math.sin).

Calls `Math.sin` directly, for the cases where lookup-table error matters, such as building matrices and quaternions.

```ts
sinePrecise(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number`

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.sinePrecise(Math.PI / 4);
```

## Trigo.cosinePrecise()

Precise cosine (Math.cos).

Calls `Math.cos` directly.

```ts
cosinePrecise(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number`

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.cosinePrecise(Math.PI / 4);
```

## Trigo.sineEquation()

amplitude * sin(period + shiftX) + shiftY.

Evaluates `amplitude * sin(period + shiftX) + shiftY` in one call: amplitude is the swing, `shiftX` the phase offset, `shiftY` the centre line. It uses the fast lookup-table sine.

```ts
sineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number
```

### Parameters

- `amplitude` — `number`.
- `period` — `number`.
- `shiftX` — `number`.
- `shiftY` — `number`.

### Returns

`number` — the result of the equation

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.sineEquation(1, 1, 1, 1);
```

## Trigo.cosineEquation()

amplitude * cos(period + shiftX) + shiftY.

The same wave equation as `sineEquation()`, a quarter turn ahead.

```ts
cosineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number
```

### Parameters

- `amplitude` — `number`.
- `period` — `number`.
- `shiftX` — `number`.
- `shiftY` — `number`.

### Returns

`number` — the result of the equation

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.cosineEquation(1, 1, 1, 1);
```

## Trigo.arctanEquation()

amplitude * atan(period + shiftX) + shiftY.

Evaluates `amplitude * atan(period + shiftX) + shiftY`, an S-shaped curve that flattens out at both ends.

```ts
arctanEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number
```

### Parameters

- `amplitude` — `number`.
- `period` — `number`.
- `shiftX` — `number`.
- `shiftY` — `number`.

### Returns

`number` — the result of the equation

### Example

```js
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.arctanEquation(1, 1, 1, 1);
```

