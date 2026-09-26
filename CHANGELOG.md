
Version 4.2.0 (September 25th 2026)
-----------------------------
 * Utils:
    * Add `Utils.clampToExtent(x: number, extent: number): number` clamping a scalar symmetrically to `[-extent, extent]`
 * Vec2:
    * Add target operations to eliminate copy-mutate overhead:
      * Binary: `addVectors(a, b)`, `subVectors(a, b)`, `multiplyVectors(a, b)`, `scaleVector(vector, scalar)`, `divideVectors(a, b)`, `minVectors(a, b)`, `maxVectors(a, b)`, `clampVectors(value, min, max)`, `clampToExtentVectors(vector, extent)`, `lerpVectors(min, max, t)`
      * Unary: `oppositeVector(vector)`, `absoluteVector(vector)`, `normalizeVector(vector, fallback?)`, `perpVector(vector)`, `perpCWVector(vector)`, `setLengthVector(vector, length)`, `projectVector(vector, normal)`, `reflectVector(vector, normal)`
    * Add optional `fallback?: Vec2` parameter to `normalize(fallback?)` and `normalizeVector(vector, fallback?)` when vector length is zero
    * Add `setLength(length: number)` scaling vector to exact magnitude in-place
    * Add `clampToExtent(extent: Vec2)` clamping components symmetrically to `[-extent, extent]` in-place
    * Overload `lerp(target, t)` for in-place interpolation and `lerp(min, max, t)` for backwards compatibility
    * Add `sign()` setting components to their `Math.sign` in-place
    * Add `projectToMinAxis(reference?: Vec2)` and `projectToMaxAxis(reference?: Vec2)` zeroing non-principal components in-place with optional reference sign direction for SAT / AABB shallowest penetration resolution
    * Extend `clamp()` to accept either a `Rect` or `(min: Vec2, max: Vec2)` bounds
    * Add `clampScalar(min: number, max: number)` clamping each component between scalar boundaries
    * Add `isInBounds(rect: Rect)` and `isInBounds(min: Vec2, max: Vec2)` checking point containment within axis-aligned bounds or Rect
    * Implement zero-allocation De Casteljau `quadraticBezierSplit()` and `cubicBezierSplit()` using vector interpolation (`lerpVectors`)
    * Implement `project`, `projectVector`, `reflect`, and `reflectVector` via vector operations (`scaleVector`, `subtractScaledVector`)
 * Vec3:
    * Add target operations matching Vec2:
      * Binary: `addVectors`, `subVectors`, `multiplyVectors`, `scaleVector`, `divideVectors`, `minVectors`, `maxVectors`, `clampVectors`, `clampToExtentVectors`, `lerpVectors`, `crossVectors(a, b)`
      * Unary: `oppositeVector`, `absoluteVector`, `normalizeVector(vector, fallback?)`, `setLengthVector`, `projectVector`, `reflectVector`
    * Add optional `fallback?: Vec3` parameter to `normalize(fallback?)` and `normalizeVector(vector, fallback?)` when vector length is zero
    * Add `setLength(length: number)` scaling vector to exact magnitude in-place
    * Add `project(normal: Vec3)` and `reflect(normal: Vec3)` in-place operations via `scaleVector` and `subtractScaledVector`
    * Add `clampToExtent(extent: Vec3)` clamping components symmetrically to `[-extent, extent]` in-place
    * Overload `lerp(target, t)` for in-place interpolation and `lerp(min, max, t)`
    * Add `sign()` setting components to their `Math.sign` in-place
    * Add `clampScalar(min: number, max: number)`
    * Add `isInBounds(min: Vec3, max: Vec3)`
    * Implement zero-allocation De Casteljau `quadraticBezierSplit()` and `cubicBezierSplit()` using vector interpolation (`lerpVectors`)
 * Quat:
    * Add vector overload `setFromEuler(euler: Vec3)`
    * Modernize `setAxisAngle` using `scaleVector`
    * Modernize `getAxisAngle` using `normalizeVector`
 * LookAt:
    * Implement `setLookAtAxes` using zero-allocation vector math (`subVectors`, `normalize()`, and `crossVectors`)
 * Geometry (Circ & Rect):
    * Vector-first constructors: `new Circ(radius, position: Vec2)` and `new Rect(size: Vec2, position?: Vec2)`
    * Add `Rect.setSize(size: Vec2)` overload accepting a dimension vector
    * Add `Circ.halfSize` (`Vec2`) representing circle half-extents `(radius, radius)`, automatically synchronized on radius/diameter mutations and `copy()`
    * Add zero-allocation bounding box API: `Circ.getBounds(outMin, outMax)`, `Rect.getBounds(outMin, outMax)`, and `boundsMin` / `boundsMax` getters
    * Add 2D segment raycasting: `Circ.raycast(start, end, target?)` and `Rect.raycast(start, end, target?)` returning `{ fraction, point, normal }` with target reuse and inside-shape handling
    * Add `Circ.overlapsBounds(min: Vec2, max: Vec2)` and `Rect.overlapsBounds(min: Vec2, max: Vec2)` for zero-allocation AABB boundary overlap checks
    * Add `Rect.overlapsRect(rect: Rect)` for AABB-AABB spatial overlap queries
    * Add `Rect.overlapsCircle(center: Vec2, radius: number)` and `Rect.overlapsCircle(circ: Circ)` for box-circle queries
    * Add `Circ.overlapsCircle(center: Vec2, radius: number)` and `Circ.overlapsCircle(circ: Circ)` for circle-circle queries
    * Add `Circ.overlapsRect(rect: Rect)` for circle-box queries
    * Vector-first internal geometry: `setCorners()` via `subVectors`/`addVectors`, `setHalfSize()` via `scaleVector`, and `setGridPos()` via `getCellsForBounds`
 * Grid:
    * Add vector-first constructor: `new Grid(size: Vec2, cellSize: number)`
    * Add vector overload: `getCell(point: Vec2)`
    * Add `getCellAt(point: Vec2)` returning cell index for a 2D position vector
    * Add `getCellsForBounds(min: Vec2, max: Vec2, out?: number[])` querying all grid cells overlapping an AABB
    * Add `getCellsForCircle(center: Vec2, radius: number, out?: number[])` querying all grid cells overlapping a circle
 * Time:
    * Add `target` parameter to `Time.subSteps(delta, fixedStep, maxSubSteps, target?)` for zero-allocation fixed-step calculations
    * Add `Accumulator` class for deterministic fixed-timestep game/physics loops with `.step(delta, tick)`, `.alpha`, and `.reset()`

Version 4.1.0 (September 19th 2026)
-----------------------------
 * Geometry (Circ & Rect):
    * Pure vector-first API: `setPosition(position: Vec2)` and `translate(offset: Vec2)` directly manipulate center and corners via vector arithmetic (replaces scalar `(x, y)` parameters)
    * Removed redundant aliases `setPositionFromVector` and `translateVector`
    * Add `getClosestPoint(point)` for circle clamping and Voronoi classification
    * Modernize `Rect.copy()` to copy size and position vectors directly via `Vec2.copy()` without scalar unpacking
 * Grid:
    * Optimize `testCells()` with $O(1)$ early range rejection and sorted two-pointer linear merge
    * Add `totalCells` getter returning total cell count (`len.x * len.y`)
    * Add `getFirstCommonCell()` returning the lowest shared cell index or `GRID_EMPTY_CELL` (-1)
    * Add `isFirstCommonCell()` for spatial broad-phase collision pair deduplication
    * Add `getCell(x, y)` returning cell index from 2D coordinates
    * Add `getCellCoords(cellId)` decomposing cell index into column and row vector coordinates
 * Vec2:
    * Add `crossProduct(vector)` returning 2D determinant ($x_1 y_2 - y_1 x_2$)
    * Add `perp()` ($(-y, x)$) and `perpCW()` ($(y, -x)$) 90-degree in-place rotations
    * Add `project(normal)` projecting vector onto a normal in-place
    * Add `reflect(normal)` reflecting vector across a surface normal in-place
    * Add `isolateMinAxis()` and `isolateMaxAxis()` zeroing non-shallowest or non-largest components in-place
 * Time:
    * Add `now()` returning cross-platform monotonic high-resolution millisecond timestamp (`performance.now()` with fallback to `Date.now()`)
    * Add `clampDelta(delta, maxMs, minMs)` protecting animation and physics simulation loops against lag spikes and tab switching
    * Add `smoothFps(currentFps, instantFps, alpha)` zero-allocation exponential moving average for instantaneous FPS tracking
    * Add `subSteps(delta, fixedStep, maxSubSteps)` calculating fixed-timestep simulation sub-steps and accumulator remainder
 * Array:
    * Add and export `RollingAverage` circular buffer class for $O(1)$ `push()` and $O(1)$ running `average` tracking without startup bias

Version 4.0.0 (September 4th 2026)
-----------------------------
 * Breaking:
    * Published as `@1pizzateam/spock` (was `@lcluber/type6js`)
    * ESM-only package, Node.js 22+, no CommonJS or IIFE/old-browser build
    * `new Mat3()`, `new Mat4x3()` and `new Mat4()` with no arguments are identity, not all zeros
    * Published types are emitted by tsc (no hand-written spock.d.ts)
    * `new Circ()` / `new Rect()` no longer take a Grid; call setGrid() after
    * arctan2(y, x) matches Math.atan2(y, x); the old (x, y) order was cartesian, not Math
    * `Quat.toArray()` is [w, x, y, z], matching its constructor (previously [x, y, z, w])
    * `Mat4x3` transpose(), determinant() and invert() are renamed transposeLinear(), determinantLinear() and invertAffine()
    * NumArray.average() no longer takes a separate length
    * `Trigo` replaces the `Trigonometry` export
    * `Vec2` / `Vec3` replace `Vector2` / `Vector3`; the shared type is `Vec`
    * `Mat3` / `Mat4` / `Mat4x3` replace `Matrix3x3` / `Matrix4x4` / `Matrix4x3`
    * `Quat` replaces the `Quaternion` export
    * `Circ` / `Rect` replace `Circle` / `Rectangle`
 * Vec2:
    * getAngle() no longer swaps x and y (a vector along +X is 0, not a quarter turn)
    * setRadian(0) and setDegree(0) actually set the heading instead of leaving the vector unchanged
    * toArray() can fill an array you pass in
    * Add equals() to compare two vectors; isEqualTo() still compares to a scalar
    * setRadian() uses Math.sin / Math.cos instead of the approximate lookup table
 * Vec3:
    * toArray() can fill an array you pass in
    * getDistance() no longer changes either vector
    * Add getAngle() between two vectors, lerp(), clamp() to a min/max box, quadraticBezier() and cubicBezier()
    * Add equals() to compare two vectors; isEqualTo() still compares to a scalar
 * Bezier:
    * Add derivatives, de Casteljau splits, sampled length and parameter-at-length (also on Vec2 and Vec3)
    * Vec2 and Vec3 share one curve-length sampler
    * Vector splits create missing output vectors, so empty left/right arrays are accepted
 * Rand:
    * seed() / create() use a replayable generator; unseeded calls still use Math.random()
 * Grid:
    * Divide a width × height space into cells of a given size
    * draw() paints the lattice on a canvas like Circ and Rect
    * emptyCell is the occupancy sentinel; off-grid corners do not wrap into another cell
    * Shapes record every occupied AABB cell, not only the four corners
 * Circ / Rect:
    * Occupancy is opt-in via setGrid(); moving or resizing then updates cells
    * Unused occupancy slots and off-grid corners use Grid.emptyCell (-1); testCells ignores that sentinel
    * copy() and clone() take the source shape’s grid
    * setPosition() and setSize() return the shape so they can be chained
 * NumArray:
    * multiply() multiplies the values instead of always returning 0
    * min(), max() and average() return NaN for an empty array
    * average() uses array.length
 * Utils:
    * getSign() matches Math.sign, including NaN
 * Mat3, Mat4x3 and Mat4:
    * scale(), rotate() and translate() compose onto the current matrix instead of replacing it
    * Rotations use Math.sin / Math.cos for the same precision as Quat
    * toArray() with no argument is the matrix’s own Float32Array (for WebGL); pass an array to copy into it
    * Constructor arguments of 0 or NaN are kept instead of being treated as missing
    * Add transpose(), determinant() and invert() (a singular matrix is left unchanged)
 * Mat4:
    * multiply() no longer overwrites the last row of a perspective matrix
    * Add lookAtRH(), matching Mat4x3
    * lookAtRH() uses a fallback axis when up is parallel to the view, and identity when eye equals target
 * Trigo:
    * arctan() and arctan2() use Math.atan / Math.atan2; arctan2(0, 0) still returns false
 * Quat:
    * Finish the implementation (w, x, y, z)
    * Add identity(), set(), setAxisAngle(), setFromEuler(), getAxisAngle(), clone(), invert(), normalize(), dot(), premultiply(), rotateX|Y|Z(), slerp(), toArray(), toMat4() and toMat4x3()
    * multiply() used the wrong sign on w
    * multiplyVector() no longer changes the input vector or hands back a shared temporary
    * toMat4() / toMat4x3() write into the matrix you pass in
    * toArray() can fill an array you pass in
    * toArray() uses the same [w, x, y, z] order as the constructor

Version 3.0.0 (May 18th 2021)
-----------------------------
 * Vector class:
    * Fix Vector opposite method
    * improved performances
 * Vector2 class:
    * Add setScalar(), setArray(), isEqualTo(), setRadian(), setDegree(), setMinAxis(), setMaxAxis() methods
    * Delete set(), clone(), setFromArray() and setFromAngle() methods
    * opposite() and absolute() methods now accept an axis name as parameter to set only this axis.
 * Vector3 class:
    * Add setScalar(), setArray() and isEqualTo() method
    * Delete set(), setFromArray() and clone() methods
 * Circle class:
    * First parameter of set() method and constructor is now Radius.
    * Delete set(), setPositionXY() and setPositionFromVector() methods 
    * Add setPosition(), setRadius() and setDiameter() methods
 * Rectangle class:
    * First parameters of constructor are now width and height.
    * delete setPositionXY(), setPositionX(), setPositionFromVector() and setPositionY() methods
    * delete set(), setSizeXY(), setSizeX(), setSizeFromVector() and setSizeY() methods

Version 2.2.0 (September 06th 2020)
-----------------------------
 * Export Spock as CommonJS module
 * Update Typescript to version 4
 * Automated Unit tests with Jest

Version 2.1.1 (August 30th 2020)
-----------------------------
 * Smaller package size
 * Vector Classes refactor

Version 2.1.0 (Augulst 29th 2020)
-----------------------------
 * Vector2 and Vector3 classes: 
    * delete setFromArray() method

Version 2.0.1 (May 13th 2020)
-----------------------------
 * Matrix4x3 class:
    * fix lookAtRH() method in 

Version 2.0.0 (May 09th 2020)
-----------------------------
 * New Matrix3x3 class
 * New website
 * New documentation

Version 1.1.0 (September 14th 2019)
-----------------------------
 * Added NumArray static class to work with array of numbers. Get min value, max value, sum, average...

Version 1.0.7 (September 13th 2019)
-----------------------------
 * millisecondToFramePerSecond() method in Time class returns the exact result instead of a rounded number.
 * framePerSecondToMillisecond() method in Time class returns the exact result instead of a rounded number.

Version 1.0.6 (June 01st 2019)
-----------------------------
 * Added contains() static method in Utils class.
 * Added contains() method in Rectangle class.
 * Added contains() method in Circle class.

Version 1.0.5 (April 02nd 2019)
-----------------------------
 * fixed declaration file.

Version 1.0.4 (March 21st 2019)
-----------------------------
 * Improved typings.

Version 1.0.3 (December 18th 2018)
-----------------------------
 * fixed declaration file.

Version 1.0.2 (December 17th 2018)
-----------------------------
 * fixed copy() method in Vector3 class.

Version 1.0.1 (October 07th 2018)
-----------------------------
 * Type6.js published on NPM.
 * Updated README.md with NPM installation procedure.

Version 1.0.0 (July 25th 2018)
-----------------------------
 * Stable library.
 * Comprehensive API.
 * Ready for production.
