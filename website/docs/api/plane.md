# Plane

An infinite plane in 3D: a unit `normal` and a `constant`, so that points on the plane satisfy `normal · p + constant = 0`.

<PlaneDemo />

`distanceToPoint()` returns the signed distance: positive on the side the normal points to, negative behind, zero on the plane. That single number classifies points for clipping and culling, and it is what `Frustum` evaluates for each of its six planes.

Planes with arbitrary coefficients `(a, b, c, d)` of `ax + by + cz + d = 0` are built by passing a `Vec3` normal and the constant to `Plane.set()`, then calling `normalize()` so distances are in world units. `Frustum` does this for each of its six planes.

```js
import { Plane, Vec3 } from '@1pizzateam/spock';

// the plane y = 5, facing up
const floor = new Plane(new Vec3(0, 1, 0), -5);

floor.distanceToPoint(new Vec3(0, 8, 0)); // 3
floor.distanceToPoint(new Vec3(0, 2, 0)); // -3
```

## Constructor

The plane x = 0 by default.

Takes the normal (copied, not normalized) and the constant. Pass a unit normal for distances in world units, or pass the coefficients to `Plane.set()` as a `Vec3` normal and constant, then call `normalize()`.

```ts
new Plane(normal: Vec3 = new Vec3(1, 0, 0), constant: number = 0)
```

### Parameters

- `normal` — `Vec3`. Optional.
- `constant` — `number`. Optional.

### Returns

`Plane`

### Example

```js
import { Plane, Vec3 } from '@1pizzateam/spock';

const plane = new Plane(new Vec3(0, 1, 0), -5);
```

## Plane.set()

Set the normal and the constant.

Copies the normal without normalizing it.

```ts
set(normal: Vec3, constant: number): Plane
```

### Parameters

- `normal` — `Vec3`.
- `constant` — `number`.

### Returns

`Plane` — the Plane with its new values

### Example

```js
import { Plane, Vec3 } from '@1pizzateam/spock';

const plane = new Plane().set(new Vec3(0, 0, 1), -2);
```

## Plane.normalize()

Scale so the normal has unit length.

The constant is scaled by the same factor, so the plane does not move. A zero normal is left as it is.

```ts
normalize(): Plane
```

### Parameters

None.

### Returns

`Plane` — the normalized Plane

### Example

```js
import { Plane, Vec3 } from '@1pizzateam/spock';

const plane = new Plane(new Vec3(0, 4, 0), -8).normalize(); // normal (0, 1, 0), constant -2
```

## Plane.distanceToPoint()

Signed distance from the plane to a point.

Positive on the side the normal points to, negative on the other. The value is in world units only when the normal is unit length.

```ts
distanceToPoint(point: Vec3): number
```

### Parameters

- `point` — `Vec3`.

### Returns

`number` — the signed distance

### Example

```js
import { Plane, Vec3 } from '@1pizzateam/spock';

const plane = new Plane(new Vec3(0, 1, 0), -5);
plane.distanceToPoint(new Vec3(0, 10, 0)); // 5
plane.distanceToPoint(new Vec3(0, 0, 0)); // -5
```
