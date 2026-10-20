# Ray2

<Ray2Demo />

A 2D ray with an origin and a unit direction. It tests against [`Rect`](./rect), [`RightTriangle`](./triangle), and [`Circ`](./circ) by delegating to their segment `raycast`: the ray is cut at `maxDistance`, and the hit is a `RayHit2D` (`{ fraction, point, normal }`) whose `fraction` is relative to that segment, so the distance along the ray is `fraction * maxDistance`. The 3D counterpart is [`Ray3`](./ray3).

```js
import { Ray2, Rect, Vec2 } from '@1pizzateam/spock';

const ray = new Ray2(new Vec2(0, 0), new Vec2(1, 1));   // direction is normalized
const hit = ray.intersectRect(new Rect(new Vec2(2, 2), new Vec2(5, 5)), 20);
if (hit) console.log(hit.point, hit.fraction * 20);
```

| Method | Description |
|---|---|
| `new Ray2(origin?, direction?)` | Along +X from the origin by default. |
| `set(origin, direction)` / `copy(ray)` / `clone()` | Assign or duplicate. |
| `at(t, target?)` | Point at distance `t`. |
| `intersectRect(rect, maxDistance, target?)` | First hit within `maxDistance`, or `null`. |
| `intersectsRect(rect, maxDistance)` | Boolean version. |
| `intersectCirc(circ, maxDistance, target?)` | First hit within `maxDistance`, or `null`. |
| `intersectsCirc(circ, maxDistance)` | Boolean version. |
| `intersectTriangle(tri, maxDistance, target?)` | First hit on a `RightTriangle` within `maxDistance`, or `null`. |
| `intersectsTriangle(tri, maxDistance)` | Boolean version. |

A ray that starts inside the shape hits at `fraction = 0`. Pass a `target` hit object to avoid allocating.
