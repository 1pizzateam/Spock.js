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
import { Vec2, Utils } from '@1pizzateam/spockjs';

const position = new Vec2(10, 20)
  .add(new Vec2(5, -2))
  .scale(2);

const opacity = Utils.clamp(1.25, 0, 1);
```

Most vector, matrix, quaternion, Circ, and Rect operations mutate the instance and return it, making calls chainable. Methods that test or measure return a boolean or number instead.

## API groups

- [Vec2](/api/vec2) and [Vec3](/api/vec3)
- [Mat3](/api/mat3), [Mat4x3](/api/mat4x3), and [Mat4](/api/mat4)
- [Quat](/api/quat)
- [Circ](/api/circ), [Rect](/api/rect), and [Grid](/api/grid)
- [Trigo](/api/trigo), [Bezier](/api/bezier), and [Rand](/api/rand)
- [NumArray](/api/num-array), [Utils](/api/utils), and [Time](/api/time)
