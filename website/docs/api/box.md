# Box

An axis-aligned 3D bounding box: a `min` and a `max` corner. It is the cheap broad-phase volume for culling, picking and collision.

<BoxDemo />

A new box is empty (`max` below `min`) until it grows to include something, so `new Box().expandByPoint(p)` or `setFromPoints()` always gives the tight fit. Query methods on an empty box return neutral results: `getCenter()` and `getSize()` write the origin.

`applyMatrix4()` carries a box through a transform and refits it, which keeps it axis-aligned: a rotated box becomes the smallest axis-aligned box around it. It uses the centre and the absolute axis columns, so it never touches the eight corners and does not allocate.

```js
import { Box, Mat4x3, Quat, Vec3 } from '@1pizzateam/spock';

const local = new Box().setFromPoints(vertices); // flat [x, y, z, ...] or Vec3[]
const model = new Mat4x3().compose(position, new Quat().setFromEuler(new Vec3(0, 0.5, 0)), new Vec3(1, 1, 1));

const world = local.clone().applyMatrix4(model);
world.containsPoint(new Vec3(0, 0, 0));
```

## Constructor

Empty box by default.

Takes the two corners and copies them, so later changes to the vectors you passed do not affect the box. With no arguments the box is empty: `min` is +Infinity and `max` is -Infinity.

```ts
new Box(min: Vec3 = new Vec3(Infinity, Infinity, Infinity), max: Vec3 = new Vec3(-Infinity, -Infinity, -Infinity))
```

### Parameters

- `min` — `Vec3`. Optional. Lower corner.
- `max` — `Vec3`. Optional. Upper corner.

### Returns

`Box`

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const empty = new Box();
const unit = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
```

## Box.set()

Set the corners.

Copies both vectors into the box and reuses the instance.

```ts
set(min: Vec3, max: Vec3): Box
```

### Parameters

- `min` — `Vec3`.
- `max` — `Vec3`.

### Returns

`Box` — the Box with its new values

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const box = new Box().set(new Vec3(0, 0, 0), new Vec3(2, 2, 2));
```

## Box.setFromPoints()

Fit around Vec3 points or a flat array.

Resets the box and grows it to include every point. A flat `number[]` or typed array is read `stride` values at a time: stride 3 for (x, y, z) positions, stride 2 for (x, y) data where z is taken as 0. An empty list leaves the box empty.

```ts
setFromPoints(points: Vec3[] | number[] | Float32Array, stride: number = 3): Box
```

### Parameters

- `points` — `Vec3[] | number[] | Float32Array`. The points.
- `stride` — `number`. Optional. Values per point in a flat array, 2 or 3.

### Returns

`Box` — the Box with its new values

### Example

```js
import { Box } from '@1pizzateam/spock';

const positions = new Float32Array([0, 0, 0, 1, 2, 3, -1, 5, 2]);
const box = new Box().setFromPoints(positions); // (-1, 0, 0) to (1, 5, 3)
```

## Box.makeEmpty()

Reset to the empty box.

```ts
makeEmpty(): Box
```

### Parameters

None.

### Returns

`Box` — the empty Box

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const box = new Box(new Vec3(0, 0, 0), new Vec3(1, 1, 1)).makeEmpty();
box.isEmpty(); // true
```

## Box.isEmpty()

True if the box has no volume to speak of: `max` is below `min` on any axis.

```ts
isEmpty(): boolean
```

### Parameters

None.

### Returns

`boolean`

### Example

```js
import { Box } from '@1pizzateam/spock';

const result = new Box().isEmpty(); // true
```

## Box.getCenter()

Write the centre into target.

Returns the origin for an empty box.

```ts
getCenter(target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const center = new Box(new Vec3(-2, 0, 0), new Vec3(4, 2, 2)).getCenter(); // (1, 1, 1)
```

## Box.getSize()

Write `max - min` into target.

Returns the origin for an empty box.

```ts
getSize(target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const size = new Box(new Vec3(-2, 0, 0), new Vec3(4, 2, 2)).getSize(); // (6, 2, 2)
```

## Box.expandByPoint()

Grow to include a point.

Does nothing if the point is already inside, so calling it for every vertex builds a tight box.

```ts
expandByPoint(point: Vec3): Box
```

### Parameters

- `point` — `Vec3`.

### Returns

`Box` — the Box with its new values

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const box = new Box().expandByPoint(new Vec3(1, 2, 3)).expandByPoint(new Vec3(-1, 0, 5));
```

## Box.containsPoint()

True if the point is inside or on the box.

```ts
containsPoint(point: Vec3): boolean
```

### Parameters

- `point` — `Vec3`.

### Returns

`boolean`

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const box = new Box(new Vec3(0, 0, 0), new Vec3(10, 10, 10));
box.containsPoint(new Vec3(5, 5, 5)); // true
```

## Box.intersectsBox()

True if the two boxes overlap.

Touching faces count as overlapping.

```ts
intersectsBox(box: Box): boolean
```

### Parameters

- `box` — `Box`.

### Returns

`boolean`

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const a = new Box(new Vec3(0, 0, 0), new Vec3(10, 10, 10));
const b = new Box(new Vec3(5, 5, 5), new Vec3(15, 15, 15));
a.intersectsBox(b); // true
```

## Box.clone()

An independent copy.

```ts
clone(): Box
```

### Parameters

None.

### Returns

`Box` — the new box

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const copy = new Box(new Vec3(0, 0, 0), new Vec3(1, 1, 1)).clone();
```

## Box.copy()

Copy another box into this one.

```ts
copy(box: Box): Box
```

### Parameters

- `box` — `Box`.

### Returns

`Box` — the Box with its new values

### Example

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const original = new Box(new Vec3(0, 0, 0), new Vec3(1, 1, 1));
const result = new Box().copy(original);
```

## Box.applyMatrix4()

Transform the box and refit it around the result.

Accepts a `Mat4x3`, or an affine `Mat4` (its last row is ignored). The new bounds are `centre ± Σ |axis column| × half extent`, so rotation grows the box and scale and translation behave as expected. An empty box stays empty. Clone first if you need the original.

```ts
applyMatrix4(matrix: Mat4x3 | Mat4): Box
```

### Parameters

- `matrix` — `Mat4x3 | Mat4`. An affine transform.

### Returns

`Box` — the transformed Box

### Example

```js
import { Box, Mat4x3, Vec3 } from '@1pizzateam/spock';

const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
box.applyMatrix4(new Mat4x3().translate(new Vec3(10, 0, 0))); // x from 9 to 11
```
