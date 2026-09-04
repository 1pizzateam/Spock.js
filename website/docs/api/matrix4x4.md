# Matrix4x4

Import with `import { Matrix4x4 } from '@1pizzateam/spockjs';`.

## Constructor

Identity if no arguments; otherwise the given sixteen entries.

```ts
new Matrix4x4(x1?:number, x2?:number, x3?:number, x4?:number, y1?:number, y2?:number, y3?:number, y4?:number, z1?:number, z2?:number, z3?:number, z4?:number, t1?:number, t2?:number, t3?:number, t4?:number)
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

`Matrix4x4`

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';

const value = new Matrix4x4(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
```

## Matrix4x4.copy()

Copy another matrix into this one.

```ts
copy(matrix4x4: Matrix4x4): Matrix4x4
```

### Parameters

- `matrix4x4` — `Matrix4x4`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().copy(new Matrix4x4());
```

## Matrix4x4.toArray()

Live buffer, or a copy into target.

```ts
toArray(target?: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. Optional.

### Returns

`Float32Array` — the Matrix4x4 as an array

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().toArray(new Float32Array(16));
```

## Matrix4x4.toString()

Human-readable row string.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — the Matrix4x4 as a string

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().toString();
```

## Matrix4x4.identity()

Set this matrix to identity.

```ts
identity(): Matrix4x4
```

### Parameters

None.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().identity();
```

## Matrix4x4.scale()

Compose a 3D scale onto this matrix.

```ts
scale(vector3: Vector3): Matrix4x4
```

### Parameters

- `vector3` — `Vector3`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4, Vector3 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().scale(new Vector3(1, 2, 3));
```

## Matrix4x4.rotateX()

Compose a rotation about X (radians).

```ts
rotateX(angle: number): Matrix4x4
```

### Parameters

- `angle` — `number`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().rotateX(Math.PI / 4);
```

## Matrix4x4.rotateY()

Compose a rotation about Y (radians).

```ts
rotateY(angle: number): Matrix4x4
```

### Parameters

- `angle` — `number`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().rotateY(Math.PI / 4);
```

## Matrix4x4.rotateZ()

Compose a rotation about Z (radians).

```ts
rotateZ(angle: number): Matrix4x4
```

### Parameters

- `angle` — `number`. the Matrix4x4 with its new values

### Returns

`Matrix4x4`

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().rotateZ(Math.PI / 4);
```

## Matrix4x4.translate()

Compose a 3D translation onto this matrix.

```ts
translate(vector3: Vector3): Matrix4x4
```

### Parameters

- `vector3` — `Vector3`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4, Vector3 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().translate(new Vector3(1, 2, 3));
```

## Matrix4x4.multiply()

Multiply by another 4×4 matrix.

```ts
multiply(matrix4x4: Matrix4x4): Matrix4x4
```

### Parameters

- `matrix4x4` — `Matrix4x4`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().multiply(new Matrix4x4());
```

## Matrix4x4.perspective()

Perspective projection; fovy is in degrees.

```ts
perspective(fovy:number, aspect:number, znear:number, zfar:number): Matrix4x4
```

### Parameters

- `fovy` — `number`.
- `aspect` — `number`.
- `znear` — `number`.
- `zfar` — `number`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().perspective(Math.PI / 4, 16 / 9, 0.1, 100);
```

## Matrix4x4.orthographic()

Orthographic projection.

```ts
orthographic(left:number, right:number, top:number, bottom:number, near:number, far:number): Matrix4x4
```

### Parameters

- `left` — `number`.
- `right` — `number`.
- `top` — `number`.
- `bottom` — `number`.
- `near` — `number`.
- `far` — `number`.

### Returns

`Matrix4x4` — the Matrix4x4 with its new values

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().orthographic(-1, 1, 1, -1, 0.1, 100);
```

## Matrix4x4.transpose()

Transpose in place.

```ts
transpose(): Matrix4x4
```

### Parameters

None.

### Returns

`Matrix4x4`

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().transpose();
```

## Matrix4x4.determinant()

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
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().determinant();
```

## Matrix4x4.invert()

Invert in place; unchanged if singular.

```ts
invert(): Matrix4x4
```

### Parameters

None.

### Returns

`Matrix4x4`

### Example

```js
import { Matrix4x4 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().invert();
```

## Matrix4x4.lookAtRH()

Right-handed look-at view matrix; identity if eye equals target.

```ts
lookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix4x4
```

### Parameters

- `eye` — `Vector3`.
- `target` — `Vector3`.
- `up` — `Vector3`.

### Returns

`Matrix4x4`

### Example

```js
import { Matrix4x4, Vector3 } from '@1pizzateam/spockjs';


const result = new Matrix4x4().lookAtRH(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3));
```

