# Vec3

Import with `import { Vec3 } from '@1pizzateam/spockjs';`.

## Constructor

Create a 3D vector (defaults to the origin).

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

