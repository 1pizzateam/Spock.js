# Vec3

A mutable three-dimensional vector with public `x`, `y`, and `z` numbers.

It mirrors `Vec2` and adds the operations that only make sense in 3D, most notably `cross()` and a `getAngle()` that measures between two vectors. As with `Vec2`, methods mutate the receiver and return it, so calls chain and hot loops stay allocation-free.

`Vec3` is the vector type the 3D transforms speak: `Mat4.translate()`, `Mat4.lookAtRH()`, `Quat.setAxisAngle()`, and `Quat.multiplyVector()` all take or fill one.

```js
import { Vec3 } from '@1pizzateam/spockjs';

const forward = new Vec3(0, 0, -1);
const up = new Vec3(0, 1, 0);

const right = forward.clone().cross(up).normalize();
const angle = forward.getAngle(up); // radians, or false for a zero-length vector
```

## Constructor

Create a 3D vector (defaults to the origin).

All three components default to 0, so `new Vec3()` is the origin.

```ts
new Vec3(x: number = 0, y: number = 0, z: number = 0)
```

### Parameters

- `x` — `number`. Optional.
- `y` — `number`. Optional.
- `z` — `number`. Optional.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';

const value = new Vec3(1, 1, 1);
```

## Vec3.setScalar()

Set x, y, and/or z; omitted axes are unchanged.

Passing `null` or `undefined` for an axis leaves that axis alone, so you can write one component without reading the others back.

```ts
setScalar(x?: number | null, y?: number | null, z?: number | null): Vec3
```

### Parameters

- `x` — `number | null`. Optional. Value of the X axis
- `y` — `number | null`. Optional. Value of the Y axis
- `z` — `number | null`. Optional. Value of the Z axis

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().setScalar(1, 1, 1);
```

## Vec3.setArray()

Set x, y, z from array at offset.

Reads consecutive entries starting at `offset`, which makes it easy to pull one vertex out of a packed buffer. Entries past the end of the array leave that axis unchanged.

```ts
setArray(array: number[], offset: number = 0): Vec3
```

### Parameters

- `array` — `number[]`. The array containing values for x, y and z axis
- `offset` — `number`. Optional. the starting index of the array

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().setArray([1, 2, 3], 0);
```

## Vec3.copy()

Copy another vector into this one.

Overwrites this vector from another one and keeps your instance, which is how you avoid an allocation inside a loop. Use `clone()` when you want a separate object.

```ts
copy(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().copy(new Vec3(1, 2, 3));
```

## Vec3.isPositive()

True if all components are >= 0.

True when every component is zero or greater, so zero counts as positive.

```ts
isPositive(): boolean
```

### Parameters

None.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().isPositive();
```

## Vec3.isEqualTo()

True if all components equal scalar.

Compares every component against a single number, not against another vector. Use `equals()` for a vector-to-vector test.

```ts
isEqualTo(scalar: number): boolean
```

### Parameters

- `scalar` — `number`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().isEqualTo(1);
```

## Vec3.equals()

True if all components match the other vector.

Exact component comparison, so it inherits floating-point strictness: two vectors that reached the same value by different arithmetic can still differ in the last bits.

```ts
equals(vector: Vec3): boolean
```

### Parameters

- `vector` — `Vec3`.

### Returns

`boolean`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().equals(new Vec3(1, 2, 3));
```

## Vec3.isOrigin()

True if all components are 0.

True only when every component is exactly zero.

```ts
isOrigin(): boolean
```

### Parameters

None.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().isOrigin();
```

## Vec3.toArray()

Write [x, y, z] into target (or a new array).

Passing a target array writes into it and returns it, so you can fill part of a larger buffer without allocating.

```ts
toArray(target: number[] = []): number[]
```

### Parameters

- `target` — `number[]`. Optional.

### Returns

`number[]` — The vector as an array

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().toArray([1, 2, 3]);
```

## Vec3.toString()

Human-readable (x, y, z) string.

function toString() { [native code] }

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — The vector as a string

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().toString();
```

## Vec3.origin()

Set all components to 0.

Resets every component to zero in place, reusing the instance instead of replacing it.

```ts
origin(): Vec3
```

### Parameters

None.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().origin();
```

## Vec3.getMagnitude()

Length, or squared length if square is true.

Pass `true` to get the squared length and skip the square root. When you only need to compare two lengths, comparing squares gives the same ordering for less work.

```ts
getMagnitude(square: boolean = false): number
```

### Parameters

- `square` — `boolean`. Optional.

### Returns

`number` — The magnitude of the vector or the squared magnitude depending on the given parameter

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().getMagnitude(false);
```

## Vec3.getDistance()

Distance to vector; squared if square is true.

Pass `true` for the squared distance. Testing a squared distance against a squared radius is the usual way to check range without a square root.

```ts
getDistance(vector: Vec3, square: boolean = false): number
```

### Parameters

- `vector` — `Vec3`.
- `square` — `boolean`. Optional.

### Returns

`number` — the distance between the vectors

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().getDistance(new Vec3(1, 2, 3), false);
```

## Vec3.add()

Add vector in place.

Adds component by component and returns this vector, so it chains.

```ts
add(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().add(new Vec3(1, 2, 3));
```

## Vec3.addScaledVector()

Add vector scaled by scalar.

Adds `vector * scalar` without building a temporary. This is the integration step in most motion code: `position.addScaledVector(velocity, deltaTime)`.

```ts
addScaledVector(vector: Vec3, scalar: number): Vec3
```

### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().addScaledVector(new Vec3(1, 2, 3), 1);
```

## Vec3.addScalar()

Add scalar to all components.

Adds the same number to every component, shifting the vector along the diagonal.

```ts
addScalar(scalar: number): Vec3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().addScalar(1);
```

## Vec3.addComponents()

Sum of x, y, and z.

Returns the sum of the components as a plain number and leaves the vector alone.

```ts
addComponents(): number
```

### Parameters

None.

### Returns

`number`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().addComponents();
```

## Vec3.subtract()

Subtract vector in place.

Subtracts component by component. To get the vector pointing from A to B, copy B and subtract A.

```ts
subtract(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().subtract(new Vec3(1, 2, 3));
```

## Vec3.subtractScaledVector()

Subtract vector scaled by scalar.

Subtracts `vector * scalar` in one step, the counterpart to `addScaledVector()`.

```ts
subtractScaledVector(vector: Vec3, scalar: number): Vec3
```

### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().subtractScaledVector(new Vec3(1, 2, 3), 1);
```

## Vec3.subtractScalar()

Subtract scalar from all components.

Subtracts the same number from every component.

```ts
subtractScalar(scalar: number): Vec3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().subtractScalar(1);
```

## Vec3.multiply()

Component-wise multiply.

Multiplies component by component, which is a non-uniform scale rather than any kind of vector product. For the dot product use `dotProduct()`.

```ts
multiply(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().multiply(new Vec3(1, 2, 3));
```

## Vec3.multiplyScaledVector()

Component-wise multiply by vector * scalar.

Component-wise multiply by `vector * scalar`, combining a non-uniform and a uniform scale in one pass.

```ts
multiplyScaledVector(vector: Vec3, scalar: number): Vec3
```

### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().multiplyScaledVector(new Vec3(1, 2, 3), 1);
```

## Vec3.scale()

Multiply by scalar, optionally on one axis.

Multiplies every component by the scalar, or only one component when you name an axis. Chain it after `normalize()` to set a vector to an exact length.

```ts
scale(scalar: number, axis?: 'x' | 'y' | 'z'): Vec3
```

### Parameters

- `scalar` — `number`.
- `axis` — `'x' | 'y' | 'z'`. Optional.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().scale(1, 'x');
```

## Vec3.divide()

Component-wise divide.

Divides component by component. A zero in the divisor yields `Infinity` rather than throwing.

```ts
divide(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().divide(new Vec3(1, 2, 3));
```

## Vec3.divideScaledVector()

Component-wise divide by vector * scalar.

Divides component-wise by `vector * scalar`.

```ts
divideScaledVector(vector: Vec3, scalar: number): Vec3
```

### Parameters

- `vector` — `Vec3`.
- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().divideScaledVector(new Vec3(1, 2, 3), 1);
```

## Vec3.divideScalar()

Divide all components by scalar.

Divides every component by the scalar.

```ts
divideScalar(scalar: number): Vec3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().divideScalar(1);
```

## Vec3.halve()

Scale by 1/2.

Multiplies by 0.5, which comes up constantly for midpoints and half-extents.

```ts
halve(): Vec3
```

### Parameters

None.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().halve();
```

## Vec3.max()

Component-wise maximum with vector.

Keeps the larger value on each axis independently, so the result can match neither input. Paired with `min()` this clamps a point into a box.

```ts
max(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().max(new Vec3(1, 2, 3));
```

## Vec3.min()

Component-wise minimum with vector.

Keeps the smaller value on each axis independently.

```ts
min(vector: Vec3): Vec3
```

### Parameters

- `vector` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().min(new Vec3(1, 2, 3));
```

## Vec3.maxScalar()

Raise each component to at least scalar.

Raises any component below the scalar up to it: a per-component lower bound.

```ts
maxScalar(scalar: number): Vec3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().maxScalar(1);
```

## Vec3.minScalar()

Lower each component to at most scalar.

Lowers any component above the scalar down to it: a per-component upper bound.

```ts
minScalar(scalar: number): Vec3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().minScalar(1);
```

## Vec3.normalize()

Scale to unit length.

Scales to unit length while keeping direction. A zero-length vector is left untouched rather than becoming `NaN`, and a vector already at length 1 is skipped.

```ts
normalize(): Vec3
```

### Parameters

None.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().normalize();
```

## Vec3.absolute()

Absolute value, optionally on one axis.

Takes the absolute value of every component, or of one named axis.

```ts
absolute(axis?: 'x' | 'y' | 'z'): Vec3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().absolute('x');
```

## Vec3.opposite()

Negate, optionally on one axis.

Negates every component, or one named axis. Negating all of them reverses the direction.

```ts
opposite(axis?: 'x' | 'y' | 'z'): Vec3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().opposite('x');
```

## Vec3.floor()

Floor, optionally on one axis.

Rounds every component down, or one named axis. This is how a position becomes an integer cell index.

```ts
floor(axis?: 'x' | 'y' | 'z'): Vec3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().floor('x');
```

## Vec3.ceil()

Ceil, optionally on one axis.

Rounds every component up, or one named axis.

```ts
ceil(axis?: 'x' | 'y' | 'z'): Vec3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().ceil('x');
```

## Vec3.dotProduct()

Dot product with vector.

Returns a number, not a vector. For unit vectors it is the cosine of the angle between them: 1 is the same direction, 0 perpendicular, -1 opposite.

```ts
dotProduct(vector: Vec3): number
```

### Parameters

- `vector` — `Vec3`.

### Returns

`number` — The dot product

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().dotProduct(new Vec3(1, 2, 3));
```

## Vec3.clone()

Independent copy.

Returns a new, independent vector. Take one before a chain of mutating calls when you still need the original.

```ts
clone(): Vec3
```

### Parameters

None.

### Returns

`Vec3` — The new vector

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().clone();
```

## Vec3.cross()

Cross product with v, in place.

Writes the cross product into this vector. The result is perpendicular to both inputs and follows the right-hand rule, so `a.cross(b)` and `b.cross(a)` point opposite ways.

```ts
cross(v: Vec3): Vec3
```

### Parameters

- `v` — `Vec3`.

### Returns

`Vec3` — The vector with its new values

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().cross(new Vec3(1, 2, 3));
```

## Vec3.getAngle()

Angle in radians between this and vector, or false if either is zero.

Returns the unsigned angle in radians between this vector and another, or `false` when either has zero length. There is no reference axis in 3D, so the result is never negative.

```ts
getAngle(vector: Vec3): number | false
```

### Parameters

- `vector` — `Vec3`.

### Returns

`number | false`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().getAngle(new Vec3(1, 2, 3));
```

## Vec3.quadraticBezier()

Evaluate a quadratic Bézier at t into this vector.

Writes the point at `t` into this vector rather than allocating a result, so a sampling loop can reuse one instance. `t` runs from 0 at `p0` to 1 at `p2`.

```ts
quadraticBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `t` — `number`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().quadraticBezier(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

## Vec3.cubicBezier()

Evaluate a cubic Bézier at t into this vector.

Writes the point at `t` into this vector. `t` runs from 0 at `p0` to 1 at `p3`, and the curve passes through the endpoints but not the two middle controls.

```ts
cubicBezier(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `t` — `number`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().cubicBezier(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

## Vec3.quadraticBezierDerivative()

Quadratic Bézier tangent at t.

Writes the tangent at `t` into this vector. Normalize it for a direction, or take its angle to orient something along the curve.

```ts
quadraticBezierDerivative(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `t` — `number`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().quadraticBezierDerivative(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

## Vec3.cubicBezierDerivative()

Cubic Bézier tangent at t.

Writes the tangent at `t` into this vector, giving the direction of travel at that point.

```ts
cubicBezierDerivative(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `t` — `number`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().cubicBezierDerivative(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

## Vec3.quadraticBezierSplit()

Split a quadratic at t into left and right.

de Casteljau subdivision: fills the `left` and `right` arrays with the control points of two curves that together trace the original exactly. Missing entries are created for you.

```ts
quadraticBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, t: number, left: Vec3[], right: Vec3[]): void
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `t` — `number`.
- `left` — `Vec3[]`.
- `right` — `Vec3[]`.

### Returns

`void`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().quadraticBezierSplit(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5, new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

## Vec3.cubicBezierSplit()

Split a cubic at t into left and right.

Cuts the cubic at `t` into two cubics that together match the original.

```ts
cubicBezierSplit(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number, left: Vec3[], right: Vec3[]): void
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `t` — `number`.
- `left` — `Vec3[]`.
- `right` — `Vec3[]`.

### Returns

`void`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().cubicBezierSplit(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5, new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

## Vec3.quadraticBezierLength()

Sampled arc length of a quadratic.

Approximates arc length by sampling the curve and summing straight segments, so more `samples` buys accuracy at the cost of work.

```ts
quadraticBezierLength(p0: Vec3, p1: Vec3, p2: Vec3, samples?: number): number
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().quadraticBezierLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 16);
```

## Vec3.cubicBezierLength()

Sampled arc length of a cubic.

Approximates arc length by sampling. Bézier arc length has no closed form, which is why this is sampled rather than exact.

```ts
cubicBezierLength(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, samples?: number): number
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().cubicBezierLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 16);
```

## Vec3.quadraticBezierParameterAtLength()

Parameter t at the given quadratic arc length.

Returns the `t` that lands a given distance along the curve. Stepping `t` evenly does not move at an even speed, so this is what you need for constant-speed travel. Feed the result to `quadraticBezier()` to get the point.

```ts
quadraticBezierParameterAtLength(p0: Vec3, p1: Vec3, p2: Vec3, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().quadraticBezierParameterAtLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 10, 16);
```

## Vec3.cubicBezierParameterAtLength()

Parameter t at the given cubic arc length.

Returns the `t` at a given distance along the cubic. Pass it to `cubicBezier()` to turn it into a point.

```ts
cubicBezierParameterAtLength(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vec3`.
- `p1` — `Vec3`.
- `p2` — `Vec3`.
- `p3` — `Vec3`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().cubicBezierParameterAtLength(new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), new Vec3(1, 2, 3), 10, 16);
```

## Vec3.clamp()

Clamp each component between min and max.

Clamps each component between the matching components of `min` and `max`, confining the point to an axis-aligned box.

```ts
clamp(min: Vec3, max: Vec3): Vec3
```

### Parameters

- `min` — `Vec3`.
- `max` — `Vec3`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().clamp(new Vec3(1, 2, 3), new Vec3(1, 2, 3));
```

## Vec3.lerp()

Linear interpolate from min to max by amount.

Interpolates from `min` to `max` by `amount` and writes the result here. `amount` is not clamped, so values outside 0–1 extrapolate past the ends.

```ts
lerp(min: Vec3, max: Vec3, amount: number): Vec3
```

### Parameters

- `min` — `Vec3`.
- `max` — `Vec3`.
- `amount` — `number`.

### Returns

`Vec3`

### Example

```js
import { Vec3 } from '@1pizzateam/spockjs';


const result = new Vec3().lerp(new Vec3(1, 2, 3), new Vec3(1, 2, 3), 0.5);
```

