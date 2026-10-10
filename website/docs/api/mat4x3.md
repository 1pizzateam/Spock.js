# Mat4x3

A 4×3 affine transform for 3D — rotation, scale, and translation, but no projection — stored in a 4×4 `Float32Array`.

<Mat4x3Demo />

Reach for it when a transform will never need perspective: object placement, node hierarchies, and camera views. Leaving out the projection row makes inversion cheaper and keeps the last column fixed at (0, 0, 0, 1).

Because the matrix is affine by construction, the linear-only operations are named for it: `transposeLinear()`, `determinantLinear()`, and `invertAffine()`. Use `Mat4` instead when you need `perspective()` or `orthographic()`.

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

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
import { Mat4x3 } from '@1pizzateam/spock';

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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3, Vec3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3, Vec3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3, Vec3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


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
import { Mat4x3 } from '@1pizzateam/spock';


const result = new Mat4x3().invertAffine();
```

## Mat4x3.compose()

Set to translate × rotate × scale in a single pass.

Builds the whole local transform from a position, a `Quat` rotation and a scale without intermediate matrices. It overwrites the current contents, so it replaces the usual `identity().translate().multiply(rotation).scale()` chain and is the cheapest way to rebuild a node's matrix each frame.

```ts
compose(position: Vec3, rotation: Quat, scale: Vec3): Mat4x3
```

### Parameters

- `position` — `Vec3`. Translation.
- `rotation` — `Quat`. Rotation; it should be a unit quaternion.
- `scale` — `Vec3`. Per-axis scale applied before the rotation.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3, Quat, Vec3 } from '@1pizzateam/spock';

const model = new Mat4x3().compose(
  new Vec3(1, 2, 3),
  new Quat().setFromEuler(0, Math.PI / 2, 0),
  new Vec3(2, 2, 2)
);
```

## Mat4x3.getTranslation()

Write the translation column into target.

Reads the position part of the transform. Pass a vector to reuse it; without a target a new `Vec3` is returned.

```ts
getTranslation(target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const position = new Mat4x3().translate(new Vec3(1, 2, 3)).getTranslation(); // (1, 2, 3)
```

## Mat4x3.setTranslation()

Overwrite the translation column.

Replaces the position without touching rotation or scale. `translate()` composes a movement in local space; this sets the absolute position.

```ts
setTranslation(position: Vec3): Mat4x3
```

### Parameters

- `position` — `Vec3`.

### Returns

`Mat4x3` — the Mat4x3 with its new values

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const result = new Mat4x3().rotateY(1).setTranslation(new Vec3(10, 0, 0));
```

## Mat4x3.getColumn()

Write a linear axis column into target.

Column 0, 1 and 2 are the transformed X, Y and Z axes. Column 2 negated is a camera-style forward direction; normalize it when the matrix has scale.

```ts
getColumn(index: 0 | 1 | 2, target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `index` — `0 | 1 | 2`. The axis column.
- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const xAxis = new Mat4x3().rotateZ(Math.PI / 2).getColumn(0); // (0, 1, 0)
```

## Mat4x3.getScale()

Write the length of each axis column into target.

Gives the per-axis scale of the transform. Its largest component is the factor to scale a bounding-sphere radius by.

```ts
getScale(target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const scale = new Mat4x3().scale(new Vec3(1, 3, 2)).getScale().maxComponent(); // 3
```

## Mat4x3.transformPoint()

Transform a point by rotation, scale, and translation.

Use it for positions. The target may be the input vector, so `m.transformPoint(v, v)` transforms in place.

```ts
transformPoint(vector: Vec3, target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `vector` — `Vec3`. The point.
- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const m = new Mat4x3().translate(new Vec3(10, 0, 0)).scale(new Vec3(2, 2, 2));
const world = m.transformPoint(new Vec3(1, 1, 1)); // (12, 2, 2)
```

## Mat4x3.transformDirection()

Transform a direction by rotation and scale, ignoring translation.

Use it for vectors that have no position, such as velocities and axes. The target may be the input vector.

```ts
transformDirection(vector: Vec3, target: Vec3 = new Vec3()): Vec3
```

### Parameters

- `vector` — `Vec3`. The direction.
- `target` — `Vec3`. Optional.

### Returns

`Vec3` — the target

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const m = new Mat4x3().translate(new Vec3(10, 0, 0)).scale(new Vec3(2, 2, 2));
const direction = m.transformDirection(new Vec3(1, 1, 1)); // (2, 2, 2)
```

## Mat4x3.toNormalMatrix()

Write the 3×3 normal matrix into target.

The normal matrix is the inverse transpose of the linear part, stored column-major in a `Float32Array(9)` ready for `uniformMatrix3fv`. It keeps normals perpendicular under non-uniform scale. A singular matrix writes the identity.

```ts
toNormalMatrix(target: Float32Array): Float32Array
```

### Parameters

- `target` — `Float32Array`. At least nine elements.

### Returns

`Float32Array` — the target

### Example

```js
import { Mat4x3, Vec3 } from '@1pizzateam/spock';

const normalMatrix = new Mat4x3().scale(new Vec3(2, 2, 2)).toNormalMatrix(new Float32Array(9));
// diagonal 0.5
```

