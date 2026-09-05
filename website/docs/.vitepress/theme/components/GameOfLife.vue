<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';
import { Grid, NumArray, Rand, Rect, Time, Utils } from '@1pizzateam/spockjs';
import { startCanvas } from '../canvas.js';

const CELL_SIZE = 8;
const GENERATIONS_PER_SECOND = 3;
const STEP_DURATION = Time.millisecToSec(
  Time.fpsToMillisec(GENERATIONS_PER_SECOND)
);
// Cells below this age are drawn smaller, so births visibly grow into place.
const GROWTH_STEPS = 4;

const canvas = ref(null);
const generation = ref(0);
const population = ref(0);

let grid = null;
let seeder = null;
let cells = new Uint8Array();
let nextCells = new Uint8Array();
let ages = new Uint8Array();
let generator = Rand.create(Date.now());
let width = 0;
let height = 0;
let previousStep = 0;
let animationTime = 0;
let stop = null;
let seedOffset = 0;

/** Scatter square soup blobs and let the grid tell us which cells they cover. */
function randomize() {
  if (!grid) return;

  generator = Rand.create((Date.now() + seedOffset++) >>> 0);
  cells.fill(0);
  ages.fill(0);
  nextCells.fill(0);

  const blobs = Utils.clamp(Math.round(cells.length / 260), 6, 48);
  for (let i = 0; i < blobs; i++) {
    const side = generator.integer(6, 14) * CELL_SIZE;
    seeder.setSize(side, side).setPosition(
      generator.float(0, width),
      generator.float(0, height)
    );
    for (const cell of seeder.gridCells)
      if (cell !== Grid.emptyCell) cells[cell] = generator.pick(1, 0);
  }

  generation.value = 0;
  population.value = NumArray.sum(cells);
  previousStep = animationTime;
}

function rebuild(canvasWidth, canvasHeight) {
  width = canvasWidth;
  height = canvasHeight;
  grid = new Grid(width, height, CELL_SIZE);
  seeder = new Rect(0, 0, 0, 0).setGrid(grid);
  const size = grid.len.x * grid.len.y;
  cells = new Uint8Array(size);
  nextCells = new Uint8Array(size);
  ages = new Uint8Array(size);
  randomize();
}

function evolve() {
  const columns = grid.len.x;
  const rows = grid.len.y;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let neighbours = 0;
      for (let y = -1; y <= 1; y++)
        for (let x = -1; x <= 1; x++)
          if (x || y)
            neighbours += cells[
              ((row + y + rows) % rows) * columns +
              (column + x + columns) % columns
            ];

      const index = row * columns + column;
      const live = cells[index];
      nextCells[index] = neighbours === 3 || (neighbours === 2 && live) ? 1 : 0;
      ages[index] = live && nextCells[index]
        ? Utils.clamp(ages[index] + 1, 0, GROWTH_STEPS)
        : 0;
    }
  }

  [cells, nextCells] = [nextCells, cells];
  generation.value += 1;
  population.value = NumArray.sum(cells);
}

function draw(context, state, theme) {
  animationTime = state.time;
  if (!grid || state.width !== width || state.height !== height)
    rebuild(state.width, state.height);

  if (state.time - previousStep >= STEP_DURATION) {
    evolve();
    previousStep = state.time;
  }

  context.fillStyle = theme.surface;
  context.fillRect(0, 0, width, height);

  const columns = grid.len.x;
  context.fillStyle = theme.accent;
  for (let index = 0; index < cells.length; index++) {
    if (!cells[index]) continue;
    const inset = Utils.map(ages[index], 0, GROWTH_STEPS, CELL_SIZE * 0.35, 1);
    context.fillRect(
      (index % columns) * CELL_SIZE + inset,
      Math.floor(index / columns) * CELL_SIZE + inset,
      CELL_SIZE - inset * 2,
      CELL_SIZE - inset * 2
    );
  }

  grid.draw(context, '', theme.grid, 1);
}

onMounted(() => {
  stop = startCanvas(canvas.value, draw);
});

onBeforeUnmount(() => {
  stop?.();
});
</script>

<template>
  <section class="life-section">
    <div class="life-heading">
      <div>
        <p class="life-eyebrow">Built with Spock.js</p>
        <h2>Conway's Game of Life demo</h2>
        <p>
          Each generation evolves on a <code>Grid</code>. Seeded
          <code>Rand</code> values scatter <code>Rect</code> soup blobs,
          <code>Time</code> paces the steps, <code>Utils</code> grows every
          newborn cell, and <code>NumArray</code> counts who is still alive.
        </p>
      </div>
      <button
        type="button"
        class="life-reload"
        aria-label="Start fresh"
        title="Start fresh"
        @click="randomize"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-2.64-6.36" />
          <polyline points="21 3 21 9 15 9" />
        </svg>
      </button>
    </div>

    <div class="life-canvas">
      <canvas
        ref="canvas"
        aria-label="An evolving random population in Conway's Game of Life"
      ></canvas>
      <div class="life-stats">
        <span>Generation {{ generation }}</span>
        <span>{{ population }} living cells</span>
      </div>
    </div>

    <p class="life-more">
      <a
        class="life-icon"
        :href="withBase('/guide/examples')"
        aria-label="More demos"
        title="More demos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </a>
    </p>
  </section>
</template>

<style scoped>
.life-section {
  max-width: 1152px;
  margin: 72px auto 0;
  padding: 0 24px 8px;
}

.life-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 20px;
}

.life-heading h2 {
  margin: 4px 0 8px;
  border: 0;
  font-size: 28px;
  line-height: 1.25;
}

.life-heading p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.life-heading .life-eyebrow {
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.life-reload,
.life-icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.life-reload:hover,
.life-icon:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
}

.life-reload:focus-visible,
.life-icon:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.life-canvas {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.life-canvas canvas {
  display: block;
  width: 100%;
  height: 360px;
}

.life-stats {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 10px;
  background: color-mix(in srgb, var(--vp-c-bg) 88%, transparent);
  color: var(--vp-c-text-2);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}

.life-more {
  margin: 16px 0 0;
  text-align: right;
}

.life-more a {
  color: var(--vp-c-brand-1);
  font-size: 15px;
  font-weight: 600;
}

.life-more a:hover {
  color: var(--vp-c-brand-2);
}

@media (max-width: 640px) {
  .life-section {
    margin-top: 48px;
  }

  .life-heading {
    align-items: start;
    gap: 16px;
  }

  .life-canvas canvas {
    height: 300px;
  }

  .life-stats {
    left: 12px;
    right: auto;
  }
}
</style>
