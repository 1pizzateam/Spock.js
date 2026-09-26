# Grid

A uniform lattice that divides a width × height area into square cells and reports which cells a shape covers.

<GridDemo />

This is the spatial index behind `Circ` and `Rect` occupancy. Construct it with the area and a cell size; `len` is a `Vec2` holding the column and row counts. Attaching it to a shape fills that shape's `gridCells` with the indices its bounding box overlaps.

`testCells()` then answers whether two shapes share a cell, a cheap broad-phase check to run before any exact collision maths. Unused and off-grid slots use the `Grid.emptyCell` sentinel (`-1`), which `testCells()` ignores. `draw()` paints the lattice for debugging.

```js
import { Circ, Grid, Vec2 } from '@1pizzateam/spock';

const grid = new Grid(new Vec2(800, 600), 32);
const circle = new Circ(38, new Vec2(400, 300)).setGrid(grid);

circle.setPosition(new Vec2(120, 240));
const occupied = circle.gridCells.filter(cell => cell !== Grid.emptyCell);

const other = new Circ(20, new Vec2(110, 96)).setGrid(grid);
if (grid.testCells(circle.gridCells, other.gridCells))
  console.log('close enough for exact narrow-phase test');
```

## Constructor

Divide size (width × height) into cells of cellSize.

Cell counts are rounded up, so the lattice always covers the whole area even when the size is not an exact multiple of the cell size. `len` holds the column and row counts as a `Vec2`.

```ts
new Grid(size: Vec2, cellSize: number)
new Grid(width: number, height: number, cellSize: number)
```

### Parameters

- `size` — `Vec2`. Dimensions of the lattice.
- `width` — `number`.
- `height` — `number`.
- `cellSize` — `number`.

### Returns

`Grid`

### Example

```js
import { Grid, Vec2 } from '@1pizzateam/spock';

// Vector-first
const grid = new Grid(new Vec2(100, 100), 10);

// Scalar overload
const scalarGrid = new Grid(100, 100, 10);
```

## Grid.totalCells

Total number of cells in the lattice (cols × rows).

```ts
get totalCells(): number
```

### Returns

`number`

## Grid.testCells()

True if the sorted occupancy lists share a real cell.

Broad-phase overlap test: true when the two occupancy lists share a cell. It ignores the `Grid.emptyCell` sentinel, so unused slots never cause a false hit. A true result means the shapes are close enough to be worth an exact test, not that they actually intersect.

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
import { Grid, Vec2 } from '@1pizzateam/spock';

const result = new Grid(new Vec2(100, 100), 10).testCells([1, 2, 3], [1, 2, 3]);
```

## Grid.getFirstCommonCell()

Return the lowest common cell shared by both sorted lists, or -1 if disjoint.

```ts
getFirstCommonCell(aCells: number[], bCells: number[]): number
```

### Parameters

- `aCells` — `number[]`.
- `bCells` — `number[]`.

### Returns

`number`

### Example

```js
import { Grid, Vec2 } from '@1pizzateam/spock';

const firstCell = new Grid(new Vec2(100, 100), 10).getFirstCommonCell([1, 4, 7], [4, 7, 9]); // 4
```

## Grid.isFirstCommonCell()

Fast deduplication check: returns true only if `cellId` is the first common cell between `aCells` and `bCells`.

```ts
isFirstCommonCell(aCells: number[], bCells: number[], cellId: number): boolean
```

### Parameters

- `aCells` — `number[]`.
- `bCells` — `number[]`.
- `cellId` — `number`.

### Returns

`boolean`

## Grid.getCell()

Get cell index at `point` or (x, y) coordinates, or -1 if out of bounds.

```ts
getCell(point: Vec2): number
getCell(x: number, y: number): number
```

### Parameters

- `point` — `Vec2`.
- `x` — `number`.
- `y` — `number`.

### Returns

`number`

### Example

```js
import { Grid, Vec2 } from '@1pizzateam/spock';

const grid = new Grid(new Vec2(100, 100), 10);
const cellIndex = grid.getCell(new Vec2(25, 15)); // cell at (2, 1) -> 12
```

## Grid.getCellCoords()

Decompose a cell index into column and row vector coordinates.

```ts
getCellCoords(cellId: number, target?: Vec2): Vec2
```

### Parameters

- `cellId` — `number`.
- `target` — `Vec2`. Optional.

### Returns

`Vec2`

## Grid.draw()

Draw the lattice on a canvas.

Paints the lattice, optionally filling the background first. Pass an empty string for either colour to skip that pass.

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
import { Grid } from '@1pizzateam/spock';

const context = document.querySelector('canvas').getContext('2d');

const result = new Grid(100, 100, 10).draw(context, '#5b8cff', '#5b8cff', 1);
```

## Grid.getCellAt()

Get the cell index for a 2D position vector.

```ts
getCellAt(point: Vec2): number
```

### Parameters

- `point` — `Vec2`. Coordinates to query.

### Returns

`number` — Cell index, or `Grid.emptyCell` (-1) if outside grid bounds.

## Grid.getCellsForBounds()

Get all cell indices overlapping an Axis-Aligned Bounding Box (AABB).

```ts
getCellsForBounds(min: Vec2, max: Vec2, out?: number[]): number[]
```

### Parameters

- `min` — `Vec2`. Minimum bounds corner.
- `max` — `Vec2`. Maximum bounds corner.
- `out` — `number[]` (optional). Output array to write cell indices into.

### Returns

`number[]` — Array of unique occupied cell indices.

## Grid.getCellsForCircle()

Get all cell indices overlapping a circle.

```ts
getCellsForCircle(center: Vec2, radius: number, out?: number[]): number[]
```

### Parameters

- `center` — `Vec2`. Circle center.
- `radius` — `number`. Circle radius.
- `out` — `number[]` (optional). Output array to write cell indices into.

### Returns

`number[]` — Array of unique occupied cell indices.



