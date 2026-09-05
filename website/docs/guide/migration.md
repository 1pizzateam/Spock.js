# Migrating to 4.0

Version 4 is published as `@1pizzateam/spockjs` and is ESM-only.

```diff
- import { Vector2 } from '@lcluber/type6js';
+ import { Vec2 } from '@1pizzateam/spockjs';
```

## Runtime and packaging

- Node.js 22 or newer is required.
- CommonJS and IIFE builds were removed.
- Type declarations are emitted directly by TypeScript.

## Matrices

- `Matrix3x3` / `Matrix4x4` / `Matrix4x3` are now `Mat3` / `Mat4` / `Mat4x3`.
- Empty `Mat3`, `Mat4x3`, and `Mat4` constructors now create identity matrices.
- `scale()`, `rotate*()`, and `translate()` compose onto the current matrix.
- `toArray()` returns the live `Float32Array`; pass a target to copy.
- `Mat4x3.transpose()`, `determinant()`, and `invert()` became `transposeLinear()`, `determinantLinear()`, and `invertAffine()`.
- Matrices gained transpose, determinant, inversion, and right-handed look-at support where applicable.

## Vectors and curves

- `Vector2` / `Vector3` are now `Vec2` / `Vec3`. The shared TypeScript interface is `Vec`.
- `Vec2.getAngle()` now uses the conventional positive X axis.
- `Vec2.setRadian(0)` and `setDegree(0)` set the heading correctly.
- `Vec3.getDistance()` no longer changes either vector.
- Both vector types gained equality checks, Bézier derivatives, splits, sampled lengths, and parameter-at-length methods.
- `Vec3` gained angle, interpolation, and clamp operations.

## Geometry and grids

- `Circle` / `Rectangle` are now `Circ` / `Rect`.
- `Circ` and `Rect` no longer receive a grid in their constructors; call `setGrid()` explicitly.
- Shapes record every occupied AABB cell.
- Off-grid and unused occupancy uses `Grid.emptyCell` (`-1`).

```js
import { Circ, Grid } from '@1pizzateam/spockjs';

const grid = new Grid(800, 600, 32);
const circle = new Circ(20, 100, 100).setGrid(grid);
```

## Trigo, arrays, and random

- The `Trigonometry` export is now `Trigo`.
- `Trigo.arctan2(y, x)` now follows `Math.atan2`.
- `NumArray.average()` derives the length from the array.
- Empty `min()`, `max()`, and `average()` calls return `NaN`.
- The `Random` export is now `Rand`.
- `Rand.seed()` and `Rand.create()` provide replayable generators.

## Quaternions

- The `Quaternion` export is now `Quat`.
- `Quat` is fully implemented. Its constructor and `toArray()` both use `[w, x, y, z]`. `toMat4()` / `toMat4x3()` replace `toMatrix4x4()` / `toMatrix4x3()`.
