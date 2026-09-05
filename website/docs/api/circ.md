# Circle

Import with `import { Circle } from '@1pizzateam/spockjs';`.

## Constructor

Circle of radius at (positionX, positionY). Occupancy is opt-in via setGrid().

```ts
new Circle(radius: number, positionX: number, positionY: number)
```

### Parameters

- `radius` — `number`.
- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Circle`

### Example

```js
import { Circle } from '@1pizzateam/spockjs';

const value = new Circle(10, 1, 1);
```

## Circle.clone()

Copy with the same grid.

```ts
clone(): Circle
```

### Parameters

None.

### Returns

`Circle` — the new circle

### Example

```js
import { Circle } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).clone();
```

## Circle.copy()

Copy size, position, and grid from another circle.

```ts
copy(circle: Circle): Circle
```

### Parameters

- `circle` — `Circle`.

### Returns

`Circle` — the Circle with its new values

### Example

```js
import { Circle } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).copy(undefined);
```

## Circle.setGrid()

Attach a grid for occupancy, or clear it.

```ts
setGrid(grid: Grid | null): Circle
```

### Parameters

- `grid` — `Grid | null`.

### Returns

`Circle`

### Example

```js
import { Circle, Grid } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).setGrid(new Grid(100, 100, 10));
```

## Circle.setPosition()

Move the center and refresh occupancy.

```ts
setPosition(positionX: number, positionY: number): Circle
```

### Parameters

- `positionX` — `number`.
- `positionY` — `number`.

### Returns

`Circle` — the Circle with its new values

### Example

```js
import { Circle } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).setPosition(1, 1);
```

## Circle.setRadius()

Set radius.

```ts
setRadius(radius: number): this
```

### Parameters

- `radius` — `number`.

### Returns

`this` — the Circle with its new values

### Example

```js
import { Circle } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).setRadius(10);
```

## Circle.setDiameter()

Set diameter.

```ts
setDiameter(diameter: number): this
```

### Parameters

- `diameter` — `number`.

### Returns

`this` — the Circle with its new values

### Example

```js
import { Circle } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).setDiameter(20);
```

## Circle.scale()

Multiply radius by scalar.

```ts
scale(scalar: number): Circle
```

### Parameters

- `scalar` — `number`.

### Returns

`Circle` — the Circle with its new values

### Example

```js
import { Circle } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).scale(1);
```

## Circle.isIn()

True if the point lies inside or on the circle.

```ts
isIn(v: Vector2): boolean
```

### Parameters

- `v` — `Vector2`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Circle, Vector2 } from '@1pizzateam/spockjs';


const result = new Circle(10, 0, 0).isIn(new Vector2(1, 2));
```

## Circle.draw()

Draw the circle on a canvas.

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
import { Circle } from '@1pizzateam/spockjs';

const context = document.querySelector('canvas').getContext('2d');

const result = new Circle(10, 0, 0).draw(context, '#5b8cff', '#5b8cff', 1);
```

