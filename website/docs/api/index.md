# API Reference

All public APIs are named ESM exports from `@1pizzateam/spockjs`. There is no default export and no namespace object, so you import exactly what you use and a bundler drops the rest.

```js
import { Vec2, Rect, Utils } from '@1pizzateam/spockjs';
```

The classes — vectors, matrices, quaternions, and shapes — are mutable. Their methods write into the instance they were called on and return it, so operations chain and a render loop can reuse instances instead of allocating each frame. Methods that measure or test return a number or boolean instead. `Trigo`, `Bezier`, `Rand`, `NumArray`, `Utils`, and `Time` are plain objects of stateless functions, called directly on the export.

## Vectors

- [Vec2](./vec2) — mutable two-dimensional vector, the workhorse for positions, directions, and sizes
- [Vec3](./vec3) — mutable three-dimensional vector, plus cross products and the type the 3D transforms speak
- `Vec` — TypeScript interface with `x`, `y`, and optional `z`, for code that accepts either vector

## Matrices and rotations

- [Mat3](./mat3) — 3×3 matrix for 2D affine transforms
- [Mat4x3](./mat4x3) — 4×3 affine 3D transform, no projection row, cheaper to invert
- [Mat4](./mat4) — full 4×4 matrix, adds `perspective()` and `orthographic()`
- [Quat](./quat) — rotation as a unit quaternion `[w, x, y, z]`, composable and interpolable with `slerp()`

## Geometry

- [Circ](./circ) — circle with a centre, a radius, and optional grid occupancy
- [Rect](./rect) — axis-aligned rectangle with cached corners, also the bounds type for `Vec2.clamp()`
- [Grid](./grid) — uniform cell lattice used as a broad-phase spatial index
- `GRID_EMPTY_CELL` — `-1`, the sentinel used for empty occupancy, also exposed as `Grid.emptyCell`

## Utilities

- [Trigo](./trigo) — angle constants and conversions, lookup-table and precise sine and cosine, wave equations
- [Bezier](./bezier) — scalar quadratic and cubic Bézier evaluation, derivatives, splits, and arc length
- [Rand](./rand) — uniform values, distributions, and picks, from `Math.random()` or a replayable seed
- [NumArray](./num-array) — min, max, sum, product, and average over an array of numbers
- [Utils](./utils) — clamping, interpolation, range mapping, and decimal rounding
- [Time](./time) — conversions between milliseconds, seconds, and frame rates
