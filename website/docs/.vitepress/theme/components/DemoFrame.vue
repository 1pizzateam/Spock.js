<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { startCanvas } from '../canvas.js';

const props = defineProps({
  draw: { type: Function, required: true },
});

const canvas = ref(null);
let stop = null;

onMounted(() => {
  stop = startCanvas(canvas.value, props.draw);
});

onBeforeUnmount(() => {
  stop?.();
});
</script>

<template>
  <figure class="spock-demo">
    <canvas ref="canvas"></canvas>
    <figcaption>
      <slot />
    </figcaption>
  </figure>
</template>
