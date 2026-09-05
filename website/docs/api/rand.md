# Rand

Import with `import { Rand } from '@1pizzateam/spockjs';`.

## Rand.float()

Uniform float in [min, max).

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

