# API Reference

All public APIs are named ESM exports from `@1pizzateam/spockjs`.

## Vectors

- [Vec2](./vec2) — mutable two-dimensional vector
- [Vec3](./vec3) — mutable three-dimensional vector
- `Vec` — TypeScript interface with `x`, `y`, and optional `z`

## Matrices and rotations

- [Mat3](./mat3) — 2D affine transforms
- [Mat4x3](./mat4x3) — compact 3D affine transforms
- [Mat4](./mat4) — full 3D transforms and projections
- [Quat](./quat) — rotations stored as `[w, x, y, z]`

## Geometry

- [Circ](./circ)
- [Rect](./rect)
- [Grid](./grid)
- `GRID_EMPTY_CELL` — `-1`, the sentinel used for empty occupancy

## Utilities

- [Trigo](./trigo)
- [Bezier](./bezier)
- [Rand](./rand)
- [NumArray](./num-array)
- [Utils](./utils)
- [Time](./time)
