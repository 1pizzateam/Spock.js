# Frustum

The six planes of a camera's view volume: left, right, bottom, top, near and far. Testing a bounding volume against it tells you whether it can be seen, so off-screen objects are skipped before they cost any draw work.

<FrustumDemo />

Build it once per frame from the camera's projection-view matrix with `setFromProjectionViewMatrix()`. The six [`Plane`](./plane)s face inward, so a point is inside when its signed distance to every plane is non-negative.

The shape tests are conservative: they reject a shape only when it is entirely outside one plane. A shape near a corner of the frustum can be reported as visible while not actually touching it, which is the right trade-off for culling.

```js
import { Frustum, Mat4, Mat4x3, Sphere, Vec3 } from '@1pizzateam/spock';

const view = new Mat4x3().lookAtRH(eye, target, new Vec3(0, 1, 0));
const projectionView = new Mat4().perspective(60, 16 / 9, 0.1, 100).multiplyAffine(view);

const frustum = new Frustum().setFromProjectionViewMatrix(projectionView);
const visible = objects.filter(object => frustum.intersectsSphere(object.bounds));
```

## Constructor

Six planes, left, right, bottom, top, near, far.

All six start as default planes; call `setFromProjectionViewMatrix()` to give them meaning. The planes are available as `frustum.planes`.

```ts
new Frustum()
```

### Parameters

None.

### Returns

`Frustum`

### Example

```js
import { Frustum } from '@1pizzateam/spock';

const frustum = new Frustum();
frustum.planes.length; // 6
```

## Frustum.setFromProjectionViewMatrix()

Extract the planes from a projection-view matrix.

Uses the standard row combinations of a column-major `Mat4` and normalizes each plane. The matrix is projection × view; combine them with `Mat4.multiplyAffine()`.

```ts
setFromProjectionViewMatrix(matrix: Mat4): Frustum
```

### Parameters

- `matrix` — `Mat4`. A projection-view matrix.

### Returns

`Frustum` — the Frustum with its new planes

### Example

```js
import { Frustum, Mat4 } from '@1pizzateam/spock';

const projection = new Mat4().perspective(60, 1, 1, 100);
const frustum = new Frustum().setFromProjectionViewMatrix(projection);
```

## Frustum.intersectsSphere()

True unless the sphere is entirely outside one plane.

```ts
intersectsSphere(sphere: Sphere): boolean
```

### Parameters

- `sphere` — `Sphere`.

### Returns

`boolean`

### Example

```js
import { Frustum, Mat4, Sphere, Vec3 } from '@1pizzateam/spock';

const frustum = new Frustum().setFromProjectionViewMatrix(new Mat4().perspective(60, 1, 1, 100));
frustum.intersectsSphere(new Sphere(new Vec3(0, 0, -10), 1)); // true
frustum.intersectsSphere(new Sphere(new Vec3(0, 0, 10), 1)); // false, behind the camera
```

## Frustum.intersectsBox()

True unless the box is entirely outside one plane.

Tests each plane against the box corner that lies furthest along the plane's normal.

```ts
intersectsBox(box: Box): boolean
```

### Parameters

- `box` — `Box`.

### Returns

`boolean`

### Example

```js
import { Box, Frustum, Mat4, Vec3 } from '@1pizzateam/spock';

const frustum = new Frustum().setFromProjectionViewMatrix(new Mat4().perspective(60, 1, 1, 100));
frustum.intersectsBox(new Box(new Vec3(-1, -1, -15), new Vec3(1, 1, -10))); // true
```

## Frustum.containsPoint()

True if the point is inside all six planes.

```ts
containsPoint(point: Vec3): boolean
```

### Parameters

- `point` — `Vec3`.

### Returns

`boolean`

### Example

```js
import { Frustum, Mat4, Vec3 } from '@1pizzateam/spock';

const frustum = new Frustum().setFromProjectionViewMatrix(new Mat4().perspective(60, 1, 1, 100));
frustum.containsPoint(new Vec3(0, 0, -10)); // true
```
