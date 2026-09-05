# Mat4

Import with `import { Mat4 } from '@1pizzateam/spockjs';`.

## Constructor

Identity if no arguments; otherwise the given sixteen entries.

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

