---
layout: home

hero:
  name: Spock.js
  text: Mathematics for JavaScript
  tagline: Lightweight vectors, matrices, geometry, curves, random numbers, and numerical helpers written in TypeScript.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/overview
    - theme: alt
      text: API Reference
      link: /api/

features:
  - icon: ↗️
    title: Vectors
    details: Mutable 2D and 3D vectors with arithmetic, interpolation, curves, and spatial helpers.
  - icon: 🔲
    title: Matrices
    details: 3×3, affine 4×3, and 4×4 transforms with composition, inversion, and camera matrices.
  - icon: 📐
    title: Geometry
    details: Circles, rectangles, grids, occupancy checks, and canvas drawing.
  - icon: 〰️
    title: Curves
    details: Quadratic and cubic Bézier evaluation, derivatives, splits, and sampled arc lengths.
  - icon: 🎲
    title: Deterministic random
    details: Uniform values, distributions, picks, and replayable seeded generators.
  - icon: 🔄
    title: Quaternions
    details: Axis-angle and Euler rotations, Hamilton products, slerp, vector rotation, and matrix conversion.
---

<GameOfLife />

```js
import { Grid, Rand, Rect, Time, Utils } from '@1pizzateam/spockjs';

const CELL = 8;
const GROW = 4;
const STEP = Time.millisecToSec(Time.fpsToMillisec(3));

const grid = new Grid(canvas.width, canvas.height, CELL);
const cols = grid.len.x;
const rows = grid.len.y;
let cells = new Uint8Array(cols * rows);
let next = new Uint8Array(cells.length);
const ages = new Uint8Array(cells.length);
const seeder = new Rect(0, 0, 0, 0).setGrid(grid);

function randomize(seed) {
  const rand = Rand.create(seed);
  cells.fill(0);
  ages.fill(0);
  const blobs = Utils.clamp(Math.round(cells.length / 260), 6, 48);
  for (let i = 0; i < blobs; i++) {
    const side = rand.integer(6, 14) * CELL;
    seeder.setSize(side, side).setPosition(
      rand.float(0, canvas.width),
      rand.float(0, canvas.height)
    );
    for (const cell of seeder.gridCells)
      if (cell !== Grid.emptyCell) cells[cell] = rand.pick(1, 0);
  }
}

function evolve() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let n = 0;
      for (let y = -1; y <= 1; y++)
        for (let x = -1; x <= 1; x++)
          if (x || y)
            n += cells[((row + y + rows) % rows) * cols + (col + x + cols) % cols];
      const i = row * cols + col;
      const live = cells[i];
      next[i] = n === 3 || (n === 2 && live) ? 1 : 0;
      ages[i] = live && next[i] ? Utils.clamp(ages[i] + 1, 0, GROW) : 0;
    }
  }
  [cells, next] = [next, cells];
}

function render(context) {
  context.fillStyle = '#5b8cff';
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i]) continue;
    const inset = Utils.map(ages[i], 0, GROW, CELL * 0.35, 1);
    context.fillRect(
      (i % cols) * CELL + inset,
      Math.floor(i / cols) * CELL + inset,
      CELL - inset * 2,
      CELL - inset * 2
    );
  }
  grid.draw(context, '', '#2a2f3a', 1);
}
```
