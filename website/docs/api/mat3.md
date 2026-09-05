# Mat3

A 3×3 matrix for 2D affine transforms, stored in a `Float32Array`.

It handles the usual 2D pipeline: translation, rotation, and scale, composed together with `multiply()`. `new Mat3()` with no arguments is the identity matrix; pass nine numbers to set the entries directly.

`scale()`, `rotate()`, and `translate()` compose onto the current matrix rather than replacing it, so the order you call them in is the order they apply. `toArray()` hands back the live buffer, ready to upload to WebGL, or copies into an array you pass in.

```js
import { Mat3, Vec2 } from '@1pizzateam/spockjs';

const transform = new Mat3()
  .translate(new Vec2(120, 80))
  .rotate(Math.PI / 6)
  .scale(new Vec2(2, 2));

const buffer = transform.toArray(); // the live Float32Array(9)
```

## Constructor

Identity if no arguments; otherwise the given nine entries.

With no arguments you get the identity matrix, the usual starting point for building a transform. Pass all nine entries to set them directly; omitted values become 0, while an explicit 0 or `NaN` is kept.

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

Overwrites this matrix from another one, reusing the existing buffer.

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

With no argument this returns the live internal `Float32Array`, so later changes show up in it and it can go straight to a WebGL uniform. Pass a target array when you want an isolated copy.

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

A readable dump of the entries for debugging.

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

Resets to the identity matrix, discarding any transform already composed in.

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

Composes a scale onto the current matrix instead of replacing it, so it applies on top of whatever is already there.

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

Composes a rotation, in radians, onto the current matrix.

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

Composes a translation onto the current matrix. Because it composes, a rotation applied earlier also rotates this movement.

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

Multiplies this matrix by another and keeps the result here. Matrix multiplication does not commute, so the order changes the outcome.

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

Flips the matrix about its diagonal, swapping rows and columns.

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

Returns a number describing how the transform scales area. Zero means the matrix is singular and has no inverse.

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

Replaces the matrix with the transform that undoes it. A singular matrix is left unchanged, so check `determinant()` first if you need to detect that.

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

