<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { startCanvas } from '../canvas.js';
import { drawLogo } from '../logo.js';

const canvas = ref(null);
let stop = null;

onMounted(() => {
  stop = startCanvas(canvas.value, drawLogo);
});

onBeforeUnmount(() => {
  stop?.();
});
</script>

<template>
  <canvas ref="canvas" class="spock-logo" aria-label="Rotating icosahedron drawn with Spock.js"></canvas>
</template>
