# NumArray

Reductions that turn an array of numbers into a single value.

<NumArrayDemo />

It covers the reductions that come up constantly — `min()`, `max()`, `sum()`, `multiply()` for the product, and `average()` — written as straight loops rather than `reduce()` callbacks, so they stay fast on large arrays and work on typed arrays too.

`min()`, `max()`, and `average()` return `NaN` for an empty array. `sum()` returns 0 and `multiply()` returns 1, their identity values.

```js
import { NumArray } from '@1pizzateam/spock';

const frameTimes = [16.7, 16.9, 33.1, 16.6];

const worst = NumArray.max(frameTimes);
const mean = NumArray.average(frameTimes);
```

## NumArray.min()

Smallest value, or NaN if array is empty.

Smallest value, or `NaN` for an empty array.

```ts
min(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spock';


const result = NumArray.min([1, 2, 3]);
```

## NumArray.max()

Largest value, or NaN if array is empty.

Largest value, or `NaN` for an empty array.

```ts
max(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spock';


const result = NumArray.max([1, 2, 3]);
```

## NumArray.sum()

Sum of every value.

Total of every value, and 0 for an empty array.

```ts
sum(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spock';


const result = NumArray.sum([1, 2, 3]);
```

## NumArray.multiply()

Product of every value.

Product of every value, and 1 for an empty array, which is the identity for multiplication. A single zero anywhere makes the whole result zero.

```ts
multiply(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spock';


const result = NumArray.multiply([1, 2, 3]);
```

## NumArray.average()

Arithmetic mean, or NaN if array is empty.

Arithmetic mean, or `NaN` for an empty array.

```ts
average(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spock';


const result = NumArray.average([1, 2, 3]);
```

---

## Related: RollingAverage

While `NumArray.average()` computes the arithmetic mean across an entire static array in $O(N)$ time, [RollingAverage](./rolling-average) maintains a moving average across a continuous streaming window in constant $O(1)$ time with zero memory allocations.

See the full **[RollingAverage Guide & API Reference](./rolling-average)**.

