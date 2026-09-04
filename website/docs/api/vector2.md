# Vector2

Import with `import { Vector2 } from '@1pizzateam/spockjs';`.

## Constructor

Create a 2D vector (defaults to the origin).

```ts
new Vector2(x: number = 0, y: number = 0)
```

### Parameters

- `x` — `number`. Optional.
- `y` — `number`. Optional.

### Returns

`Vector2`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';

const value = new Vector2(1, 1);
```

## Vector2.setScalar()

Set x and/or y; omitted axes are unchanged.

```ts
setScalar(x?: number | null, y?: number | null): Vector2
```

### Parameters

- `x` — `number | null`. Optional. Value of the X axis
- `y` — `number | null`. Optional. Value of the Y axis

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setScalar(1, 1);
```

## Vector2.setArray()

Set x, y from array at offset.

```ts
setArray(array: number[], offset: number = 0): Vector2
```

### Parameters

- `array` — `number[]`. The array containing values for X and Y axis
- `offset` — `number`. Optional. the starting index of the array

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setArray([1, 2, 3], 0);
```

## Vector2.copy()

Copy another vector into this one.

```ts
copy(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`. A vector to copy

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().copy(new Vector2(1, 2));
```

## Vector2.isPositive()

True if both components are >= 0.

```ts
isPositive(): boolean
```

### Parameters

None.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().isPositive();
```

## Vector2.isEqualTo()

True if both components equal scalar.

```ts
isEqualTo(scalar: number): boolean
```

### Parameters

- `scalar` — `number`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().isEqualTo(1);
```

## Vector2.equals()

True if both components match the other vector.

```ts
equals(vector: Vector2): boolean
```

### Parameters

- `vector` — `Vector2`.

### Returns

`boolean`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().equals(new Vector2(1, 2));
```

## Vector2.isOrigin()

True if both components are 0.

```ts
isOrigin(): boolean
```

### Parameters

None.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().isOrigin();
```

## Vector2.toArray()

Write [x, y] into target (or a new array).

```ts
toArray(target: number[] = []): number[]
```

### Parameters

- `target` — `number[]`. Optional.

### Returns

`number[]` — The vector exported as an array

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().toArray([1, 2, 3]);
```

## Vector2.toString()

Human-readable (x, y) string.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — The vector exported as a string

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().toString();
```

## Vector2.origin()

Set both components to 0.

```ts
origin(): Vector2
```

### Parameters

None.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().origin();
```

## Vector2.getMagnitude()

Length, or squared length if square is true.

```ts
getMagnitude(square: boolean = false): number
```

### Parameters

- `square` — `boolean`. Optional.

### Returns

`number` — The magnitude of the vector or the squared magnitude depending on the given parameter

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().getMagnitude(false);
```

## Vector2.getDistance()

Distance to vector; squared if square is true.

```ts
getDistance(vector: Vector2, square: boolean = false): number
```

### Parameters

- `vector` — `Vector2`.
- `square` — `boolean`. Optional.

### Returns

`number` — The distance between the vectors

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().getDistance(new Vector2(1, 2), false);
```

## Vector2.add()

Add vector in place.

```ts
add(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().add(new Vector2(1, 2));
```

## Vector2.addScaledVector()

Add vector scaled by scalar.

```ts
addScaledVector(vector: Vector2, scalar: number): Vector2
```

### Parameters

- `vector` — `Vector2`.
- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().addScaledVector(new Vector2(1, 2), 1);
```

## Vector2.addScalar()

Add scalar to both components.

```ts
addScalar(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().addScalar(1);
```

## Vector2.addComponents()

Sum of x and y.

```ts
addComponents(): number
```

### Parameters

None.

### Returns

`number`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().addComponents();
```

## Vector2.subtract()

Subtract vector in place.

```ts
subtract(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().subtract(new Vector2(1, 2));
```

## Vector2.subtractScaledVector()

Subtract vector scaled by scalar.

```ts
subtractScaledVector(vector: Vector2, scalar: number): Vector2
```

### Parameters

- `vector` — `Vector2`.
- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().subtractScaledVector(new Vector2(1, 2), 1);
```

## Vector2.subtractScalar()

Subtract scalar from both components.

```ts
subtractScalar(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().subtractScalar(1);
```

## Vector2.multiply()

Component-wise multiply.

```ts
multiply(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().multiply(new Vector2(1, 2));
```

## Vector2.multiplyScaledVector()

Component-wise multiply by vector * scalar.

```ts
multiplyScaledVector(vector: Vector2, scalar: number): Vector2
```

### Parameters

- `vector` — `Vector2`.
- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().multiplyScaledVector(new Vector2(1, 2), 1);
```

## Vector2.scale()

Multiply by scalar, optionally on one axis.

```ts
scale(scalar: number, axis?: 'x' | 'y'): Vector2
```

### Parameters

- `scalar` — `number`.
- `axis` — `'x' | 'y'`. Optional.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().scale(1, 'x');
```

## Vector2.divide()

Component-wise divide.

```ts
divide(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().divide(new Vector2(1, 2));
```

## Vector2.divideScaledVector()

Component-wise divide by vector * scalar.

```ts
divideScaledVector(vector: Vector2, scalar: number): Vector2
```

### Parameters

- `vector` — `Vector2`.
- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().divideScaledVector(new Vector2(1, 2), 1);
```

## Vector2.divideScalar()

Divide both components by scalar.

```ts
divideScalar(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().divideScalar(1);
```

## Vector2.halve()

Scale by 1/2.

```ts
halve(): Vector2
```

### Parameters

None.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().halve();
```

## Vector2.max()

Component-wise maximum with vector.

```ts
max(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().max(new Vector2(1, 2));
```

## Vector2.min()

Component-wise minimum with vector.

```ts
min(vector: Vector2): Vector2
```

### Parameters

- `vector` — `Vector2`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().min(new Vector2(1, 2));
```

## Vector2.maxScalar()

Raise each component to at least scalar.

```ts
maxScalar(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().maxScalar(1);
```

## Vector2.minScalar()

Lower each component to at most scalar.

```ts
minScalar(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().minScalar(1);
```

## Vector2.normalize()

Scale to unit length.

```ts
normalize(): Vector2
```

### Parameters

None.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().normalize();
```

## Vector2.absolute()

Absolute value, optionally on one axis.

```ts
absolute(axis?: 'x' | 'y'): Vector2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().absolute('x');
```

## Vector2.opposite()

Negate, optionally on one axis.

```ts
opposite(axis?: 'x' | 'y'): Vector2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().opposite('x');
```

## Vector2.floor()

Floor, optionally on one axis.

```ts
floor(axis?: 'x' | 'y'): Vector2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional.

### Returns

`Vector2`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().floor('x');
```

## Vector2.ceil()

Ceil, optionally on one axis.

```ts
ceil(axis?: 'x' | 'y'): Vector2
```

### Parameters

- `axis` — `'x' | 'y'`. Optional.

### Returns

`Vector2`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().ceil('x');
```

## Vector2.dotProduct()

Dot product with vector.

```ts
dotProduct(vector: Vector2): number
```

### Parameters

- `vector` — `Vector2`.

### Returns

`number` — the dot product

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().dotProduct(new Vector2(1, 2));
```

## Vector2.setRadian()

Keep length; set heading in radians.

```ts
setRadian(angle: number): Vector2
```

### Parameters

- `angle` — `number`. an angle in radian

### Returns

`Vector2` — The vector with its new axis value

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setRadian(Math.PI / 4);
```

## Vector2.setDegree()

Keep length; set heading in degrees.

```ts
setDegree(angle: number): Vector2
```

### Parameters

- `angle` — `number`. an angle in degree

### Returns

`Vector2` — The vector with its new axis value

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setDegree(Math.PI / 4);
```

## Vector2.setMinAxis()

Set the smaller component to scalar.

```ts
setMinAxis(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`. A scalar number to set the min axis with

### Returns

`Vector2` — The vector with its new axis value

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setMinAxis(1);
```

## Vector2.setMaxAxis()

Set the larger component to scalar.

```ts
setMaxAxis(scalar: number): Vector2
```

### Parameters

- `scalar` — `number`. A scalar number to set the max axis with

### Returns

`Vector2` — The vector with its new axis value

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setMaxAxis(1);
```

## Vector2.setOppositeAxis()

Set the other axis to value.

```ts
setOppositeAxis(axis: 'x' | 'y', value: number): Vector2
```

### Parameters

- `axis` — `'x' | 'y'`. The name of the axis. either 'x' or 'y'
- `value` — `number`.

### Returns

`Vector2` — The vector with its new axis value

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().setOppositeAxis('x', 1);
```

## Vector2.clone()

Independent copy.

```ts
clone(): Vector2
```

### Parameters

None.

### Returns

`Vector2` — The new vector

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().clone();
```

## Vector2.getAngle()

Heading in radians, or false at the origin.

```ts
getAngle(): number | false
```

### Parameters

None.

### Returns

`number | false` — The angle in radians (in [-π,π]) between the positive x-axis and the ray from (0,0) to the point

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().getAngle();
```

## Vector2.quadraticBezier()

Evaluate a quadratic Bézier at t into this vector.

```ts
quadraticBezier(p0: Vector2, p1: Vector2, p2: Vector2, t: number): Vector2
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `t` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().quadraticBezier(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 0.5);
```

## Vector2.cubicBezier()

Evaluate a cubic Bézier at t into this vector.

```ts
cubicBezier(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, t: number): Vector2
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `p3` — `Vector2`.
- `t` — `number`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().cubicBezier(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 0.5);
```

## Vector2.quadraticBezierDerivative()

Quadratic Bézier tangent at t.

```ts
quadraticBezierDerivative(p0: Vector2, p1: Vector2, p2: Vector2, t: number): Vector2
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `t` — `number`.

### Returns

`Vector2`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().quadraticBezierDerivative(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 0.5);
```

## Vector2.cubicBezierDerivative()

Cubic Bézier tangent at t.

```ts
cubicBezierDerivative(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, t: number): Vector2
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `p3` — `Vector2`.
- `t` — `number`.

### Returns

`Vector2`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().cubicBezierDerivative(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 0.5);
```

## Vector2.quadraticBezierSplit()

Split a quadratic at t into left and right.

```ts
quadraticBezierSplit(p0: Vector2, p1: Vector2, p2: Vector2, t: number, left: Vector2[], right: Vector2[]): void
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `t` — `number`.
- `left` — `Vector2[]`.
- `right` — `Vector2[]`.

### Returns

`void`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().quadraticBezierSplit(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 0.5, new Vector2(1, 2), new Vector2(1, 2));
```

## Vector2.cubicBezierSplit()

Split a cubic at t into left and right.

```ts
cubicBezierSplit(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, t: number, left: Vector2[], right: Vector2[]): void
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `p3` — `Vector2`.
- `t` — `number`.
- `left` — `Vector2[]`.
- `right` — `Vector2[]`.

### Returns

`void`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().cubicBezierSplit(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 0.5, new Vector2(1, 2), new Vector2(1, 2));
```

## Vector2.quadraticBezierLength()

Sampled arc length of a quadratic.

```ts
quadraticBezierLength(p0: Vector2, p1: Vector2, p2: Vector2, samples?: number): number
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().quadraticBezierLength(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 16);
```

## Vector2.cubicBezierLength()

Sampled arc length of a cubic.

```ts
cubicBezierLength(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, samples?: number): number
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `p3` — `Vector2`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().cubicBezierLength(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 16);
```

## Vector2.quadraticBezierParameterAtLength()

Parameter t at the given quadratic arc length.

```ts
quadraticBezierParameterAtLength(p0: Vector2, p1: Vector2, p2: Vector2, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().quadraticBezierParameterAtLength(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 10, 16);
```

## Vector2.cubicBezierParameterAtLength()

Parameter t at the given cubic arc length.

```ts
cubicBezierParameterAtLength(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vector2`.
- `p1` — `Vector2`.
- `p2` — `Vector2`.
- `p3` — `Vector2`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().cubicBezierParameterAtLength(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2), 10, 16);
```

## Vector2.getMaxAxis()

Name of the larger component.

```ts
getMaxAxis(): 'x' | 'y'
```

### Parameters

None.

### Returns

`'x' | 'y'` — The name of the axis

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().getMaxAxis();
```

## Vector2.getMinAxis()

Name of the smaller component.

```ts
getMinAxis(): 'x' | 'y'
```

### Parameters

None.

### Returns

`'x' | 'y'` — The name of the axis

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().getMinAxis();
```

## Vector2.clamp()

Clamp this point inside a rectangle.

```ts
clamp(rectangle: Rectangle): Vector2
```

### Parameters

- `rectangle` — `Rectangle`.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2, Rectangle } from '@1pizzateam/spockjs';


const result = new Vector2().clamp(new Rectangle(10, 10, 0, 0));
```

## Vector2.lerp()

Linear interpolate from min to max by amount.

```ts
lerp(min: Vector2, max: Vector2, amount: number): Vector2
```

### Parameters

- `min` — `Vector2`.
- `max` — `Vector2`.
- `amount` — `number`. the amount of interpolation; some value between 0.0 (old vector) and 1.0 (new vector). 0.9 is very near the new vector. 0.5 is halfway in between.

### Returns

`Vector2` — The vector with its new values

### Example

```js
import { Vector2 } from '@1pizzateam/spockjs';


const result = new Vector2().lerp(new Vector2(1, 2), new Vector2(1, 2), 0.5);
```

