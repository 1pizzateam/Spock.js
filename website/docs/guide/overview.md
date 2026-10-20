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
import { Vec2, Rect, Utils } from '@1pizzateam/spock';

// Zero-allocation vector arithmetic
const velocity = new Vec2(5, -2);
const position = new Vec2().addVectors(new Vec2(10, 20), velocity).scale(2);

// Vector-first shapes and boundary tests
const bounds = new Rect(new Vec2(100, 100), new Vec2(50, 50));
const inside = bounds.isIn(position);

const opacity = Utils.clamp(1.25, 0, 1);
```

Most vector, matrix, quaternion, Circ, Rect, and RightTriangle operations mutate the instance and return it, making calls chainable. Methods that test or measure return a boolean or number instead.

## API groups
 
- [Vec2](/api/vec2) and [Vec3](/api/vec3)
- [Mat3](/api/mat3), [Mat4x3](/api/mat4x3), and [Mat4](/api/mat4)
- [Quat](/api/quat)
- [Circ](/api/circ), [Rect](/api/rect), [RightTriangle](/api/triangle), [Grid](/api/grid), and [Ray2](/api/ray2) in 2D
- [Box](/api/box), [Sphere](/api/sphere), [Plane](/api/plane), [Ray3](/api/ray3), and [Frustum](/api/frustum) in 3D
- [Quadratic](/api/bezier-quadratic) and [Cubic Bézier](/api/bezier-cubic)
- [Trigo](/api/trigo), [Rand](/api/rand), and [Utils](/api/utils)
- [NumArray](/api/num-array), [RollingAverage](/api/rolling-average), and [Time](/api/time)
