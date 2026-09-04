# Examples

Every demo on this page runs the real library in your browser — the site imports the built
`@1pizzateam/spockjs` bundle rather than reimplementing the maths. The complete canvas demos are
also available in [`dev/examples`](https://github.com/1pizzateam/Spock.js/tree/main/dev/examples).

## Interpolation

<LerpDemo />

```js
import { Utils, Vector2 } from '@1pizzateam/spockjs';

const start = new Vector2(0, 20);
const end = new Vector2(100, 80);
const point = new Vector2().lerp(start, end, 0.35);

const radius = Utils.lerp(8, 30, 0.35);
```

## Quadratic Bézier

<BezierDemo />

```js
import { Vector2 } from '@1pizzateam/spockjs';

const p0 = new Vector2(20, 200);
const p1 = new Vector2(160, 20);
const p2 = new Vector2(300, 200);

const point = new Vector2().quadraticBezier(p0, p1, p2, 0.5);
const tangent = new Vector2().quadraticBezierDerivative(p0, p1, p2, 0.5);
const length = new Vector2().quadraticBezierLength(p0, p1, p2);
```

## Cubic Bézier

<CubicBezierDemo />

```js
import { Vector2 } from '@1pizzateam/spockjs';

const p0 = new Vector2(20, 220);
const p1 = new Vector2(90, 40);
const p2 = new Vector2(240, 60);
const p3 = new Vector2(320, 220);

const point = new Vector2().cubicBezier(p0, p1, p2, p3, 0.5);
const length = new Vector2().cubicBezierLength(p0, p1, p2, p3);

// the t that sits halfway along the curve, which is not t = 0.5
const t = new Vector2()
  .cubicBezierParameterAtLength(p0, p1, p2, p3, length * 0.5);
const halfway = new Vector2().cubicBezier(p0, p1, p2, p3, t);
```

## 2D transform

<TransformDemo />

```js
import { Matrix3x3, Vector2 } from '@1pizzateam/spockjs';

const transform = new Matrix3x3()
  .translate(new Vector2(100, 50))
  .rotate(Math.PI / 4)
  .scale(new Vector2(2, 2));

const buffer = transform.toArray();
```

## Trigonometry

<TrigonometryDemo />

```js
import { Trigonometry } from '@1pizzateam/spockjs';

const wrapped = Trigonometry.normalizeRadian(7.5);
const y = Trigonometry.sine(wrapped);
const heading = Trigonometry.arctan2(dy, dx);
```

## Wave equations

<WaveDemo />

```js
import { Trigonometry } from '@1pizzateam/spockjs';

const slice = Trigonometry.twopi / 24;

// amplitude * cos(period + shiftX) + shiftY
const x = Trigonometry.cosineEquation(200, slice * i, 0, centerX);
const y = Trigonometry.sineEquation(200, slice * i, 0, centerY);
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

<RandomDemo />

```js
import { Random } from '@1pizzateam/spockjs';

const random = Random.create(1337);
const flat = random.float(0, 1);
const centered = random.distribution(0, 1, 5);
```

## Random points in 2D

<RandomScatterDemo />

```js
import { Random } from '@1pizzateam/spockjs';

const random = Random.create(20260904);

for (let i = 0; i < 9000; i++) {
  const x = random.distribution(0, width, 5);
  const y = random.distribution(0, height, 5);
  const tint = random.pick(0, 1);
}
```

## Grid occupancy

<GridDemo />

```js
import { Circle, Grid } from '@1pizzateam/spockjs';

const grid = new Grid(800, 600, 32);
const circle = new Circle(38, 400, 300).setGrid(grid);

circle.setPosition(120, 240);
const occupied = circle.gridCells.filter(cell => cell !== Grid.emptyCell);
```

## Quaternion rotation

<QuaternionDemo />

```js
import { Quaternion, Vector3 } from '@1pizzateam/spockjs';

const rotation = new Quaternion()
  .setAxisAngle(new Vector3(0.4, 1, 0.25), Math.PI / 2);

const target = new Vector3();
rotation.multiplyVector(new Vector3(0, 0, 1), target);
```

## Distance and clamping

<ClampDemo />

```js
import { Rectangle, Vector2 } from '@1pizzateam/spockjs';

const bounds = new Rectangle(640, 360, 320, 180);
const pointer = new Vector2(700, -20).clamp(bounds);
const distance = pointer.getDistance(bounds.position);
```
