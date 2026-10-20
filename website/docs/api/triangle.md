# RightTriangle

An axis-aligned right triangle occupying one corner (`'nw' | 'ne' | 'sw' | 'se'`) of its bounding [`Rect`](./rect), with cached outward hypotenuse normal, unit tangent, and grid occupancy.

<TriangleDemo />

`RightTriangle` extends [`Rect`](./rect): its two legs lie along two sides of the bounding box meeting at the $90^\circ$ corner (`corner`), while the hypotenuse runs through the rectangle's `position` center with outward unit normal `hypNormal` pointing into the open half of the box.

Moving or resizing the triangle automatically refreshes `topLeftCorner`, `bottomRightCorner`, `hypNormal`, `hypTangent`, `hypLength`, and any attached [`Grid`](./grid) occupancy cells.

```js
import { Circ, RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');

tri.isIn(new Vec2(16, 16));                          // true (solid NW half)
tri.isIn(new Vec2(48, 48));                          // false (open SE half)
tri.overlapsCircle(new Circ(12, new Vec2(36, 36)));  // true
```

## Constructor

Create a right triangle of `size` centered at `position` with its right-angle corner at `corner` (`'nw'`, `'ne'`, `'sw'`, or `'se'`).

```ts
new RightTriangle(size: Vec2, position?: Vec2, corner?: TriangleCorner)
```

### Parameters

- `size` — `Vec2`. Width and height of the bounding rectangle.
- `position` — `Vec2` *(optional)*. Center of the bounding rectangle. Defaults to `(0, 0)`.
- `corner` — `'nw' | 'ne' | 'sw' | 'se'` *(optional)*. Which corner holds the $90^\circ$ right angle. Defaults to `'nw'`.

### Properties

- `shape` — `'triangle-nw' | 'triangle-ne' | 'triangle-sw' | 'triangle-se'`.
- `corner` — `'nw' | 'ne' | 'sw' | 'se'`.
- `sx`, `sy` — `-1 | 1` signs pointing from center toward the right-angle corner.
- `hypNormal` — `Vec2`. Outward unit normal of the hypotenuse (pointing into the open half of the bounding box).
- `hypTangent` — `Vec2`. Unit tangent along the hypotenuse (`hypNormal.perp()`).
- `hypLength` — `number`. Length of the hypotenuse (`size.getMagnitude()`).

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const nw = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const se = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'se');
```

## RightTriangle.getVertices()

Write the right-angle vertex `s` and the two acute hypotenuse vertices `a` and `b` into pre-allocated target vectors.

```ts
getVertices(s?: Vec2, a?: Vec2, b?: Vec2): { s: Vec2; a: Vec2; b: Vec2 }
```

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const { s, a, b } = tri.getVertices(new Vec2(), new Vec2(), new Vec2());
// s = (0, 0), a = (0, 64), b = (64, 0)
```

## RightTriangle.getOppositeCorner()

Write the open corner opposite the right-angle vertex into `target`.

```ts
getOppositeCorner(target?: Vec2): Vec2
```

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const openCorner = tri.getOppositeCorner(new Vec2()); // (64, 64)
```

## RightTriangle.signedDistanceToHypotenuse()

Signed distance from `point` to the hypotenuse line along `hypNormal` (negative inside the triangle, zero on the hypotenuse, positive in the open half-plane).

```ts
signedDistanceToHypotenuse(point: Vec2): number
```

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const d = tri.signedDistanceToHypotenuse(new Vec2(48, 48)); // > 0 (open side)
```

## RightTriangle.projectOntoHypotenuse()

Project `point` onto the hypotenuse segment, optionally inset from both ends by `margin`, writing the result into `target`.

```ts
projectOntoHypotenuse(point: Vec2, margin?: number, target?: Vec2): Vec2
```

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const foot = tri.projectOntoHypotenuse(new Vec2(48, 20), 2, new Vec2());
```

## RightTriangle.getClosestPoint()

Closest point on or inside the right triangle to `point`, written into `target`.

```ts
getClosestPoint(point: Vec2, target?: Vec2): Vec2
```

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const closest = tri.getClosestPoint(new Vec2(50, 50), new Vec2()); // (32, 32)
```

## RightTriangle.isIn()

True if `point` lies inside or on the right triangle.

```ts
isIn(point: Vec2): boolean
```

## RightTriangle.overlapsCircle()

True if this right triangle overlaps `circ`.

```ts
overlapsCircle(circ: Circ): boolean
```

### Example

```js
import { Circ, RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const hit = tri.overlapsCircle(new Circ(14, new Vec2(38, 38))); // true
```

## RightTriangle.overlapsBounds()

True if this right triangle overlaps the axis-aligned bounding box `[min, max]`.

```ts
overlapsBounds(min: Vec2, max: Vec2): boolean
```

## RightTriangle.raycast()

Cast a 2D line segment `[start, end]` against the three edges of the right triangle, returning `{ fraction, point, normal }` or `null`.

```ts
raycast(start: Vec2, end: Vec2, target?: RayHit2D): RayHit2D | null
```

### Example

```js
import { RightTriangle, Vec2 } from '@1pizzateam/spock';

const tri = new RightTriangle(new Vec2(64, 64), new Vec2(32, 32), 'nw');
const hit = tri.raycast(new Vec2(60, 60), new Vec2(10, 10));
// hit.point ≈ (32, 32), hit.normal ≈ (√½, √½)
```

## RightTriangle.draw()

Draw the triangle on a 2D canvas context.

```ts
draw(context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number): void
```

## raycastSegment()

Standalone 2D segment-vs-edge intersection helper used by `RightTriangle.raycast()`.

```ts
raycastSegment(start: Vec2, end: Vec2, p1: Vec2, p2: Vec2, outNormal: Vec2, target?: RayHit2D): RayHit2D | null
```
