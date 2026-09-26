# Rect

An axis-aligned rectangle defined by a centre position and a size, with cached corners.

<ClampDemo />

The constructor takes width and height first, then the centre. `topLeftCorner` and `bottomRightCorner` are recomputed whenever you move or resize it, so containment tests and clamping read them directly instead of deriving them every frame.

As with `Circ`, occupancy is opt-in through `setGrid()`, after which `gridCells` lists every cell the rectangle covers. `Vec2.clamp()` takes a `Rect`, which makes it the natural type for bounds.

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const bounds = new Rect(new Vec2(640, 360), new Vec2(320, 180));

const pointer = new Vec2(700, -20).clamp(bounds);
const distance = pointer.getDistance(bounds.position);
const inside = bounds.isIn(pointer); // true
```

## Constructor

Rect of size centered at position.

Takes size first, then the centre (as `Vec2` instances or coordinates). The corners are derived for you.

```ts
new Rect(size: Vec2, position?: Vec2)
new Rect(width: number, height: number, positionX: number, positionY: number)
```

### Parameters

- `size` / `width` — `Vec2` or `number`.
- `position` / `height` — `Vec2` or `number` *(optional)*.
- `positionX` — `number` *(optional)*.
- `positionY` — `number` *(optional)*.

### Returns

`Rect`

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

// Vector-first
const value = new Rect(new Vec2(100, 100), new Vec2(1, 1));

// Scalar overload
const scalarValue = new Rect(100, 100, 1, 1);
```

## Rect.clone()

Copy with the same grid.

Returns a new rectangle with the same size, position, and grid.

```ts
clone(): Rect
```

### Parameters

None.

### Returns

`Rect` — the new rectangle

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const result = new Rect(new Vec2(20, 10), new Vec2(0, 0)).clone();
```

## Rect.copy()

Copy size, position, and grid from another rectangle.

Overwrites this rectangle from another one, grid included, and reuses the instance.

```ts
copy(rect: Rect): Rect
```

### Parameters

- `rect` — `Rect`.

### Returns

`Rect` — the rectangle with its new values

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const original = new Rect(new Vec2(10, 10), new Vec2(0, 0));
const result = new Rect(new Vec2(20, 10), new Vec2(0, 0)).copy(original);
```

## Rect.setGrid()

Attach a grid for occupancy, or clear it.

Attaches a `Grid` and fills `gridCells` with every cell the rectangle covers. Pass `null` to detach.

```ts
setGrid(grid: Grid | null): Rect
```

### Parameters

- `grid` — `Grid | null`.

### Returns

`Rect`

### Example

```js
import { Rect, Grid, Vec2 } from '@1pizzateam/spock';

const result = new Rect(new Vec2(20, 10), new Vec2(0, 0)).setGrid(new Grid(new Vec2(100, 100), 10));
```

## Rect.setPosition()

Move the center to a position vector and refresh corners and occupancy together, so nothing goes stale.

```ts
setPosition(position: Vec2): Rect
```

### Parameters

- `position` — `Vec2`. Center position vector.

### Returns

`Rect` — the rectangle with its new values

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const rect = new Rect(new Vec2(20, 10), new Vec2(0, 0));
rect.setPosition(new Vec2(15, 20));
```

## Rect.translate()

Translate center and corners by an offset vector in-place and refresh occupancy.

```ts
translate(offset: Vec2): Rect
```

### Parameters

- `offset` — `Vec2`. Displacement vector.

### Returns

`Rect`

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const rect = new Rect(new Vec2(20, 10), new Vec2(0, 0));
rect.translate(new Vec2(5, 10));
```

## Rect.getClosestPoint()

Closest point on or within the rectangle to an external point.

```ts
getClosestPoint(point: Vec2, target?: Vec2): Vec2
```

### Parameters

- `point` — `Vec2`.
- `target` — `Vec2`. Optional.

### Returns

`Vec2`

## Rect.setSize()

Resize and refresh corners and occupancy.

Resizes about the centre, refreshing the half-size, the corners, and occupancy. Can be called with either scalar dimensions or a `Vec2`.

```ts
setSize(width: number, height: number): Rect
setSize(size: Vec2): Rect
```

### Parameters

- `width` / `size` — `number` or `Vec2`.
- `height` — `number` *(optional when passing Vec2)*.

### Returns

`Rect` — the rectangle with its new values

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const result = new Rect(new Vec2(20, 10), new Vec2(0, 0)).setSize(new Vec2(100, 100));
```

## Rect.isIn()

True if the point lies inside or on the rectangle.

Inclusive point test against the cached corners, so points on the edge count as inside.

```ts
isIn(vector: Vec2): boolean
```

### Parameters

- `vector` — `Vec2`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const result = new Rect(new Vec2(20, 10), new Vec2(0, 0)).isIn(new Vec2(1, 2));
```

## Rect.draw()

Draw the rectangle on a canvas.

Draws from the top-left corner at the current size. An empty colour string skips the fill or the stroke.

```ts
draw(context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number): void
```

### Parameters

- `context` — `CanvasRenderingContext2D`.
- `fillColor` — `string`.
- `strokeColor` — `string`.
- `strokeWidth` — `number`.

### Returns

`void`

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const context = document.querySelector('canvas').getContext('2d');
const result = new Rect(new Vec2(20, 10), new Vec2(0, 0)).draw(context, '#5b8cff', '#5b8cff', 1);
```

## Rect.overlapsRect()

True if this rectangle overlaps another rectangle.

Tests whether the axis-aligned bounds of two rectangles intersect or touch.

```ts
overlapsRect(rect: Rect): boolean
```

### Parameters

- `rect` — `Rect`. The other rectangle to test against

### Returns

`boolean` — `true` if rectangles intersect

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const a = new Rect(new Vec2(100, 100), new Vec2(50, 50));
const b = new Rect(new Vec2(80, 80), new Vec2(100, 100));
const collides = a.overlapsRect(b);
```

## Rect.overlapsCircle()

True if this rectangle overlaps a circle.

Tests whether the rectangle intersects a circle defined by center position and radius, or a `Circ` instance.

```ts
overlapsCircle(center: Vec2, radius: number): boolean
overlapsCircle(circ: Circ): boolean
```

### Parameters

- `centerOrCirc` — `Vec2 | Circ`. Circle center position vector or `Circ` instance
- `radius` — `number`. Optional if passing a `Circ` instance

### Returns

`boolean` — `true` if rectangle and circle intersect

### Example

```js
import { Rect, Circ, Vec2 } from '@1pizzateam/spock';

const rect = new Rect(new Vec2(100, 100), new Vec2(50, 50));
const circle = new Circ(30, new Vec2(80, 80));

const collides = rect.overlapsCircle(circle);
const collidesCenter = rect.overlapsCircle(new Vec2(80, 80), 30);
```

## Rect.overlapsBounds()

True if this rectangle overlaps an axis-aligned bounding box defined by min and max vectors.

```ts
overlapsBounds(min: Vec2, max: Vec2): boolean
```

### Parameters

- `min` — `Vec2`. Minimum corner (or first corner).
- `max` — `Vec2`. Maximum corner (or second corner).

### Returns

`boolean` — `true` if rectangle overlaps the bounding box.

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const rect = new Rect(new Vec2(100, 100), new Vec2(50, 50));
const overlaps = rect.overlapsBounds(new Vec2(0, 0), new Vec2(40, 40));
```

## Rect.getBounds()

Write minimum and maximum bounding corners into destination vectors without allocations.

```ts
getBounds(outMin: Vec2, outMax: Vec2): void
```

### Parameters

- `outMin` — `Vec2`. Vector to receive top-left corner `(position - halfSize)`.
- `outMax` — `Vec2`. Vector to receive bottom-right corner `(position + halfSize)`.

## Rect.boundsMin & Rect.boundsMax

Getters returning newly allocated minimum and maximum corners of the bounding box.

```ts
get boundsMin(): Vec2
get boundsMax(): Vec2
```

## Rect.raycast()

Cast a line segment against this rectangle.

Returns the earliest intersection point, contact normal, and normalized fraction `t` along the segment `[0, 1]`. If `start` begins inside the rectangle, returns `fraction = 0` with the exit contact normal.

```ts
raycast(start: Vec2, end: Vec2, target?: RayHit2D): RayHit2D | null
```

### Parameters

- `start` — `Vec2`. Line segment start point.
- `end` — `Vec2`. Line segment end point.
- `target` — `RayHit2D` *(optional)*. Existing hit object to mutate.

### Returns

`RayHit2D | null` — Hit result containing `{ fraction, point, normal }`, or `null` if the ray misses or points away.

### Example

```js
import { Rect, Vec2 } from '@1pizzateam/spock';

const box = new Rect(new Vec2(40, 40), new Vec2(100, 100));
const hit = box.raycast(new Vec2(50, 100), new Vec2(150, 100));

if (hit) {
  console.log(hit.fraction); // 0.3
  console.log(hit.point);    // (80, 100)
  console.log(hit.normal);   // (-1, 0)
}
```
