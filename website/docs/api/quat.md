# Quat

A rotation stored as a unit quaternion: a scalar `w` plus a `Vec3` named `vector`.

Quaternions are the compact way to hold and blend 3D rotations. They avoid gimbal lock, compose with a single `multiply()`, and interpolate smoothly with `slerp()`, which is why they beat Euler angles for animation and camera work.

`new Quat()` is the identity rotation. Build one from an axis and angle with `setAxisAngle()`, or from Euler angles with `setFromEuler()`. At render time `toMat4()` or `toMat4x3()` writes the rotation into a matrix. Component order is `[w, x, y, z]` in both the constructor and `toArray()`.

```js
import { Quat, Vec3 } from '@1pizzateam/spockjs';

const start = new Quat();
const end = new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);

const current = start.clone().slerp(end, 0.25);
const facing = current.multiplyVector(new Vec3(0, 0, 1));
```

## Constructor

Identity by default: (1, 0, 0, 0).

Defaults to the identity rotation, `(1, 0, 0, 0)`. Arguments are in `[w, x, y, z]` order, matching what `toArray()` returns.

```ts
new Quat(w: number = 1, x: number = 0, y: number = 0, z: number = 0)
```

### Parameters

- `w` — `number`. Optional.
- `x` — `number`. Optional.
- `y` — `number`. Optional.
- `z` — `number`. Optional.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';

const value = new Quat(1, 1, 1, 1);
```

## Quat.set()

Set w, x, y, z.

Writes all four components at once, in `[w, x, y, z]` order.

```ts
set(w: number, x: number, y: number, z: number): Quat
```

### Parameters

- `w` — `number`.
- `x` — `number`.
- `y` — `number`.
- `z` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().set(1, 1, 1, 1);
```

## Quat.identity()

Set to identity.

Resets to the no-rotation quaternion.

```ts
identity(): Quat
```

### Parameters

None.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().identity();
```

## Quat.setAxisAngle()

Rotation of angle radians about a (possibly unnormalized) axis.

Builds a rotation of `angle` radians about `axis`. The axis need not be normalized, and a zero-length axis gives identity rather than `NaN`.

```ts
setAxisAngle(axis: Vec3, angle: number): Quat
```

### Parameters

- `axis` — `Vec3`.
- `angle` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat, Vec3 } from '@1pizzateam/spockjs';


const result = new Quat().setAxisAngle(new Vec3(1, 2, 3), Math.PI / 4);
```

## Quat.setFromEuler()

Set from x, y, and z Euler angles in radians.

Builds a rotation from three Euler angles in radians. Euler input is convenient for authoring, but the quaternion is what you should store and interpolate.

```ts
setFromEuler(x: number, y: number, z: number): Quat
```

### Parameters

- `x` — `number`.
- `y` — `number`.
- `z` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().setFromEuler(1, 1, 1);
```

## Quat.getAxisAngle()

Write the rotation axis into axis; return the angle in radians.

Writes the rotation axis into the vector you pass and returns the angle in radians: the inverse of `setAxisAngle()`.

```ts
getAxisAngle(axis: Vec3): number
```

### Parameters

- `axis` — `Vec3`.

### Returns

`number`

### Example

```js
import { Quat, Vec3 } from '@1pizzateam/spockjs';


const result = new Quat().getAxisAngle(new Vec3(1, 2, 3));
```

## Quat.clone()

Independent copy.

Returns an independent copy, including a separate vector part.

```ts
clone(): Quat
```

### Parameters

None.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().clone();
```

## Quat.copy()

Copy another quaternion into this one.

Overwrites this quaternion from another one, reusing the instance.

```ts
copy(q: Quat): Quat
```

### Parameters

- `q` — `Quat`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().copy(new Quat());
```

## Quat.toArray()

Write [w, x, y, z] into target (or a new array).

Components come out in `[w, x, y, z]` order, the same order the constructor takes. Pass a target array to fill instead of allocating.

```ts
toArray(target: number[] = []): number[]
```

### Parameters

- `target` — `number[]`. Optional.

### Returns

`number[]`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().toArray([1, 2, 3]);
```

## Quat.toString()

Human-readable (x, y, z, w) string.

A readable form for debugging.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().toString();
```

## Quat.getMagnitude()

Length, or squared length if square is true.

Length across all four components. A valid rotation has length 1; pass `true` for the squared length to skip the square root.

```ts
getMagnitude(square: boolean = false): number
```

### Parameters

- `square` — `boolean`. Optional.

### Returns

`number`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().getMagnitude(false);
```

## Quat.normalize()

Scale to unit length.

Scales back to unit length. Repeated multiplication accumulates floating-point drift, so renormalizing every so often keeps a rotation from skewing.

```ts
normalize(): Quat
```

### Parameters

None.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().normalize();
```

## Quat.conjugate()

Negate the vector part.

Negates the vector part. For a unit quaternion that is the inverse rotation, and it is cheaper than `invert()`.

```ts
conjugate(): Quat
```

### Parameters

None.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().conjugate();
```

## Quat.invert()

Invert in place; unchanged if zero.

Produces the rotation that undoes this one, dividing by the squared magnitude so it stays correct even when the quaternion is not unit length.

```ts
invert(): Quat
```

### Parameters

None.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().invert();
```

## Quat.dot()

Dot product with q.

Returns a number measuring how aligned two rotations are. `slerp()` uses its sign to decide which way round the sphere is shorter.

```ts
dot(q: Quat): number
```

### Parameters

- `q` — `Quat`.

### Returns

`number`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().dot(new Quat());
```

## Quat.multiply()

Hamilton product this *= q.

Composes another rotation onto this one. Order matters: `a.multiply(b)` applies `b` first, then `a`.

```ts
multiply(q: Quat): Quat
```

### Parameters

- `q` — `Quat`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().multiply(new Quat());
```

## Quat.premultiply()

Hamilton product this = q * this.

Composes in the opposite order to `multiply()`, applying this rotation first and the argument second.

```ts
premultiply(q: Quat): Quat
```

### Parameters

- `q` — `Quat`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().premultiply(new Quat());
```

## Quat.rotateX()

Compose a rotation about X (radians).

Composes a rotation of `angle` radians about the X axis, the same as multiplying by an axis-angle quaternion for that axis.

```ts
rotateX(angle: number): Quat
```

### Parameters

- `angle` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().rotateX(Math.PI / 4);
```

## Quat.rotateY()

Compose a rotation about Y (radians).

Composes a rotation about the Y axis onto this quaternion.

```ts
rotateY(angle: number): Quat
```

### Parameters

- `angle` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().rotateY(Math.PI / 4);
```

## Quat.rotateZ()

Compose a rotation about Z (radians).

Composes a rotation about the Z axis onto this quaternion.

```ts
rotateZ(angle: number): Quat
```

### Parameters

- `angle` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().rotateZ(Math.PI / 4);
```

## Quat.slerp()

Spherical interpolate toward q by t in [0, 1].

Spherical interpolation toward another rotation by `t`, moving at constant angular speed along the shorter arc. This is the reason to store rotations as quaternions: interpolating Euler angles or matrix entries does not behave this way.

```ts
slerp(q: Quat, t: number): Quat
```

### Parameters

- `q` — `Quat`.
- `t` — `number`.

### Returns

`Quat`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().slerp(new Quat(), 0.5);
```

## Quat.multiplyVector()

Rotate vector; write the result into target.

Rotates a vector by this quaternion. The input is never modified; the result goes into `target`, or into a new `Vec3` when you omit it.

```ts
multiplyVector(vector: Vec3, target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `vector` — `Vec3`.
- `target` — `Vec3`. Optional.

### Returns

`Vec3`

### Example

```js
import { Quat, Vec3 } from '@1pizzateam/spockjs';


const result = new Quat().multiplyVector(new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

## Quat.toMat4()

Write this rotation into a 4×4 matrix.

Writes the rotation into a 4×4 matrix so it can be combined with translation and projection. Pass a matrix to fill instead of allocating one.

```ts
toMat4(target: Mat4 = new Mat4()): Mat4
```

### Parameters

- `target` — `Mat4`. Optional.

### Returns

`Mat4`

### Example

```js
import { Quat, Mat4 } from '@1pizzateam/spockjs';


const result = new Quat().toMat4(new Mat4());
```

## Quat.toMat4x3()

Write this rotation into a 4×3 matrix.

Writes the rotation into an affine 4×3 matrix.

```ts
toMat4x3(target: Mat4x3 = new Mat4x3()): Mat4x3
```

### Parameters

- `target` — `Mat4x3`. Optional.

### Returns

`Mat4x3`

### Example

```js
import { Quat, Mat4x3 } from '@1pizzateam/spockjs';


const result = new Quat().toMat4x3(new Mat4x3());
```

## Quat.isIdentity()

True if this is approximately identity.

True when this is the no-rotation quaternion.

```ts
isIdentity(): boolean
```

### Parameters

None.

### Returns

`boolean`

### Example

```js
import { Quat } from '@1pizzateam/spockjs';


const result = new Quat().isIdentity();
```

