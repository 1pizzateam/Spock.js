<script setup>
import { Circ, Grid } from '@1pizzateam/spockjs';
import DemoFrame from './DemoFrame.vue';
import { label } from '../canvas.js';

const CELL = 32;
let grid = null;
let circle = null;
let width = 0;
let height = 0;

function draw(context, state, theme) {
  if (state.width !== width || state.height !== height) {
    width = state.width;
    height = state.height;
    grid = new Grid(width, height, CELL);
    circle = new Circ(38, width * 0.5, height * 0.5).setGrid(grid);
  }
  if (!grid) return;

  const x = state.pointer ? state.pointer.x : width * 0.5 + Math.cos(state.time * 0.7) * width * 0.25;
  const y = state.pointer ? state.pointer.y : height * 0.5 + Math.sin(state.time) * height * 0.22;
  circle.setPosition(x, y);

  const columns = grid.len.x;
  context.fillStyle = theme.dark ? 'rgba(91, 140, 255, 0.28)' : 'rgba(91, 140, 255, 0.18)';
  for (const cell of circle.gridCells) {
    if (cell === Grid.emptyCell) continue;
    const column = cell % columns;
    const row = Math.floor(cell / columns);
    context.fillRect(column * CELL, row * CELL, CELL, CELL);
  }

  grid.draw(context, '', theme.grid, 1);
  circle.draw(context, '', theme.accent, 2);

  const occupied = circle.gridCells.filter(cell => cell !== Grid.emptyCell).length;
  label(context, `${occupied} occupied cells of ${grid.len.x * grid.len.y}`, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    The circle opts into occupancy with <code>setGrid()</code>, so moving it refreshes
    <code>gridCells</code> with every lattice cell its bounding box covers. Cells outside the grid
    are dropped rather than wrapped.
  </DemoFrame>
</template>
