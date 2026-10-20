# Recipes

Short, copy-pasteable examples that combine the 3D and ray additions. Every snippet was run against the library; the comments show what it produces.

## Node hierarchy: compose, combine, read back

`Mat4x3.compose()` builds a local matrix from a position, a `Quat` and a scale in one pass. Multiply a child's matrix onto its parent's to get a world matrix, then read positions back with `getTranslation()` or transform points with `transformPoint()`. For lighting, `toNormalMatrix()` writes the 3×3 normal matrix straight into a `Float32Array`.

```js
import { Mat4x3, Quat, Vec3 } from '@1pizzateam/spock';

const parent = new Mat4x3().compose(
  new Vec3(4, 0, 0),
  new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2),
  new Vec3(2, 1, 1)
);
const child = new Mat4x3().compose(new Vec3(1, 0, 0), new Quat(), new Vec3(1, 1, 1));

const world = new Mat4x3().copy(parent).multiply(child);
world.getTranslation();                       // (4, 0, -2)
world.transformPoint(new Vec3(0, 0, 0));      // (4, 0, -2)

const normalMatrix = parent.toNormalMatrix(new Float32Array(9)); // ready for uniformMatrix3fv
```

## Orbit camera

`Vec3.setFromSpherical()` turns an azimuth, an elevation and a distance into an offset; add the target to get the eye. `getSpherical()` goes the other way, which is how you start an orbit from an existing camera position. `Mat4.multiplyAffine()` combines a projection with the `Mat4x3` view.

```js
import { Mat4, Mat4x3, Vec3 } from '@1pizzateam/spock';

const target = new Vec3(0, 1, 0);
const eye = new Vec3().setFromSpherical(10, Math.PI / 4, 0.3).add(target); // (6.76, 3.96, 6.76)

const view = new Mat4x3().lookAtRH(eye, target, new Vec3(0, 1, 0));
const projection = new Mat4().perspective(60, 16 / 9, 0.1, 100);
const projectionView = new Mat4().copy(projection).multiplyAffine(view);

// resume an orbit from where the camera already is
const { x: radius, y: azimuth, z: elevation } = new Vec3().subVectors(eye, target).getSpherical();
// 10, 0.785, 0.3
```

## Frustum culling and mouse picking

Bounds follow their object with `applyMatrix4()`, a `Frustum` rejects what is off screen, and an inverted projection-view matrix unprojects the pointer into a `Ray3`. `Mat4.transformPoint()` performs the perspective divide for you.

```js
import { Box, Frustum, Mat4, Ray3, Sphere, Vec3, Mat4x3 } from '@1pizzateam/spock';

// projectionView comes from the camera recipe above
const frustum = new Frustum().setFromProjectionViewMatrix(projectionView);

const world = new Mat4x3().translate(new Vec3(0, 1, 0));
const bounds = new Sphere(new Vec3(0, 0, 0), 1).applyMatrix4(world);
const box = new Box().setFromPoints([-1, -1, -1, 1, 1, 1]).applyMatrix4(world); // (-1,0,-1) to (1,2,1)

frustum.intersectsSphere(bounds); // true: draw it

// normalized device coordinates of the pointer, -1..1
const inverse = new Mat4().copy(projectionView).invert();
const near = inverse.transformPoint(new Vec3(0, 0, -1));
const far = inverse.transformPoint(new Vec3(0, 0, 1));

const ray = new Ray3(near, new Vec3().subVectors(far, near)); // direction is normalized
ray.intersectSphere(bounds); // first hit point, or null
ray.intersectBox(box);
```

## 2D line of sight

A `Ray2` is tested against any number of `Rect` and `Circ` shapes. Pass a reusable hit object to avoid allocating, and keep the nearest hit with `fraction`. The distance along the ray is `fraction * maxDistance`.

```js
import { Circ, Ray2, Rect, Vec2 } from '@1pizzateam/spock';

const walls = [new Rect(new Vec2(2, 10), new Vec2(10, 0)), new Circ(2, new Vec2(20, 0))];
const viewer = new Ray2(new Vec2(0, 0), new Vec2(1, 0));
const maxDistance = 50;

const hit = { fraction: 0, point: new Vec2(), normal: new Vec2() };
let nearest = Infinity;
for (const wall of walls) {
  const result = wall instanceof Rect
    ? viewer.intersectRect(wall, maxDistance, hit)
    : viewer.intersectCirc(wall, maxDistance, hit);
  if (result) nearest = Math.min(nearest, result.fraction * maxDistance);
}
// nearest === 9: the rectangle's left face, normal (-1, 0)
```

## Reading and writing vertex buffers

`setArray()` and `toArray()` work on typed arrays with an offset, so vectors can read from and write into a packed buffer without temporary arrays. `Box.setFromPoints()` accepts the buffer directly.

```js
import { Box, Vec3 } from '@1pizzateam/spock';

const positions = new Float32Array(9);
new Vec3(1, 2, 3).toArray(positions, 0);
new Vec3(4, 5, 6).toArray(positions, 3);
new Vec3(7, 8, 9).toArray(positions, 6);

const second = new Vec3().setArray(positions, 3);   // (4, 5, 6)
const bounds = new Box().setFromPoints(positions);  // (1, 2, 3) to (7, 8, 9)
```

## Facing a target

`Quat.lookAt()` builds an orientation whose -Z axis faces the target, `getEuler()` reads it back as angles, and `setFromRotationMatrix()` recovers it from a full model matrix (scale and translation are ignored).

```js
import { Mat4x3, Quat, Vec3 } from '@1pizzateam/spock';

const rotation = new Quat().lookAt(new Vec3(0, 0, 0), new Vec3(5, 0, 0), new Vec3(0, 1, 0));
rotation.multiplyVector(new Vec3(0, 0, -1)); // (1, 0, 0)
rotation.getEuler();                          // (0, -π/2, 0)

const model = new Mat4x3().compose(new Vec3(1, 2, 3), rotation, new Vec3(2, 2, 2));
new Quat().setFromRotationMatrix(model);      // the same rotation
```
