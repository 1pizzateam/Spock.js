# Mat4x3

A 4×3 affine transform for 3D — rotation, scale, and translation, but no projection — stored in a 4×4 `Float32Array`.

Reach for it when a transform will never need perspective: object placement, node hierarchies, and camera views. Leaving out the projection row makes inversion cheaper and keeps the last column fixed at (0, 0, 0, 1).

Because the matrix is affine by construction, the linear-only operations are named for it: `transposeLinear()`, `determinantLinear()`, and `invertAffine()`. Use `Mat4` instead when you need `perspective()` or `orthographic()`.

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spockjs';

const view = new Mat4x3().lookAtRH(
  new Vec3(0, 2, 6), // eye
  new Vec3(0, 0, 0), // target
  new Vec3(0, 1, 0)  // up
);

const model = new Mat4x3()
  .translate(new Vec3(1, 0, 0))
  .rotateY(Math.PI / 4);
```

## Constructor

Identity if no arguments; otherwise the given affine entries.

No arguments gives the identity transform. Pass the twelve affine entries to set them; the last column stays (0, 0, 0, 1) because this type cannot hold a projection.

```ts
new Mat4x3(x1?:number, x2?:number, x3?:number, y1?:number, y2?:number, y3?:number, z1?:number, z2?:number, z3?:number, t1?:number, t2?:number, t3?:number)
```

### Parameters

- `x1` — `number`. Optional.
- `x2` — `number`. Optional.
- `x3` — `number`. Optional.
- `y1` — `number`. Optional.
- `y2` — `number`. Optional.
- `y3` — `number`. Optional.
- `z1` — `number`. Optional.
- `z2` — `number`. Optional.
- `z3` — `number`. Optional.
- `t1` — `number`. Optional.
- `t2` — `number`. Optional.
- `t3` — `number`. Optional.

### Returns

`Mat4x3`

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';

const value = new Mat4x3(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
```

## Mat4x3.copy()

Copy another matrix into this one.

Overwrites this transform from another one, reusing the buffer.

```ts
copy(matrix4x3: Mat4x3): Mat4x3
```

### Parameters

- `matrix4x3` — `Mat4x3`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().copy(new Mat4x3());
```

## Mat4x3.toArray()

Live buffer, or a copy into target.

Returns the live 4×4 `Float32Array` behind the transform, padded so it uploads to WebGL as a `mat4`. Pass a target array to copy instead.

```ts
toArray(target?: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. Optional.

### Returns

`Float32Array` — the Mat4x3 as an array

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().toArray(new Float32Array(16));
```

## Mat4x3.toString()

Human-readable row string.

A readable dump of the entries for debugging.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — the Mat4x3 as a string

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().toString();
```

## Mat4x3.identity()

Set this matrix to identity.

Resets to the identity transform.

```ts
identity(): Mat4x3
```

### Parameters

None.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().identity();
```

## Mat4x3.scale()

Compose a 3D scale onto this matrix.

Composes a scale onto the current transform rather than replacing it.

```ts
scale(vector3: Vec3): Mat4x3
```

### Parameters

- `vector3` — `Vec3`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().scale(new Vec3(1, 2, 3));
```

## Mat4x3.rotateX()

Compose a rotation about X (radians).

Composes a rotation about the X axis, in radians, onto the current transform.

```ts
rotateX(angle: number): Mat4x3
```

### Parameters

- `angle` — `number`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().rotateX(Math.PI / 4);
```

## Mat4x3.rotateY()

Compose a rotation about Y (radians).

Composes a rotation about the Y axis onto the current transform.

```ts
rotateY(angle: number): Mat4x3
```

### Parameters

- `angle` — `number`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().rotateY(Math.PI / 4);
```

## Mat4x3.rotateZ()

Compose a rotation about Z (radians).

Composes a rotation about the Z axis onto the current transform.

```ts
rotateZ(angle: number): Mat4x3
```

### Parameters

- `angle` — `number`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().rotateZ(Math.PI / 4);
```

## Mat4x3.translate()

Compose a 3D translation onto this matrix.

Composes a translation onto the current transform, so any rotation already applied also rotates this movement.

```ts
translate(vector3: Vec3): Mat4x3
```

### Parameters

- `vector3` — `Vec3`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().translate(new Vec3(1, 2, 3));
```

## Mat4x3.multiply()

Multiply by another affine 4×3 matrix.

Multiplies this transform by another in place. Order matters, and the affine last column is preserved.

```ts
multiply(matrix4x3: Mat4x3): Mat4x3
```

### Parameters

- `matrix4x3` — `Mat4x3`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().multiply(new Mat4x3());
```

## Mat4x3.lookAtRH()

Right-handed look-at view matrix; identity if eye equals target.

Builds a right-handed view transform placing the camera at `eye` looking toward `target`. If `up` is parallel to the view direction a fallback axis is used, and when `eye` equals `target` the result is identity, so neither case produces `NaN`.

```ts
lookAtRH(eye: Vec3, target: Vec3, up: Vec3): Mat4x3
```

### Parameters

- `eye` — `Vec3`.
- `target` — `Vec3`.
- `up` — `Vec3`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().lookAtRH(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

## Mat4x3.transposeLinear()

Transpose the linear 3×3 part.

Transposes only the 3×3 rotation and scale part, leaving the translation column alone. For a pure rotation that transpose is also its inverse.

```ts
transposeLinear(): Mat4x3
```

### Parameters

None.

### Returns

`Mat4x3`

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().transposeLinear();
```

## Mat4x3.determinantLinear()

Determinant of the linear 3×3 part.

Determinant of the 3×3 linear part, describing how the transform scales volume. Zero means it cannot be inverted.

```ts
determinantLinear(): number
```

### Parameters

None.

### Returns

`number`

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().determinantLinear();
```

## Mat4x3.invertAffine()

Invert as an affine transform; unchanged if the linear part is singular.

Inverts using the fact that the transform is affine, which is cheaper than a general 4×4 inversion. A singular matrix is left unchanged.

```ts
invertAffine(): Mat4x3
```

### Parameters

None.

### Returns

`Mat4x3`

### Example

```js
import { Mat4x3 } from '@1pizzateam/spockjs';


const result = new Mat4x3().invertAffine();
```

