# Rand

Random numbers, either from `Math.random()` or from a seeded generator you can replay.

The module-level `float()`, `integer()`, `distribution()`, and `pick()` use `Math.random()` until you call `seed()`, after which they follow a deterministic mulberry32 sequence. Call `seed()` with no argument to hand them back to `Math.random()`.

`create()` returns an independent generator with the same four methods, which is the better option when you want one reproducible stream without touching global state. `distribution()` averages several samples, biasing results toward the middle of the range instead of spreading them evenly.

```js
import { Rand } from '@1pizzateam/spockjs';

const level = Rand.create(1337); // same seed, same level, every run

const x = level.float(0, 800);
const enemies = level.integer(3, 8);
const clustered = level.distribution(0, 800, 4); // bunched toward the middle
```

## Rand.float()

Uniform float in [min, max).

Uniform in [min, max): `min` can come up, `max` cannot.

```ts
float(min: number, max: number): number
```

### Parameters

- `min` — `number`.
- `max` — `number`.

### Returns

`number` — the result

### Example

```js
import { Rand } from '@1pizzateam/spockjs';


const result = Rand.float(1, 1);
```

## Rand.integer()

Uniform integer in [min, max].

Uniform in [min, max], with both ends included, unlike `float()`.

```ts
integer(min: number, max: number): number
```

### Parameters

- `min` — `number`.
- `max` — `number`.

### Returns

`number` — the result

### Example

```js
import { Rand } from '@1pizzateam/spockjs';


const result = Rand.integer(1, 1);
```

## Rand.distribution()

Average of iterations uniform samples in [min, max).

Averages `iterations` uniform samples. More iterations bunch results toward the middle of the range, approaching a bell shape, which is a quick way to make random placement look less evenly scattered.

```ts
distribution(min: number, max: number, iterations: number): number
```

### Parameters

- `min` — `number`.
- `max` — `number`.
- `iterations` — `number`.

### Returns

`number` — the result

### Example

```js
import { Rand } from '@1pizzateam/spockjs';


const result = Rand.distribution(1, 1, 4);
```

## Rand.pick()

Pick value1 or value2 with equal chance.

Returns one of the two values with even odds.

```ts
pick(value1: number, value2: number): number
```

### Parameters

- `value1` — `number`.
- `value2` — `number`.

### Returns

`number` — the result

### Example

```js
import { Rand } from '@1pizzateam/spockjs';


const result = Rand.pick(1, 1);
```

## Rand.seed()

Seed the default generator, or restore Math.random if omitted.

Switches the module-level functions to a deterministic mulberry32 sequence, so the same seed replays the same numbers. Call it with no argument to hand them back to `Math.random()`.

```ts
seed(value?: number): void
```

### Parameters

- `value` — `number`. Optional.

### Returns

`void`

### Example

```js
import { Rand } from '@1pizzateam/spockjs';


const result = Rand.seed(1);
```

## Rand.create()

Independent generator from seed.

Returns an independent generator carrying its own `float`, `integer`, `distribution`, and `pick`. Prefer it over `seed()` when you want reproducibility in one place without changing behaviour everywhere else.

```ts
create(seed: number): { float(min, max): number; integer(min, max): number; distribution(min, max, iterations): number; pick(value1, value2): number }
```

### Parameters

- `seed` — `number`.

### Returns

`{ float(min, max): number; integer(min, max): number; distribution(min, max, iterations): number; pick(value1, value2): number }`

### Example

```js
import { Rand } from '@1pizzateam/spockjs';


const result = Rand.create(42);
```

