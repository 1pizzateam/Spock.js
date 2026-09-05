import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const legacyRoot = process.argv[2] ?? path.resolve(root, '../Type6js-website');
const docsRoot = path.resolve(root, 'website/docs/api');
const legacyTree = JSON.parse(fs.readFileSync(path.join(legacyRoot, 'web/tree.json'), 'utf8'));

const modules = [
  ['Vec2', 'vectors/vec2.ts', 'vec2.md'],
  ['Vec3', 'vectors/vec3.ts', 'vec3.md'],
  ['Mat3', 'matrices/mat3.ts', 'mat3.md'],
  ['Mat4x3', 'matrices/mat4x3.ts', 'mat4x3.md'],
  ['Mat4', 'matrices/mat4.ts', 'mat4.md'],
  ['Quat', 'quat.ts', 'quat.md'],
  ['Circ', 'geometry/circ.ts', 'circ.md'],
  ['Rect', 'geometry/rect.ts', 'rect.md'],
  ['Grid', 'geometry/grid.ts', 'grid.md'],
  ['Trigo', 'trigo.ts', 'trigo.md'],
  ['Bezier', 'bezier.ts', 'bezier.md'],
  ['Rand', 'rand.ts', 'rand.md'],
  ['NumArray', 'array.ts', 'num-array.md'],
  ['Utils', 'utils.ts', 'utils.md'],
  ['Time', 'time.ts', 'time.md'],
];

// Hand-written context for each page. The generated reference below it explains
// what every method does but never what the export is for, so this fills that gap.
const intros = {
  Vec2: {
    summary: 'A mutable two-dimensional vector: public `x` and `y` numbers plus the operations you usually want around them.',
    body: [
      'Use it for positions, directions, velocities, sizes, and any other 2D pair. Nearly every method writes into the vector it was called on and returns that same vector, so operations chain and a render loop can reuse a handful of instances instead of allocating a new one each frame. When you need an independent value, take a `clone()` first.',
      'On top of arithmetic it carries magnitude and distance queries, normalization, per-axis rounding, angle helpers that read and write the vector\'s heading, interpolation with `lerp()`, clamping into a `Rect`, and Bézier evaluation, so curve sampling stays in vector space.',
    ],
    example: `import { Vec2 } from '@1pizzateam/spockjs';

const velocity = new Vec2(3, 4).normalize().scale(10);

const start = new Vec2(100, 50);
const position = start.clone().add(velocity);
const travelled = position.getDistance(start);`,
  },
  Vec3: {
    summary: 'A mutable three-dimensional vector with public `x`, `y`, and `z` numbers.',
    body: [
      'It mirrors `Vec2` and adds the operations that only make sense in 3D, most notably `cross()` and a `getAngle()` that measures between two vectors. As with `Vec2`, methods mutate the receiver and return it, so calls chain and hot loops stay allocation-free.',
      '`Vec3` is the vector type the 3D transforms speak: `Mat4.translate()`, `Mat4.lookAtRH()`, `Quat.setAxisAngle()`, and `Quat.multiplyVector()` all take or fill one.',
    ],
    example: `import { Vec3 } from '@1pizzateam/spockjs';

const forward = new Vec3(0, 0, -1);
const up = new Vec3(0, 1, 0);

const right = forward.clone().cross(up).normalize();
const angle = forward.getAngle(up); // radians, or false for a zero-length vector`,
  },
  Mat3: {
    summary: 'A 3×3 matrix for 2D affine transforms, stored in a `Float32Array`.',
    body: [
      'It handles the usual 2D pipeline: translation, rotation, and scale, composed together with `multiply()`. `new Mat3()` with no arguments is the identity matrix; pass nine numbers to set the entries directly.',
      '`scale()`, `rotate()`, and `translate()` compose onto the current matrix rather than replacing it, so the order you call them in is the order they apply. `toArray()` hands back the live buffer, ready to upload to WebGL, or copies into an array you pass in.',
    ],
    example: `import { Mat3, Vec2 } from '@1pizzateam/spockjs';

const transform = new Mat3()
  .translate(new Vec2(120, 80))
  .rotate(Math.PI / 6)
  .scale(new Vec2(2, 2));

const buffer = transform.toArray(); // the live Float32Array(9)`,
  },
  Mat4x3: {
    summary: 'A 4×3 affine transform for 3D — rotation, scale, and translation, but no projection — stored in a 4×4 `Float32Array`.',
    body: [
      'Reach for it when a transform will never need perspective: object placement, node hierarchies, and camera views. Leaving out the projection row makes inversion cheaper and keeps the last column fixed at (0, 0, 0, 1).',
      'Because the matrix is affine by construction, the linear-only operations are named for it: `transposeLinear()`, `determinantLinear()`, and `invertAffine()`. Use `Mat4` instead when you need `perspective()` or `orthographic()`.',
    ],
    example: `import { Mat4x3, Vec3 } from '@1pizzateam/spockjs';

const view = new Mat4x3().lookAtRH(
  new Vec3(0, 2, 6), // eye
  new Vec3(0, 0, 0), // target
  new Vec3(0, 1, 0)  // up
);

const model = new Mat4x3()
  .translate(new Vec3(1, 0, 0))
  .rotateY(Math.PI / 4);`,
  },
  Mat4: {
    summary: 'A full 4×4 matrix: affine transforms plus the projection matrices a renderer needs.',
    body: [
      'It covers everything `Mat4x3` does — translate, scale, rotate about each axis, `lookAtRH()` — and adds `perspective()` and `orthographic()`, which write the projection row that `Mat4x3` leaves out.',
      'Entries live in a `Float32Array`. `toArray()` with no argument returns that live buffer for a WebGL upload; pass a target to copy instead. `multiply()` preserves the last row, so composing with a perspective matrix behaves.',
    ],
    example: `import { Mat4, Vec3 } from '@1pizzateam/spockjs';

const projection = new Mat4().perspective(Math.PI / 4, 16 / 9, 0.1, 100);
const view = new Mat4().lookAtRH(
  new Vec3(0, 2, 6),
  new Vec3(),
  new Vec3(0, 1, 0)
);

const viewProjection = new Mat4().copy(projection).multiply(view);`,
  },
  Quat: {
    summary: 'A rotation stored as a unit quaternion: a scalar `w` plus a `Vec3` named `vector`.',
    body: [
      'Quaternions are the compact way to hold and blend 3D rotations. They avoid gimbal lock, compose with a single `multiply()`, and interpolate smoothly with `slerp()`, which is why they beat Euler angles for animation and camera work.',
      '`new Quat()` is the identity rotation. Build one from an axis and angle with `setAxisAngle()`, or from Euler angles with `setFromEuler()`. At render time `toMat4()` or `toMat4x3()` writes the rotation into a matrix. Component order is `[w, x, y, z]` in both the constructor and `toArray()`.',
    ],
    example: `import { Quat, Vec3 } from '@1pizzateam/spockjs';

const start = new Quat();
const end = new Quat().setAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);

const current = start.clone().slerp(end, 0.25);
const facing = current.multiplyVector(new Vec3(0, 0, 1));`,
  },
  Circ: {
    summary: 'A circle: a `Vec2` centre and a radius, with optional grid occupancy and canvas drawing.',
    body: [
      'Radius and diameter stay in sync, so setting either updates the other. `isIn()` answers point containment with a squared distance, avoiding a square root.',
      'Occupancy is opt-in. Call `setGrid()` to attach a `Grid`, and from then on moving or resizing the circle refreshes `gridCells`, the list of cells its bounding box covers. Pair that with `Grid.testCells()` for a cheap broad-phase overlap check.',
    ],
    example: `import { Circ, Grid } from '@1pizzateam/spockjs';

const grid = new Grid(800, 600, 32);
const ball = new Circ(20, 100, 100).setGrid(grid);

ball.setPosition(240, 180);
const occupied = ball.gridCells.filter(cell => cell !== Grid.emptyCell);`,
  },
  Rect: {
    summary: 'An axis-aligned rectangle defined by a centre position and a size, with cached corners.',
    body: [
      'The constructor takes width and height first, then the centre. `topLeftCorner` and `bottomRightCorner` are recomputed whenever you move or resize it, so containment tests and clamping read them directly instead of deriving them every frame.',
      'As with `Circ`, occupancy is opt-in through `setGrid()`, after which `gridCells` lists every cell the rectangle covers. `Vec2.clamp()` takes a `Rect`, which makes it the natural type for bounds.',
    ],
    example: `import { Rect, Vec2 } from '@1pizzateam/spockjs';

const bounds = new Rect(640, 360, 320, 180);

const pointer = new Vec2(700, -20).clamp(bounds);
const inside = bounds.isIn(pointer); // true`,
  },
  Grid: {
    summary: 'A uniform lattice that divides a width × height area into square cells and reports which cells a shape covers.',
    body: [
      'This is the spatial index behind `Circ` and `Rect` occupancy. Construct it with the area and a cell size; `len` is a `Vec2` holding the column and row counts. Attaching it to a shape fills that shape\'s `gridCells` with the indices its bounding box overlaps.',
      '`testCells()` then answers whether two shapes share a cell, a cheap broad-phase check to run before any exact collision maths. Unused and off-grid slots use the `Grid.emptyCell` sentinel (`-1`), which `testCells()` ignores. `draw()` paints the lattice for debugging.',
    ],
    example: `import { Circ, Grid } from '@1pizzateam/spockjs';

const grid = new Grid(800, 600, 32); // 25 × 19 cells
const a = new Circ(20, 100, 100).setGrid(grid);
const b = new Circ(20, 110, 96).setGrid(grid);

if (grid.testCells(a.gridCells, b.gridCells)) {
  // close enough to be worth an exact test
}`,
  },
  Trigo: {
    summary: 'Angle constants, conversions, and wave equations, with both fast and precise sine and cosine.',
    body: [
      '`sine()` and `cosine()` read from a 16k-entry lookup table: fast enough to call per particle per frame, and accurate enough for motion. When you need full precision, such as building a matrix or a quaternion, use `sinePrecise()` and `cosinePrecise()`, which call `Math.sin` and `Math.cos` directly.',
      'The constants `pi`, `twopi`, and `halfpi` save recomputing them, `degreeToRadian()` and `radianToDegree()` convert, and `normalizeRadian()` wraps an angle into (-π, π]. The `*Equation` helpers evaluate `amplitude * f(period + shiftX) + shiftY` in one call, which is the shape most oscillations take.',
    ],
    example: `import { Trigo } from '@1pizzateam/spockjs';

const angle = Trigo.degreeToRadian(45);
const wrapped = Trigo.normalizeRadian(angle + Trigo.twopi);

// 20 pixels of vertical wobble around y = 100
const y = Trigo.sineEquation(20, performance.now() * 0.002, 0, 100);`,
  },
  Bezier: {
    summary: 'Quadratic and cubic Bézier evaluation on a single scalar axis.',
    body: [
      'Every function takes plain numbers, so you call it once per axis. That keeps it useful for animation curves and easing, where the thing being interpolated is one value rather than a point. For curves in space, `Vec2` and `Vec3` carry the same operations and handle the axes for you.',
      'Alongside evaluation there are first derivatives, which give the tangent and so the direction of travel, de Casteljau splits that cut a curve at `t` into two control polygons, and sampled `*Length()` and `*ParameterAtLength()` for walking a curve at constant speed.',
    ],
    example: `import { Bezier } from '@1pizzateam/spockjs';

const x = Bezier.cubic(0, 30, 70, 100, 0.5);
const slope = Bezier.cubicDerivative(0, 30, 70, 100, 0.5);

// halfway along the curve by distance, not by t
const t = Bezier.cubicParameterAtLength(0, 30, 70, 100, 50);`,
  },
  Rand: {
    summary: 'Random numbers, either from `Math.random()` or from a seeded generator you can replay.',
    body: [
      'The module-level `float()`, `integer()`, `distribution()`, and `pick()` use `Math.random()` until you call `seed()`, after which they follow a deterministic mulberry32 sequence. Call `seed()` with no argument to hand them back to `Math.random()`.',
      '`create()` returns an independent generator with the same four methods, which is the better option when you want one reproducible stream without touching global state. `distribution()` averages several samples, biasing results toward the middle of the range instead of spreading them evenly.',
    ],
    example: `import { Rand } from '@1pizzateam/spockjs';

const level = Rand.create(1337); // same seed, same level, every run

const x = level.float(0, 800);
const enemies = level.integer(3, 8);
const clustered = level.distribution(0, 800, 4); // bunched toward the middle`,
  },
  NumArray: {
    summary: 'Reductions that turn an array of numbers into a single value.',
    body: [
      'It covers the reductions that come up constantly — `min()`, `max()`, `sum()`, `multiply()` for the product, and `average()` — written as straight loops rather than `reduce()` callbacks, so they stay fast on large arrays and work on typed arrays too.',
      '`min()`, `max()`, and `average()` return `NaN` for an empty array. `sum()` returns 0 and `multiply()` returns 1, their identity values.',
    ],
    example: `import { NumArray } from '@1pizzateam/spockjs';

const frameTimes = [16.7, 16.9, 33.1, 16.6];

const worst = NumArray.max(frameTimes);
const mean = NumArray.average(frameTimes);`,
  },
  Utils: {
    summary: 'Scalar helpers that sit between `Math` and your own code: rounding, mixing, clamping, and range tests.',
    body: [
      '`clamp()`, `lerp()`, `mix()`, `normalize()`, and `map()` are the interpolation set. `normalize()` takes a value from a range into 0–1, `map()` moves it from one range straight into another, and `lerp()` and `mix()` blend two values, differing only in argument order.',
      'The rounding group — `round()`, `floor()`, `ceil()`, and `trunc()` — takes a decimal count, so you can snap to two decimals without the usual multiply-and-divide dance. `roundToNearest()` snaps to an arbitrary step instead. `isIn()` and `isOut()` are readable range tests.',
    ],
    example: `import { Utils } from '@1pizzateam/spockjs';

const opacity = Utils.clamp(1.25, 0, 1);       // 1
const eased = Utils.lerp(0, 100, 0.25);        // 25
const gauge = Utils.map(72, 0, 120, 0, 360);   // 216
const snapped = Utils.roundToNearest(147, 25); // 150`,
  },
  Time: {
    summary: 'Conversions between milliseconds, seconds, and frame rates.',
    body: [
      'Four one-line conversions that keep the ×1000 and 1000÷ constants out of animation code. `millisecToSec()` and `secToMillisec()` handle units; `fpsToMillisec()` and `millisecToFps()` translate between a frame rate and a frame budget.',
      'The common use is turning a target rate into the duration you compare against elapsed time, so the constant reads as a rate instead of an unexplained decimal.',
    ],
    example: `import { Time } from '@1pizzateam/spockjs';

const frameBudget = Time.fpsToMillisec(60); // 16.67 ms
const actualFps = Time.millisecToFps(20);   // 50

// "three steps a second", in seconds
const stepDuration = Time.millisecToSec(Time.fpsToMillisec(3));`,
  },
};

// Source JSDoc says what a method does in one line. These notes add the part it
// leaves out: why you would reach for it, and what tends to trip people up.
// Vec2 and Vec3 share most of their surface, so they share these.
const vectorNotes = {
  setScalar: 'Passing `null` or `undefined` for an axis leaves that axis alone, so you can write one component without reading the others back.',
  setArray: 'Reads consecutive entries starting at `offset`, which makes it easy to pull one vertex out of a packed buffer. Entries past the end of the array leave that axis unchanged.',
  copy: 'Overwrites this vector from another one and keeps your instance, which is how you avoid an allocation inside a loop. Use `clone()` when you want a separate object.',
  isPositive: 'True when every component is zero or greater, so zero counts as positive.',
  isEqualTo: 'Compares every component against a single number, not against another vector. Use `equals()` for a vector-to-vector test.',
  equals: 'Exact component comparison, so it inherits floating-point strictness: two vectors that reached the same value by different arithmetic can still differ in the last bits.',
  isOrigin: 'True only when every component is exactly zero.',
  toArray: 'Passing a target array writes into it and returns it, so you can fill part of a larger buffer without allocating.',
  toString: 'A readable form for logging and test output, not a format meant to be parsed back.',
  origin: 'Resets every component to zero in place, reusing the instance instead of replacing it.',
  getMagnitude: 'Pass `true` to get the squared length and skip the square root. When you only need to compare two lengths, comparing squares gives the same ordering for less work.',
  getDistance: 'Pass `true` for the squared distance. Testing a squared distance against a squared radius is the usual way to check range without a square root.',
  add: 'Adds component by component and returns this vector, so it chains.',
  addScaledVector: 'Adds `vector * scalar` without building a temporary. This is the integration step in most motion code: `position.addScaledVector(velocity, deltaTime)`.',
  addScalar: 'Adds the same number to every component, shifting the vector along the diagonal.',
  addComponents: 'Returns the sum of the components as a plain number and leaves the vector alone.',
  subtract: 'Subtracts component by component. To get the vector pointing from A to B, copy B and subtract A.',
  subtractScaledVector: 'Subtracts `vector * scalar` in one step, the counterpart to `addScaledVector()`.',
  subtractScalar: 'Subtracts the same number from every component.',
  multiply: 'Multiplies component by component, which is a non-uniform scale rather than any kind of vector product. For the dot product use `dotProduct()`.',
  multiplyScaledVector: 'Component-wise multiply by `vector * scalar`, combining a non-uniform and a uniform scale in one pass.',
  scale: 'Multiplies every component by the scalar, or only one component when you name an axis. Chain it after `normalize()` to set a vector to an exact length.',
  divide: 'Divides component by component. A zero in the divisor yields `Infinity` rather than throwing.',
  divideScaledVector: 'Divides component-wise by `vector * scalar`.',
  divideScalar: 'Divides every component by the scalar.',
  halve: 'Multiplies by 0.5, which comes up constantly for midpoints and half-extents.',
  max: 'Keeps the larger value on each axis independently, so the result can match neither input. Paired with `min()` this clamps a point into a box.',
  min: 'Keeps the smaller value on each axis independently.',
  maxScalar: 'Raises any component below the scalar up to it: a per-component lower bound.',
  minScalar: 'Lowers any component above the scalar down to it: a per-component upper bound.',
  normalize: 'Scales to unit length while keeping direction. A zero-length vector is left untouched rather than becoming `NaN`, and a vector already at length 1 is skipped.',
  absolute: 'Takes the absolute value of every component, or of one named axis.',
  opposite: 'Negates every component, or one named axis. Negating all of them reverses the direction.',
  floor: 'Rounds every component down, or one named axis. This is how a position becomes an integer cell index.',
  ceil: 'Rounds every component up, or one named axis.',
  dotProduct: 'Returns a number, not a vector. For unit vectors it is the cosine of the angle between them: 1 is the same direction, 0 perpendicular, -1 opposite.',
  clone: 'Returns a new, independent vector. Take one before a chain of mutating calls when you still need the original.',
  quadraticBezier: 'Writes the point at `t` into this vector rather than allocating a result, so a sampling loop can reuse one instance. `t` runs from 0 at `p0` to 1 at `p2`.',
  cubicBezier: 'Writes the point at `t` into this vector. `t` runs from 0 at `p0` to 1 at `p3`, and the curve passes through the endpoints but not the two middle controls.',
  quadraticBezierDerivative: 'Writes the tangent at `t` into this vector. Normalize it for a direction, or take its angle to orient something along the curve.',
  cubicBezierDerivative: 'Writes the tangent at `t` into this vector, giving the direction of travel at that point.',
  quadraticBezierSplit: 'de Casteljau subdivision: fills the `left` and `right` arrays with the control points of two curves that together trace the original exactly. Missing entries are created for you.',
  cubicBezierSplit: 'Cuts the cubic at `t` into two cubics that together match the original.',
  quadraticBezierLength: 'Approximates arc length by sampling the curve and summing straight segments, so more `samples` buys accuracy at the cost of work.',
  cubicBezierLength: 'Approximates arc length by sampling. Bézier arc length has no closed form, which is why this is sampled rather than exact.',
  quadraticBezierParameterAtLength: 'Returns the `t` that lands a given distance along the curve. Stepping `t` evenly does not move at an even speed, so this is what you need for constant-speed travel. Feed the result to `quadraticBezier()` to get the point.',
  cubicBezierParameterAtLength: 'Returns the `t` at a given distance along the cubic. Pass it to `cubicBezier()` to turn it into a point.',
  lerp: 'Interpolates from `min` to `max` by `amount` and writes the result here. `amount` is not clamped, so values outside 0–1 extrapolate past the ends.',
};

const methodNotes = {
  Vec2: {
    constructor: 'Both components default to 0, so `new Vec2()` is the origin.',
    getAngle: 'Returns the heading in radians measured from the positive X axis, or `false` at the origin where direction is undefined. Check for `false` before using the result in arithmetic.',
    setRadian: 'Turns the vector to the given heading while keeping its current length. A zero-length vector has no length to keep, so it stays at the origin.',
    setDegree: 'Same as `setRadian()`, with the conversion from degrees done for you.',
    setMinAxis: 'Overwrites whichever component is currently smaller. Which axis that is depends on the values at call time, not on a fixed choice.',
    setMaxAxis: 'Overwrites whichever component is currently larger.',
    setOppositeAxis: 'Writes the axis you did not name: pass `x` to set `y`, and the other way round.',
    getMaxAxis: "Returns the name of the larger component, `'x'` or `'y'`, which you can hand straight to the axis argument of `scale()`, `absolute()`, `floor()`, and friends.",
    getMinAxis: 'Returns the name of the smaller component, usable the same way.',
    clamp: 'Confines this point to a `Rect`, reading the rectangle\'s cached corners. A point already inside is left untouched.',
  },
  Vec3: {
    constructor: 'All three components default to 0, so `new Vec3()` is the origin.',
    cross: 'Writes the cross product into this vector. The result is perpendicular to both inputs and follows the right-hand rule, so `a.cross(b)` and `b.cross(a)` point opposite ways.',
    getAngle: 'Returns the unsigned angle in radians between this vector and another, or `false` when either has zero length. There is no reference axis in 3D, so the result is never negative.',
    clamp: 'Clamps each component between the matching components of `min` and `max`, confining the point to an axis-aligned box.',
  },
  Mat3: {
    constructor: 'With no arguments you get the identity matrix, the usual starting point for building a transform. Pass all nine entries to set them directly; omitted values become 0, while an explicit 0 or `NaN` is kept.',
    copy: 'Overwrites this matrix from another one, reusing the existing buffer.',
    toArray: 'With no argument this returns the live internal `Float32Array`, so later changes show up in it and it can go straight to a WebGL uniform. Pass a target array when you want an isolated copy.',
    toString: 'A readable dump of the entries for debugging.',
    identity: 'Resets to the identity matrix, discarding any transform already composed in.',
    scale: 'Composes a scale onto the current matrix instead of replacing it, so it applies on top of whatever is already there.',
    rotate: 'Composes a rotation, in radians, onto the current matrix.',
    translate: 'Composes a translation onto the current matrix. Because it composes, a rotation applied earlier also rotates this movement.',
    multiply: 'Multiplies this matrix by another and keeps the result here. Matrix multiplication does not commute, so the order changes the outcome.',
    transpose: 'Flips the matrix about its diagonal, swapping rows and columns.',
    determinant: 'Returns a number describing how the transform scales area. Zero means the matrix is singular and has no inverse.',
    invert: 'Replaces the matrix with the transform that undoes it. A singular matrix is left unchanged, so check `determinant()` first if you need to detect that.',
  },
  Mat4x3: {
    constructor: 'No arguments gives the identity transform. Pass the twelve affine entries to set them; the last column stays (0, 0, 0, 1) because this type cannot hold a projection.',
    copy: 'Overwrites this transform from another one, reusing the buffer.',
    toArray: 'Returns the live 4×4 `Float32Array` behind the transform, padded so it uploads to WebGL as a `mat4`. Pass a target array to copy instead.',
    toString: 'A readable dump of the entries for debugging.',
    identity: 'Resets to the identity transform.',
    scale: 'Composes a scale onto the current transform rather than replacing it.',
    rotateX: 'Composes a rotation about the X axis, in radians, onto the current transform.',
    rotateY: 'Composes a rotation about the Y axis onto the current transform.',
    rotateZ: 'Composes a rotation about the Z axis onto the current transform.',
    translate: 'Composes a translation onto the current transform, so any rotation already applied also rotates this movement.',
    multiply: 'Multiplies this transform by another in place. Order matters, and the affine last column is preserved.',
    lookAtRH: 'Builds a right-handed view transform placing the camera at `eye` looking toward `target`. If `up` is parallel to the view direction a fallback axis is used, and when `eye` equals `target` the result is identity, so neither case produces `NaN`.',
    transposeLinear: 'Transposes only the 3×3 rotation and scale part, leaving the translation column alone. For a pure rotation that transpose is also its inverse.',
    determinantLinear: 'Determinant of the 3×3 linear part, describing how the transform scales volume. Zero means it cannot be inverted.',
    invertAffine: 'Inverts using the fact that the transform is affine, which is cheaper than a general 4×4 inversion. A singular matrix is left unchanged.',
  },
  Mat4: {
    constructor: 'No arguments gives the identity matrix; otherwise pass all sixteen entries. Omitted values become 0, while an explicit 0 or `NaN` is kept.',
    copy: 'Overwrites this matrix from another one, reusing the buffer.',
    toArray: 'With no argument this hands back the live `Float32Array`, ready for a WebGL uniform. Pass a target array to copy into instead.',
    toString: 'A readable dump of the entries for debugging.',
    identity: 'Resets to the identity matrix.',
    scale: 'Composes a scale onto the current matrix rather than replacing it.',
    rotateX: 'Composes a rotation about the X axis, in radians, onto the current matrix.',
    rotateY: 'Composes a rotation about the Y axis onto the current matrix.',
    rotateZ: 'Composes a rotation about the Z axis onto the current matrix.',
    translate: 'Composes a translation onto the current matrix, so an earlier rotation also rotates this movement.',
    multiply: 'Multiplies this matrix by another in place. It preserves the last row, so composing a projection with a view matrix behaves correctly.',
    perspective: 'Builds a perspective projection from a vertical field of view in radians, an aspect ratio, and the near and far clip distances. Anything outside those planes is clipped, and a very small `znear` costs depth precision.',
    orthographic: 'Builds a parallel projection from six clip planes, so on-screen size does not fall off with distance. This is the projection for 2D overlays, CAD-style views, and shadow maps.',
    transpose: 'Flips the matrix about its diagonal, swapping rows and columns.',
    determinant: 'Returns a number describing how the transform scales volume. Zero means the matrix is singular and has no inverse.',
    invert: 'Replaces this matrix with its inverse, which is how a view matrix becomes a camera-to-world transform. A singular matrix is left unchanged.',
    lookAtRH: 'Builds a right-handed view transform from an eye position, a target, and an up vector. Degenerate input falls back to a valid basis instead of producing `NaN`.',
  },
  Quat: {
    constructor: 'Defaults to the identity rotation, `(1, 0, 0, 0)`. Arguments are in `[w, x, y, z]` order, matching what `toArray()` returns.',
    set: 'Writes all four components at once, in `[w, x, y, z]` order.',
    identity: 'Resets to the no-rotation quaternion.',
    setAxisAngle: 'Builds a rotation of `angle` radians about `axis`. The axis need not be normalized, and a zero-length axis gives identity rather than `NaN`.',
    setFromEuler: 'Builds a rotation from three Euler angles in radians. Euler input is convenient for authoring, but the quaternion is what you should store and interpolate.',
    getAxisAngle: 'Writes the rotation axis into the vector you pass and returns the angle in radians: the inverse of `setAxisAngle()`.',
    clone: 'Returns an independent copy, including a separate vector part.',
    copy: 'Overwrites this quaternion from another one, reusing the instance.',
    toArray: 'Components come out in `[w, x, y, z]` order, the same order the constructor takes. Pass a target array to fill instead of allocating.',
    toString: 'A readable form for debugging.',
    getMagnitude: 'Length across all four components. A valid rotation has length 1; pass `true` for the squared length to skip the square root.',
    normalize: 'Scales back to unit length. Repeated multiplication accumulates floating-point drift, so renormalizing every so often keeps a rotation from skewing.',
    conjugate: 'Negates the vector part. For a unit quaternion that is the inverse rotation, and it is cheaper than `invert()`.',
    invert: 'Produces the rotation that undoes this one, dividing by the squared magnitude so it stays correct even when the quaternion is not unit length.',
    dot: 'Returns a number measuring how aligned two rotations are. `slerp()` uses its sign to decide which way round the sphere is shorter.',
    multiply: 'Composes another rotation onto this one. Order matters: `a.multiply(b)` applies `b` first, then `a`.',
    premultiply: 'Composes in the opposite order to `multiply()`, applying this rotation first and the argument second.',
    rotateX: 'Composes a rotation of `angle` radians about the X axis, the same as multiplying by an axis-angle quaternion for that axis.',
    rotateY: 'Composes a rotation about the Y axis onto this quaternion.',
    rotateZ: 'Composes a rotation about the Z axis onto this quaternion.',
    slerp: 'Spherical interpolation toward another rotation by `t`, moving at constant angular speed along the shorter arc. This is the reason to store rotations as quaternions: interpolating Euler angles or matrix entries does not behave this way.',
    multiplyVector: 'Rotates a vector by this quaternion. The input is never modified; the result goes into `target`, or into a new `Vec3` when you omit it.',
    toMat4: 'Writes the rotation into a 4×4 matrix so it can be combined with translation and projection. Pass a matrix to fill instead of allocating one.',
    toMat4x3: 'Writes the rotation into an affine 4×3 matrix.',
    isIdentity: 'True when this is the no-rotation quaternion.',
  },
  Circ: {
    constructor: 'Takes the radius first, then the centre. Occupancy stays off until you call `setGrid()`.',
    clone: 'Returns a new circle with the same radius, position, and grid.',
    copy: 'Overwrites this circle from another one, grid included, and reuses the instance.',
    setGrid: 'Attaches a `Grid` and fills `gridCells` straight away. Pass `null` to detach, which resets occupancy to the empty sentinel.',
    setPosition: 'Moves the centre and refreshes occupancy in the same call, so `gridCells` never goes stale. Returns the circle, so it chains.',
    setRadius: 'Sets the radius, keeps the diameter in step, and refreshes occupancy.',
    setDiameter: 'Sets the diameter, keeps the radius in step, and refreshes occupancy.',
    scale: 'Multiplies the radius by a scalar, updating the diameter and occupancy with it.',
    isIn: 'Point-in-circle test done with squared distance, so no square root is taken. A point exactly on the edge counts as inside.',
    draw: 'Fills and strokes the circle on a canvas context. Pass an empty string for either colour to skip that pass, which is how you get fill without stroke or the reverse.',
  },
  Rect: {
    constructor: 'Takes width and height first, then the centre — not the top-left corner. The corners are derived for you.',
    clone: 'Returns a new rectangle with the same size, position, and grid.',
    copy: 'Overwrites this rectangle from another one, grid included, and reuses the instance.',
    setGrid: 'Attaches a `Grid` and fills `gridCells` with every cell the rectangle covers. Pass `null` to detach.',
    setPosition: 'Moves the centre and refreshes the corners and occupancy together, so nothing goes stale.',
    setSize: 'Resizes about the centre, refreshing the half-size, the corners, and occupancy.',
    isIn: 'Inclusive point test against the cached corners, so points on the edge count as inside.',
    draw: 'Draws from the top-left corner at the current size. An empty colour string skips the fill or the stroke.',
  },
  Grid: {
    constructor: 'Cell counts are rounded up, so the lattice always covers the whole area even when the size is not an exact multiple of the cell size. `len` holds the column and row counts as a `Vec2`.',
    testCells: 'Broad-phase overlap test: true when the two occupancy lists share a cell. It ignores the `Grid.emptyCell` sentinel, so unused slots never cause a false hit. A true result means the shapes are close enough to be worth an exact test, not that they actually intersect.',
    draw: 'Paints the lattice, optionally filling the background first. Pass an empty string for either colour to skip that pass.',
  },
  Trigo: {
    degreeToRadian: 'Multiplies by π/180. Every angle in this library is in radians, so this is the conversion to do at the edge of degree-based input.',
    radianToDegree: 'Converts back to degrees, mostly for display.',
    normalizeRadian: 'Wraps any angle into (-π, π]. Do this before comparing or interpolating angles, otherwise a value just past π looks far from one just below it when the two are neighbours.',
    sine: 'Reads from a 16384-entry lookup table instead of calling `Math.sin`. Fast enough to run per particle per frame, and accurate enough for motion; use `sinePrecise()` when the small error would accumulate.',
    cosine: 'Lookup-table cosine, with the same trade-off as `sine()`.',
    arctan: 'Delegates to `Math.atan`, returning an angle in (-π/2, π/2).',
    arctan2: 'Delegates to `Math.atan2(y, x)` for a full-circle angle, but returns `false` at the origin where the angle is undefined. Note the y-then-x argument order.',
    sinePrecise: 'Calls `Math.sin` directly, for the cases where lookup-table error matters, such as building matrices and quaternions.',
    cosinePrecise: 'Calls `Math.cos` directly.',
    sineEquation: 'Evaluates `amplitude * sin(period + shiftX) + shiftY` in one call: amplitude is the swing, `shiftX` the phase offset, `shiftY` the centre line. It uses the fast lookup-table sine.',
    cosineEquation: 'The same wave equation as `sineEquation()`, a quarter turn ahead.',
    arctanEquation: 'Evaluates `amplitude * atan(period + shiftX) + shiftY`, an S-shaped curve that flattens out at both ends.',
  },
  Bezier: {
    quadratic: 'Evaluates one axis of a quadratic curve at `t`, from `p0` at 0 to `p2` at 1. The curve touches the endpoints but generally not the control point `p1`.',
    cubic: 'Evaluates one axis of a cubic curve at `t`. The two middle controls pull the curve without lying on it, which is the shape behind CSS easing.',
    quadraticDerivative: 'The rate of change at `t`. Its sign gives the direction of travel and its magnitude the speed, which is why even steps in `t` do not cover even distances.',
    cubicDerivative: 'The rate of change of the cubic at `t`.',
    quadraticSplit: 'de Casteljau subdivision: fills `left` and `right` with the control points of two curves that together trace the original exactly.',
    cubicSplit: 'Cuts a cubic at `t` into two cubics that together match the original.',
    quadraticLength: 'Approximates arc length by sampling and summing straight segments. Bézier arc length has no closed form, so accuracy is traded against `samples`.',
    cubicLength: 'Sampled arc length of the cubic, on the same trade-off.',
    quadraticParameterAtLength: 'Finds the `t` at a given distance along the curve, which is what constant-speed travel needs, since stepping `t` evenly does not.',
    cubicParameterAtLength: 'Finds the `t` at a given distance along the cubic.',
  },
  Rand: {
    float: 'Uniform in [min, max): `min` can come up, `max` cannot.',
    integer: 'Uniform in [min, max], with both ends included, unlike `float()`.',
    distribution: 'Averages `iterations` uniform samples. More iterations bunch results toward the middle of the range, approaching a bell shape, which is a quick way to make random placement look less evenly scattered.',
    pick: 'Returns one of the two values with even odds.',
    seed: 'Switches the module-level functions to a deterministic mulberry32 sequence, so the same seed replays the same numbers. Call it with no argument to hand them back to `Math.random()`.',
    create: 'Returns an independent generator carrying its own `float`, `integer`, `distribution`, and `pick`. Prefer it over `seed()` when you want reproducibility in one place without changing behaviour everywhere else.',
  },
  NumArray: {
    min: 'Smallest value, or `NaN` for an empty array.',
    max: 'Largest value, or `NaN` for an empty array.',
    sum: 'Total of every value, and 0 for an empty array.',
    multiply: 'Product of every value, and 1 for an empty array, which is the identity for multiplication. A single zero anywhere makes the whole result zero.',
    average: 'Arithmetic mean, or `NaN` for an empty array.',
  },
  Utils: {
    round: 'Rounds to a number of decimal places rather than to a whole number. Negative decimals round to tens, hundreds, and so on.',
    floor: 'Rounds down to a number of decimal places.',
    ceil: 'Rounds up to a number of decimal places.',
    trunc: 'Drops the extra decimals without rounding, so it always moves toward zero regardless of sign.',
    roundToNearest: 'Snaps to the closest multiple of a step, which is what grid snapping and quantized sliders need.',
    mix: 'Blends `x` and `y`, where a ratio of 0 gives `x` and 1 gives `y`. Same maths as `lerp()`, with the arguments in a different order.',
    getSign: 'Matches `Math.sign`, returning -1, 0, 1, or `NaN`.',
    opposite: 'Negates the number.',
    clamp: 'Confines a value to a range. This is the guard to reach for before indexing an array or setting an opacity.',
    normalize: 'Maps a value from a range onto 0–1, the inverse of `lerp()`. A value outside the range comes back outside 0–1.',
    lerp: 'Interpolates from `min` to `max` by `amount`. It is not clamped, so amounts beyond 0–1 extrapolate past the ends.',
    map: 'Moves a value from one range straight into another: `normalize()` followed by `lerp()`. This is the one-liner for turning data into pixels, degrees, or colour channels.',
    isIn: 'Inclusive range test, easier to read at a glance than two comparisons.',
    isOut: 'The negation of `isIn()`, for guard clauses that bail out early.',
  },
  Time: {
    millisecToSec: 'Divides by 1000. Browser timestamps arrive in milliseconds while animation maths usually runs in seconds.',
    secToMillisec: 'Multiplies by 1000, for APIs such as `setTimeout` that expect milliseconds.',
    millisecToFps: 'Turns a frame duration into a rate, which is how a measured frame time becomes a readable FPS number.',
    fpsToMillisec: 'Turns a target rate into the milliseconds each frame gets: the budget you compare elapsed time against when capping a loop.',
  },
};

function noteFor(exportName, method) {
  return methodNotes[exportName]?.[method]
    ?? (['Vec2', 'Vec3'].includes(exportName) ? vectorNotes[method] : undefined);
}

// The legacy tree predates the v4 renames, so look descriptions up under the old names.
const aliases = {
  NumArray: 'Array',
  Vec2: 'Vector2',
  Vec3: 'Vector3',
  Mat3: 'Matrix3x3',
  Mat4: 'Matrix4x4',
  Mat4x3: 'Matrix4x3',
  Quat: 'Quaternion',
  Rand: 'Random',
  Trigo: 'Trigonometry',
  Circ: 'Circle',
  Rect: 'Rectangle',
};

const callableAliases = {
  Rand: {
    float: { params: [['min', 'number'], ['max', 'number']], returns: 'number' },
    integer: { params: [['min', 'number'], ['max', 'number']], returns: 'number' },
    distribution: { params: [['min', 'number'], ['max', 'number'], ['iterations', 'number']], returns: 'number' },
    pick: { params: [['value1', 'number'], ['value2', 'number']], returns: 'number' },
  },
  NumArray: {
    sum: { params: [['array', 'number[]']], returns: 'number' },
  },
  Utils: {
    normalize: { params: [['x', 'number'], ['min', 'number'], ['max', 'number']], returns: 'number' },
    lerp: { params: [['min', 'number'], ['max', 'number'], ['amount', 'number']], returns: 'number' },
  },
};

const returnOverrides = {
  'Circ.setRadius': 'this',
  'Circ.setDiameter': 'this',
  'Rand.create': '{ float(min, max): number; integer(min, max): number; distribution(min, max, iterations): number; pick(value1, value2): number }',
};

const legacy = new Map();

function walkLegacy(value, route = []) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value.params)) {
    const key = `${value.class}.${route.at(-1)}`;
    legacy.set(key, { ...value, route: route.join('_') });
    return;
  }
  for (const [name, child] of Object.entries(value)) {
    if (!['path', 'methods'].includes(name)) walkLegacy(child, [...route, name]);
  }
}

walkLegacy(legacyTree);

function jsDoc(node, source) {
  const ranges = ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? [];
  const comment = ranges
    .map(range => source.text.slice(range.pos, range.end))
    .reverse()
    .find(value => value.startsWith('/**'));
  return comment
    ? comment.replace(/^\/\*\*\s?|\s?\*\/$/g, '').replace(/^\s*\*\s?/gm, '').trim()
    : '';
}

function parameterInfo(parameter, source) {
  return {
    name: parameter.name.getText(source),
    type: parameter.type?.getText(source) ?? 'unknown',
    optional: Boolean(parameter.questionToken || parameter.initializer),
  };
}

function publicApi(exportName, sourcePath) {
  const text = fs.readFileSync(sourcePath, 'utf8');
  const source = ts.createSourceFile(sourcePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const entries = [];

  for (const statement of source.statements) {
    if (ts.isClassDeclaration(statement) && statement.name?.text === exportName) {
      for (const member of statement.members) {
        if (member.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword)) continue;
        if (ts.isConstructorDeclaration(member)) {
          entries.push({
            name: 'constructor',
            signature: `new ${exportName}(${member.parameters.map(p => p.getText(source)).join(', ')})`,
            params: member.parameters.map(p => parameterInfo(p, source)),
            returns: exportName,
            description: jsDoc(member, source),
          });
        } else if (ts.isMethodDeclaration(member) && member.name) {
          const name = member.name.getText(source);
          const returns = returnOverrides[`${exportName}.${name}`]
            ?? member.type?.getText(source)
            ?? 'void';
          entries.push({
            name,
            signature: `${name}(${member.parameters.map(p => p.getText(source)).join(', ')}): ${returns}`,
            params: member.parameters.map(p => parameterInfo(p, source)),
            returns,
            description: jsDoc(member, source),
          });
        }
      }
      return entries;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (declaration.name.getText(source) !== exportName || !declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
        for (const property of declaration.initializer.properties) {
          const name = property.name?.getText(source);
          if (!name) continue;
          if (ts.isMethodDeclaration(property)) {
            const returns = returnOverrides[`${exportName}.${name}`]
              ?? property.type?.getText(source)
              ?? 'void';
            entries.push({
              name,
              signature: `${name}(${property.parameters.map(p => p.getText(source)).join(', ')}): ${returns}`,
              params: property.parameters.map(p => parameterInfo(p, source)),
              returns,
              description: jsDoc(property, source),
            });
          } else if (callableAliases[exportName]?.[name]) {
            const alias = callableAliases[exportName][name];
            entries.push({
              name,
              signature: `${name}(${alias.params.map(([n, type]) => `${n}: ${type}`).join(', ')}): ${alias.returns}`,
              params: alias.params.map(([n, type]) => ({ name: n, type, optional: false })),
              returns: alias.returns,
              description: jsDoc(property, source),
            });
          }
        }
      }
    }
  }
  return entries;
}

function legacyFor(exportName, method) {
  return legacy.get(`${exportName}.${method}`)
    ?? legacy.get(`${aliases[exportName]}.${method}`);
}

const modernNames = Object.entries(aliases)
  .filter(([, old]) => old !== 'Array')
  .map(([current, old]) => [new RegExp(`\\b${old}\\b`, 'g'), current]);

/** Legacy prose predates the v4 renames, so swap the old class names out. */
function modernize(text) {
  if (!text) return text;
  return modernNames.reduce((value, [pattern, name]) => value.replace(pattern, name), text);
}

function valueFor(type, name) {
  const clean = type.replace(/\s*\|\s*(undefined|null)/g, '').replace(/^\?/, '');
  const namedValues = {
    width: '100',
    height: '100',
    cellSize: '10',
    radius: '10',
    diameter: '20',
    offset: '0',
    samples: '16',
    distance: '10',
    iterations: '4',
    seed: '42',
    left: '-1',
    right: '1',
    top: '1',
    bottom: '-1',
    near: '0.1',
    far: '100',
    znear: '0.1',
    zfar: '100',
    aspect: '16 / 9',
  };
  if (clean === 'number' && namedValues[name]) return namedValues[name];
  if (clean.includes('Vec2')) return 'new Vec2(1, 2)';
  if (clean.includes('Vec3')) return 'new Vec3(1, 2, 3)';
  if (clean.includes('Rect')) return 'new Rect(10, 10, 0, 0)';
  if (clean.includes('Grid')) return 'new Grid(100, 100, 10)';
  if (clean.includes('Mat3')) return 'new Mat3()';
  if (clean.includes('Mat4x3')) return 'new Mat4x3()';
  if (clean.includes('Mat4')) return 'new Mat4()';
  if (clean.includes('Quat')) return 'new Quat()';
  if (clean.includes('Float32Array')) return 'new Float32Array(16)';
  if (clean.includes('number[]')) return '[1, 2, 3]';
  if (clean.includes('Vec2[]') || clean.includes('Vec3[]')) return '[]';
  if (clean.includes("'x' | 'y'")) return "'x'";
  if (clean.includes('CanvasRenderingContext2D')) return 'context';
  if (clean === 'string') return name.toLowerCase().includes('color') ? "'#5b8cff'" : "'value'";
  if (clean === 'boolean') return 'false';
  if (clean === 'number') {
    if (/angle|radian|fovy/i.test(name)) return 'Math.PI / 4';
    if (/^(amount|ratio|t)$/i.test(name)) return '0.5';
    return '1';
  }
  return 'undefined';
}

function fallbackUsage(exportName, entry) {
  const imports = new Set([exportName]);
  for (const param of entry.params) {
    for (const type of ['Vec2', 'Vec3', 'Circ', 'Rect', 'Grid', 'Mat3', 'Mat4x3', 'Mat4', 'Quat']) {
      // Word boundaries keep a Mat4x3 parameter from also importing Mat4.
      if (new RegExp(`\\b${type}\\b`).test(param.type)) imports.add(type);
    }
  }
  const importLine = `import { ${[...imports].join(', ')} } from '@1pizzateam/spockjs';`;
  if (entry.name === 'constructor') {
    const args = entry.params.map(p => valueFor(p.type, p.name));
    return `${importLine}\n\nconst value = new ${exportName}(${args.join(', ')});`;
  }
  const args = entry.params.map(p => valueFor(p.type, p.name));
  const objectStyle = ['Trigo', 'Bezier', 'Rand', 'NumArray', 'Utils', 'Time'].includes(exportName);
  const constructors = {
    Circ: 'new Circ(10, 0, 0)',
    Rect: 'new Rect(20, 10, 0, 0)',
    Grid: 'new Grid(100, 100, 10)',
  };
  const receiver = objectStyle ? exportName : (constructors[exportName] ?? `new ${exportName}()`);
  const context = entry.params.some(param => param.type.includes('CanvasRenderingContext2D'))
    ? "\nconst context = document.querySelector('canvas').getContext('2d');\n"
    : '\n';
  return `${importLine}\n${context}\nconst result = ${receiver}.${entry.name}(${args.join(', ')});`;
}

function usageFor(exportName, entry) {
  return fallbackUsage(exportName, entry);
}

function parameterLines(entry, old) {
  if (!entry.params.length) return 'None.';
  return entry.params.map(param => {
    const oldParam = old?.params?.find(candidate => candidate.name.toLowerCase() === param.name.toLowerCase());
    const optional = param.optional ? ' Optional.' : '';
    const legacyDetail = modernize(oldParam?.description
      ?.replace(/\s*different than zero\s*/gi, '')
      .trim());
    const detail = legacyDetail ? ` ${legacyDetail}` : '';
    return `- \`${param.name}\` — \`${param.type}\`.${optional}${detail}`.trimEnd();
  }).join('\n');
}

function createPage(exportName, sourceFile, outputFile) {
  const entries = publicApi(exportName, path.join(root, 'src', sourceFile));
  const intro = intros[exportName];
  let markdown = `# ${exportName}\n\n`;
  if (intro) {
    markdown += `${intro.summary}\n\n`;
    for (const paragraph of intro.body) markdown += `${paragraph}\n\n`;
    markdown += `\`\`\`js\n${intro.example}\n\`\`\`\n\n`;
  } else {
    markdown += `Import with \`import { ${exportName} } from '@1pizzateam/spockjs';\`.\n\n`;
  }
  for (const entry of entries) {
    const old = legacyFor(exportName, entry.name);
    const description = entry.description || modernize(old?.description?.trim()) || `${entry.name} on ${exportName}.`;
    const note = noteFor(exportName, entry.name);
    markdown += `## ${entry.name === 'constructor' ? 'Constructor' : `${exportName}.${entry.name}()`}\n\n`;
    markdown += `${description}\n\n`;
    if (note) markdown += `${note}\n\n`;
    markdown += `\`\`\`ts\n${entry.signature}\n\`\`\`\n\n`;
    markdown += `### Parameters\n\n${parameterLines(entry, old)}\n\n`;
    markdown += `### Returns\n\n\`${entry.returns}\`${old?.return?.description ? ` — ${modernize(old.return.description.trim())}` : ''}\n\n`;
    markdown += `### Example\n\n\`\`\`js\n${usageFor(exportName, entry, old)}\n\`\`\`\n\n`;
  }
  fs.writeFileSync(path.join(docsRoot, outputFile), markdown);
  return entries.length;
}

fs.mkdirSync(docsRoot, { recursive: true });
let total = 0;
for (const [exportName, sourceFile, outputFile] of modules) {
  total += createPage(exportName, sourceFile, outputFile);
}
console.log(`Generated ${modules.length} API pages with ${total} documented functions.`);
