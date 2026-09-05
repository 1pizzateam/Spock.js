# Mat4

A full 4×4 matrix: affine transforms plus the projection matrices a renderer needs.

It covers everything `Mat4x3` does — translate, scale, rotate about each axis, `lookAtRH()` — and adds `perspective()` and `orthographic()`, which write the projection row that `Mat4x3` leaves out.

Entries live in a `Float32Array`. `toArray()` with no argument returns that live buffer for a WebGL upload; pass a target to copy instead. `multiply()` preserves the last row, so composing with a perspective matrix behaves.

```js
import { Mat4, Vec3 } from '@1pizzateam/spockjs';

const projection = new Mat4().perspective(Math.PI / 4, 16 / 9, 0.1, 100);
const view = new Mat4().lookAtRH(
  new Vec3(0, 2, 6),
  new Vec3(),
  new Vec3(0, 1, 0)
);

const viewProjection = new Mat4().copy(projection).multiply(view);
```

## Constructor

Identity if no arguments; otherwise the given sixteen entries.

No arguments gives the identity matrix; otherwise pass all sixteen entries. Omitted values become 0, while an explicit 0 or `NaN` is kept.

```ts
new Mat4(x1?:number, x2?:number, x3?:number, x4?:number, y1?:number, y2?:number, y3?:number, y4?:number, z1?:number, z2?:number, z3?:number, z4?:number, t1?:number, t2?:number, t3?:number, t4?:number)
```

### Parameters

- `x1` — `number`. Optional.
- `x2` — `number`. Optional.
- `x3` — `number`. Optional.
- `x4` — `number`. Optional.
- `y1` — `number`. Optional.
- `y2` — `number`. Optional.
- `y3` — `number`. Optional.
- `y4` — `number`. Optional.
- `z1` — `number`. Optional.
- `z2` — `number`. Optional.
- `z3` — `number`. Optional.
- `z4` — `number`. Optional.
- `t1` — `number`. Optional.
- `t2` — `number`. Optional.
- `t3` — `number`. Optional.
- `t4` — `number`. Optional.

### Returns

`Mat4`

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';

const value = new Mat4(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
```

## Mat4.copy()

Copy another matrix into this one.

Overwrites this matrix from another one, reusing the buffer.

```ts
copy(matrix4x4: Mat4): Mat4
```

### Parameters

- `matrix4x4` — `Mat4`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().copy(new Mat4());
```

## Mat4.toArray()

Live buffer, or a copy into target.

With no argument this hands back the live `Float32Array`, ready for a WebGL uniform. Pass a target array to copy into instead.

```ts
toArray(target?: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. Optional.

### Returns

`Float32Array` — the Mat4 as an array

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().toArray(new Float32Array(16));
```

## Mat4.toString()

Human-readable row string.

A readable dump of the entries for debugging.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — the Mat4 as a string

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().toString();
```

## Mat4.identity()

Set this matrix to identity.

Resets to the identity matrix.

```ts
identity(): Mat4
```

### Parameters

None.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().identity();
```

## Mat4.scale()

Compose a 3D scale onto this matrix.

Composes a scale onto the current matrix rather than replacing it.

```ts
scale(vector3: Vec3): Mat4
```

### Parameters

- `vector3` — `Vec3`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4, Vec3 } from '@1pizzateam/spockjs';


const result = new Mat4().scale(new Vec3(1, 2, 3));
```

## Mat4.rotateX()

Compose a rotation about X (radians).

Composes a rotation about the X axis, in radians, onto the current matrix.

```ts
rotateX(angle: number): Mat4
```

### Parameters

- `angle` — `number`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().rotateX(Math.PI / 4);
```

## Mat4.rotateY()

Compose a rotation about Y (radians).

Composes a rotation about the Y axis onto the current matrix.

```ts
rotateY(angle: number): Mat4
```

### Parameters

- `angle` — `number`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().rotateY(Math.PI / 4);
```

## Mat4.rotateZ()

Compose a rotation about Z (radians).

Composes a rotation about the Z axis onto the current matrix.

```ts
rotateZ(angle: number): Mat4
```

### Parameters

- `angle` — `number`. the Mat4 with its new values

### Returns

`Mat4`

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().rotateZ(Math.PI / 4);
```

## Mat4.translate()

Compose a 3D translation onto this matrix.

Composes a translation onto the current matrix, so an earlier rotation also rotates this movement.

```ts
translate(vector3: Vec3): Mat4
```

### Parameters

- `vector3` — `Vec3`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4, Vec3 } from '@1pizzateam/spockjs';


const result = new Mat4().translate(new Vec3(1, 2, 3));
```

## Mat4.multiply()

Multiply by another 4×4 matrix.

Multiplies this matrix by another in place. It preserves the last row, so composing a projection with a view matrix behaves correctly.

```ts
multiply(matrix4x4: Mat4): Mat4
```

### Parameters

- `matrix4x4` — `Mat4`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().multiply(new Mat4());
```

## Mat4.perspective()

Perspective projection; fovy is in degrees.

Builds a perspective projection from a vertical field of view in radians, an aspect ratio, and the near and far clip distances. Anything outside those planes is clipped, and a very small `znear` costs depth precision.

```ts
perspective(fovy:number, aspect:number, znear:number, zfar:number): Mat4
```

### Parameters

- `fovy` — `number`.
- `aspect` — `number`.
- `znear` — `number`.
- `zfar` — `number`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().perspective(Math.PI / 4, 16 / 9, 0.1, 100);
```

## Mat4.orthographic()

Orthographic projection.

Builds a parallel projection from six clip planes, so on-screen size does not fall off with distance. This is the projection for 2D overlays, CAD-style views, and shadow maps.

```ts
orthographic(left:number, right:number, top:number, bottom:number, near:number, far:number): Mat4
```

### Parameters

- `left` — `number`.
- `right` — `number`.
- `top` — `number`.
- `bottom` — `number`.
- `near` — `number`.
- `far` — `number`.

### Returns

`Mat4` — the Mat4 with its new values

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().orthographic(-1, 1, 1, -1, 0.1, 100);
```

## Mat4.transpose()

Transpose in place.

Flips the matrix about its diagonal, swapping rows and columns.

```ts
transpose(): Mat4
```

### Parameters

None.

### Returns

`Mat4`

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().transpose();
```

## Mat4.determinant()

Determinant.

Returns a number describing how the transform scales volume. Zero means the matrix is singular and has no inverse.

```ts
determinant(): number
```

### Parameters

None.

### Returns

`number`

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().determinant();
```

## Mat4.invert()

Invert in place; unchanged if singular.

Replaces this matrix with its inverse, which is how a view matrix becomes a camera-to-world transform. A singular matrix is left unchanged.

```ts
invert(): Mat4
```

### Parameters

None.

### Returns

`Mat4`

### Example

```js
import { Mat4 } from '@1pizzateam/spockjs';


const result = new Mat4().invert();
```

## Mat4.lookAtRH()

Right-handed look-at view matrix; identity if eye equals target.

Builds a right-handed view transform from an eye position, a target, and an up vector. Degenerate input falls back to a valid basis instead of producing `NaN`.

```ts
lookAtRH(eye: Vec3, target: Vec3, up: Vec3): Mat4
```

### Parameters

- `eye` — `Vec3`.
- `target` — `Vec3`.
- `up` — `Vec3`.

### Returns

`Mat4`

### Example

```js
import { Mat4, Vec3 } from '@1pizzateam/spockjs';


const result = new Mat4().lookAtRH(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

