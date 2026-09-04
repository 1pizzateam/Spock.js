# Overview

Spock.js is an open-source mathematics library written in TypeScript. It provides focused APIs for projects involving vectors, transforms, geometry, trigonometry, Bézier curves, random numbers, and common numerical operations.

## Highlights

- No runtime dependencies
- ESM and TypeScript declarations
- Mutable, chainable vector and matrix APIs
- Browser and Node.js support
- Seeded and unseeded random generators
- Canvas drawing helpers for geometry
- Comprehensive automated tests

## Quick start

```js
import { Vector2, Utils } from '@1pizzateam/spockjs';

const position = new Vector2(10, 20)
  .add(new Vector2(5, -2))
  .scale(2);

const opacity = Utils.clamp(1.25, 0, 1);
```

Most vector, matrix, quaternion, circle, and rectangle operations mutate the instance and return it, making calls chainable. Methods that test or measure return a boolean or number instead.

## API groups

- [Vector2](/api/vector2) and [Vector3](/api/vector3)
- [Matrix3x3](/api/matrix3x3), [Matrix4x3](/api/matrix4x3), and [Matrix4x4](/api/matrix4x4)
- [Quaternion](/api/quaternion)
- [Circle](/api/circle), [Rectangle](/api/rectangle), and [Grid](/api/grid)
- [Trigonometry](/api/trigonometry), [Bezier](/api/bezier), and [Random](/api/random)
- [NumArray](/api/num-array), [Utils](/api/utils), and [Time](/api/time)
