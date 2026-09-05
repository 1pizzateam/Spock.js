# Quat

Import with `import { Quat } from '@1pizzateam/spockjs';`.

## Constructor

Identity by default: (1, 0, 0, 0).

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

