
Version 4.0.0 (September 4th 2026)
-----------------------------
 * Breaking:
    * Published as `@1pizzateam/spockjs` (was `@lcluber/type6js`)
    * ESM-only package, Node.js 22+, no CommonJS or IIFE/old-browser build
    * `new Matrix3x3()`, `new Matrix4x3()` and `new Matrix4x4()` with no arguments are identity, not all zeros
    * Published types are emitted by tsc (no hand-written spock.d.ts)
    * `new Circle()` / `new Rectangle()` no longer take a Grid; call setGrid() after
    * arctan2(y, x) matches Math.atan2(y, x); the old (x, y) order was cartesian, not Math
    * Quaternion.toArray() is [w, x, y, z], matching its constructor (previously [x, y, z, w])
    * Matrix4x3 transpose(), determinant() and invert() are renamed transposeLinear(), determinantLinear() and invertAffine()
    * NumArray.average() no longer takes a separate length
 * Vector2:
    * getAngle() no longer swaps x and y (a vector along +X is 0, not a quarter turn)
    * setRadian(0) and setDegree(0) actually set the heading instead of leaving the vector unchanged
    * toArray() can fill an array you pass in
    * Add equals() to compare two vectors; isEqualTo() still compares to a scalar
    * setRadian() uses Math.sin / Math.cos instead of the approximate lookup table
 * Vector3:
    * toArray() can fill an array you pass in
    * getDistance() no longer changes either vector
    * Add getAngle() between two vectors, lerp(), clamp() to a min/max box, quadraticBezier() and cubicBezier()
    * Add equals() to compare two vectors; isEqualTo() still compares to a scalar
 * Bezier:
    * Add derivatives, de Casteljau splits, sampled length and parameter-at-length (also on Vector2 and Vector3)
    * Vector2 and Vector3 share one curve-length sampler
    * Vector splits create missing output vectors, so empty left/right arrays are accepted
 * Random:
    * seed() / create() use a replayable generator; unseeded calls still use Math.random()
 * Grid:
    * Divide a width × height space into cells of a given size
    * draw() paints the lattice on a canvas like Circle and Rectangle
    * emptyCell is the occupancy sentinel; off-grid corners do not wrap into another cell
    * Shapes record every occupied AABB cell, not only the four corners
 * Circle / Rectangle:
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
 * Matrix3x3, Matrix4x3 and Matrix4x4:
    * scale(), rotate() and translate() compose onto the current matrix instead of replacing it
    * Rotations use Math.sin / Math.cos for the same precision as Quaternion
    * toArray() with no argument is the matrix’s own Float32Array (for WebGL); pass an array to copy into it
    * Constructor arguments of 0 or NaN are kept instead of being treated as missing
    * Add transpose(), determinant() and invert() (a singular matrix is left unchanged)
 * Matrix4x4:
    * multiply() no longer overwrites the last row of a perspective matrix
    * Add lookAtRH(), matching Matrix4x3
    * lookAtRH() uses a fallback axis when up is parallel to the view, and identity when eye equals target
 * Trigonometry:
    * arctan() and arctan2() use Math.atan / Math.atan2; arctan2(0, 0) still returns false
 * Quaternion:
    * Finish the implementation (w, x, y, z)
    * Add identity(), set(), setAxisAngle(), setFromEuler(), getAxisAngle(), clone(), invert(), normalize(), dot(), premultiply(), rotateX|Y|Z(), slerp(), toArray(), toMatrix4x4() and toMatrix4x3()
    * multiply() used the wrong sign on w
    * multiplyVector() no longer changes the input vector or hands back a shared temporary
    * toMatrix4x4() / toMatrix4x3() write into the matrix you pass in
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
