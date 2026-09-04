# Quaternion

Import with `import { Quaternion } from '@1pizzateam/spockjs';`.

## Constructor

Identity by default: (1, 0, 0, 0).

```ts
new Quaternion(w: number = 1, x: number = 0, y: number = 0, z: number = 0)
```

### Parameters

- `w` — `number`. Optional.
- `x` — `number`. Optional.
- `y` — `number`. Optional.
- `z` — `number`. Optional.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';

const value = new Quaternion(1, 1, 1, 1);
```

## Quaternion.set()

Set w, x, y, z.

```ts
set(w: number, x: number, y: number, z: number): Quaternion
```

### Parameters

- `w` — `number`.
- `x` — `number`.
- `y` — `number`.
- `z` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().set(1, 1, 1, 1);
```

## Quaternion.identity()

Set to identity.

```ts
identity(): Quaternion
```

### Parameters

None.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().identity();
```

## Quaternion.setAxisAngle()

Rotation of angle radians about a (possibly unnormalized) axis.

```ts
setAxisAngle(axis: Vector3, angle: number): Quaternion
```

### Parameters

- `axis` — `Vector3`.
- `angle` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion, Vector3 } from '@1pizzateam/spockjs';


const result = new Quaternion().setAxisAngle(new Vector3(1, 2, 3), Math.PI / 4);
```

## Quaternion.setFromEuler()

Set from x, y, and z Euler angles in radians.

```ts
setFromEuler(x: number, y: number, z: number): Quaternion
```

### Parameters

- `x` — `number`.
- `y` — `number`.
- `z` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().setFromEuler(1, 1, 1);
```

## Quaternion.getAxisAngle()

Write the rotation axis into axis; return the angle in radians.

```ts
getAxisAngle(axis: Vector3): number
```

### Parameters

- `axis` — `Vector3`.

### Returns

`number`

### Example

```js
import { Quaternion, Vector3 } from '@1pizzateam/spockjs';


const result = new Quaternion().getAxisAngle(new Vector3(1, 2, 3));
```

## Quaternion.clone()

Independent copy.

```ts
clone(): Quaternion
```

### Parameters

None.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().clone();
```

## Quaternion.copy()

Copy another quaternion into this one.

```ts
copy(q: Quaternion): Quaternion
```

### Parameters

- `q` — `Quaternion`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().copy(new Quaternion());
```

## Quaternion.toArray()

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
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().toArray([1, 2, 3]);
```

## Quaternion.toString()

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
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().toString();
```

## Quaternion.getMagnitude()

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
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().getMagnitude(false);
```

## Quaternion.normalize()

Scale to unit length.

```ts
normalize(): Quaternion
```

### Parameters

None.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().normalize();
```

## Quaternion.conjugate()

Negate the vector part.

```ts
conjugate(): Quaternion
```

### Parameters

None.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().conjugate();
```

## Quaternion.invert()

Invert in place; unchanged if zero.

```ts
invert(): Quaternion
```

### Parameters

None.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().invert();
```

## Quaternion.dot()

Dot product with q.

```ts
dot(q: Quaternion): number
```

### Parameters

- `q` — `Quaternion`.

### Returns

`number`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().dot(new Quaternion());
```

## Quaternion.multiply()

Hamilton product this *= q.

```ts
multiply(q: Quaternion): Quaternion
```

### Parameters

- `q` — `Quaternion`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().multiply(new Quaternion());
```

## Quaternion.premultiply()

Hamilton product this = q * this.

```ts
premultiply(q: Quaternion): Quaternion
```

### Parameters

- `q` — `Quaternion`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().premultiply(new Quaternion());
```

## Quaternion.rotateX()

Compose a rotation about X (radians).

```ts
rotateX(angle: number): Quaternion
```

### Parameters

- `angle` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().rotateX(Math.PI / 4);
```

## Quaternion.rotateY()

Compose a rotation about Y (radians).

```ts
rotateY(angle: number): Quaternion
```

### Parameters

- `angle` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().rotateY(Math.PI / 4);
```

## Quaternion.rotateZ()

Compose a rotation about Z (radians).

```ts
rotateZ(angle: number): Quaternion
```

### Parameters

- `angle` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().rotateZ(Math.PI / 4);
```

## Quaternion.slerp()

Spherical interpolate toward q by t in [0, 1].

```ts
slerp(q: Quaternion, t: number): Quaternion
```

### Parameters

- `q` — `Quaternion`.
- `t` — `number`.

### Returns

`Quaternion`

### Example

```js
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().slerp(new Quaternion(), 0.5);
```

## Quaternion.multiplyVector()

Rotate vector; write the result into target.

```ts
multiplyVector(vector: Vector3, target: Vector3 = new Vector3()): Vector3
```

### Parameters

- `vector` — `Vector3`.
- `target` — `Vector3`. Optional.

### Returns

`Vector3`

### Example

```js
import { Quaternion, Vector3 } from '@1pizzateam/spockjs';


const result = new Quaternion().multiplyVector(new Vector3(1, 2, 3), new Vector3(1, 2, 3));
```

## Quaternion.toMatrix4x4()

Write this rotation into a 4×4 matrix.

```ts
toMatrix4x4(target: Matrix4x4 = new Matrix4x4()): Matrix4x4
```

### Parameters

- `target` — `Matrix4x4`. Optional.

### Returns

`Matrix4x4`

### Example

```js
import { Quaternion, Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Quaternion().toMatrix4x4(new Matrix4x4());
```

## Quaternion.toMatrix4x3()

Write this rotation into a 4×3 matrix.

```ts
toMatrix4x3(target: Matrix4x3 = new Matrix4x3()): Matrix4x3
```

### Parameters

- `target` — `Matrix4x3`. Optional.

### Returns

`Matrix4x3`

### Example

```js
import { Quaternion, Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Quaternion().toMatrix4x3(new Matrix4x3());
```

## Quaternion.isIdentity()

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
import { Quaternion } from '@1pizzateam/spockjs';


const result = new Quaternion().isIdentity();
```

