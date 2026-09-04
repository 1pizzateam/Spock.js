# Installation

Spock.js 4 requires Node.js 22 or newer and is published as an ES module.

## npm

```bash
npm install @1pizzateam/spockjs
```

## Yarn

```bash
yarn add @1pizzateam/spockjs
```

## Usage

Import only the APIs you need:

```js
import {
  Vector2,
  Matrix3x3,
  Trigonometry,
} from '@1pizzateam/spockjs';

const position = new Vector2(4, 5);
const transform = new Matrix3x3()
  .translate(position)
  .rotate(Trigonometry.halfpi);
```

Spock.js 4 has no CommonJS or IIFE build. Browser projects should load it through an ESM-aware bundler or use a module script.

```html
<script type="module">
  import { Vector2 } from './node_modules/@1pizzateam/spockjs/dist/spock.js';

  console.log(new Vector2(3, 4).getMagnitude());
</script>
```
