# Bezier

Import with `import { Bezier } from '@1pizzateam/spockjs';`.

## Bezier.quadratic()

Quadratic Bézier at t.

```ts
quadratic(p0: number, p1: number, p2: number, t: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `t` — `number`.

### Returns

`number` — the result

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.quadratic(1, 1, 1, 0.5);
```

## Bezier.cubic()

Cubic Bézier at t.

```ts
cubic(p0: number, p1: number, p2: number, p3: number, t: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `p3` — `number`.
- `t` — `number`.

### Returns

`number` — the result

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.cubic(1, 1, 1, 1, 0.5);
```

## Bezier.quadraticDerivative()

First derivative of a quadratic Bézier at t.

```ts
quadraticDerivative(p0: number, p1: number, p2: number, t: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `t` — `number`.

### Returns

`number`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.quadraticDerivative(1, 1, 1, 0.5);
```

## Bezier.cubicDerivative()

First derivative of a cubic Bézier at t.

```ts
cubicDerivative(p0: number, p1: number, p2: number, p3: number, t: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `p3` — `number`.
- `t` — `number`.

### Returns

`number`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.cubicDerivative(1, 1, 1, 1, 0.5);
```

## Bezier.quadraticSplit()

Split a quadratic at t into left and right control polygons.

```ts
quadraticSplit(p0: number, p1: number, p2: number, t: number, left: number[], right: number[]): void
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `t` — `number`.
- `left` — `number[]`.
- `right` — `number[]`.

### Returns

`void`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.quadraticSplit(1, 1, 1, 0.5, [1, 2, 3], [1, 2, 3]);
```

## Bezier.cubicSplit()

Split a cubic at t into left and right control polygons.

```ts
cubicSplit(p0: number, p1: number, p2: number, p3: number, t: number, left: number[], right: number[]): void
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `p3` — `number`.
- `t` — `number`.
- `left` — `number[]`.
- `right` — `number[]`.

### Returns

`void`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.cubicSplit(1, 1, 1, 1, 0.5, [1, 2, 3], [1, 2, 3]);
```

## Bezier.quadraticLength()

Sampled arc length of a 1D quadratic.

```ts
quadraticLength(p0: number, p1: number, p2: number, samples?: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.quadraticLength(1, 1, 1, 16);
```

## Bezier.cubicLength()

Sampled arc length of a 1D cubic.

```ts
cubicLength(p0: number, p1: number, p2: number, p3: number, samples?: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `p3` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.cubicLength(1, 1, 1, 1, 16);
```

## Bezier.quadraticParameterAtLength()

Parameter t at the given 1D quadratic arc length.

```ts
quadraticParameterAtLength(p0: number, p1: number, p2: number, distance: number, samples?: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.quadraticParameterAtLength(1, 1, 1, 10, 16);
```

## Bezier.cubicParameterAtLength()

Parameter t at the given 1D cubic arc length.

```ts
cubicParameterAtLength(p0: number, p1: number, p2: number, p3: number, distance: number, samples?: number): number
```

### Parameters

- `p0` — `number`.
- `p1` — `number`.
- `p2` — `number`.
- `p3` — `number`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Bezier } from '@1pizzateam/spockjs';


const result = Bezier.cubicParameterAtLength(1, 1, 1, 1, 10, 16);
```

