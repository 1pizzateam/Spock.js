# Circ

A circle: a `Vec2` centre and a radius, with optional grid occupancy and canvas drawing.

Radius and diameter stay in sync, so setting either updates the other. `isIn()` answers point containment with a squared distance, avoiding a square root.

Occupancy is opt-in. Call `setGrid()` to attach a `Grid`, and from then on moving or resizing the circle refreshes `gridCells`, the list of cells its bounding box covers. Pair that with `Grid.testCells()` for a cheap broad-phase overlap check.

```js
import { Circ, Grid } from '@1pizzateam/spockjs';

const grid = new Grid(800, 600, 32);
const ball = new Circ(20, 100, 100).setGrid(grid);

ball.setPosition(240, 180);
const occupied = ball.gridCells.filter(cell => cell !== Grid.emptyCell);
```

## Constructor

Circ of radius at (positionX, positionY). Occupancy is opt-in via setGrid().

Takes the radius first, then the centre. Occupancy stays off until you call `setGrid()`.

```ts
new Circ(radius: number, positionX: number, positionY: number)
```

### Parameters

- `radius` — `number`.
- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Circ`

### Example

```js
import { Circ } from '@1pizzateam/spockjs';

const value = new Circ(10, 1, 1);
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
import { Circ } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).clone();
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
import { Circ } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).copy(undefined);
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
import { Circ, Grid } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).setGrid(new Grid(100, 100, 10));
```

## Circ.setPosition()

Move the center and refresh occupancy.

Moves the centre and refreshes occupancy in the same call, so `gridCells` never goes stale. Returns the circle, so it chains.

```ts
setPosition(positionX: number, positionY: number): Circ
```

### Parameters

- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Circ` — the Circ with its new values

### Example

```js
import { Circ } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).setPosition(1, 1);
```

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
import { Circ } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).setRadius(10);
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
import { Circ } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).setDiameter(20);
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
import { Circ } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).scale(1);
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
import { Circ, Vec2 } from '@1pizzateam/spockjs';


const result = new Circ(10, 0, 0).isIn(new Vec2(1, 2));
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
import { Circ } from '@1pizzateam/spockjs';

const context = document.querySelector('canvas').getContext('2d');

const result = new Circ(10, 0, 0).draw(context, '#5b8cff', '#5b8cff', 1);
```

