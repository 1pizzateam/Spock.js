# Bezier

Quadratic and cubic Bézier evaluation on a single scalar axis.

Every function takes plain numbers, so you call it once per axis. That keeps it useful for animation curves and easing, where the thing being interpolated is one value rather than a point. For curves in space, `Vec2` and `Vec3` carry the same operations and handle the axes for you.

Alongside evaluation there are first derivatives, which give the tangent and so the direction of travel, de Casteljau splits that cut a curve at `t` into two control polygons, and sampled `*Length()` and `*ParameterAtLength()` for walking a curve at constant speed.

```js
import { Bezier } from '@1pizzateam/spockjs';

const x = Bezier.cubic(0, 30, 70, 100, 0.5);
const slope = Bezier.cubicDerivative(0, 30, 70, 100, 0.5);

// halfway along the curve by distance, not by t
const t = Bezier.cubicParameterAtLength(0, 30, 70, 100, 50);
```

## Bezier.quadratic()

Quadratic Bézier at t.

Evaluates one axis of a quadratic curve at `t`, from `p0` at 0 to `p2` at 1. The curve touches the endpoints but generally not the control point `p1`.

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

Evaluates one axis of a cubic curve at `t`. The two middle controls pull the curve without lying on it, which is the shape behind CSS easing.

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

The rate of change at `t`. Its sign gives the direction of travel and its magnitude the speed, which is why even steps in `t` do not cover even distances.

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

The rate of change of the cubic at `t`.

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

de Casteljau subdivision: fills `left` and `right` with the control points of two curves that together trace the original exactly.

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

Cuts a cubic at `t` into two cubics that together match the original.

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

Approximates arc length by sampling and summing straight segments. Bézier arc length has no closed form, so accuracy is traded against `samples`.

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

Sampled arc length of the cubic, on the same trade-off.

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

Finds the `t` at a given distance along the curve, which is what constant-speed travel needs, since stepping `t` evenly does not.

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

Finds the `t` at a given distance along the cubic.

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

