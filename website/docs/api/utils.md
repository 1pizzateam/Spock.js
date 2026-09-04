# Utils

Import with `import { Utils } from '@1pizzateam/spockjs';`.

## Utils.round()

Round x to the given number of decimals.

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

