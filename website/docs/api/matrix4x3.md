# Matrix4x3

Import with `import { Matrix4x3 } from '@1pizzateam/spockjs';`.

## Constructor

Identity if no arguments; otherwise the given affine entries.

```ts
new Matrix4x3(x1?:number, x2?:number, x3?:number, y1?:number, y2?:number, y3?:number, z1?:number, z2?:number, z3?:number, t1?:number, t2?:number, t3?:number)
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

`Matrix4x3`

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';

const value = new Matrix4x3(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
```

## Matrix4x3.copy()

Copy another matrix into this one.

```ts
copy(matrix4x3: Matrix4x3): Matrix4x3
```

### Parameters

- `matrix4x3` — `Matrix4x3`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().copy(new Matrix4x3());
```

## Matrix4x3.toArray()

Live buffer, or a copy into target.

```ts
toArray(target?: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. Optional.

### Returns

`Float32Array` — the Matrix4x3 as an array

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().toArray(new Float32Array(16));
```

## Matrix4x3.toString()

Human-readable row string.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — the Matrix4x3 as a string

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().toString();
```

## Matrix4x3.identity()

Set this matrix to identity.

```ts
identity(): Matrix4x3
```

### Parameters

None.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().identity();
```

## Matrix4x3.scale()

Compose a 3D scale onto this matrix.

```ts
scale(vector3: Vector3): Matrix4x3
```

### Parameters

- `vector3` — `Vector3`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3, Vector3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().scale(new Vector3(1, 2, 3));
```

## Matrix4x3.rotateX()

Compose a rotation about X (radians).

```ts
rotateX(angle: number): Matrix4x3
```

### Parameters

- `angle` — `number`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().rotateX(Math.PI / 4);
```

## Matrix4x3.rotateY()

Compose a rotation about Y (radians).

```ts
rotateY(angle: number): Matrix4x3
```

### Parameters

- `angle` — `number`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().rotateY(Math.PI / 4);
```

## Matrix4x3.rotateZ()

Compose a rotation about Z (radians).

```ts
rotateZ(angle: number): Matrix4x3
```

### Parameters

- `angle` — `number`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().rotateZ(Math.PI / 4);
```

## Matrix4x3.translate()

Compose a 3D translation onto this matrix.

```ts
translate(vector3: Vector3): Matrix4x3
```

### Parameters

- `vector3` — `Vector3`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3, Vector3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().translate(new Vector3(1, 2, 3));
```

## Matrix4x3.multiply()

Multiply by another affine 4×3 matrix.

```ts
multiply(matrix4x3: Matrix4x3): Matrix4x3
```

### Parameters

- `matrix4x3` — `Matrix4x3`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().multiply(new Matrix4x3());
```

## Matrix4x3.lookAtRH()

Right-handed look-at view matrix; identity if eye equals target.

```ts
lookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix4x3
```

### Parameters

- `eye` — `Vector3`.
- `target` — `Vector3`.
- `up` — `Vector3`.

### Returns

`Matrix4x3` — the Matrix4x3 with its new values

### Example

```js
import { Matrix4x3, Vector3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().lookAtRH(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3));
```

## Matrix4x3.transposeLinear()

Transpose the linear 3×3 part.

```ts
transposeLinear(): Matrix4x3
```

### Parameters

None.

### Returns

`Matrix4x3`

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().transposeLinear();
```

## Matrix4x3.determinantLinear()

Determinant of the linear 3×3 part.

```ts
determinantLinear(): number
```

### Parameters

None.

### Returns

`number`

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().determinantLinear();
```

## Matrix4x3.invertAffine()

Invert as an affine transform; unchanged if the linear part is singular.

```ts
invertAffine(): Matrix4x3
```

### Parameters

None.

### Returns

`Matrix4x3`

### Example

```js
import { Matrix4x3 } from '@1pizzateam/spockjs';


const result = new Matrix4x3().invertAffine();
```

