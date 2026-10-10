# Plane

An infinite plane in 3D: a unit `normal` and a `constant`, so that points on the plane satisfy `normal · p + constant = 0`.

<PlaneDemo />

`distanceToPoint()` returns the signed distance: positive on the side the normal points to, negative behind, zero on the plane. That single number classifies points for clipping and culling, and it is what `Frustum` evaluates for each of its six planes.

Planes are normally built from the four coefficients `(a, b, c, d)` of `ax + by + cz + d = 0`, as in the frustum extraction from a projection-view matrix. `setComponents()` normalizes them so distances are in world units.

```js
import { Plane, Vec3 } from '@1pizzateam/spock';

// the plane y = 5, facing up
const floor = new Plane(new Vec3(0, 1, 0), -5);

floor.distanceToPoint(new Vec3(0, 8, 0)); // 3
floor.distanceToPoint(new Vec3(0, 2, 0)); // -3
```

## Constructor

The plane x = 0 by default.

Takes the normal (copied, not normalized) and the constant. Pass a unit normal for distances in world units, or use `setComponents()` / `normalize()`.

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

## Plane.setComponents()

Set from `(a, b, c, d)` coefficients and normalize.

Sets the normal to `(a, b, c)` and the constant to `d`, then scales both so the normal has unit length.

```ts
setComponents(x: number, y: number, z: number, w: number): Plane
```

### Parameters

- `x` — `number`. Normal x (a).
- `y` — `number`. Normal y (b).
- `z` — `number`. Normal z (c).
- `w` — `number`. Constant (d).

### Returns

`Plane` — the normalized Plane

### Example

```js
import { Plane } from '@1pizzateam/spock';

const plane = new Plane().setComponents(0, 2, 0, -10); // normal (0, 1, 0), constant -5
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
