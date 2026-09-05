# Rect

An axis-aligned rectangle defined by a centre position and a size, with cached corners.

The constructor takes width and height first, then the centre. `topLeftCorner` and `bottomRightCorner` are recomputed whenever you move or resize it, so containment tests and clamping read them directly instead of deriving them every frame.

As with `Circ`, occupancy is opt-in through `setGrid()`, after which `gridCells` lists every cell the rectangle covers. `Vec2.clamp()` takes a `Rect`, which makes it the natural type for bounds.

```js
import { Rect, Vec2 } from '@1pizzateam/spockjs';

const bounds = new Rect(640, 360, 320, 180);

const pointer = new Vec2(700, -20).clamp(bounds);
const inside = bounds.isIn(pointer); // true
```

## Constructor

Rect of width × height centered at (positionX, positionY).

Takes width and height first, then the centre — not the top-left corner. The corners are derived for you.

```ts
new Rect(width: number, height: number, positionX: number, positionY: number)
```

### Parameters

- `width` — `number`.
- `height` — `number`.
- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Rect`

### Example

```js
import { Rect } from '@1pizzateam/spockjs';

const value = new Rect(100, 100, 1, 1);
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
import { Rect } from '@1pizzateam/spockjs';


const result = new Rect(20, 10, 0, 0).clone();
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
import { Rect } from '@1pizzateam/spockjs';


const result = new Rect(20, 10, 0, 0).copy(new Rect(10, 10, 0, 0));
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
import { Rect, Grid } from '@1pizzateam/spockjs';


const result = new Rect(20, 10, 0, 0).setGrid(new Grid(100, 100, 10));
```

## Rect.setPosition()

Move the center and refresh corners and occupancy.

Moves the centre and refreshes the corners and occupancy together, so nothing goes stale.

```ts
setPosition(positionX: number, positionY: number): Rect
```

### Parameters

- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Rect` — the rectangle with its new values

### Example

```js
import { Rect } from '@1pizzateam/spockjs';


const result = new Rect(20, 10, 0, 0).setPosition(1, 1);
```

## Rect.setSize()

Resize and refresh corners and occupancy.

Resizes about the centre, refreshing the half-size, the corners, and occupancy.

```ts
setSize(width: number, height: number): Rect
```

### Parameters

- `width` — `number`.
- `height` — `number`.

### Returns

`Rect` — the rectangle with its new values

### Example

```js
import { Rect } from '@1pizzateam/spockjs';


const result = new Rect(20, 10, 0, 0).setSize(100, 100);
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
import { Rect, Vec2 } from '@1pizzateam/spockjs';


const result = new Rect(20, 10, 0, 0).isIn(new Vec2(1, 2));
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
import { Rect } from '@1pizzateam/spockjs';

const context = document.querySelector('canvas').getContext('2d');

const result = new Rect(20, 10, 0, 0).draw(context, '#5b8cff', '#5b8cff', 1);
```

