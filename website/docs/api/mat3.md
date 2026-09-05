# Mat3

Import with `import { Mat3 } from '@1pizzateam/spockjs';`.

## Constructor

Identity if no arguments; otherwise the given nine entries.

```ts
new Mat3(x1?:number, x2?:number, x3?:number, y1?:number, y2?:number, y3?:number, t1?:number, t2?:number, t3?:number)
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

`Mat3`

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';

const value = new Mat3(1, 1, 1, 1, 1, 1, 1, 1, 1);
```

## Mat3.copy()

Copy another matrix into this one.

```ts
copy(matrix3x3: Mat3): Mat3
```

### Parameters

- `matrix3x3` — `Mat3`.

### Returns

`Mat3` — the Mat3 with its new values

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().copy(new Mat3());
```

## Mat3.toArray()

Live buffer, or a copy into target.

```ts
toArray(target?: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. Optional.

### Returns

`Float32Array` — the Mat3 as an array

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().toArray(new Float32Array(16));
```

## Mat3.toString()

Human-readable row string.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — the Mat3 as a string

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().toString();
```

## Mat3.identity()

Set this matrix to identity.

```ts
identity(): Mat3
```

### Parameters

None.

### Returns

`Mat3` — the Mat3 with its new values

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().identity();
```

## Mat3.scale()

Compose a 2D scale onto this matrix.

```ts
scale(vector2: Vec2): Mat3
```

### Parameters

- `vector2` — `Vec2`.

### Returns

`Mat3` — the Mat3 with its new values

### Example

```js
import { Mat3, Vec2 } from '@1pizzateam/spockjs';


const result = new Mat3().scale(new Vec2(1, 2));
```

## Mat3.rotate()

Compose a 2D rotation (radians) onto this matrix.

```ts
rotate(angle: number): Mat3
```

### Parameters

- `angle` — `number`.

### Returns

`Mat3` — the Mat3 with its new values

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().rotate(Math.PI / 4);
```

## Mat3.translate()

Compose a 2D translation onto this matrix.

```ts
translate(vector2: Vec2): Mat3
```

### Parameters

- `vector2` — `Vec2`.

### Returns

`Mat3` — the Mat3 with its new values

### Example

```js
import { Mat3, Vec2 } from '@1pizzateam/spockjs';


const result = new Mat3().translate(new Vec2(1, 2));
```

## Mat3.multiply()

Multiply by another 3×3 matrix.

```ts
multiply(matrix3x3: Mat3): Mat3
```

### Parameters

- `matrix3x3` — `Mat3`.

### Returns

`Mat3` — the Mat3 with its new values

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().multiply(new Mat3());
```

## Mat3.transpose()

Transpose in place.

```ts
transpose(): Mat3
```

### Parameters

None.

### Returns

`Mat3`

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().transpose();
```

## Mat3.determinant()

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
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().determinant();
```

## Mat3.invert()

Invert in place; unchanged if singular.

```ts
invert(): Mat3
```

### Parameters

None.

### Returns

`Mat3`

### Example

```js
import { Mat3 } from '@1pizzateam/spockjs';


const result = new Mat3().invert();
```

