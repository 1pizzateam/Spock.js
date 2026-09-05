# Rectangle

Import with `import { Rectangle } from '@1pizzateam/spockjs';`.

## Constructor

Rectangle of width × height centered at (positionX, positionY).

```ts
new Rectangle(width: number, height: number, positionX: number, positionY: number)
```

### Parameters

- `width` — `number`.
- `height` — `number`.
- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Rectangle`

### Example

```js
import { Rectangle } from '@1pizzateam/spockjs';

const value = new Rectangle(100, 100, 1, 1);
```

## Rectangle.clone()

Copy with the same grid.

```ts
clone(): Rectangle
```

### Parameters

None.

### Returns

`Rectangle` — the new rectangle

### Example

```js
import { Rectangle } from '@1pizzateam/spockjs';


const result = new Rectangle(20, 10, 0, 0).clone();
```

## Rectangle.copy()

Copy size, position, and grid from another rectangle.

```ts
copy(rectangle: Rectangle): Rectangle
```

### Parameters

- `rectangle` — `Rectangle`.

### Returns

`Rectangle` — the rectangle with its new values

### Example

```js
import { Rectangle } from '@1pizzateam/spockjs';


const result = new Rectangle(20, 10, 0, 0).copy(new Rectangle(10, 10, 0, 0));
```

## Rectangle.setGrid()

Attach a grid for occupancy, or clear it.

```ts
setGrid(grid: Grid | null): Rectangle
```

### Parameters

- `grid` — `Grid | null`.

### Returns

`Rectangle`

### Example

```js
import { Rectangle, Grid } from '@1pizzateam/spockjs';


const result = new Rectangle(20, 10, 0, 0).setGrid(new Grid(100, 100, 10));
```

## Rectangle.setPosition()

Move the center and refresh corners and occupancy.

```ts
setPosition(positionX: number, positionY: number): Rectangle
```

### Parameters

- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Rectangle` — the rectangle with its new values

### Example

```js
import { Rectangle } from '@1pizzateam/spockjs';


const result = new Rectangle(20, 10, 0, 0).setPosition(1, 1);
```

## Rectangle.setSize()

Resize and refresh corners and occupancy.

```ts
setSize(width: number, height: number): Rectangle
```

### Parameters

- `width` — `number`.
- `height` — `number`.

### Returns

`Rectangle` — the rectangle with its new values

### Example

```js
import { Rectangle } from '@1pizzateam/spockjs';


const result = new Rectangle(20, 10, 0, 0).setSize(100, 100);
```

## Rectangle.isIn()

True if the point lies inside or on the rectangle.

```ts
isIn(vector: Vector2): boolean
```

### Parameters

- `vector` — `Vector2`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Rectangle, Vector2 } from '@1pizzateam/spockjs';


const result = new Rectangle(20, 10, 0, 0).isIn(new Vector2(1, 2));
```

## Rectangle.draw()

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
import { Rectangle } from '@1pizzateam/spockjs';

const context = document.querySelector('canvas').getContext('2d');

const result = new Rectangle(20, 10, 0, 0).draw(context, '#5b8cff', '#5b8cff', 1);
```

