# Matrix3x3

Import with `import { Matrix3x3 } from '@1pizzateam/spockjs';`.

## Constructor

Identity if no arguments; otherwise the given nine entries.

```ts
new Matrix3x3(x1?:number, x2?:number, x3?:number, y1?:number, y2?:number, y3?:number, t1?:number, t2?:number, t3?:number)
```

### Parameters

- `x1` — `number`. Optional.
- `x2` — `number`. Optional.
- `x3` — `number`. Optional.
- `y1` — `number`. Optional.
- `y2` — `number`. Optional.
- `y3` — `number`. Optional.
- `t1` — `number`. Optional.
- `t2` — `number`. Optional.
- `t3` — `number`. Optional.

### Returns

`Matrix3x3`

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';

const value = new Matrix3x3(1, 1, 1, 1, 1, 1, 1, 1, 1);
```

## Matrix3x3.copy()

Copy another matrix into this one.

```ts
copy(matrix3x3: Matrix3x3): Matrix3x3
```

### Parameters

- `matrix3x3` — `Matrix3x3`.

### Returns

`Matrix3x3` — the Matrix3x3 with its new values

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().copy(new Matrix3x3());
```

## Matrix3x3.toArray()

Live buffer, or a copy into target.

```ts
toArray(target?: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. Optional.

### Returns

`Float32Array` — the Matrix3x3 as an array

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().toArray(new Float32Array(16));
```

## Matrix3x3.toString()

Human-readable row string.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — the Matrix3x3 as a string

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().toString();
```

## Matrix3x3.identity()

Set this matrix to identity.

```ts
identity(): Matrix3x3
```

### Parameters

None.

### Returns

`Matrix3x3` — the Matrix3x3 with its new values

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().identity();
```

## Matrix3x3.scale()

Compose a 2D scale onto this matrix.

```ts
scale(vector2: Vector2): Matrix3x3
```

### Parameters

- `vector2` — `Vector2`.

### Returns

`Matrix3x3` — the Matrix3x3 with its new values

### Example

```js
import { Matrix3x3, Vector2 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().scale(new Vector2(1, 2));
```

## Matrix3x3.rotate()

Compose a 2D rotation (radians) onto this matrix.

```ts
rotate(angle: number): Matrix3x3
```

### Parameters

- `angle` — `number`.

### Returns

`Matrix3x3` — the Matrix3x3 with its new values

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().rotate(Math.PI / 4);
```

## Matrix3x3.translate()

Compose a 2D translation onto this matrix.

```ts
translate(vector2: Vector2): Matrix3x3
```

### Parameters

- `vector2` — `Vector2`.

### Returns

`Matrix3x3` — the Matrix3x3 with its new values

### Example

```js
import { Matrix3x3, Vector2 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().translate(new Vector2(1, 2));
```

## Matrix3x3.multiply()

Multiply by another 3×3 matrix.

```ts
multiply(matrix3x3: Matrix3x3): Matrix3x3
```

### Parameters

- `matrix3x3` — `Matrix3x3`.

### Returns

`Matrix3x3` — the Matrix3x3 with its new values

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().multiply(new Matrix3x3());
```

## Matrix3x3.transpose()

Transpose in place.

```ts
transpose(): Matrix3x3
```

### Parameters

None.

### Returns

`Matrix3x3`

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().transpose();
```

## Matrix3x3.determinant()

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
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().determinant();
```

## Matrix3x3.invert()

Invert in place; unchanged if singular.

```ts
invert(): Matrix3x3
```

### Parameters

None.

### Returns

`Matrix3x3`

### Example

```js
import { Matrix3x3 } from '@1pizzateam/spockjs';


const result = new Matrix3x3().invert();
```

