# Quadratic Bézier

Second-degree parametric curves defined by 3 control points ($P_0, P_1, P_2$).

<BezierDemo />

Quadratic curves are shaped by two endpoints ($P_0, P_2$) and a single pull handle ($P_1$). They are ideal for lightweight curved paths, smooth rounded corners, parabolic jumps, and simple motion trajectories.

Functions are provided both for **single scalar axes** via `Bezier` (useful for 1D tweening and easing) and for **2D vectors** directly on `Vec2`.

```js
import { Bezier, Vec2 } from '@1pizzateam/spock';

// 1D scalar evaluation
const y = Bezier.quadratic(0, 100, 0, 0.5); // 50

// 2D vector evaluation
const p0 = new Vec2(20, 200);
const p1 = new Vec2(160, 20);
const p2 = new Vec2(300, 200);

const point = new Vec2().quadraticBezier(p0, p1, p2, 0.5);
const tangent = new Vec2().quadraticBezierDerivative(p0, p1, p2, 0.5);
const length = new Vec2().quadraticBezierLength(p0, p1, p2);
```

---

## Evaluation: `Bezier.quadratic()`

Evaluates one axis of a quadratic curve at parameter $t \in [0, 1]$ using Bernstein basis polynomials:
$$B(t) = (1 - t)^2 P_0 + 2(1 - t)t P_1 + t^2 P_2$$

The curve touches the endpoints $P_0$ (at $t = 0$) and $P_2$ (at $t = 1$), but generally does not pass through the control point $P_1$.

```ts
Bezier.quadratic(p0: number, p1: number, p2: number, t: number): number
```

### Parameters

- `p0` — `number`. Start point coordinate ($t = 0$).
- `p1` — `number`. Control handle coordinate.
- `p2` — `number`. End point coordinate ($t = 1$).
- `t` — `number`. Curve progression parameter, typically between `0` and `1`.

### Returns

`number` — the interpolated value at $t$.

### 2D Vector Equivalent

```ts
vec.quadraticBezier(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2
```

---

## Tangent & Derivative: `Bezier.quadraticDerivative()`

Calculates the first derivative vector/rate of change with respect to $t$:
$$B'(t) = 2(1 - t)(P_1 - P_0) + 2t(P_2 - P_1)$$

The derivative vector is tangent to the curve at $t$. Its direction gives the orientation of motion, and its magnitude represents velocity.

```ts
Bezier.quadraticDerivative(p0: number, p1: number, p2: number, t: number): number
```

### Parameters

- `p0`, `p1`, `p2` — `number`. Control point coordinates.
- `t` — `number`. Parameter value.

### Returns

`number` — the instantaneous derivative at $t$.

### 2D Vector Equivalent

```ts
vec.quadraticBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2
```

---

## Curve Splitting: `Bezier.quadraticSplit()`

Subdivides a quadratic curve at parameter $t$ into two separate quadratic sub-curves using de Casteljau's algorithm.

The two resulting curves together match the original curve with mathematical precision, making this ideal for progressive drawing, collision clipping, and adaptive LOD.

```ts
Bezier.quadraticSplit(
  p0: number,
  p1: number,
  p2: number,
  t: number,
  left: number[],
  right: number[]
): void
```

### Parameters

- `p0`, `p1`, `p2` — `number`. Original control coordinates.
- `t` — `number`. Split parameter ($0 \le t \le 1$).
- `left` — `number[]`. Target array filled with the 3 control points of the left curve $[P_{0L}, P_{1L}, P_{2L}]$.
- `right` — `number[]`. Target array filled with the 3 control points of the right curve $[P_{0R}, P_{1R}, P_{2R}]$.

### 2D Vector Equivalent

```ts
vec.splitQuadraticBezier(
  p0: Vec2,
  p1: Vec2,
  p2: Vec2,
  t: number,
  left: [Vec2, Vec2, Vec2],
  right: [Vec2, Vec2, Vec2]
): void
```

---

## Arc Length: `Bezier.quadraticLength()`

Approximates the physical arc length of the quadratic curve by accumulating linear chords over $N$ polyline subdivisions.

```ts
Bezier.quadraticLength(p0: number, p1: number, p2: number, samples?: number): number
```

### Parameters

- `p0`, `p1`, `p2` — `number`. Control point coordinates.
- `samples` — `number` (optional, default: `16`). Number of chord segments used to sample the curve. Higher values increase accuracy.

### Returns

`number` — total approximate arc length.

### 2D Vector Equivalent

```ts
vec.quadraticBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, samples?: number): number
```

---

## Arc Length Parameterization: `Bezier.quadraticParameterAtLength()`

Finds the parameter $t \in [0, 1]$ corresponding to a specific physical travel distance along the curve.

Because Bézier curves do not progress at uniform velocity relative to $t$, moving an object with linear increments of $t$ causes speed variations. Using `quadraticParameterAtLength` ensures an object traverses the curve at a true constant physical speed.

```ts
Bezier.quadraticParameterAtLength(
  p0: number,
  p1: number,
  p2: number,
  distance: number,
  samples?: number
): number
```

### Parameters

- `p0`, `p1`, `p2` — `number`. Control point coordinates.
- `distance` — `number`. Target distance along the curve from the start point.
- `samples` — `number` (optional, default: `16`). Chord sampling resolution.

### Returns

`number` — the parameter $t \in [0, 1]$ where accumulated arc length equals `distance`.

### 2D Vector Equivalent

```ts
vec.quadraticBezierParameterAtLength(
  p0: Vec2,
  p1: Vec2,
  p2: Vec2,
  distance: number,
  samples?: number
): number
```
