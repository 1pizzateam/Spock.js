# Circ

A circle: a `Vec2` centre and a radius, with optional grid occupancy and canvas drawing.

<CircDemo />

Radius and diameter stay in sync, so setting either updates the other. `isIn()` answers point containment with a squared distance, avoiding a square root.

Occupancy is opt-in. Call `setGrid()` to attach a `Grid`, and from then on moving or resizing the circle refreshes `gridCells`, the list of cells its bounding box covers. Pair that with `Grid.testCells()` for a cheap broad-phase overlap check.

```js
import { Circ, Grid, Vec2 } from '@1pizzateam/spock';

const grid = new Grid(new Vec2(800, 600), 32);
const ball = new Circ(20, new Vec2(100, 100)).setGrid(grid);

ball.setPosition(new Vec2(240, 180));
const occupied = ball.gridCells.filter(cell => cell !== Grid.emptyCell);
```

## Constructor

Circ of radius at position. Occupancy is opt-in via setGrid().

Takes the radius first, then the centre (as a `Vec2` or coordinate scalars). Occupancy stays off until you call `setGrid()`.

```ts
new Circ(radius: number, position?: Vec2)
new Circ(radius: number, positionX: number, positionY: number)
```

### Parameters

- `radius` — `number`.
- `position` / `positionX` — `Vec2` or `number`.
- `positionY` — `number` *(optional when passing Vec2)*.

### Returns

`Circ`

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

// Vector-first
const value = new Circ(10, new Vec2(1, 1));

// Scalar overload
const scalarValue = new Circ(10, 1, 1);
```

## Circ.clone()

Copy with the same grid.

Returns a new circle with the same radius, position, and grid.

```ts
clone(): Circ
```

### Parameters

None.

### Returns

`Circ` — the new circle

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const result = new Circ(10, new Vec2(0, 0)).clone();
```

## Circ.copy()

Copy size, position, and grid from another circle.

Overwrites this circle from another one, grid included, and reuses the instance.

```ts
copy(circ: Circ): Circ
```

### Parameters

- `circ` — `Circ`.

### Returns

`Circ` — the Circ with its new values

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const original = new Circ(10, new Vec2(0, 0));
const result = new Circ(5, new Vec2(1, 1)).copy(original);
```

## Circ.setGrid()

Attach a grid for occupancy, or clear it.

Attaches a `Grid` and fills `gridCells` straight away. Pass `null` to detach, which resets occupancy to the empty sentinel.

```ts
setGrid(grid: Grid | null): Circ
```

### Parameters

- `grid` — `Grid | null`.

### Returns

`Circ`

### Example

```js
import { Circ, Grid, Vec2 } from '@1pizzateam/spock';

const result = new Circ(10, new Vec2(0, 0)).setGrid(new Grid(new Vec2(100, 100), 10));
```

## Circ.setPosition()

Move the center to a position vector and refresh occupancy in the same call, so `gridCells` never goes stale. Returns the circle, so it chains.

```ts
setPosition(position: Vec2): Circ
```

### Parameters

- `position` — `Vec2`. Center position vector.

### Returns

`Circ` — the Circ with its new values

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const circle = new Circ(10, new Vec2(0, 0));
circle.setPosition(new Vec2(15, 20));
```

## Circ.translate()

Translate center by an offset vector in-place and refresh occupancy.

```ts
translate(offset: Vec2): Circ
```

### Parameters

- `offset` — `Vec2`. Displacement vector.

### Returns

`Circ`

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const circle = new Circ(10, new Vec2(0, 0));
circle.translate(new Vec2(5, 10));
```

## Circ.getClosestPoint()

Closest point on or within the circle to an external point.

```ts
getClosestPoint(point: Vec2, target?: Vec2): Vec2
```

### Parameters

- `point` — `Vec2`.
- `target` — `Vec2`. Optional.

### Returns

`Vec2`

## Circ.setRadius()

Set radius.

Sets the radius, keeps the diameter in step, and refreshes occupancy.

```ts
setRadius(radius: number): this
```

### Parameters

- `radius` — `number`.

### Returns

`this` — the Circ with its new values

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const result = new Circ(10, new Vec2(0, 0)).setRadius(10);
```

## Circ.setDiameter()

Set diameter.

Sets the diameter, keeps the radius in step, and refreshes occupancy.

```ts
setDiameter(diameter: number): this
```

### Parameters

- `diameter` — `number`.

### Returns

`this` — the Circ with its new values

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const result = new Circ(10, new Vec2(0, 0)).setDiameter(20);
```

## Circ.scale()

Multiply radius by scalar.

Multiplies the radius by a scalar, updating the diameter and occupancy with it.

```ts
scale(scalar: number): Circ
```

### Parameters

- `scalar` — `number`.

### Returns

`Circ` — the Circ with its new values

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const result = new Circ(10, new Vec2(0, 0)).scale(1);
```

## Circ.isIn()

True if the point lies inside or on the circle.

Point-in-circle test done with squared distance, so no square root is taken. A point exactly on the edge counts as inside.

```ts
isIn(v: Vec2): boolean
```

### Parameters

- `v` — `Vec2`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const result = new Circ(10, new Vec2(0, 0)).isIn(new Vec2(1, 2));
```

## Circ.draw()

Draw the circle on a canvas.

Fills and strokes the circle on a canvas context. Pass an empty string for either colour to skip that pass, which is how you get fill without stroke or the reverse.

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
import { Circ, Vec2 } from '@1pizzateam/spock';

const context = document.querySelector('canvas').getContext('2d');
const result = new Circ(10, new Vec2(0, 0)).draw(context, '#5b8cff', '#5b8cff', 1);
```

## Circ.overlapsCircle()

True if this circle overlaps another circle.

Tests whether two circles intersect or touch using squared Euclidean distance without square roots.

```ts
overlapsCircle(center: Vec2, radius: number): boolean
overlapsCircle(circ: Circ): boolean
```

### Parameters

- `centerOrCirc` — `Vec2 | Circ`. Circle center position vector or `Circ` instance
- `radius` — `number`. Optional if passing a `Circ` instance

### Returns

`boolean` — `true` if circles intersect

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const a = new Circ(25, new Vec2(0, 0));
const b = new Circ(20, new Vec2(30, 0));

const collides = a.overlapsCircle(b);
const collidesCenter = a.overlapsCircle(new Vec2(30, 0), 20);
```

## Circ.overlapsRect()

True if this circle overlaps a rectangle.

Tests whether the circle intersects an axis-aligned rectangle (`Rect`).

```ts
overlapsRect(rect: Rect): boolean
```

### Parameters

- `rect` — `Rect`. The rectangle to test against

### Returns

`boolean` — `true` if circle and rectangle intersect

### Example

```js
import { Circ, Rect, Vec2 } from '@1pizzateam/spock';

const circle = new Circ(20, new Vec2(50, 50));
const rect = new Rect(new Vec2(40, 40), new Vec2(60, 60));

const collides = circle.overlapsRect(rect);
```

## Circ.halfSize

Circle half-extents vector `(radius, radius)`.

Automatically kept in sync whenever `radius`, `diameter`, or `copy()` is invoked.

```ts
halfSize: Vec2
```

## Circ.overlapsBounds()

True if this circle overlaps an axis-aligned bounding box defined by min and max vectors.

```ts
overlapsBounds(min: Vec2, max: Vec2): boolean
```

### Parameters

- `min` — `Vec2`. Minimum corner (or first corner).
- `max` — `Vec2`. Maximum corner (or second corner).

### Returns

`boolean` — `true` if circle overlaps the bounding box.

### Example

```js
import { Circ, Vec2 } from '@1pizzateam/spock';

const circle = new Circ(20, new Vec2(50, 50));
const overlaps = circle.overlapsBounds(new Vec2(0, 0), new Vec2(40, 40));
```

## Circ.getBounds()

Write minimum and maximum bounding corners into destination vectors without allocations.

```ts
getBounds(outMin: Vec2, outMax: Vec2): void
```

### Parameters

- `outMin` — `Vec2`. Vector to receive top-left / min corner `(position - halfSize)`.
- `outMax` — `Vec2`. Vector to receive bottom-right / max corner `(position + halfSize)`.

## Circ.boundsMin & Circ.boundsMax

Getters returning newly allocated minimum and maximum corners of the bounding box.

```ts
get boundsMin(): Vec2
get boundsMax(): Vec2
```

## Circ.raycast()

Cast a line segment against this circle.

Returns the earliest intersection point, contact normal, and normalized fraction `t` along the segment `[0, 1]`. If `start` begins inside the circle, returns `fraction = 0` with the outward contact normal.

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
import { Circ, Vec2 } from '@1pizzateam/spock';

const circle = new Circ(20, new Vec2(100, 100));
const hit = circle.raycast(new Vec2(50, 100), new Vec2(150, 100));

if (hit) {
  console.log(hit.fraction); // 0.3
  console.log(hit.point);    // (80, 100)
  console.log(hit.normal);   // (-1, 0)
}
```
