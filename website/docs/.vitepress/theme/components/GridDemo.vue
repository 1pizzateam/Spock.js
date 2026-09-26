<script setup>
import { Circ, Grid, Vec2 } from '@1pizzateam/spock';
import DemoFrame from './DemoFrame.vue';
import { label } from '../canvas.js';

const CELL = 32;
let grid = null;
let circle = null;
let width = 0;
let height = 0;
const circlePos = new Vec2();

function draw(context, state, theme) {
  if (state.width !== width || state.height !== height) {
    width = state.width;
    height = state.height;
    grid = new Grid(new Vec2(width, height), CELL);
    circle = new Circ(38, new Vec2(width * 0.5, height * 0.5)).setGrid(grid);
  }
  if (!grid) return;

  if (state.pointer)
    circlePos.copy(state.pointer);
  else
    circlePos.setScalar(
      width * 0.5 + Math.cos(state.time * 0.7) * width * 0.25,
      height * 0.5 + Math.sin(state.time) * height * 0.22
    );
  circle.setPosition(circlePos);

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
  const centerCell = grid.getCell(circle.position);
  label(context, `${occupied} occupied cells of ${grid.totalCells}   center cell: ${centerCell}`, theme.text);
}
</script>

<template>
  <DemoFrame :draw="draw">
    Constructed with vector-first <code>new Grid(size: Vec2, cellSize)</code> and <code>new Circ(radius, position: Vec2)</code>.
    Moving the circle refreshes <code>gridCells</code> with covered lattice cells, and queries cell indices with <code>grid.getCell(point: Vec2)</code>.
  </DemoFrame>
</template>
