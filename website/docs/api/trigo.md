# Trigo

Import with `import { Trigo } from '@1pizzateam/spockjs';`.

## Trigo.degreeToRadian()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.degreeToRadian(1);
```

## Trigo.radianToDegree()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.radianToDegree(Math.PI / 4);
```

## Trigo.normalizeRadian()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.normalizeRadian(Math.PI / 4);
```

## Trigo.sine()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.sine(Math.PI / 4);
```

## Trigo.cosine()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.cosine(Math.PI / 4);
```

## Trigo.arctan()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.arctan(Math.PI / 4);
```

## Trigo.arctan2()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.arctan2(1, 1);
```

## Trigo.sinePrecise()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.sinePrecise(Math.PI / 4);
```

## Trigo.cosinePrecise()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.cosinePrecise(Math.PI / 4);
```

## Trigo.sineEquation()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.sineEquation(1, 1, 1, 1);
```

## Trigo.cosineEquation()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.cosineEquation(1, 1, 1, 1);
```

## Trigo.arctanEquation()

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
import { Trigo } from '@1pizzateam/spockjs';


const result = Trigo.arctanEquation(1, 1, 1, 1);
```

