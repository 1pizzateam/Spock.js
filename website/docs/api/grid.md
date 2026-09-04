# Grid

Import with `import { Grid } from '@1pizzateam/spockjs';`.

## Constructor

Divide width × height into cells of cellSize.

```ts
new Grid(width: number, height: number, cellSize: number)
```

### Parameters

- `width` — `number`.
- `height` — `number`.
- `cellSize` — `number`.

### Returns

`Grid`

### Example

```js
import { Grid } from '@1pizzateam/spockjs';

const value = new Grid(100, 100, 10);
```

## Grid.testCells()

True if the occupancy lists share a real cell.

```ts
testCells(aCells: number[], bCells: number[]): boolean
```

### Parameters

- `aCells` — `number[]`.
- `bCells` — `number[]`.

### Returns

`boolean`

### Example

```js
import { Grid } from '@1pizzateam/spockjs';


const result = new Grid(100, 100, 10).testCells([1, 2, 3], [1, 2, 3]);
```

## Grid.draw()

Draw the lattice on a canvas.

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
import { Grid } from '@1pizzateam/spockjs';

const context = document.querySelector('canvas').getContext('2d');

const result = new Grid(100, 100, 10).draw(context, '#5b8cff', '#5b8cff', 1);
```

