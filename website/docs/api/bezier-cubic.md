# Cubic Bézier

Third-degree parametric curves defined by 4 control points ($P_0, P_1, P_2, P_3$).

<CubicBezierDemo />

Cubic Bézier curves provide two independent internal control points ($P_1, P_2$) between the endpoints ($P_0, P_3$). They can create inflection points (S-curves), smooth complex motion, and form the mathematical foundation of SVG `<path>` curves and CSS easing functions (such as `cubic-bezier(x1, y1, x2, y2)`).

Methods are available for both **1D scalar axes** via `Bezier` and **2D vectors** on `Vec2`.

```js
import { Bezier, Vec2 } from '@1pizzateam/spock';

// 1D scalar evaluation
const y = Bezier.cubic(0, 30, 70, 100, 0.5); // 50

// 2D vector evaluation
const p0 = new Vec2(20, 220);
const p1 = new Vec2(90, 40);
const p2 = new Vec2(240, 60);
const p3 = new Vec2(320, 220);

const point = new Vec2().cubicBezier(p0, p1, p2, p3, 0.5);
const tangent = new Vec2().cubicBezierDerivative(p0, p1, p2, p3, 0.5);
const length = new Vec2().cubicBezierLength(p0, p1, p2, p3);

// Parameter t at exact half-distance (not t = 0.5)
const tMid = new Vec2().cubicBezierParameterAtLength(p0, p1, p2, p3, length * 0.5);
const midpoint = new Vec2().cubicBezier(p0, p1, p2, p3, tMid);
```

---

## Evaluation: `Bezier.cubic()`

Evaluates one axis of a cubic curve at parameter $t \in [0, 1]$:
$$B(t) = (1 - t)^3 P_0 + 3(1 - t)^2 t P_1 + 3(1 - t)t^2 P_2 + t^3 P_3$$

The curve begins at $P_0$ when $t = 0$ and ends at $P_3$ when $t = 1$. The interior points $P_1$ and $P_2$ act as directional anchors and pulling forces.

```ts
Bezier.cubic(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number
```

### Parameters

- `p0` — `number`. Start coordinate ($t = 0$).
- `p1` — `number`. First control handle.
- `p2` — `number`. Second control handle.
- `p3` — `number`. End coordinate ($t = 1$).
- `t` — `number`. Parameter between `0` and `1`.

### Returns

`number` — the evaluated coordinate at $t$.

### 2D Vector Equivalent

```ts
vec.cubicBezier(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2
```

---

## Tangent & Derivative: `Bezier.cubicDerivative()`

Calculates the first derivative vector/velocity of the cubic curve at $t$:
$$B'(t) = 3(1 - t)^2(P_1 - P_0) + 6(1 - t)t(P_2 - P_1) + 3t^2(P_3 - P_2)$$

The derivative vector provides the tangent vector along the curve, which determines orientation and forward-facing velocity in path followers.

```ts
Bezier.cubicDerivative(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number
```

### Parameters

- `p0`, `p1`, `p2`, `p3` — `number`. Control coordinates.
- `t` — `number`. Parameter value.

### Returns

`number` — the first derivative value at $t$.

### 2D Vector Equivalent

```ts
vec.cubicBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2
```

---

## Curve Splitting: `Bezier.cubicSplit()`

Subdivides a cubic curve at parameter $t$ into two separate cubic curves using de Casteljau subdivision.

Each sub-curve has 4 control points. Combined, they reproduce the entire trajectory with zero distortion.

```ts
Bezier.cubicSplit(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number,
  left: number[],
  right: number[]
): void
```

### Parameters

- `p0`, `p1`, `p2`, `p3` — `number`. Original cubic control coordinates.
- `t` — `number`. Split point ($0 \le t \le 1$).
- `left` — `number[]`. Target array filled with the 4 control coordinates $[P_{0L}, P_{1L}, P_{2L}, P_{3L}]$.
- `right` — `number[]`. Target array filled with the 4 control coordinates $[P_{0R}, P_{1R}, P_{2R}, P_{3R}]$.

### 2D Vector Equivalent

```ts
vec.splitCubicBezier(
  p0: Vec2,
  p1: Vec2,
  p2: Vec2,
  p3: Vec2,
  t: number,
  left: [Vec2, Vec2, Vec2, Vec2],
  right: [Vec2, Vec2, Vec2, Vec2]
): void
```

---

## Arc Length: `Bezier.cubicLength()`

Approximates the physical curve length using $N$ piecewise linear chord samples.

Because cubic arc length has no closed-form algebraic formula, numeric chord summation provides a fast, controllable approximation.

```ts
Bezier.cubicLength(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  samples?: number
): number
```

### Parameters

- `p0`, `p1`, `p2`, `p3` — `number`. Control coordinates.
- `samples` — `number` (optional, default: `16`). Sampling resolution.

### Returns

`number` — approximate total arc length.

### 2D Vector Equivalent

```ts
vec.cubicBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, samples?: number): number
```

---

## Arc Length Parameterization: `Bezier.cubicParameterAtLength()`

Computes the parameter $t \in [0, 1]$ where the curve's accumulated distance equals `distance`.

Essential for animating sprites, cameras, and projectiles at constant world-space speed along an S-curve, avoiding velocity warping caused by uneven parameter distribution.

```ts
Bezier.cubicParameterAtLength(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  distance: number,
  samples?: number
): number
```

### Parameters

- `p0`, `p1`, `p2`, `p3` — `number`. Control coordinates.
- `distance` — `number`. Target physical distance from the start point.
- `samples` — `number` (optional, default: `16`). Chord sampling resolution.

### Returns

`number` — the parameter $t$ where sampled distance reaches `distance`.

### 2D Vector Equivalent

```ts
vec.cubicBezierParameterAtLength(
  p0: Vec2,
  p1: Vec2,
  p2: Vec2,
  p3: Vec2,
  distance: number,
  samples?: number
): number
```
