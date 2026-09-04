# API Reference

All public APIs are named ESM exports from `@1pizzateam/spockjs`.

## Vectors

- [Vector2](./vector2) — mutable two-dimensional vector
- [Vector3](./vector3) — mutable three-dimensional vector
- `Vector` — TypeScript interface with `x`, `y`, and optional `z`

## Matrices and rotations

- [Matrix3x3](./matrix3x3) — 2D affine transforms
- [Matrix4x3](./matrix4x3) — compact 3D affine transforms
- [Matrix4x4](./matrix4x4) — full 3D transforms and projections
- [Quaternion](./quaternion) — rotations stored as `[w, x, y, z]`

## Geometry

- [Circle](./circle)
- [Rectangle](./rectangle)
- [Grid](./grid)
- `GRID_EMPTY_CELL` — `-1`, the sentinel used for empty occupancy

## Utilities

- [Trigonometry](./trigonometry)
- [Bezier](./bezier)
- [Random](./random)
- [NumArray](./num-array)
- [Utils](./utils)
- [Time](./time)
