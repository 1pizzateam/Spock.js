# Sphere

A 3D bounding sphere: a `Vec3` centre and a radius. It is the cheapest volume to test and transform, which makes it the usual first pass for frustum culling and picking.

<SphereDemo />

Containment and overlap use squared distances, so there is no square root. `applyMatrix4()` moves the centre with the transform and scales the radius by the largest axis scale, so the result always encloses the transformed volume, even under non-uniform scale, at the cost of being a little loose.

`setFromPoints()` centres the sphere on the bounding box of the points and sizes it to the farthest one. That is fast and conservative rather than the minimal enclosing sphere.

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const bound = new Sphere().setFromPoints(vertices); // flat [x, y, z, ...] or Vec3[]
const world = bound.clone().applyMatrix4(model);

world.containsPoint(new Vec3(0, 0, 0));
```

## Constructor

Sphere at the origin with radius 0 by default.

Takes the centre and radius. The centre is copied.

```ts
new Sphere(center: Vec3 = new Vec3(), radius: number = 0)
```

### Parameters

- `center` — `Vec3`. Optional.
- `radius` — `number`. Optional.

### Returns

`Sphere`

### Example

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere(new Vec3(0, 1, 0), 2);
```

## Sphere.set()

Set the centre and radius.

```ts
set(center: Vec3, radius: number): Sphere
```

### Parameters

- `center` — `Vec3`.
- `radius` — `number`.

### Returns

`Sphere` — the Sphere with its new values

### Example

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere().set(new Vec3(1, 2, 3), 4);
```

## Sphere.setFromPoints()

Enclose points around their box centre.

By default the centre is the centre of the points' bounding box. Pass `optionalCenter` to pin the centre (for example a mesh origin) and size the radius from it instead. `stride` is 3 for flat (x, y, z) data or 2 for (x, y) data with z taken as 0.

```ts
setFromPoints(points: Vec3[] | number[] | Float32Array, optionalCenter?: Vec3, stride: number = 3): Sphere
```

### Parameters

- `points` — `Vec3[] | number[] | Float32Array`. The points.
- `optionalCenter` — `Vec3`. Optional. Fixed centre.
- `stride` — `number`. Optional. Values per point in a flat array, 2 or 3.

### Returns

`Sphere` — the Sphere with its new values

### Example

```js
import { Sphere } from '@1pizzateam/spock';

const sphere = new Sphere().setFromPoints([-2, 0, 0, 2, 0, 0]); // centre (0, 0, 0), radius 2
```

## Sphere.containsPoint()

True if the point is inside or on the sphere.

```ts
containsPoint(point: Vec3): boolean
```

### Parameters

- `point` — `Vec3`.

### Returns

`boolean`

### Example

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere(new Vec3(0, 0, 0), 5);
sphere.containsPoint(new Vec3(3, 0, 0)); // true
```

## Sphere.intersectsSphere()

True if the two spheres overlap.

Touching counts as overlapping.

```ts
intersectsSphere(sphere: Sphere): boolean
```

### Parameters

- `sphere` — `Sphere`.

### Returns

`boolean`

### Example

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const a = new Sphere(new Vec3(0, 0, 0), 5);
const b = new Sphere(new Vec3(7, 0, 0), 3);
a.intersectsSphere(b); // true
```

## Sphere.intersectsBox()

True if the sphere overlaps the box.

Clamps the centre to the box and compares that closest point's distance with the radius.

```ts
intersectsBox(box: Box): boolean
```

### Parameters

- `box` — `Box`.

### Returns

`boolean`

### Example

```js
import { Box, Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere(new Vec3(0, 0, 0), 2);
sphere.intersectsBox(new Box(new Vec3(1, 1, 1), new Vec3(3, 3, 3))); // true
```

## Sphere.applyMatrix4()

Transform the sphere.

Accepts a `Mat4x3`, or an affine `Mat4`. The centre is transformed as a point and the radius is multiplied by the largest axis scale of the matrix. Clone first if you need the original.

```ts
applyMatrix4(matrix: Mat4x3 | Mat4): Sphere
```

### Parameters

- `matrix` — `Mat4x3 | Mat4`. An affine transform.

### Returns

`Sphere` — the transformed Sphere

### Example

```js
import { Mat4x3, Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere(new Vec3(1, 0, 0), 2);
sphere.applyMatrix4(new Mat4x3().translate(new Vec3(5, 0, 0)).scale(new Vec3(2, 2, 2)));
// centre (7, 0, 0), radius 4
```

## Sphere.clone()

An independent copy.

```ts
clone(): Sphere
```

### Parameters

None.

### Returns

`Sphere` — the new sphere

### Example

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const copy = new Sphere(new Vec3(1, 2, 3), 4).clone();
```

## Sphere.copy()

Copy another sphere into this one.

```ts
copy(sphere: Sphere): Sphere
```

### Parameters

- `sphere` — `Sphere`.

### Returns

`Sphere` — the Sphere with its new values

### Example

```js
import { Sphere, Vec3 } from '@1pizzateam/spock';

const original = new Sphere(new Vec3(1, 2, 3), 4);
const result = new Sphere().copy(original);
```
