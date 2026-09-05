# Vec2

Import with `import { Vec2 } from '@1pizzateam/spockjs';`.

## Constructor

Create a 2D vector (defaults to the origin).

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

