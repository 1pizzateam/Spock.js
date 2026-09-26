# Vec3

A mutable three-dimensional vector with public `x`, `y`, and `z` numbers.

<Vec3Demo />

It mirrors `Vec2` and adds the operations that only make sense in 3D, most notably `cross()` and a `getAngle()` that measures between two vectors. As with `Vec2`, methods mutate the receiver and return it, so calls chain and hot loops stay allocation-free.

`Vec3` is the vector type the 3D transforms speak: `Mat4.translate()`, `Mat4.lookAtRH()`, `Quat.setAxisAngle()`, and `Quat.multiplyVector()` all take or fill one.

```js
import { Vec3 } from '@1pizzateam/spock';

const forward = new Vec3(0, 0, -1);
const up = new Vec3(0, 1, 0);

const right = forward.clone().cross(up).normalize();
const angle = forward.getAngle(up); // radians, or false for a zero-length vector
```

## Quick Reference

| Category | Methods |
| :--- | :--- |
| **Creation & Component State** | [`new Vec3()`](#constructor) · [`setScalar()`](#vec3-setscalar) · [`setArray()`](#vec3-setarray) · [`copy()`](#vec3-copy) · [`clone()`](#vec3-clone) · [`toArray()`](#vec3-toarray) · [`toString()`](#vec3-tostring) · [`isOrigin()`](#vec3-isorigin) · [`origin()`](#vec3-origin) · [`equals()`](#vec3-equals) · [`isEqualTo()`](#vec3-isequalto) · [`isPositive()`](#vec3-ispositive) |
| **Arithmetic & Modification** | [`add()`](#vec3-add) · [`addScaledVector()`](#vec3-addscaledvector) · [`addScalar()`](#vec3-addscalar) · [`addComponents()`](#vec3-addcomponents) · [`subtract()`](#vec3-subtract) · [`subtractScaledVector()`](#vec3-subtractscaledvector) · [`subtractScalar()`](#vec3-subtractscalar) · [`multiply()`](#vec3-multiply) · [`multiplyScaledVector()`](#vec3-multiplyscaledvector) · [`scale()`](#vec3-scale) · [`divide()`](#vec3-divide) · [`divideScaledVector()`](#vec3-dividescaledvector) · [`divideScalar()`](#vec3-dividescalar) · [`halve()`](#vec3-halve) · [`opposite()`](#vec3-opposite) · [`absolute()`](#vec3-absolute) · [`sign()`](#vec3-sign) · [`floor()`](#vec3-floor) · [`ceil()`](#vec3-ceil) · [`max()`](#vec3-max) · [`min()`](#vec3-min) · [`maxScalar()`](#vec3-maxscalar) · [`minScalar()`](#vec3-minscalar) |
| **Target Operations** | [`addVectors()`](#vec3-addvectors) · [`subVectors()`](#vec3-subvectors) · [`multiplyVectors()`](#vec3-multiplyvectors) · [`scaleVector()`](#vec3-scalevector) · [`divideVectors()`](#vec3-dividevectors) · [`minVectors()`](#vec3-minvectors) · [`maxVectors()`](#vec3-maxvectors) · [`clampVectors()`](#vec3-clampvectors) · [`oppositeVector()`](#vec3-oppositevector) · [`absoluteVector()`](#vec3-absolutevector) · [`normalizeVector()`](#vec3-normalizevector) · [`crossVectors()`](#vec3-crossvectors) |
| **Geometric & Spatial Operations** | [`getMagnitude()`](#vec3-getmagnitude) · [`getDistance()`](#vec3-getdistance) · [`normalize()`](#vec3-normalize) · [`dotProduct()`](#vec3-dotproduct) · [`cross()`](#vec3-cross) · [`getAngle()`](#vec3-getangle) · [`clamp()`](#vec3-clamp) · [`clampScalar()`](#vec3-clampscalar) · [`isInBounds()`](#vec3-isinbounds) · [`lerp()`](#vec3-lerp) |
| **Bézier Curves** | [`quadraticBezier()`](#vec3-quadraticbezier) · [`cubicBezier()`](#vec3-cubicbezier) · [`quadraticBezierDerivative()`](#vec3-quadraticbezierderivative) · [`cubicBezierDerivative()`](#vec3-cubicbezierderivative) · [`quadraticBezierSplit()`](#vec3-quadraticbeziersplit) · [`cubicBezierSplit()`](#vec3-cubicbeziersplit) · [`quadraticBezierLength()`](#vec3-quadraticbezierlength) · [`cubicBezierLength()`](#vec3-cubicbezierlength) · [`quadraticBezierParameterAtLength()`](#vec3-quadraticbezierparameteratlength) · [`cubicBezierParameterAtLength()`](#vec3-cubicbezierparameteratlength) |

---

## Creation & Component State

### Constructor

Create a 3D vector (defaults to the origin).

All three components default to 0, so `new Vec3()` is the origin.

```ts
new Vec3(x: number = 0, y: number = 0, z: number = 0)
```

#### Parameters

- `x` — `number`. Optional.
- `y` — `number`. Optional.
- `z` — `number`. Optional.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const value = new Vec3(1, 1, 1);
```

### Vec3.setScalar()

Set x, y, and/or z; omitted axes are unchanged.

Passing `null` or `undefined` for an axis leaves that axis alone, so you can write one component without reading the others back.

```ts
setScalar(x?: number | null, y?: number | null, z?: number | null): Vec3
```

#### Parameters

- `x` — `number | null`. Optional. Value of the X axis
- `y` — `number | null`. Optional. Value of the Y axis
- `z` — `number | null`. Optional. Value of the Z axis

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().setScalar(1, 1, 1);
```

### Vec3.setArray()

Set x, y, z from array at offset.

Reads consecutive entries starting at `offset`, which makes it easy to pull one vertex out of a packed buffer. Entries past the end of the array leave that axis unchanged.

```ts
setArray(array: number[], offset: number = 0): Vec3
```

#### Parameters

- `array` — `number[]`. The array containing values for x, y and z axis
- `offset` — `number`. Optional. the starting index of the array

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().setArray([1, 2, 3], 0);
```

### Vec3.copy()

Copy another vector into this one.

Overwrites this vector from another one and keeps your instance, which is how you avoid an allocation inside a loop. Use `clone()` when you want a separate object.

```ts
copy(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().copy(new Vec3(1, 2, 3));
```

### Vec3.clone()

Independent copy.

Returns a new, independent vector. Take one before a chain of mutating calls when you still need the original.

```ts
clone(): Vec3
```

#### Parameters

None.

#### Returns

`Vec3` — The new vector

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().clone();
```

### Vec3.toArray()

Write [x, y, z] into target (or a new array).

Passing a target array writes into it and returns it, so you can fill part of a larger buffer without allocating.

```ts
toArray(target: number[] = []): number[]
```

#### Parameters

- `target` — `number[]`. Optional.

#### Returns

`number[]` — The vector as an array

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().toArray([1, 2, 3]);
```

### Vec3.toString()

Human-readable (x, y, z) string.

function toString() { [native code] }

```ts
toString(): string
```

#### Parameters

None.

#### Returns

`string` — The vector as a string

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().toString();
```

### Vec3.isOrigin()

True if all components are 0.

True only when every component is exactly zero.

```ts
isOrigin(): boolean
```

#### Parameters

None.

#### Returns

`boolean` — The result of the test

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().isOrigin();
```

### Vec3.origin()

Set all components to 0.

Resets every component to zero in place, reusing the instance instead of replacing it.

```ts
origin(): Vec3
```

#### Parameters

None.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().origin();
```

### Vec3.equals()

True if all components match the other vector.

Exact component comparison, so it inherits floating-point strictness: two vectors that reached the same value by different arithmetic can still differ in the last bits.

```ts
equals(vector: Vec3): boolean
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`boolean`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().equals(new Vec3(1, 2, 3));
```

### Vec3.isEqualTo()

True if all components equal scalar.

Compares every component against a single number, not against another vector. Use `equals()` for a vector-to-vector test.

```ts
isEqualTo(scalar: number): boolean
```

#### Parameters

- `scalar` — `number`.

#### Returns

`boolean` — The result of the test

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().isEqualTo(1);
```

### Vec3.isPositive()

True if all components are >= 0.

True when every component is zero or greater, so zero counts as positive.

```ts
isPositive(): boolean
```

#### Parameters

None.

#### Returns

`boolean` — The result of the test

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().isPositive();
```

## Arithmetic & Modification

### Vec3.add()

Add vector in place.

Adds component by component and returns this vector, so it chains.

```ts
add(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().add(new Vec3(1, 2, 3));
```

### Vec3.addScaledVector()

Add vector scaled by scalar.

Adds `vector * scalar` without building a temporary. This is the integration step in most motion code: `position.addScaledVector(velocity, deltaTime)`.

```ts
addScaledVector(vector: Vec3, scalar: number): Vec3
```

#### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().addScaledVector(new Vec3(1, 2, 3), 1);
```

### Vec3.addScalar()

Add scalar to all components.

Adds the same number to every component, shifting the vector along the diagonal.

```ts
addScalar(scalar: number): Vec3
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().addScalar(1);
```

### Vec3.addComponents()

Sum of x, y, and z.

Returns the sum of the components as a plain number and leaves the vector alone.

```ts
addComponents(): number
```

#### Parameters

None.

#### Returns

`number`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().addComponents();
```

### Vec3.subtract()

Subtract vector in place.

Subtracts component by component. To get the vector pointing from A to B, copy B and subtract A.

```ts
subtract(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().subtract(new Vec3(1, 2, 3));
```

### Vec3.subtractScaledVector()

Subtract vector scaled by scalar.

Subtracts `vector * scalar` in one step, the counterpart to `addScaledVector()`.

```ts
subtractScaledVector(vector: Vec3, scalar: number): Vec3
```

#### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().subtractScaledVector(new Vec3(1, 2, 3), 1);
```

### Vec3.subtractScalar()

Subtract scalar from all components.

Subtracts the same number from every component.

```ts
subtractScalar(scalar: number): Vec3
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().subtractScalar(1);
```

### Vec3.multiply()

Component-wise multiply.

Multiplies component by component, which is a non-uniform scale rather than any kind of vector product. For the dot product use `dotProduct()`.

```ts
multiply(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().multiply(new Vec3(1, 2, 3));
```

### Vec3.multiplyScaledVector()

Component-wise multiply by vector * scalar.

Component-wise multiply by `vector * scalar`, combining a non-uniform and a uniform scale in one pass.

```ts
multiplyScaledVector(vector: Vec3, scalar: number): Vec3
```

#### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().multiplyScaledVector(new Vec3(1, 2, 3), 1);
```

### Vec3.scale()

Multiply by scalar, optionally on one axis.

Multiplies every component by the scalar, or only one component when you name an axis. Chain it after `normalize()` to set a vector to an exact length.

```ts
scale(scalar: number, axis?: 'x' | 'y' | 'z'): Vec3
```

#### Parameters

- `scalar` — `number`.
- `axis` — `'x' | 'y' | 'z'`. Optional.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().scale(1, 'x');
```

### Vec3.divide()

Component-wise divide.

Divides component by component. A zero in the divisor yields `Infinity` rather than throwing.

```ts
divide(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().divide(new Vec3(1, 2, 3));
```

### Vec3.divideScaledVector()

Component-wise divide by vector * scalar.

Divides component-wise by `vector * scalar`.

```ts
divideScaledVector(vector: Vec3, scalar: number): Vec3
```

#### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().divideScaledVector(new Vec3(1, 2, 3), 1);
```

### Vec3.divideScalar()

Divide all components by scalar.

Divides every component by the scalar.

```ts
divideScalar(scalar: number): Vec3
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().divideScalar(1);
```

### Vec3.halve()

Scale by 1/2.

Multiplies by 0.5, which comes up constantly for midpoints and half-extents.

```ts
halve(): Vec3
```

#### Parameters

None.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().halve();
```

### Vec3.opposite()

Negate, optionally on one axis.

Negates every component, or one named axis. Negating all of them reverses the direction.

```ts
opposite(axis?: 'x' | 'y' | 'z'): Vec3
```

#### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional. The axis you want to set or undefined if you want to change both axis

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().opposite('x');
```

### Vec3.absolute()

Absolute value, optionally on one axis.

Takes the absolute value of every component, or of one named axis.

```ts
absolute(axis?: 'x' | 'y' | 'z'): Vec3
```

#### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional. The axis you want to set or undefined if you want to change both axis

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().absolute('x');
```

### Vec3.sign()

Replace each component with its sign (-1, 0, or 1) in-place.

```ts
sign(): Vec3
```

#### Returns

`Vec3` — this vector with components replaced by `Math.sign`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const v = new Vec3(-15, 0, 8).sign(); // (-1, 0, 1)
```

### Vec3.floor()

Floor, optionally on one axis.

Rounds every component down, or one named axis. This is how a position becomes an integer cell index.

```ts
floor(axis?: 'x' | 'y' | 'z'): Vec3
```

#### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().floor('x');
```

### Vec3.ceil()

Ceil, optionally on one axis.

Rounds every component up, or one named axis.

```ts
ceil(axis?: 'x' | 'y' | 'z'): Vec3
```

#### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().ceil('x');
```

### Vec3.max()

Component-wise maximum with vector.

Keeps the larger value on each axis independently, so the result can match neither input. Paired with `min()` this clamps a point into a box.

```ts
max(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().max(new Vec3(1, 2, 3));
```

### Vec3.min()

Component-wise minimum with vector.

Keeps the smaller value on each axis independently.

```ts
min(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().min(new Vec3(1, 2, 3));
```

### Vec3.maxScalar()

Raise each component to at least scalar.

Raises any component below the scalar up to it: a per-component lower bound.

```ts
maxScalar(scalar: number): Vec3
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().maxScalar(1);
```

### Vec3.minScalar()

Lower each component to at most scalar.

Lowers any component above the scalar down to it: a per-component upper bound.

```ts
minScalar(scalar: number): Vec3
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().minScalar(1);
```

## Target Operations

Target operations compute an operation directly into the receiver (`this`) in a single pass without copying or allocating intermediate vectors.

### Vec3.addVectors()

Set this vector to `a + b`.

```ts
addVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. First vector
- `b` — `Vec3`. Second vector

#### Returns

`Vec3` — this vector set to `a + b`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const dest = new Vec3();
dest.addVectors(new Vec3(10, 20, 30), new Vec3(1, 2, 3)); // (11, 22, 33)
```

### Vec3.subVectors()

Set this vector to `a - b`.

```ts
subVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. Left vector
- `b` — `Vec3`. Right vector to subtract from `a`

#### Returns

`Vec3` — this vector set to `a - b`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const delta = new Vec3();
delta.subVectors(posB, posA);
```

### Vec3.multiplyVectors()

Set this vector to component-wise `a * b`.

```ts
multiplyVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. First vector
- `b` — `Vec3`. Second vector

#### Returns

`Vec3` — this vector set to `(a.x * b.x, a.y * b.y, a.z * b.z)`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const dest = new Vec3();
dest.multiplyVectors(new Vec3(2, 4, 6), new Vec3(3, 5, 2)); // (6, 20, 12)
```

### Vec3.scaleVector()

Set this vector to `vector * scalar`.

```ts
scaleVector(vector: Vec3, scalar: number): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector
- `scalar` — `number`. Scaling factor

#### Returns

`Vec3` — this vector set to `(vector.x * scalar, vector.y * scalar, vector.z * scalar)`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const impulse = new Vec3();
impulse.scaleVector(contactNormal, magnitude);
```

### Vec3.divideVectors()

Set this vector to component-wise `a / b`.

```ts
divideVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. Numerator vector
- `b` — `Vec3`. Denominator vector

#### Returns

`Vec3` — this vector set to `(a.x / b.x, a.y / b.y, a.z / b.z)`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const dest = new Vec3();
dest.divideVectors(new Vec3(10, 20, 30), new Vec3(2, 4, 5)); // (5, 5, 6)
```

### Vec3.minVectors()

Set this vector to component-wise `min(a, b)`.

```ts
minVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. First vector
- `b` — `Vec3`. Second vector

#### Returns

`Vec3` — this vector set to `(min(a.x, b.x), min(a.y, b.y), min(a.z, b.z))`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const boxMin = new Vec3().minVectors(cornerA, cornerB);
```

### Vec3.maxVectors()

Set this vector to component-wise `max(a, b)`.

```ts
maxVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. First vector
- `b` — `Vec3`. Second vector

#### Returns

`Vec3` — this vector set to `(max(a.x, b.x), max(a.y, b.y), max(a.z, b.z))`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const boxMax = new Vec3().maxVectors(cornerA, cornerB);
```

### Vec3.clampVectors()

Set this vector to `value` clamped between `min` and `max` bounds.

```ts
clampVectors(value: Vec3, min: Vec3, max: Vec3): Vec3
```

#### Parameters

- `value` — `Vec3`. Point to clamp
- `min` — `Vec3`. Lower bounds
- `max` — `Vec3`. Upper bounds

#### Returns

`Vec3` — this vector set to clamped coordinates

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const closest = new Vec3().clampVectors(point, boxMin, boxMax);
```

### Vec3.clampToExtentVectors()

Set this vector to `vector` clamped symmetrically between `-extent` and `extent`.

```ts
clampToExtentVectors(vector: Vec3, extent: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector.
- `extent` — `Vec3`. Half-size extents `(hx, hy, hz)`.

#### Returns

`Vec3` — this vector clamped to `[-extent, extent]`.

### Vec3.oppositeVector()

Set this vector to `-vector`.

```ts
oppositeVector(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector

#### Returns

`Vec3` — this vector set to negated vector coordinates

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const neg = new Vec3().oppositeVector(offset);
```

### Vec3.absoluteVector()

Set this vector to component-wise `Math.abs(vector)`.

```ts
absoluteVector(vector: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector

#### Returns

`Vec3` — this vector set to absolute vector coordinates

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const absOffset = new Vec3().absoluteVector(offset);
```

### Vec3.normalizeVector()

Set this vector to unit length in the direction of `vector` with optional fallback. If `vector` is at the origin, sets this vector to `fallback` (or `(0, 0, 0)` if omitted).

```ts
normalizeVector(vector: Vec3, fallback?: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector
- `fallback` — `Vec3` *(optional)*. Vector to copy if `vector` has zero length

#### Returns

`Vec3` — this vector normalized

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const direction = new Vec3().normalizeVector(velocity, new Vec3(0, 0, 1));
```

### Vec3.crossVectors()

Set this vector to the cross product `a x b`.

```ts
crossVectors(a: Vec3, b: Vec3): Vec3
```

#### Parameters

- `a` — `Vec3`. First vector
- `b` — `Vec3`. Second vector

#### Returns

`Vec3` — this vector set to `a x b`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const normal = new Vec3().crossVectors(tangent, bitangent);
```

### Vec3.setLengthVector()

Set this vector to `vector` scaled to the given `length`.

```ts
setLengthVector(vector: Vec3, length: number): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector.
- `length` — `number`. Desired length.

#### Returns

`Vec3` — this vector scaled to `length`.

### Vec3.project()

Project this vector onto a normal vector in-place ($(v \cdot n) n$).

```ts
project(normal: Vec3): Vec3
```

#### Parameters

- `normal` — `Vec3`. Unit normal vector.

#### Returns

`Vec3` — this vector projected onto normal.

### Vec3.reflect()

Reflect this vector across a surface normal in-place ($v - 2(v \cdot n) n$).

```ts
reflect(normal: Vec3): Vec3
```

#### Parameters

- `normal` — `Vec3`. Unit surface normal.

#### Returns

`Vec3` — this vector reflected across normal.

### Vec3.projectVector()

Set this vector to the projection of `vector` onto `normal`.

```ts
projectVector(vector: Vec3, normal: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector.
- `normal` — `Vec3`. Unit normal vector.

#### Returns

`Vec3` — this vector set to the projection.

### Vec3.reflectVector()

Set this vector to the reflection of `vector` across `normal`.

```ts
reflectVector(vector: Vec3, normal: Vec3): Vec3
```

#### Parameters

- `vector` — `Vec3`. Source vector.
- `normal` — `Vec3`. Unit surface normal.

#### Returns

`Vec3` — this vector set to the reflection.

### Vec3.lerpVectors()

Set this vector to linear interpolation between `a` and `b` by `t`.

```ts
lerpVectors(a: Vec3, b: Vec3, t: number): Vec3
```

#### Parameters

- `a` — `Vec3`. Start vector.
- `b` — `Vec3`. End vector.
- `t` — `number`. Interpolation factor.

#### Returns

`Vec3` — this vector set to `a + (b - a) * t`.

## Geometric & Spatial Operations

### Vec3.getMagnitude()

Length, or squared length if square is true.

Pass `true` to get the squared length and skip the square root. When you only need to compare two lengths, comparing squares gives the same ordering for less work.

```ts
getMagnitude(square: boolean = false): number
```

#### Parameters

- `square` — `boolean`. Optional.

#### Returns

`number` — The magnitude of the vector or the squared magnitude depending on the given parameter

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().getMagnitude(false);
```

### Vec3.getDistance()

Distance to vector; squared if square is true.

Pass `true` for the squared distance. Testing a squared distance against a squared radius is the usual way to check range without a square root.

```ts
getDistance(vector: Vec3, square: boolean = false): number
```

#### Parameters

- `vector` — `Vec3`.
- `square` — `boolean`. Optional.

#### Returns

`number` — the distance between the vectors

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().getDistance(new Vec3(1, 2, 3), false);
```

### Vec3.normalize()

Scale to unit length with optional fallback.

Scales to unit length while keeping direction. If the vector has zero length, it adopts the optional `fallback` vector or remains unchanged if omitted. A vector already at length 1 is skipped.

```ts
normalize(fallback?: Vec3): Vec3
```

#### Parameters

- `fallback` — `Vec3` *(optional)*. Vector to copy if this vector has zero length.

#### Returns

`Vec3` — This vector for chaining

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const unit = new Vec3(0, 3, 4).normalize(); // (0, 0.6, 0.8)
const safe = new Vec3(0, 0, 0).normalize(new Vec3(0, 0, 1)); // (0, 0, 1)
```

### Vec3.setLength()

Scale this vector to the given length in-place.

```ts
setLength(length: number): Vec3
```

#### Parameters

- `length` — `number`. Desired vector length.

#### Returns

`Vec3` — this vector scaled to `length`.

### Vec3.dotProduct()

Dot product with vector.

Returns a number, not a vector. For unit vectors it is the cosine of the angle between them: 1 is the same direction, 0 perpendicular, -1 opposite.

```ts
dotProduct(vector: Vec3): number
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`number` — The dot product

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().dotProduct(new Vec3(1, 2, 3));
```

### Vec3.cross()

Cross product with v, in place.

Writes the cross product into this vector. The result is perpendicular to both inputs and follows the right-hand rule, so `a.cross(b)` and `b.cross(a)` point opposite ways.

```ts
cross(v: Vec3): Vec3
```

#### Parameters

- `v` — `Vec3`.

#### Returns

`Vec3` — The vector with its new values

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().cross(new Vec3(1, 2, 3));
```

### Vec3.getAngle()

Angle in radians between this and vector, or false if either is zero.

Returns the unsigned angle in radians between this vector and another, or `false` when either has zero length. There is no reference axis in 3D, so the result is never negative.

```ts
getAngle(vector: Vec3): number | false
```

#### Parameters

- `vector` — `Vec3`.

#### Returns

`number | false`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().getAngle(new Vec3(1, 2, 3));
```

### Vec3.clamp()

Clamp each component between min and max.

Clamps each component between the matching components of `min` and `max`, confining the point to an axis-aligned box.

```ts
clamp(min: Vec3, max: Vec3): Vec3
```

#### Parameters

- `min` — `Vec3`.
- `max` — `Vec3`.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().clamp(new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

### Vec3.clampScalar()

Clamp each component between min and max numbers in-place.

```ts
clampScalar(min: number, max: number): Vec3
```

#### Parameters

- `min` — `number`. Minimum scalar bound
- `max` — `number`. Maximum scalar bound

#### Returns

`Vec3` — this vector with clamped coordinates

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const v = new Vec3(-5, 12, 3).clampScalar(0, 10); // (0, 10, 3)
```

### Vec3.clampToExtent()

Clamp each component symmetrically between `-extent` and `extent` in-place.

```ts
clampToExtent(extent: Vec3): Vec3
```

#### Parameters

- `extent` — `Vec3`. Half-size extents `(hx, hy, hz)`.

#### Returns

`Vec3` — this vector clamped to `[-extent, extent]`.

### Vec3.isInBounds()

True if this point lies inside or on the axis-aligned bounds defined by min and max corners.

```ts
isInBounds(min: Vec3, max: Vec3): boolean
```

#### Parameters

- `min` — `Vec3`. First bounding corner
- `max` — `Vec3`. Opposite bounding corner

#### Returns

`boolean` — `true` if point lies within or on the bounding box

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const min = new Vec3(0, 0, 0);
const max = new Vec3(100, 100, 100);
const inside = new Vec3(50, 50, 50).isInBounds(min, max); // true
```

### Vec3.lerp()

Linearly interpolate towards target or between two vectors.

Interpolates in-place towards `target` by `amount`, or sets this vector to the interpolation from `min` to `max`.

```ts
lerp(target: Vec3, amount: number): Vec3
lerp(min: Vec3, max: Vec3, amount: number): Vec3
```

#### Parameters

- `targetOrMin` — `Vec3`. Target vector to lerp towards, or `min` start vector.
- `amountOrMax` — `number | Vec3`. Interpolation factor `t` in `[0, 1]`, or `max` end vector.
- `amount` — `number` (optional). Interpolation factor when 3 arguments are passed.

#### Returns

`Vec3` — This vector with its updated values.

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const current = new Vec3(0, 0, 0);
const target = new Vec3(100, 100, 100);
current.lerp(target, 0.1); // moves 10% towards target
```


const result = new Vec3().lerp(new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

## Bézier Curves

### Vec3.quadraticBezier()

Evaluate a quadratic Bézier at t into this vector.

Writes the point at `t` into this vector rather than allocating a result, so a sampling loop can reuse one instance. `t` runs from 0 at `p0` to 1 at `p2`.

```ts
quadraticBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `t` — `number`.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().quadraticBezier(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

### Vec3.cubicBezier()

Evaluate a cubic Bézier at t into this vector.

Writes the point at `t` into this vector. `t` runs from 0 at `p0` to 1 at `p3`, and the curve passes through the endpoints but not the two middle controls.

```ts
cubicBezier(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `t` — `number`.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().cubicBezier(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

### Vec3.quadraticBezierDerivative()

Quadratic Bézier tangent at t.

Writes the tangent at `t` into this vector. Normalize it for a direction, or take its angle to orient something along the curve.

```ts
quadraticBezierDerivative(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `t` — `number`.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().quadraticBezierDerivative(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

### Vec3.cubicBezierDerivative()

Cubic Bézier tangent at t.

Writes the tangent at `t` into this vector, giving the direction of travel at that point.

```ts
cubicBezierDerivative(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `t` — `number`.

#### Returns

`Vec3`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().cubicBezierDerivative(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

### Vec3.quadraticBezierSplit()

Split a quadratic at t into left and right.

de Casteljau subdivision: fills the `left` and `right` arrays with the control points of two curves that together trace the original exactly. Missing entries are created for you.

```ts
quadraticBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, t: number, left: Vec3[], right: Vec3[]): void
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `t` — `number`.
- `left` — `Vec3[]`.
- `right` — `Vec3[]`.

#### Returns

`void`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const left = [];
const right = [];
new Vec3().quadraticBezierSplit(p0, p1, p2, 0.5, left, right);
```

### Vec3.cubicBezierSplit()

Split a cubic at t into left and right.

Cuts the cubic at `t` into two cubics that together match the original.

```ts
cubicBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number, left: Vec3[], right: Vec3[]): void
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `t` — `number`.
- `left` — `Vec3[]`.
- `right` — `Vec3[]`.

#### Returns

`void`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';

const left = [];
const right = [];
new Vec3().cubicBezierSplit(p0, p1, p2, p3, 0.5, left, right);
```

### Vec3.quadraticBezierLength()

Sampled arc length of a quadratic.

Approximates arc length by sampling the curve and summing straight segments, so more `samples` buys accuracy at the cost of work.

```ts
quadraticBezierLength(p0: Vec3, p1: Vec3, p2: Vec3, samples?: number): number
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().quadraticBezierLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 16);
```

### Vec3.cubicBezierLength()

Sampled arc length of a cubic.

Approximates arc length by sampling. Bézier arc length has no closed form, which is why this is sampled rather than exact.

```ts
cubicBezierLength(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, samples?: number): number
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().cubicBezierLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 16);
```

### Vec3.quadraticBezierParameterAtLength()

Parameter t at the given quadratic arc length.

Returns the `t` that lands a given distance along the curve. Stepping `t` evenly does not move at an even speed, so this is what you need for constant-speed travel. Feed the result to `quadraticBezier()` to get the point.

```ts
quadraticBezierParameterAtLength(p0: Vec3, p1: Vec3, p2: Vec3, distance: number, samples?: number): number
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `distance` — `number`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().quadraticBezierParameterAtLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 10, 16);
```

### Vec3.cubicBezierParameterAtLength()

Parameter t at the given cubic arc length.

Returns the `t` at a given distance along the cubic. Pass it to `cubicBezier()` to turn it into a point.

```ts
cubicBezierParameterAtLength(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, distance: number, samples?: number): number
```

#### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `distance` — `number`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec3 } from '@1pizzateam/spock';


const result = new Vec3().cubicBezierParameterAtLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 10, 16);
```
