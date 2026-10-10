# Ray3

A 3D ray: an `origin` and a unit `direction`. It powers mouse picking, line-of-sight checks and collision queries. The 2D counterpart is [`Ray2`](./ray2).

<Ray3Demo />

The direction is normalized whenever you set it, so `at(t)` returns the point `t` world units along the ray. The intersection tests return the hit point (or `null`), written into an optional `target` so a picking loop can reuse one vector. Boolean `intersects…` variants are there when you only need yes or no.

A ray starting inside a shape reports the point where it leaves: the exit point for a box, the far side for a sphere. A shape entirely behind the origin is a miss.

```js
import { Mat4, Ray3, Sphere, Vec3 } from '@1pizzateam/spock';

// unproject the pointer through an inverted projection-view matrix
const inverse = new Mat4().copy(projectionView).invert();
const near = inverse.transformPoint(new Vec3(ndcX, ndcY, -1));
const far = inverse.transformPoint(new Vec3(ndcX, ndcY, 1));

const ray = new Ray3(near, new Vec3().subVectors(far, near));
const hit = ray.intersectSphere(new Sphere(new Vec3(0, 1, 0), 1));
```

## Constructor

A ray along -Z from the origin by default.

Copies the origin and direction, and normalizes the direction.

```ts
new Ray3(origin: Vec3 = new Vec3(), direction: Vec3 = new Vec3(0, 0, -1))
```

### Parameters

- `origin` — `Vec3`. Optional.
- `direction` — `Vec3`. Optional. Does not need to be unit length.

### Returns

`Ray3`

### Example

```js
import { Ray3, Vec3 } from '@1pizzateam/spock';

const ray = new Ray3(new Vec3(0, 0, 10), new Vec3(0, 0, -5)); // direction becomes (0, 0, -1)
```

## Ray3.set()

Set the origin and direction.

The direction is normalized.

```ts
set(origin: Vec3, direction: Vec3): Ray3
```

### Parameters

- `origin` — `Vec3`.
- `direction` — `Vec3`.

### Returns

`Ray3` — the Ray3 with its new values

### Example

```js
import { Ray3, Vec3 } from '@1pizzateam/spock';

const ray = new Ray3().set(new Vec3(1, 1, 1), new Vec3(0, 4, 0)); // direction (0, 1, 0)
```

## Ray3.at()

Write the point at distance `t` along the ray into target.

```ts
at(t: number, target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `t` — `number`. Distance from the origin.
- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Ray3, Vec3 } from '@1pizzateam/spock';

const point = new Ray3(new Vec3(1, 2, 3), new Vec3(1, 0, 0)).at(10); // (11, 2, 3)
```

## Ray3.intersectBox()

First hit point on a box, else null.

A slab test. A ray parallel to a face and starting exactly on its boundary is handled without producing NaN. Starting inside the box returns the exit point.

```ts
intersectBox(box: Box, target: Vec3 = new Vec3()): Vec3 | null
```

### Parameters

- `box` — `Box`.
- `target` — `Vec3`. Optional.

### Returns

`Vec3 | null` — the hit point, or `null`

### Example

```js
import { Box, Ray3, Vec3 } from '@1pizzateam/spock';

const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
const hit = new Ray3(new Vec3(0, 0, -10), new Vec3(0, 0, 1)).intersectBox(box); // (0, 0, -1)
```

## Ray3.intersectsBox()

True if the ray hits the box.

```ts
intersectsBox(box: Box): boolean
```

### Parameters

- `box` — `Box`.

### Returns

`boolean`

### Example

```js
import { Box, Ray3, Vec3 } from '@1pizzateam/spock';

const box = new Box(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
new Ray3(new Vec3(5, 5, -10), new Vec3(0, 0, 1)).intersectsBox(box); // false
```

## Ray3.intersectSphere()

First hit point on a sphere, else null.

Returns the entry point, or the exit point when the origin is inside the sphere. A sphere behind the origin is a miss.

```ts
intersectSphere(sphere: Sphere, target: Vec3 = new Vec3()): Vec3 | null
```

### Parameters

- `sphere` — `Sphere`.
- `target` — `Vec3`. Optional.

### Returns

`Vec3 | null` — the hit point, or `null`

### Example

```js
import { Ray3, Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere(new Vec3(0, 0, 0), 2);
const hit = new Ray3(new Vec3(0, 0, -10), new Vec3(0, 0, 1)).intersectSphere(sphere); // (0, 0, -2)
```

## Ray3.intersectsSphere()

True if the ray hits the sphere.

```ts
intersectsSphere(sphere: Sphere): boolean
```

### Parameters

- `sphere` — `Sphere`.

### Returns

`boolean`

### Example

```js
import { Ray3, Sphere, Vec3 } from '@1pizzateam/spock';

const sphere = new Sphere(new Vec3(0, 0, 0), 2);
new Ray3(new Vec3(0, 10, -10), new Vec3(0, 0, 1)).intersectsSphere(sphere); // false
```

## Ray3.intersectTriangle()

Möller-Trumbore ray/triangle test.

Returns the hit point on the triangle `a`, `b`, `c`, or null. With `backfaceCulling` on, triangles seen from behind (clockwise from the ray's point of view) are skipped.

```ts
intersectTriangle(a: Vec3, b: Vec3, c: Vec3, backfaceCulling: boolean = false, target: Vec3 = new Vec3()): Vec3 | null
```

### Parameters

- `a` — `Vec3`. First vertex.
- `b` — `Vec3`. Second vertex.
- `c` — `Vec3`. Third vertex.
- `backfaceCulling` — `boolean`. Optional.
- `target` — `Vec3`. Optional.

### Returns

`Vec3 | null` — the hit point, or `null`

### Example

```js
import { Ray3, Vec3 } from '@1pizzateam/spock';

const ray = new Ray3(new Vec3(0.2, 0.2, -5), new Vec3(0, 0, 1));
const hit = ray.intersectTriangle(new Vec3(0, 0, 0), new Vec3(1, 0, 0), new Vec3(0, 1, 0)); // (0.2, 0.2, 0)
```

## Ray3.clone()

An independent copy.

```ts
clone(): Ray3
```

### Parameters

None.

### Returns

`Ray3` — the new ray

### Example

```js
import { Ray3, Vec3 } from '@1pizzateam/spock';

const copy = new Ray3(new Vec3(1, 2, 3), new Vec3(0, 1, 0)).clone();
```

## Ray3.copy()

Copy another ray into this one.

```ts
copy(ray: Ray3): Ray3
```

### Parameters

- `ray` — `Ray3`.

### Returns

`Ray3` — the Ray3 with its new values

### Example

```js
import { Ray3, Vec3 } from '@1pizzateam/spock';

const original = new Ray3(new Vec3(1, 2, 3), new Vec3(0, 1, 0));
const result = new Ray3().copy(original);
```
