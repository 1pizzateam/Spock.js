# NumArray

Import with `import { NumArray } from '@1pizzateam/spockjs';`.

## NumArray.min()

Smallest value, or NaN if array is empty.

```ts
min(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spockjs';


const result = NumArray.min([1, 2, 3]);
```

## NumArray.max()

Largest value, or NaN if array is empty.

```ts
max(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spockjs';


const result = NumArray.max([1, 2, 3]);
```

## NumArray.sum()

Sum of every value.

```ts
sum(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spockjs';


const result = NumArray.sum([1, 2, 3]);
```

## NumArray.multiply()

Product of every value.

```ts
multiply(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spockjs';


const result = NumArray.multiply([1, 2, 3]);
```

## NumArray.average()

Arithmetic mean, or NaN if array is empty.

```ts
average(array: number[]): number
```

### Parameters

- `array` — `number[]`.

### Returns

`number` — the result

### Example

```js
import { NumArray } from '@1pizzateam/spockjs';


const result = NumArray.average([1, 2, 3]);
```

