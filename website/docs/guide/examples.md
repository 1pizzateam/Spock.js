# Examples

Every demo on this page runs the library in your browser, capped at 30 fps to keep your CPU cold.

## Interpolation

<LerpDemo />

```js
import { Utils, Vec2 } from '@1pizzateam/spockjs';

const start = new Vec2(0, 20);
const end = new Vec2(100, 80);
const point = new Vec2().lerp(start, end, 0.35);

const radius = Utils.lerp(8, 30, 0.35);
```

## Quadratic Bézier

<BezierDemo />

```js
import { Vec2 } from '@1pizzateam/spockjs';

const p0 = new Vec2(20, 200);
const p1 = new Vec2(160, 20);
const p2 = new Vec2(300, 200);

const point = new Vec2().quadraticBezier(p0, p1, p2, 0.5);
const tangent = new Vec2().quadraticBezierDerivative(p0, p1, p2, 0.5);
const length = new Vec2().quadraticBezierLength(p0, p1, p2);
```

## Cubic Bézier

<CubicBezierDemo />

```js
import { Vec2 } from '@1pizzateam/spockjs';

const p0 = new Vec2(20, 220);
const p1 = new Vec2(90, 40);
const p2 = new Vec2(240, 60);
const p3 = new Vec2(320, 220);

const point = new Vec2().cubicBezier(p0, p1, p2, p3, 0.5);
const length = new Vec2().cubicBezierLength(p0, p1, p2, p3);

// the t that sits halfway along the curve, which is not t = 0.5
const t = new Vec2()
  .cubicBezierParameterAtLength(p0, p1, p2, p3, length * 0.5);
const halfway = new Vec2().cubicBezier(p0, p1, p2, p3, t);
```

## 2D transform

<TransformDemo />

```js
import { Mat3, Vec2 } from '@1pizzateam/spockjs';

const transform = new Mat3()
  .translate(new Vec2(100, 50))
  .rotate(Math.PI / 4)
  .scale(new Vec2(2, 2));

const buffer = transform.toArray();
```

## Trigo

<TrigoDemo />

```js
import { Trigo } from '@1pizzateam/spockjs';

const wrapped = Trigo.normalizeRadian(7.5);
const y = Trigo.sine(wrapped);
const heading = Trigo.arctan2(dy, dx);
```

## Wave equations

<WaveDemo />

```js
import { Trigo } from '@1pizzateam/spockjs';

const slice = Trigo.twopi / 24;

// amplitude * cos(period + shiftX) + shiftY
const x = Trigo.cosineEquation(200, slice * i, 0, centerX);
const y = Trigo.sineEquation(200, slice * i, 0, centerY);
```

## Ranges and rounding

<UtilsDemo />

```js
import { Utils } from '@1pizzateam/spockjs';

const celsius = Utils.map(pixelX, 0, 600, -20, 40);
const ratio = Utils.normalize(celsius, -20, 40);
const snapped = Utils.roundToNearest(celsius, 2.5);
```

## Seeded random distribution

<RandDemo />

```js
import { Rand } from '@1pizzateam/spockjs';

const random = Rand.create(1337);
const flat = random.float(0, 1);
const centered = random.distribution(0, 1, 5);
```

## Random points in 2D

<RandScatterDemo />

```js
import { Rand } from '@1pizzateam/spockjs';

const random = Rand.create(20260904);

for (let i = 0; i < 9000; i++) {
  const x = random.distribution(0, width, 5);
  const y = random.distribution(0, height, 5);
  const tint = random.pick(0, 1);
}
```

## Grid occupancy

<GridDemo />

```js
import { Circ, Grid } from '@1pizzateam/spockjs';

const grid = new Grid(800, 600, 32);
const circle = new Circ(38, 400, 300).setGrid(grid);

circle.setPosition(120, 240);
const occupied = circle.gridCells.filter(cell => cell !== Grid.emptyCell);
```

## Quat rotation

<QuatDemo />

```js
import { Quat, Vec3 } from '@1pizzateam/spockjs';

const rotation = new Quat()
  .setAxisAngle(new Vec3(0.4, 1, 0.25), Math.PI / 2);

const target = new Vec3();
rotation.multiplyVector(new Vec3(0, 0, 1), target);
```

## Distance and clamping

<ClampDemo />

```js
import { Rect, Vec2 } from '@1pizzateam/spockjs';

const bounds = new Rect(640, 360, 320, 180);
const pointer = new Vec2(700, -20).clamp(bounds);
const distance = pointer.getDistance(bounds.position);
```
