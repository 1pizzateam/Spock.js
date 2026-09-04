# Time

Import with `import { Time } from '@1pizzateam/spockjs';`.

## Time.millisecToSec()

Milliseconds to seconds.

```ts
millisecToSec(millisecond: number): number
```

### Parameters

- `millisecond` — `number`.

### Returns

`number` — the time in second

### Example

```js
import { Time } from '@1pizzateam/spockjs';


const result = Time.millisecToSec(1);
```

## Time.secToMillisec()

Seconds to milliseconds.

```ts
secToMillisec(second: number): number
```

### Parameters

- `second` — `number`.

### Returns

`number` — the time in milliseconds

### Example

```js
import { Time } from '@1pizzateam/spockjs';


const result = Time.secToMillisec(1);
```

## Time.millisecToFps()

Frame duration in ms to frames per second.

```ts
millisecToFps(millisecond: number): number
```

### Parameters

- `millisecond` — `number`. the time in frame to second

### Returns

`number`

### Example

```js
import { Time } from '@1pizzateam/spockjs';


const result = Time.millisecToFps(1);
```

## Time.fpsToMillisec()

Frames per second to frame duration in ms.

```ts
fpsToMillisec(refreshRate: number): number
```

### Parameters

- `refreshRate` — `number`.

### Returns

`number` — the time in millisecond

### Example

```js
import { Time } from '@1pizzateam/spockjs';


const result = Time.fpsToMillisec(1);
```

