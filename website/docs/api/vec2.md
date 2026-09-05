# Vec2

A mutable two-dimensional vector: public `x` and `y` numbers plus the operations you usually want around them.

Use it for positions, directions, velocities, sizes, and any other 2D pair. Nearly every method writes into the vector it was called on and returns that same vector, so operations chain and a render loop can reuse a handful of instances instead of allocating a new one each frame. When you need an independent value, take a `clone()` first.

On top of arithmetic it carries magnitude and distance queries, normalization, per-axis rounding, angle helpers that read and write the vector's heading, interpolation with `lerp()`, clamping into a `Rect`, and Bézier evaluation, so curve sampling stays in vector space.

```js
import { Vec2 } from '@1pizzateam/spockjs';

const velocity = new Vec2(3, 4).normalize().scale(10);

const start = new Vec2(100, 50);
const position = start.clone().add(velocity);
const travelled = position.getDistance(start);
```

## Constructor

Create a 2D vector (defaults to the origin).

Both components default to 0, so `new Vec2()` is the origin.

```ts
new Vec2(x: number = 0, y: number = 0)
```

### Parameters

- `x` — `number`. Optional.
- `y` — `number`. Optional.

### Returns

`Vec2`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';

const value = new Vec2(1, 1);
```

## Vec2.setScalar()

Set x and/or y; omitted axes are unchanged.

Passing `null` or `undefined` for an axis leaves that axis alone, so you can write one component without reading the others back.

```ts
setScalar(x?: number | null, y?: number | null): Vec2
```

### Parameters

- `x` — `number | null`. Optional. Value of the X axis
- `y` — `number | null`. Optional. Value of the Y axis

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setScalar(1, 1);
```

## Vec2.setArray()

Set x, y from array at offset.

Reads consecutive entries starting at `offset`, which makes it easy to pull one vertex out of a packed buffer. Entries past the end of the array leave that axis unchanged.

```ts
setArray(array: number[], offset: number = 0): Vec2
```

### Parameters

- `array` — `number[]`. The array containing values for X and Y axis
- `offset` — `number`. Optional. the starting index of the array

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setArray([1, 2, 3], 0);
```

## Vec2.copy()

Copy another vector into this one.

Overwrites this vector from another one and keeps your instance, which is how you avoid an allocation inside a loop. Use `clone()` when you want a separate object.

```ts
copy(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`. A vector to copy

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().copy(new Vec2(1, 2));
```

## Vec2.isPositive()

True if both components are >= 0.

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
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().isPositive();
```

## Vec2.isEqualTo()

True if both components equal scalar.

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
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().isEqualTo(1);
```

## Vec2.equals()

True if both components match the other vector.

Exact component comparison, so it inherits floating-point strictness: two vectors that reached the same value by different arithmetic can still differ in the last bits.

```ts
equals(vector: Vec2): boolean
```

### Parameters

- `vector` — `Vec2`.

### Returns

`boolean`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().equals(new Vec2(1, 2));
```

## Vec2.isOrigin()

True if both components are 0.

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
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().isOrigin();
```

## Vec2.toArray()

Write [x, y] into target (or a new array).

Passing a target array writes into it and returns it, so you can fill part of a larger buffer without allocating.

```ts
toArray(target: number[] = []): number[]
```

### Parameters

- `target` — `number[]`. Optional.

### Returns

`number[]` — The vector exported as an array

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().toArray([1, 2, 3]);
```

## Vec2.toString()

Human-readable (x, y) string.

function toString() { [native code] }

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — The vector exported as a string

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().toString();
```

## Vec2.origin()

Set both components to 0.

Resets every component to zero in place, reusing the instance instead of replacing it.

```ts
origin(): Vec2
```

### Parameters

None.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().origin();
```

## Vec2.getMagnitude()

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
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().getMagnitude(false);
```

## Vec2.getDistance()

Distance to vector; squared if square is true.

Pass `true` for the squared distance. Testing a squared distance against a squared radius is the usual way to check range without a square root.

```ts
getDistance(vector: Vec2, square: boolean = false): number
```

### Parameters

- `vector` — `Vec2`.
- `square` — `boolean`. Optional.

### Returns

`number` — The distance between the vectors

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().getDistance(new Vec2(1, 2), false);
```

## Vec2.add()

Add vector in place.

Adds component by component and returns this vector, so it chains.

```ts
add(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().add(new Vec2(1, 2));
```

## Vec2.addScaledVector()

Add vector scaled by scalar.

Adds `vector * scalar` without building a temporary. This is the integration step in most motion code: `position.addScaledVector(velocity, deltaTime)`.

```ts
addScaledVector(vector: Vec2, scalar: number): Vec2
```

### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().addScaledVector(new Vec2(1, 2), 1);
```

## Vec2.addScalar()

Add scalar to both components.

Adds the same number to every component, shifting the vector along the diagonal.

```ts
addScalar(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().addScalar(1);
```

## Vec2.addComponents()

Sum of x and y.

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
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().addComponents();
```

## Vec2.subtract()

Subtract vector in place.

Subtracts component by component. To get the vector pointing from A to B, copy B and subtract A.

```ts
subtract(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().subtract(new Vec2(1, 2));
```

## Vec2.subtractScaledVector()

Subtract vector scaled by scalar.

Subtracts `vector * scalar` in one step, the counterpart to `addScaledVector()`.

```ts
subtractScaledVector(vector: Vec2, scalar: number): Vec2
```

### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().subtractScaledVector(new Vec2(1, 2), 1);
```

## Vec2.subtractScalar()

Subtract scalar from both components.

Subtracts the same number from every component.

```ts
subtractScalar(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().subtractScalar(1);
```

## Vec2.multiply()

Component-wise multiply.

Multiplies component by component, which is a non-uniform scale rather than any kind of vector product. For the dot product use `dotProduct()`.

```ts
multiply(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().multiply(new Vec2(1, 2));
```

## Vec2.multiplyScaledVector()

Component-wise multiply by vector * scalar.

Component-wise multiply by `vector * scalar`, combining a non-uniform and a uniform scale in one pass.

```ts
multiplyScaledVector(vector: Vec2, scalar: number): Vec2
```

### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().multiplyScaledVector(new Vec2(1, 2), 1);
```

## Vec2.scale()

Multiply by scalar, optionally on one axis.

Multiplies every component by the scalar, or only one component when you name an axis. Chain it after `normalize()` to set a vector to an exact length.

```ts
scale(scalar: number, axis?: 'x' | 'y'): Vec2
```

### Parameters

- `scalar` — `number`.
- `axis` — `'x' | 'y'`. Optional.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().scale(1, 'x');
```

## Vec2.divide()

Component-wise divide.

Divides component by component. A zero in the divisor yields `Infinity` rather than throwing.

```ts
divide(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().divide(new Vec2(1, 2));
```

## Vec2.divideScaledVector()

Component-wise divide by vector * scalar.

Divides component-wise by `vector * scalar`.

```ts
divideScaledVector(vector: Vec2, scalar: number): Vec2
```

### Parameters

- `vector` — `Vec2`.
- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().divideScaledVector(new Vec2(1, 2), 1);
```

## Vec2.divideScalar()

Divide both components by scalar.

Divides every component by the scalar.

```ts
divideScalar(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().divideScalar(1);
```

## Vec2.halve()

Scale by 1/2.

Multiplies by 0.5, which comes up constantly for midpoints and half-extents.

```ts
halve(): Vec2
```

### Parameters

None.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().halve();
```

## Vec2.max()

Component-wise maximum with vector.

Keeps the larger value on each axis independently, so the result can match neither input. Paired with `min()` this clamps a point into a box.

```ts
max(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().max(new Vec2(1, 2));
```

## Vec2.min()

Component-wise minimum with vector.

Keeps the smaller value on each axis independently.

```ts
min(vector: Vec2): Vec2
```

### Parameters

- `vector` — `Vec2`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().min(new Vec2(1, 2));
```

## Vec2.maxScalar()

Raise each component to at least scalar.

Raises any component below the scalar up to it: a per-component lower bound.

```ts
maxScalar(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().maxScalar(1);
```

## Vec2.minScalar()

Lower each component to at most scalar.

Lowers any component above the scalar down to it: a per-component upper bound.

```ts
minScalar(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().minScalar(1);
```

## Vec2.normalize()

Scale to unit length.

Scales to unit length while keeping direction. A zero-length vector is left untouched rather than becoming `NaN`, and a vector already at length 1 is skipped.

```ts
normalize(): Vec2
```

### Parameters

None.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().normalize();
```

## Vec2.absolute()

Absolute value, optionally on one axis.

Takes the absolute value of every component, or of one named axis.

```ts
absolute(axis?: 'x' | 'y'): Vec2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().absolute('x');
```

## Vec2.opposite()

Negate, optionally on one axis.

Negates every component, or one named axis. Negating all of them reverses the direction.

```ts
opposite(axis?: 'x' | 'y'): Vec2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().opposite('x');
```

## Vec2.floor()

Floor, optionally on one axis.

Rounds every component down, or one named axis. This is how a position becomes an integer cell index.

```ts
floor(axis?: 'x' | 'y'): Vec2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional.

### Returns

`Vec2`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().floor('x');
```

## Vec2.ceil()

Ceil, optionally on one axis.

Rounds every component up, or one named axis.

```ts
ceil(axis?: 'x' | 'y'): Vec2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional.

### Returns

`Vec2`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().ceil('x');
```

## Vec2.dotProduct()

Dot product with vector.

Returns a number, not a vector. For unit vectors it is the cosine of the angle between them: 1 is the same direction, 0 perpendicular, -1 opposite.

```ts
dotProduct(vector: Vec2): number
```

### Parameters

- `vector` — `Vec2`.

### Returns

`number` — the dot product

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().dotProduct(new Vec2(1, 2));
```

## Vec2.setRadian()

Keep length; set heading in radians.

Turns the vector to the given heading while keeping its current length. A zero-length vector has no length to keep, so it stays at the origin.

```ts
setRadian(angle: number): Vec2
```

### Parameters

- `angle` — `number`. an angle in radian

### Returns

`Vec2` — The vector with its new axis value

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setRadian(Math.PI / 4);
```

## Vec2.setDegree()

Keep length; set heading in degrees.

Same as `setRadian()`, with the conversion from degrees done for you.

```ts
setDegree(angle: number): Vec2
```

### Parameters

- `angle` — `number`. an angle in degree

### Returns

`Vec2` — The vector with its new axis value

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setDegree(Math.PI / 4);
```

## Vec2.setMinAxis()

Set the smaller component to scalar.

Overwrites whichever component is currently smaller. Which axis that is depends on the values at call time, not on a fixed choice.

```ts
setMinAxis(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`. A scalar number to set the min axis with

### Returns

`Vec2` — The vector with its new axis value

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setMinAxis(1);
```

## Vec2.setMaxAxis()

Set the larger component to scalar.

Overwrites whichever component is currently larger.

```ts
setMaxAxis(scalar: number): Vec2
```

### Parameters

- `scalar` — `number`. A scalar number to set the max axis with

### Returns

`Vec2` — The vector with its new axis value

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setMaxAxis(1);
```

## Vec2.setOppositeAxis()

Set the other axis to value.

Writes the axis you did not name: pass `x` to set `y`, and the other way round.

```ts
setOppositeAxis(axis: 'x' | 'y', value: number): Vec2
```

### Parameters

- `axis` — `'x' | 'y'`. The name of the axis. either 'x' or 'y'
- `value` — `number`.

### Returns

`Vec2` — The vector with its new axis value

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().setOppositeAxis('x', 1);
```

## Vec2.clone()

Independent copy.

Returns a new, independent vector. Take one before a chain of mutating calls when you still need the original.

```ts
clone(): Vec2
```

### Parameters

None.

### Returns

`Vec2` — The new vector

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().clone();
```

## Vec2.getAngle()

Heading in radians, or false at the origin.

Returns the heading in radians measured from the positive X axis, or `false` at the origin where direction is undefined. Check for `false` before using the result in arithmetic.

```ts
getAngle(): number | false
```

### Parameters

None.

### Returns

`number | false` — The angle in radians (in [-π,π]) between the positive x-axis and the ray from (0,0) to the point

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().getAngle();
```

## Vec2.quadraticBezier()

Evaluate a quadratic Bézier at t into this vector.

Writes the point at `t` into this vector rather than allocating a result, so a sampling loop can reuse one instance. `t` runs from 0 at `p0` to 1 at `p2`.

```ts
quadraticBezier(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `t` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().quadraticBezier(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

## Vec2.cubicBezier()

Evaluate a cubic Bézier at t into this vector.

Writes the point at `t` into this vector. `t` runs from 0 at `p0` to 1 at `p3`, and the curve passes through the endpoints but not the two middle controls.

```ts
cubicBezier(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `t` — `number`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().cubicBezier(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

## Vec2.quadraticBezierDerivative()

Quadratic Bézier tangent at t.

Writes the tangent at `t` into this vector. Normalize it for a direction, or take its angle to orient something along the curve.

```ts
quadraticBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `t` — `number`.

### Returns

`Vec2`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().quadraticBezierDerivative(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

## Vec2.cubicBezierDerivative()

Cubic Bézier tangent at t.

Writes the tangent at `t` into this vector, giving the direction of travel at that point.

```ts
cubicBezierDerivative(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `t` — `number`.

### Returns

`Vec2`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().cubicBezierDerivative(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

## Vec2.quadraticBezierSplit()

Split a quadratic at t into left and right.

de Casteljau subdivision: fills the `left` and `right` arrays with the control points of two curves that together trace the original exactly. Missing entries are created for you.

```ts
quadraticBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, t: number, left: Vec2[], right: Vec2[]): void
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `t` — `number`.
- `left` — `Vec2[]`.
- `right` — `Vec2[]`.

### Returns

`void`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().quadraticBezierSplit(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5, new Vec2(1, 2), new Vec2(1, 2));
```

## Vec2.cubicBezierSplit()

Split a cubic at t into left and right.

Cuts the cubic at `t` into two cubics that together match the original.

```ts
cubicBezierSplit(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number, left: Vec2[], right: Vec2[]): void
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `t` — `number`.
- `left` — `Vec2[]`.
- `right` — `Vec2[]`.

### Returns

`void`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().cubicBezierSplit(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 0.5, new Vec2(1, 2), new Vec2(1, 2));
```

## Vec2.quadraticBezierLength()

Sampled arc length of a quadratic.

Approximates arc length by sampling the curve and summing straight segments, so more `samples` buys accuracy at the cost of work.

```ts
quadraticBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, samples?: number): number
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().quadraticBezierLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 16);
```

## Vec2.cubicBezierLength()

Sampled arc length of a cubic.

Approximates arc length by sampling. Bézier arc length has no closed form, which is why this is sampled rather than exact.

```ts
cubicBezierLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, samples?: number): number
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().cubicBezierLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 16);
```

## Vec2.quadraticBezierParameterAtLength()

Parameter t at the given quadratic arc length.

Returns the `t` that lands a given distance along the curve. Stepping `t` evenly does not move at an even speed, so this is what you need for constant-speed travel. Feed the result to `quadraticBezier()` to get the point.

```ts
quadraticBezierParameterAtLength(p0: Vec2, p1: Vec2, p2: Vec2, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().quadraticBezierParameterAtLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 10, 16);
```

## Vec2.cubicBezierParameterAtLength()

Parameter t at the given cubic arc length.

Returns the `t` at a given distance along the cubic. Pass it to `cubicBezier()` to turn it into a point.

```ts
cubicBezierParameterAtLength(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vec2`.
- `p1` — `Vec2`.
- `p2` — `Vec2`.
- `p3` — `Vec2`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().cubicBezierParameterAtLength(new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), new Vec2(1, 2), 10, 16);
```

## Vec2.getMaxAxis()

Name of the larger component.

Returns the name of the larger component, `'x'` or `'y'`, which you can hand straight to the axis argument of `scale()`, `absolute()`, `floor()`, and friends.

```ts
getMaxAxis(): 'x' | 'y'
```

### Parameters

None.

### Returns

`'x' | 'y'` — The name of the axis

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().getMaxAxis();
```

## Vec2.getMinAxis()

Name of the smaller component.

Returns the name of the smaller component, usable the same way.

```ts
getMinAxis(): 'x' | 'y'
```

### Parameters

None.

### Returns

`'x' | 'y'` — The name of the axis

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().getMinAxis();
```

## Vec2.clamp()

Clamp this point inside a rectangle.

Confines this point to a `Rect`, reading the rectangle's cached corners. A point already inside is left untouched.

```ts
clamp(rect: Rect): Vec2
```

### Parameters

- `rect` — `Rect`.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2, Rect } from '@1pizzateam/spockjs';


const result = new Vec2().clamp(new Rect(10, 10, 0, 0));
```

## Vec2.lerp()

Linear interpolate from min to max by amount.

Interpolates from `min` to `max` by `amount` and writes the result here. `amount` is not clamped, so values outside 0–1 extrapolate past the ends.

```ts
lerp(min: Vec2, max: Vec2, amount: number): Vec2
```

### Parameters

- `min` — `Vec2`.
- `max` — `Vec2`.
- `amount` — `number`. the amount of interpolation; some value between 0.0 (old vector) and 1.0 (new vector). 0.9 is very near the new vector. 0.5 is halfway in between.

### Returns

`Vec2` — The vector with its new values

### Example

```js
import { Vec2 } from '@1pizzateam/spockjs';


const result = new Vec2().lerp(new Vec2(1, 2), new Vec2(1, 2), 0.5);
```

