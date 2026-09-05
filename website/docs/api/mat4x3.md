# Mat4x3

Import with `import { Mat4x3 } from '@1pizzateam/spockjs';`.

## Constructor

Identity if no arguments; otherwise the given affine entries.

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

