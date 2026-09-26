# Vec2

A mutable two-dimensional vector: public `x` and `y` numbers plus the operations you usually want around them.

<LerpDemo />

Use it for positions, directions, velocities, sizes, and any other 2D pair. Nearly every method writes into the vector it was called on and returns that same vector, so operations chain and a render loop can reuse a handful of instances instead of allocating a new one each frame. When you need an independent value, take a `clone()` first.

On top of arithmetic it carries magnitude and distance queries, normalization, per-axis rounding, angle helpers that read and write the vector's heading, interpolation with `lerp()`, clamping into a `Rect`, and Bézier evaluation, so curve sampling stays in vector space.

```js
import { Utils, Vec2 } from '@1pizzateam/spock';

const start = new Vec2(0, 20);
const end = new Vec2(100, 80);
const point = new Vec2().lerp(start, end, 0.35);

const radius = Utils.lerp(8, 30, 0.35);

const velocity = new Vec2(3, 4).normalize().scale(10);
const position = start.clone().add(velocity);
const travelled = position.getDistance(start);
```

## Quick Reference

| Category | Methods |
| :--- | :--- |
| **Creation & Component State** | [`new Vec2()`](#constructor) · [`setScalar()`](#vec2-setscalar) · [`setArray()`](#vec2-setarray) · [`copy()`](#vec2-copy) · [`clone()`](#vec2-clone) · [`toArray()`](#vec2-toarray) · [`toString()`](#vec2-tostring) · [`isOrigin()`](#vec2-isorigin) · [`origin()`](#vec2-origin) · [`equals()`](#vec2-equals) · [`isEqualTo()`](#vec2-isequalto) · [`isPositive()`](#vec2-ispositive) |
| **Arithmetic & Modification** | [`add()`](#vec2-add) · [`addScaledVector()`](#vec2-addscaledvector) · [`addScalar()`](#vec2-addscalar) · [`addComponents()`](#vec2-addcomponents) · [`subtract()`](#vec2-subtract) · [`subtractScaledVector()`](#vec2-subtractscaledvector) · [`subtractScalar()`](#vec2-subtractscalar) · [`multiply()`](#vec2-multiply) · [`multiplyScaledVector()`](#vec2-multiplyscaledvector) · [`scale()`](#vec2-scale) · [`divide()`](#vec2-divide) · [`divideScaledVector()`](#vec2-dividescaledvector) · [`divideScalar()`](#vec2-dividescalar) · [`halve()`](#vec2-halve) · [`opposite()`](#vec2-opposite) · [`absolute()`](#vec2-absolute) · [`sign()`](#vec2-sign) · [`floor()`](#vec2-floor) · [`ceil()`](#vec2-ceil) · [`max()`](#vec2-max) · [`min()`](#vec2-min) · [`maxScalar()`](#vec2-maxscalar) · [`minScalar()`](#vec2-minscalar) |
| **Target Operations** | [`addVectors()`](#vec2-addvectors) · [`subVectors()`](#vec2-subvectors) · [`multiplyVectors()`](#vec2-multiplyvectors) · [`scaleVector()`](#vec2-scalevector) · [`divideVectors()`](#vec2-dividevectors) · [`minVectors()`](#vec2-minvectors) · [`maxVectors()`](#vec2-maxvectors) · [`clampVectors()`](#vec2-clampvectors) · [`oppositeVector()`](#vec2-oppositevector) · [`absoluteVector()`](#vec2-absolutevector) · [`normalizeVector()`](#vec2-normalizevector) · [`perpVector()`](#vec2-perpvector) · [`perpCWVector()`](#vec2-perpcwvector) |
| **Geometric & Spatial Operations** | [`getMagnitude()`](#vec2-getmagnitude) · [`getDistance()`](#vec2-getdistance) · [`normalize()`](#vec2-normalize) · [`dotProduct()`](#vec2-dotproduct) · [`crossProduct()`](#vec2-crossproduct) · [`perp()`](#vec2-perp) · [`perpCW()`](#vec2-perpcw) · [`project()`](#vec2-project) · [`reflect()`](#vec2-reflect) · [`clamp()`](#vec2-clamp) · [`clampScalar()`](#vec2-clampscalar) · [`isInBounds()`](#vec2-isinbounds) · [`lerp()`](#vec2-lerp) |
| **Angles & Axes** | [`getAngle()`](#vec2-getangle) · [`setRadian()`](#vec2-setradian) · [`setDegree()`](#vec2-setdegree) · [`setMinAxis()`](#vec2-setminaxis) · [`setMaxAxis()`](#vec2-setmaxaxis) · [`isolateMinAxis()`](#vec2-isolateminaxis) · [`isolateMaxAxis()`](#vec2-isolatemaxaxis) · [`projectToMinAxis()`](#vec2-projecttominaxis) · [`projectToMaxAxis()`](#vec2-projecttomaxaxis) · [`setOppositeAxis()`](#vec2-setoppositeaxis) · [`getMinAxis()`](#vec2-getminaxis) · [`getMaxAxis()`](#vec2-getmaxaxis) |
| **Bézier Curves** | [`quadraticBezier()`](#vec2-quadraticbezier) · [`cubicBezier()`](#vec2-cubicbezier) · [`quadraticBezierDerivative()`](#vec2-quadraticbezierderivative) · [`cubicBezierDerivative()`](#vec2-cubicbezierderivative) · [`quadraticBezierSplit()`](#vec2-quadraticbeziersplit) · [`cubicBezierSplit()`](#vec2-cubicbeziersplit) · [`quadraticBezierLength()`](#vec2-quadraticbezierlength) · [`cubicBezierLength()`](#vec2-cubicbezierlength) · [`quadraticBezierParameterAtLength()`](#vec2-quadraticbezierparameteratlength) · [`cubicBezierParameterAtLength()`](#vec2-cubicbezierparameteratlength) |

---

## Creation & Component State

### Constructor

Create a 2D vector (defaults to the origin).

Both components default to 0, so `new Vec2()` is the origin.

```ts
new Vec2(x: number = 0, y: number = 0)
```

#### Parameters

- `x` — `number`. Optional.
- `y` — `number`. Optional.

#### Returns

`Vec2`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const value = new Vec2(1, 1);
```

### Vec2.setScalar()

Set x and/or y; omitted axes are unchanged.

Passing `null` or `undefined` for an axis leaves that axis alone, so you can write one component without reading the others back.

```ts
setScalar(x?: number | null, y?: number | null): Vec2
```

#### Parameters

- `x` — `number | null`. Optional. Value of the X axis
- `y` — `number | null`. Optional. Value of the Y axis

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setScalar(1, 1);
```

### Vec2.setArray()

Set x, y from array at offset.

Reads consecutive entries starting at `offset`, which makes it easy to pull one vertex out of a packed buffer. Entries past the end of the array leave that axis unchanged.

```ts
setArray(array: number[], offset: number = 0): Vec2
```

#### Parameters

- `array` — `number[]`. The array containing values for X and Y axis
- `offset` — `number`. Optional. the starting index of the array

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setArray([1, 2, 3], 0);
```

### Vec2.copy()

Copy another vector into this one.

Overwrites this vector from another one and keeps your instance, which is how you avoid an allocation inside a loop. Use `clone()` when you want a separate object.

```ts
copy(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. A vector to copy

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().copy(new Vec2(1, 2));
```

### Vec2.clone()

Independent copy.

Returns a new, independent vector. Take one before a chain of mutating calls when you still need the original.

```ts
clone(): Vec2
```

#### Parameters

None.

#### Returns

`Vec2` — The new vector

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().clone();
```

### Vec2.toArray()

Write [x, y] into target (or a new array).

Passing a target array writes into it and returns it, so you can fill part of a larger buffer without allocating.

```ts
toArray(target: number[] = []): number[]
```

#### Parameters

- `target` — `number[]`. Optional.

#### Returns

`number[]` — The vector exported as an array

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().toArray([1, 2, 3]);
```

### Vec2.toString()

Human-readable (x, y) string.

function toString() { [native code] }

```ts
toString(): string
```

#### Parameters

None.

#### Returns

`string` — The vector exported as a string

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().toString();
```

### Vec2.isOrigin()

True if both components are 0.

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
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().isOrigin();
```

### Vec2.origin()

Set both components to 0.

Resets every component to zero in place, reusing the instance instead of replacing it.

```ts
origin(): Vec2
```

#### Parameters

None.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().origin();
```

### Vec2.equals()

True if both components match the other vector.

Exact component comparison, so it inherits floating-point strictness: two vectors that reached the same value by different arithmetic can still differ in the last bits.

```ts
equals(vector: Vec2): boolean
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`boolean`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().equals(new Vec2(1, 2));
```

### Vec2.isEqualTo()

True if both components equal scalar.

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
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().isEqualTo(1);
```

### Vec2.isPositive()

True if both components are >= 0.

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
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().isPositive();
```

## Arithmetic & Modification

### Vec2.add()

Add vector in place.

Adds component by component and returns this vector, so it chains.

```ts
add(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().add(new Vec2(1, 2));
```

### Vec2.addScaledVector()

Add vector scaled by scalar.

Adds `vector * scalar` without building a temporary. This is the integration step in most motion code: `position.addScaledVector(velocity, deltaTime)`.

```ts
addScaledVector(vector: Vec2, scalar: number): Vec2
```

#### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().addScaledVector(new Vec2(1, 2), 1);
```

### Vec2.addScalar()

Add scalar to both components.

Adds the same number to every component, shifting the vector along the diagonal.

```ts
addScalar(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().addScalar(1);
```

### Vec2.addComponents()

Sum of x and y.

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
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().addComponents();
```

### Vec2.subtract()

Subtract vector in place.

Subtracts component by component. To get the vector pointing from A to B, copy B and subtract A.

```ts
subtract(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().subtract(new Vec2(1, 2));
```

### Vec2.subtractScaledVector()

Subtract vector scaled by scalar.

Subtracts `vector * scalar` in one step, the counterpart to `addScaledVector()`.

```ts
subtractScaledVector(vector: Vec2, scalar: number): Vec2
```

#### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().subtractScaledVector(new Vec2(1, 2), 1);
```

### Vec2.subtractScalar()

Subtract scalar from both components.

Subtracts the same number from every component.

```ts
subtractScalar(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().subtractScalar(1);
```

### Vec2.multiply()

Component-wise multiply.

Multiplies component by component, which is a non-uniform scale rather than any kind of vector product. For the dot product use `dotProduct()`.

```ts
multiply(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().multiply(new Vec2(1, 2));
```

### Vec2.multiplyScaledVector()

Component-wise multiply by vector * scalar.

Component-wise multiply by `vector * scalar`, combining a non-uniform and a uniform scale in one pass.

```ts
multiplyScaledVector(vector: Vec2, scalar: number): Vec2
```

#### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().multiplyScaledVector(new Vec2(1, 2), 1);
```

### Vec2.scale()

Multiply by scalar, optionally on one axis.

Multiplies every component by the scalar, or only one component when you name an axis. Chain it after `normalize()` to set a vector to an exact length.

```ts
scale(scalar: number, axis?: 'x' | 'y'): Vec2
```

#### Parameters

- `scalar` — `number`.
- `axis` — `'x' | 'y'`. Optional.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().scale(1, 'x');
```

### Vec2.divide()

Component-wise divide.

Divides component by component. A zero in the divisor yields `Infinity` rather than throwing.

```ts
divide(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().divide(new Vec2(1, 2));
```

### Vec2.divideScaledVector()

Component-wise divide by vector * scalar.

Divides component-wise by `vector * scalar`.

```ts
divideScaledVector(vector: Vec2, scalar: number): Vec2
```

#### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().divideScaledVector(new Vec2(1, 2), 1);
```

### Vec2.divideScalar()

Divide both components by scalar.

Divides every component by the scalar.

```ts
divideScalar(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().divideScalar(1);
```

### Vec2.halve()

Scale by 1/2.

Multiplies by 0.5, which comes up constantly for midpoints and half-extents.

```ts
halve(): Vec2
```

#### Parameters

None.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().halve();
```

### Vec2.opposite()

Negate, optionally on one axis.

Negates every component, or one named axis. Negating all of them reverses the direction.

```ts
opposite(axis?: 'x' | 'y'): Vec2
```

#### Parameters

- `axis` — `'x' | 'y'`. Optional. The axis you want to set or undefined if you want to change both axis

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().opposite('x');
```

### Vec2.absolute()

Absolute value, optionally on one axis.

Takes the absolute value of every component, or of one named axis.

```ts
absolute(axis?: 'x' | 'y'): Vec2
```

#### Parameters

- `axis` — `'x' | 'y'`. Optional. The axis you want to set or undefined if you want to change both axis

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().absolute('x');
```

### Vec2.sign()

Replace each component with its sign (-1, 0, or 1) in-place.

```ts
sign(): Vec2
```

#### Returns

`Vec2` — this vector with components replaced by `Math.sign`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const v = new Vec2(-15, 0).sign(); // (-1, 0)
```

### Vec2.floor()

Floor, optionally on one axis.

Rounds every component down, or one named axis. This is how a position becomes an integer cell index.

```ts
floor(axis?: 'x' | 'y'): Vec2
```

#### Parameters

- `axis` — `'x' | 'y'`. Optional.

#### Returns

`Vec2`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().floor('x');
```

### Vec2.ceil()

Ceil, optionally on one axis.

Rounds every component up, or one named axis.

```ts
ceil(axis?: 'x' | 'y'): Vec2
```

#### Parameters

- `axis` — `'x' | 'y'`. Optional.

#### Returns

`Vec2`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().ceil('x');
```

### Vec2.max()

Component-wise maximum with vector.

Keeps the larger value on each axis independently, so the result can match neither input. Paired with `min()` this clamps a point into a box.

```ts
max(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().max(new Vec2(1, 2));
```

### Vec2.min()

Component-wise minimum with vector.

Keeps the smaller value on each axis independently.

```ts
min(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().min(new Vec2(1, 2));
```

### Vec2.maxScalar()

Raise each component to at least scalar.

Raises any component below the scalar up to it: a per-component lower bound.

```ts
maxScalar(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().maxScalar(1);
```

### Vec2.minScalar()

Lower each component to at most scalar.

Lowers any component above the scalar down to it: a per-component upper bound.

```ts
minScalar(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().minScalar(1);
```

## Target Operations

Target operations compute an operation directly into the receiver (`this`) in a single pass without copying or allocating intermediate vectors.

### Vec2.addVectors()

Set this vector to `a + b`.

```ts
addVectors(a: Vec2, b: Vec2): Vec2
```

#### Parameters

- `a` — `Vec2`. First vector
- `b` — `Vec2`. Second vector

#### Returns

`Vec2` — this vector set to `a + b`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const dest = new Vec2();
dest.addVectors(new Vec2(10, 20), new Vec2(5, 5)); // (15, 25)
```

### Vec2.subVectors()

Set this vector to `a - b`.

```ts
subVectors(a: Vec2, b: Vec2): Vec2
```

#### Parameters

- `a` — `Vec2`. Left vector
- `b` — `Vec2`. Right vector to subtract from `a`

#### Returns

`Vec2` — this vector set to `a - b`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const delta = new Vec2();
delta.subVectors(posB, posA);
```

### Vec2.multiplyVectors()

Set this vector to component-wise `a * b`.

```ts
multiplyVectors(a: Vec2, b: Vec2): Vec2
```

#### Parameters

- `a` — `Vec2`. First vector
- `b` — `Vec2`. Second vector

#### Returns

`Vec2` — this vector set to `(a.x * b.x, a.y * b.y)`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const dest = new Vec2();
dest.multiplyVectors(new Vec2(2, 4), new Vec2(3, 5)); // (6, 20)
```

### Vec2.scaleVector()

Set this vector to `vector * scalar`.

```ts
scaleVector(vector: Vec2, scalar: number): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector
- `scalar` — `number`. Scaling factor

#### Returns

`Vec2` — this vector set to `(vector.x * scalar, vector.y * scalar)`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const impulse = new Vec2();
impulse.scaleVector(contactNormal, magnitude);
```

### Vec2.divideVectors()

Set this vector to component-wise `a / b`.

```ts
divideVectors(a: Vec2, b: Vec2): Vec2
```

#### Parameters

- `a` — `Vec2`. Numerator vector
- `b` — `Vec2`. Denominator vector

#### Returns

`Vec2` — this vector set to `(a.x / b.x, a.y / b.y)`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const dest = new Vec2();
dest.divideVectors(new Vec2(10, 20), new Vec2(2, 4)); // (5, 5)
```

### Vec2.minVectors()

Set this vector to component-wise `min(a, b)`.

```ts
minVectors(a: Vec2, b: Vec2): Vec2
```

#### Parameters

- `a` — `Vec2`. First vector
- `b` — `Vec2`. Second vector

#### Returns

`Vec2` — this vector set to `(min(a.x, b.x), min(a.y, b.y))`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const boxMin = new Vec2().minVectors(cornerA, cornerB);
```

### Vec2.maxVectors()

Set this vector to component-wise `max(a, b)`.

```ts
maxVectors(a: Vec2, b: Vec2): Vec2
```

#### Parameters

- `a` — `Vec2`. First vector
- `b` — `Vec2`. Second vector

#### Returns

`Vec2` — this vector set to `(max(a.x, b.x), max(a.y, b.y))`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const boxMax = new Vec2().maxVectors(cornerA, cornerB);
```

### Vec2.clampVectors()

Set this vector to `value` clamped between `min` and `max` bounds.

```ts
clampVectors(value: Vec2, min: Vec2, max: Vec2): Vec2
```

#### Parameters

- `value` — `Vec2`. Point to clamp
- `min` — `Vec2`. Lower bounds
- `max` — `Vec2`. Upper bounds

#### Returns

`Vec2` — this vector set to clamped coordinates

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const closest = new Vec2().clampVectors(circlePos, boxMin, boxMax);
```

### Vec2.clampToExtentVectors()

Set this vector to `vector` clamped symmetrically between `-extent` and `extent`.

```ts
clampToExtentVectors(vector: Vec2, extent: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector to clamp.
- `extent` — `Vec2`. Half-size extents `(hx, hy)`.

#### Returns

`Vec2` — this vector clamped to `[-extent, extent]`.

### Vec2.oppositeVector()

Set this vector to `-vector`.

```ts
oppositeVector(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector

#### Returns

`Vec2` — this vector set to negated vector coordinates

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const boundsMin = new Vec2().oppositeVector(halfSize);
```

### Vec2.absoluteVector()

Set this vector to component-wise `Math.abs(vector)`.

```ts
absoluteVector(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector

#### Returns

`Vec2` — this vector set to absolute vector coordinates

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const absOffset = new Vec2().absoluteVector(offset);
```

### Vec2.normalizeVector()

Set this vector to unit length in the direction of `vector` with optional fallback. If `vector` is at the origin, sets this vector to `fallback` (or `(0, 0)` if omitted).

```ts
normalizeVector(vector: Vec2, fallback?: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector
- `fallback` — `Vec2` *(optional)*. Vector to copy if `vector` has zero length

#### Returns

`Vec2` — this vector normalized

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const direction = new Vec2().normalizeVector(velocity, new Vec2(1, 0));
```

### Vec2.perpVector()

Set this vector to the 90-degree counter-clockwise perpendicular of `vector` (`-vector.y, vector.x`).

```ts
perpVector(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector

#### Returns

`Vec2` — this vector set to `(-vector.y, vector.x)`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const tangent = new Vec2().perpVector(normal);
```

### Vec2.perpCWVector()

Set this vector to the 90-degree clockwise perpendicular of `vector` (`vector.y, -vector.x`).

```ts
perpCWVector(vector: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector

#### Returns

`Vec2` — this vector set to `(vector.y, -vector.x)`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const tangentCW = new Vec2().perpCWVector(normal);
```

### Vec2.setLengthVector()

Set this vector to `vector` scaled to the given `length`.

```ts
setLengthVector(vector: Vec2, length: number): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector.
- `length` — `number`. Desired length.

#### Returns

`Vec2` — this vector scaled to `length`.

### Vec2.projectVector()

Set this vector to the projection of `vector` onto `normal`.

```ts
projectVector(vector: Vec2, normal: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector.
- `normal` — `Vec2`. Unit normal vector.

#### Returns

`Vec2` — this vector set to the projection.

### Vec2.reflectVector()

Set this vector to the reflection of `vector` across `normal`.

```ts
reflectVector(vector: Vec2, normal: Vec2): Vec2
```

#### Parameters

- `vector` — `Vec2`. Source vector.
- `normal` — `Vec2`. Unit surface normal.

#### Returns

`Vec2` — this vector set to the reflection.

### Vec2.lerpVectors()

Set this vector to linear interpolation between `a` and `b` by `t`.

```ts
lerpVectors(a: Vec2, b: Vec2, t: number): Vec2
```

#### Parameters

- `a` — `Vec2`. Start vector.
- `b` — `Vec2`. End vector.
- `t` — `number`. Interpolation factor.

#### Returns

`Vec2` — this vector set to `a + (b - a) * t`.

## Geometric & Spatial Operations

### Vec2.getMagnitude()

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
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().getMagnitude(false);
```

### Vec2.getDistance()

Distance to vector; squared if square is true.

Pass `true` for the squared distance. Testing a squared distance against a squared radius is the usual way to check range without a square root.

```ts
getDistance(vector: Vec2, square: boolean = false): number
```

#### Parameters

- `vector` — `Vec2`.
- `square` — `boolean`. Optional.

#### Returns

`number` — The distance between the vectors

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().getDistance(new Vec2(1, 2), false);
```

### Vec2.normalize()

Scale to unit length with optional fallback.

Scales to unit length while keeping direction. If the vector has zero length, it adopts the optional `fallback` vector or remains unchanged if omitted. A vector already at length 1 is skipped.

```ts
normalize(fallback?: Vec2): Vec2
```

#### Parameters

- `fallback` — `Vec2` *(optional)*. Vector to copy if this vector has zero length.

#### Returns

`Vec2` — This vector for chaining

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const unit = new Vec2(3, 4).normalize(); // (0.6, 0.8)
const safe = new Vec2(0, 0).normalize(new Vec2(1, 0)); // (1, 0)
```

### Vec2.setLength()

Scale this vector to the given length in-place.

```ts
setLength(length: number): Vec2
```

#### Parameters

- `length` — `number`. Desired vector length.

#### Returns

`Vec2` — this vector scaled to `length`.

### Vec2.dotProduct()

Dot product with vector.

Returns a number, not a vector. For unit vectors it is the cosine of the angle between them: 1 is the same direction, 0 perpendicular, -1 opposite.

```ts
dotProduct(vector: Vec2): number
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`number` — the dot product

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().dotProduct(new Vec2(1, 2));
```

### Vec2.crossProduct()

2D cross product / determinant ($x_1 y_2 - y_1 x_2$).

Computes the signed area of the parallelogram spanned by the two vectors. Returns positive if the second vector is counter-clockwise relative to the first, negative if clockwise, and zero if colinear.

```ts
crossProduct(vector: Vec2): number
```

#### Parameters

- `vector` — `Vec2`.

#### Returns

`number`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const cross = new Vec2(1, 0).crossProduct(new Vec2(0, 1)); // 1
```

### Vec2.perp()

Rotate 90 degrees counter-clockwise in-place ($(-y, x)$).

```ts
perp(): Vec2
```

#### Returns

`Vec2` — this vector rotated 90° CCW

### Vec2.perpCW()

Rotate 90 degrees clockwise in-place ($(y, -x)$).

```ts
perpCW(): Vec2
```

#### Returns

`Vec2` — this vector rotated 90° CW

### Vec2.project()

Project this vector onto a normal vector in-place ($(v \cdot n) n$).

```ts
project(normal: Vec2): Vec2
```

#### Parameters

- `normal` — `Vec2`.

#### Returns

`Vec2` — this vector projected onto normal

### Vec2.reflect()

Reflect this vector across a surface normal in-place ($v - 2(v \cdot n) n$).

```ts
reflect(normal: Vec2): Vec2
```

#### Parameters

- `normal` — `Vec2`.

#### Returns

`Vec2` — this vector reflected across normal

### Vec2.clamp()

Clamp this point inside a rectangle or between min and max bounds.

Confines this point to a `Rect` or between `(min, max)` vector corners. A point already inside is left untouched.

```ts
clamp(rect: Rect): Vec2
clamp(min: Vec2, max: Vec2): Vec2
```

#### Parameters

- `rect` — `Rect`. Rectangle bounds
- `min` — `Vec2`. Lower-left bounds
- `max` — `Vec2`. Upper-right bounds

#### Returns

`Vec2` — this vector clamped within bounds

#### Example

```js
import { Vec2, Rect } from '@1pizzateam/spock';

const pos = new Vec2(150, -20);
pos.clamp(new Rect(100, 100, 0, 0)); // clamped to rectangle
pos.clamp(new Vec2(0, 0), new Vec2(100, 100)); // clamped between min and max
```

### Vec2.clampScalar()

Clamp each component between min and max numbers in-place.

```ts
clampScalar(min: number, max: number): Vec2
```

#### Parameters

- `min` — `number`. Minimum scalar bound
- `max` — `number`. Maximum scalar bound

#### Returns

`Vec2` — this vector with clamped coordinates

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const v = new Vec2(-5, 12).clampScalar(0, 10); // (0, 10)
```

### Vec2.clampToExtent()

Clamp each component symmetrically between `-extent` and `extent` in-place.

```ts
clampToExtent(extent: Vec2): Vec2
```

#### Parameters

- `extent` — `Vec2`. Half-size extents `(hx, hy)`.

#### Returns

`Vec2` — this vector clamped to `[-extent, extent]`.

### Vec2.isInBounds()

True if this point lies inside or on the axis-aligned bounds defined by min and max corners, or inside a `Rect`.

```ts
isInBounds(rect: Rect): boolean
isInBounds(min: Vec2, max: Vec2): boolean
```

#### Parameters

- `rect` — `Rect`. Rectangle to test containment against
- `min` — `Vec2`. First bounding corner
- `max` — `Vec2`. Opposite bounding corner

#### Returns

`boolean` — `true` if point lies within or on the bounding box

#### Example

```js
import { Vec2, Rect } from '@1pizzateam/spock';

const rect = new Rect(new Vec2(100, 100), new Vec2(50, 50));
const insideRect = new Vec2(50, 50).isInBounds(rect); // true

const min = new Vec2(0, 0);
const max = new Vec2(100, 100);
const inside = new Vec2(50, 50).isInBounds(min, max); // true
```

### Vec2.lerp()

Linearly interpolate towards target or between two vectors.

Interpolates in-place towards `target` by `amount`, or sets this vector to the interpolation from `min` to `max`.

```ts
lerp(target: Vec2, amount: number): Vec2
lerp(min: Vec2, max: Vec2, amount: number): Vec2
```

#### Parameters

- `targetOrMin` — `Vec2`. Target vector to lerp towards, or `min` start vector.
- `amountOrMax` — `number | Vec2`. Interpolation factor `t` in `[0, 1]`, or `max` end vector.
- `amount` — `number` (optional). Interpolation factor when 3 arguments are passed.

#### Returns

`Vec2` — This vector with its updated values.

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const current = new Vec2(0, 0);
const target = new Vec2(100, 100);
current.lerp(target, 0.1); // moves 10% towards target
```


const result = new Vec2().lerp(new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

## Angles & Axes

### Vec2.getAngle()

Heading in radians, or false at the origin.

Returns the heading in radians measured from the positive X axis, or `false` at the origin where direction is undefined. Check for `false` before using the result in arithmetic.

```ts
getAngle(): number | false
```

#### Parameters

None.

#### Returns

`number | false` — The angle in radians (in [-π,π]) between the positive x-axis and the ray from (0,0) to the point

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().getAngle();
```

### Vec2.setRadian()

Keep length; set heading in radians.

Turns the vector to the given heading while keeping its current length. A zero-length vector has no length to keep, so it stays at the origin.

```ts
setRadian(angle: number): Vec2
```

#### Parameters

- `angle` — `number`. an angle in radian

#### Returns

`Vec2` — The vector with its new axis value

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setRadian(Math.PI / 4);
```

### Vec2.setDegree()

Keep length; set heading in degrees.

Same as `setRadian()`, with the conversion from degrees done for you.

```ts
setDegree(angle: number): Vec2
```

#### Parameters

- `angle` — `number`. an angle in degree

#### Returns

`Vec2` — The vector with its new axis value

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setDegree(Math.PI / 4);
```

### Vec2.setMinAxis()

Set the smaller component to scalar.

Overwrites whichever component is currently smaller. Which axis that is depends on the values at call time, not on a fixed choice.

```ts
setMinAxis(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`. A scalar number to set the min axis with

#### Returns

`Vec2` — The vector with its new axis value

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setMinAxis(1);
```

### Vec2.setMaxAxis()

Set the larger component to scalar.

Overwrites whichever component is currently larger.

```ts
setMaxAxis(scalar: number): Vec2
```

#### Parameters

- `scalar` — `number`. A scalar number to set the max axis with

#### Returns

`Vec2` — The vector with its new axis value

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setMaxAxis(1);
```

### Vec2.isolateMinAxis()

Zero the larger component in-place and return the shallowest axis name.

```ts
isolateMinAxis(): 'x' | 'y'
```

#### Returns

`'x' | 'y'` — the name of the minimum axis preserved

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const v = new Vec2(5, 2);
const minAxis = v.isolateMinAxis(); // 'y', v is now (0, 2)
```

### Vec2.isolateMaxAxis()

Zero the smaller component in-place and return the largest axis name.

```ts
isolateMaxAxis(): 'x' | 'y'
```

#### Returns

`'x' | 'y'` — the name of the maximum axis preserved

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const v = new Vec2(5, 2);
const maxAxis = v.isolateMaxAxis(); // 'x', v is now (5, 0)
```

### Vec2.projectToMinAxis()

Zero the non-principal (larger) axis in-place and orient along shallowest penetration with optional reference vector.

```ts
projectToMinAxis(reference?: Vec2): Vec2
```

#### Parameters

- `reference` — `Vec2`. Optional direction reference vector

#### Returns

`Vec2` — this vector projected onto its minimum axis

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const penetration = new Vec2(12, 4);
penetration.projectToMinAxis(); // (0, 4)
```

### Vec2.projectToMaxAxis()

Zero the non-principal (smaller) axis in-place and orient along largest axis with optional reference vector.

```ts
projectToMaxAxis(reference?: Vec2): Vec2
```

#### Parameters

- `reference` — `Vec2`. Optional direction reference vector

#### Returns

`Vec2` — this vector projected onto its maximum axis

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const normal = new Vec2(12, 4);
normal.projectToMaxAxis(); // (12, 0)
```

### Vec2.setOppositeAxis()

Set the other axis to value.

Writes the axis you did not name: pass `x` to set `y`, and the other way round.

```ts
setOppositeAxis(axis: 'x' | 'y', value: number): Vec2
```

#### Parameters

- `axis` — `'x' | 'y'`. The name of the axis. either 'x' or 'y'
- `value` — `number`.

#### Returns

`Vec2` — The vector with its new axis value

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().setOppositeAxis('x', 1);
```

### Vec2.getMinAxis()

Name of the smaller component.

Returns the name of the smaller component, usable the same way.

```ts
getMinAxis(): 'x' | 'y'
```

#### Parameters

None.

#### Returns

`'x' | 'y'` — The name of the axis

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().getMinAxis();
```

### Vec2.getMaxAxis()

Name of the larger component.

Returns the name of the larger component, `'x'` or `'y'`, which you can hand straight to the axis argument of `scale()`, `absolute()`, `floor()`, and friends.

```ts
getMaxAxis(): 'x' | 'y'
```

#### Parameters

None.

#### Returns

`'x' | 'y'` — The name of the axis

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().getMaxAxis();
```

## Bézier Curves

### Vec2.quadraticBezier()

Evaluate a quadratic Bézier at t into this vector.

Writes the point at `t` into this vector rather than allocating a result, so a sampling loop can reuse one instance. `t` runs from 0 at `p0` to 1 at `p2`.

```ts
quadraticBezier(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `t` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().quadraticBezier(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

### Vec2.cubicBezier()

Evaluate a cubic Bézier at t into this vector.

Writes the point at `t` into this vector. `t` runs from 0 at `p0` to 1 at `p3`, and the curve passes through the endpoints but not the two middle controls.

```ts
cubicBezier(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `t` — `number`.

#### Returns

`Vec2` — The vector with its new values

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().cubicBezier(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

### Vec2.quadraticBezierDerivative()

Quadratic Bézier tangent at t.

Writes the tangent at `t` into this vector. Normalize it for a direction, or take its angle to orient something along the curve.

```ts
quadraticBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `t` — `number`.

#### Returns

`Vec2`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().quadraticBezierDerivative(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

### Vec2.cubicBezierDerivative()

Cubic Bézier tangent at t.

Writes the tangent at `t` into this vector, giving the direction of travel at that point.

```ts
cubicBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `t` — `number`.

#### Returns

`Vec2`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().cubicBezierDerivative(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

### Vec2.quadraticBezierSplit()

Split a quadratic at t into left and right.

de Casteljau subdivision: fills the `left` and `right` arrays with the control points of two curves that together trace the original exactly. Missing entries are created for you.

```ts
quadraticBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, t: number, left: Vec2[], right: Vec2[]): void
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `t` — `number`.
- `left` — `Vec2[]`.
- `right` — `Vec2[]`.

#### Returns

`void`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const left = [];
const right = [];
new Vec2().quadraticBezierSplit(p0, p1, p2, 0.5, left, right);
```

### Vec2.cubicBezierSplit()

Split a cubic at t into left and right.

Cuts the cubic at `t` into two cubics that together match the original.

```ts
cubicBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number, left: Vec2[], right: Vec2[]): void
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `t` — `number`.
- `left` — `Vec2[]`.
- `right` — `Vec2[]`.

#### Returns

`void`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';

const left = [];
const right = [];
new Vec2().cubicBezierSplit(p0, p1, p2, p3, 0.5, left, right);
```

### Vec2.quadraticBezierLength()

Sampled arc length of a quadratic.

Approximates arc length by sampling the curve and summing straight segments, so more `samples` buys accuracy at the cost of work.

```ts
quadraticBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, samples?: number): number
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().quadraticBezierLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 16);
```

### Vec2.cubicBezierLength()

Sampled arc length of a cubic.

Approximates arc length by sampling. Bézier arc length has no closed form, which is why this is sampled rather than exact.

```ts
cubicBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, samples?: number): number
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().cubicBezierLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 16);
```

### Vec2.quadraticBezierParameterAtLength()

Parameter t at the given quadratic arc length.

Returns the `t` that lands a given distance along the curve. Stepping `t` evenly does not move at an even speed, so this is what you need for constant-speed travel. Feed the result to `quadraticBezier()` to get the point.

```ts
quadraticBezierParameterAtLength(p0: Vec2, p1: Vec2, p2: Vec2, distance: number, samples?: number): number
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `distance` — `number`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().quadraticBezierParameterAtLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 10, 16);
```

### Vec2.cubicBezierParameterAtLength()

Parameter t at the given cubic arc length.

Returns the `t` at a given distance along the cubic. Pass it to `cubicBezier()` to turn it into a point.

```ts
cubicBezierParameterAtLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, distance: number, samples?: number): number
```

#### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `distance` — `number`.
- `samples` — `number`. Optional.

#### Returns

`number`

#### Example

```js
import { Vec2 } from '@1pizzateam/spock';


const result = new Vec2().cubicBezierParameterAtLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 10, 16);
```
