# Trigonometry

Import with `import { Trigonometry } from '@1pizzateam/spockjs';`.

## Trigonometry.degreeToRadian()

Degrees to radians.

```ts
degreeToRadian(degree: number): number
```

### Parameters

- `degree` — `number`.

### Returns

`number` — the radian

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.degreeToRadian(1);
```

## Trigonometry.radianToDegree()

Radians to degrees.

```ts
radianToDegree(radian: number): number
```

### Parameters

- `radian` — `number`.

### Returns

`number` — the degree

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.radianToDegree(Math.PI / 4);
```

## Trigonometry.normalizeRadian()

Wrap radians into (-π, π].

```ts
normalizeRadian(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the radian

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.normalizeRadian(Math.PI / 4);
```

## Trigonometry.sine()

Fast sine of angle in radians.

```ts
sine(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the sine of the angle

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.sine(Math.PI / 4);
```

## Trigonometry.cosine()

Fast cosine of angle in radians.

```ts
cosine(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the cosine of the angle

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.cosine(Math.PI / 4);
```

## Trigonometry.arctan()

Arctangent of angle (Math.atan).

```ts
arctan(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number` — the arctan of the angle

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.arctan(Math.PI / 4);
```

## Trigonometry.arctan2()

atan2(y, x), or false at the origin.

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
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.arctan2(1, 1);
```

## Trigonometry.sinePrecise()

Precise sine (Math.sin).

```ts
sinePrecise(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number`

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.sinePrecise(Math.PI / 4);
```

## Trigonometry.cosinePrecise()

Precise cosine (Math.cos).

```ts
cosinePrecise(angle: number): number
```

### Parameters

- `angle` — `number`.

### Returns

`number`

### Example

```js
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.cosinePrecise(Math.PI / 4);
```

## Trigonometry.sineEquation()

amplitude * sin(period + shiftX) + shiftY.

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
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.sineEquation(1, 1, 1, 1);
```

## Trigonometry.cosineEquation()

amplitude * cos(period + shiftX) + shiftY.

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
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.cosineEquation(1, 1, 1, 1);
```

## Trigonometry.arctanEquation()

amplitude * atan(period + shiftX) + shiftY.

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
import { Trigonometry } from '@1pizzateam/spockjs';


const result = Trigonometry.arctanEquation(1, 1, 1, 1);
```

