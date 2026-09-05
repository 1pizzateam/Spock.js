# Vector3

Import with `import { Vector3 } from '@1pizzateam/spockjs';`.

## Constructor

Create a 3D vector (defaults to the origin).

```ts
new Vector3(x: number = 0, y: number = 0, z: number = 0)
```

### Parameters

- `x` — `number`. Optional.
- `y` — `number`. Optional.
- `z` — `number`. Optional.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';

const value = new Vector3(1, 1, 1);
```

## Vector3.setScalar()

Set x, y, and/or z; omitted axes are unchanged.

```ts
setScalar(x?: number | null, y?: number | null, z?: number | null): Vector3
```

### Parameters

- `x` — `number | null`. Optional. Value of the X axis
- `y` — `number | null`. Optional. Value of the Y axis
- `z` — `number | null`. Optional. Value of the Z axis

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().setScalar(1, 1, 1);
```

## Vector3.setArray()

Set x, y, z from array at offset.

```ts
setArray(array: number[], offset: number = 0): Vector3
```

### Parameters

- `array` — `number[]`. The array containing values for x, y and z axis
- `offset` — `number`. Optional. the starting index of the array

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().setArray([1, 2, 3], 0);
```

## Vector3.copy()

Copy another vector into this one.

```ts
copy(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().copy(new Vector3(1, 2, 3));
```

## Vector3.isPositive()

True if all components are >= 0.

```ts
isPositive(): boolean
```

### Parameters

None.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().isPositive();
```

## Vector3.isEqualTo()

True if all components equal scalar.

```ts
isEqualTo(scalar: number): boolean
```

### Parameters

- `scalar` — `number`.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().isEqualTo(1);
```

## Vector3.equals()

True if all components match the other vector.

```ts
equals(vector: Vector3): boolean
```

### Parameters

- `vector` — `Vector3`.

### Returns

`boolean`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().equals(new Vector3(1, 2, 3));
```

## Vector3.isOrigin()

True if all components are 0.

```ts
isOrigin(): boolean
```

### Parameters

None.

### Returns

`boolean` — The result of the test

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().isOrigin();
```

## Vector3.toArray()

Write [x, y, z] into target (or a new array).

```ts
toArray(target: number[] = []): number[]
```

### Parameters

- `target` — `number[]`. Optional.

### Returns

`number[]` — The vector as an array

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().toArray([1, 2, 3]);
```

## Vector3.toString()

Human-readable (x, y, z) string.

```ts
toString(): string
```

### Parameters

None.

### Returns

`string` — The vector as a string

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().toString();
```

## Vector3.origin()

Set all components to 0.

```ts
origin(): Vector3
```

### Parameters

None.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().origin();
```

## Vector3.getMagnitude()

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
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().getMagnitude(false);
```

## Vector3.getDistance()

Distance to vector; squared if square is true.

```ts
getDistance(vector: Vector3, square: boolean = false): number
```

### Parameters

- `vector` — `Vector3`.
- `square` — `boolean`. Optional.

### Returns

`number` — the distance between the vectors

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().getDistance(new Vector3(1, 2, 3), false);
```

## Vector3.add()

Add vector in place.

```ts
add(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().add(new Vector3(1, 2, 3));
```

## Vector3.addScaledVector()

Add vector scaled by scalar.

```ts
addScaledVector(vector: Vector3, scalar: number): Vector3
```

### Parameters

- `vector` — `Vector3`.
- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().addScaledVector(new Vector3(1, 2, 3), 1);
```

## Vector3.addScalar()

Add scalar to all components.

```ts
addScalar(scalar: number): Vector3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().addScalar(1);
```

## Vector3.addComponents()

Sum of x, y, and z.

```ts
addComponents(): number
```

### Parameters

None.

### Returns

`number`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().addComponents();
```

## Vector3.subtract()

Subtract vector in place.

```ts
subtract(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().subtract(new Vector3(1, 2, 3));
```

## Vector3.subtractScaledVector()

Subtract vector scaled by scalar.

```ts
subtractScaledVector(vector: Vector3, scalar: number): Vector3
```

### Parameters

- `vector` — `Vector3`.
- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().subtractScaledVector(new Vector3(1, 2, 3), 1);
```

## Vector3.subtractScalar()

Subtract scalar from all components.

```ts
subtractScalar(scalar: number): Vector3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().subtractScalar(1);
```

## Vector3.multiply()

Component-wise multiply.

```ts
multiply(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().multiply(new Vector3(1, 2, 3));
```

## Vector3.multiplyScaledVector()

Component-wise multiply by vector * scalar.

```ts
multiplyScaledVector(vector: Vector3, scalar: number): Vector3
```

### Parameters

- `vector` — `Vector3`.
- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().multiplyScaledVector(new Vector3(1, 2, 3), 1);
```

## Vector3.scale()

Multiply by scalar, optionally on one axis.

```ts
scale(scalar: number, axis?: 'x' | 'y' | 'z'): Vector3
```

### Parameters

- `scalar` — `number`.
- `axis` — `'x' | 'y' | 'z'`. Optional.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().scale(1, 'x');
```

## Vector3.divide()

Component-wise divide.

```ts
divide(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().divide(new Vector3(1, 2, 3));
```

## Vector3.divideScaledVector()

Component-wise divide by vector * scalar.

```ts
divideScaledVector(vector: Vector3, scalar: number): Vector3
```

### Parameters

- `vector` — `Vector3`.
- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().divideScaledVector(new Vector3(1, 2, 3), 1);
```

## Vector3.divideScalar()

Divide all components by scalar.

```ts
divideScalar(scalar: number): Vector3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().divideScalar(1);
```

## Vector3.halve()

Scale by 1/2.

```ts
halve(): Vector3
```

### Parameters

None.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().halve();
```

## Vector3.max()

Component-wise maximum with vector.

```ts
max(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().max(new Vector3(1, 2, 3));
```

## Vector3.min()

Component-wise minimum with vector.

```ts
min(vector: Vector3): Vector3
```

### Parameters

- `vector` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().min(new Vector3(1, 2, 3));
```

## Vector3.maxScalar()

Raise each component to at least scalar.

```ts
maxScalar(scalar: number): Vector3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().maxScalar(1);
```

## Vector3.minScalar()

Lower each component to at most scalar.

```ts
minScalar(scalar: number): Vector3
```

### Parameters

- `scalar` — `number`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().minScalar(1);
```

## Vector3.normalize()

Scale to unit length.

```ts
normalize(): Vector3
```

### Parameters

None.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().normalize();
```

## Vector3.absolute()

Absolute value, optionally on one axis.

```ts
absolute(axis?: 'x' | 'y' | 'z'): Vector3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().absolute('x');
```

## Vector3.opposite()

Negate, optionally on one axis.

```ts
opposite(axis?: 'x' | 'y' | 'z'): Vector3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional. The axis you want to set or undefined if you want to change both axis

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().opposite('x');
```

## Vector3.floor()

Floor, optionally on one axis.

```ts
floor(axis?: 'x' | 'y' | 'z'): Vector3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().floor('x');
```

## Vector3.ceil()

Ceil, optionally on one axis.

```ts
ceil(axis?: 'x' | 'y' | 'z'): Vector3
```

### Parameters

- `axis` — `'x' | 'y' | 'z'`. Optional.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().ceil('x');
```

## Vector3.dotProduct()

Dot product with vector.

```ts
dotProduct(vector: Vector3): number
```

### Parameters

- `vector` — `Vector3`.

### Returns

`number` — The dot product

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().dotProduct(new Vector3(1, 2, 3));
```

## Vector3.clone()

Independent copy.

```ts
clone(): Vector3
```

### Parameters

None.

### Returns

`Vector3` — The new vector

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().clone();
```

## Vector3.cross()

Cross product with v, in place.

```ts
cross(v: Vector3): Vector3
```

### Parameters

- `v` — `Vector3`.

### Returns

`Vector3` — The vector with its new values

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().cross(new Vector3(1, 2, 3));
```

## Vector3.getAngle()

Angle in radians between this and vector, or false if either is zero.

```ts
getAngle(vector: Vector3): number | false
```

### Parameters

- `vector` — `Vector3`.

### Returns

`number | false`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().getAngle(new Vector3(1, 2, 3));
```

## Vector3.quadraticBezier()

Evaluate a quadratic Bézier at t into this vector.

```ts
quadraticBezier(p0: Vector3, p1: Vector3, p2: Vector3, t: number): Vector3
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `t` — `number`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().quadraticBezier(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5);
```

## Vector3.cubicBezier()

Evaluate a cubic Bézier at t into this vector.

```ts
cubicBezier(p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, t: number): Vector3
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `p3` — `Vector3`.
- `t` — `number`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().cubicBezier(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5);
```

## Vector3.quadraticBezierDerivative()

Quadratic Bézier tangent at t.

```ts
quadraticBezierDerivative(p0: Vector3, p1: Vector3, p2: Vector3, t: number): Vector3
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `t` — `number`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().quadraticBezierDerivative(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5);
```

## Vector3.cubicBezierDerivative()

Cubic Bézier tangent at t.

```ts
cubicBezierDerivative(p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, t: number): Vector3
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `p3` — `Vector3`.
- `t` — `number`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().cubicBezierDerivative(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5);
```

## Vector3.quadraticBezierSplit()

Split a quadratic at t into left and right.

```ts
quadraticBezierSplit(p0: Vector3, p1: Vector3, p2: Vector3, t: number, left: Vector3[], right: Vector3[]): void
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `t` — `number`.
- `left` — `Vector3[]`.
- `right` — `Vector3[]`.

### Returns

`void`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().quadraticBezierSplit(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5, new Vector3(1, 2, 3), new Vector3(1, 2, 3));
```

## Vector3.cubicBezierSplit()

Split a cubic at t into left and right.

```ts
cubicBezierSplit(p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, t: number, left: Vector3[], right: Vector3[]): void
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `p3` — `Vector3`.
- `t` — `number`.
- `left` — `Vector3[]`.
- `right` — `Vector3[]`.

### Returns

`void`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().cubicBezierSplit(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5, new Vector3(1, 2, 3), new Vector3(1, 2, 3));
```

## Vector3.quadraticBezierLength()

Sampled arc length of a quadratic.

```ts
quadraticBezierLength(p0: Vector3, p1: Vector3, p2: Vector3, samples?: number): number
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().quadraticBezierLength(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 16);
```

## Vector3.cubicBezierLength()

Sampled arc length of a cubic.

```ts
cubicBezierLength(p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, samples?: number): number
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `p3` — `Vector3`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().cubicBezierLength(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 16);
```

## Vector3.quadraticBezierParameterAtLength()

Parameter t at the given quadratic arc length.

```ts
quadraticBezierParameterAtLength(p0: Vector3, p1: Vector3, p2: Vector3, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().quadraticBezierParameterAtLength(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 10, 16);
```

## Vector3.cubicBezierParameterAtLength()

Parameter t at the given cubic arc length.

```ts
cubicBezierParameterAtLength(p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, distance: number, samples?: number): number
```

### Parameters

- `p0` — `Vector3`.
- `p1` — `Vector3`.
- `p2` — `Vector3`.
- `p3` — `Vector3`.
- `distance` — `number`.
- `samples` — `number`. Optional.

### Returns

`number`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().cubicBezierParameterAtLength(new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3), 10, 16);
```

## Vector3.clamp()

Clamp each component between min and max.

```ts
clamp(min: Vector3, max: Vector3): Vector3
```

### Parameters

- `min` — `Vector3`.
- `max` — `Vector3`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().clamp(new Vector3(1, 2, 3), new Vector3(1, 2, 3));
```

## Vector3.lerp()

Linear interpolate from min to max by amount.

```ts
lerp(min: Vector3, max: Vector3, amount: number): Vector3
```

### Parameters

- `min` — `Vector3`.
- `max` — `Vector3`.
- `amount` — `number`.

### Returns

`Vector3`

### Example

```js
import { Vector3 } from '@1pizzateam/spockjs';


const result = new Vector3().lerp(new Vector3(1, 2, 3), new Vector3(1, 2, 3), 0.5);
```

