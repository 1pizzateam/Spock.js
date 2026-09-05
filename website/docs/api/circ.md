# Circ

Import with `import { Circ } from '@1pizzateam/spockjs';`.

## Constructor

Circ of radius at (positionX, positionY). Occupancy is opt-in via setGrid().

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

