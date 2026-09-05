# Random

Import with `import { Random } from '@1pizzateam/spockjs';`.

## Random.float()

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
import { Random } from '@1pizzateam/spockjs';


const result = Random.float(1, 1);
```

## Random.integer()

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
import { Random } from '@1pizzateam/spockjs';


const result = Random.integer(1, 1);
```

## Random.distribution()

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
import { Random } from '@1pizzateam/spockjs';


const result = Random.distribution(1, 1, 4);
```

## Random.pick()

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
import { Random } from '@1pizzateam/spockjs';


const result = Random.pick(1, 1);
```

## Random.seed()

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
import { Random } from '@1pizzateam/spockjs';


const result = Random.seed(1);
```

## Random.create()

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
import { Random } from '@1pizzateam/spockjs';


const result = Random.create(42);
```

