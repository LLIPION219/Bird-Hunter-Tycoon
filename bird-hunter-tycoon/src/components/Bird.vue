<template>
  <div
    class="bird"
    :style="birdStyle"
    @click="$emit('shoot', bird)"
  >
    🐦
  </div>
</template>

<script>
export default {
  name: 'Bird',
  props: {
    bird: {
      type: Object,
      required: true,
    },
  },
  computed: {
    birdStyle() {
      return {
        position: 'absolute',
        left: this.bird.x + 'px',
        top: this.bird.y + 'px',
        cursor: 'crosshair',
        fontSize: '1.5rem',
        transition: 'transform 0.2s',
      };
    },
  },
};
</script>

<style scoped>
.bird:hover {
  transform: scale(1.3);
}
</style>
