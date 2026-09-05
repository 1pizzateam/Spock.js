# Rect

Import with `import { Rect } from '@1pizzateam/spockjs';`.

## Constructor

Rect of width × height centered at (positionX, positionY).

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

