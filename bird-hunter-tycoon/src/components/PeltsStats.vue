<template>
  <div class="pelts-stats">
    <h3>📊 Статистика</h3>
    <ul>
      <li>Убиті пташки: {{ stats.kills }}</li>
      <li>Продано шкур: {{ stats.sold }}</li>
      <li>Зароблено грошей: {{ stats.earned }}₴</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PeltsStats',
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.pelts-stats {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
  font-size: 1rem;
}

.pelts-stats h3 {
  margin-top: 0;
  color: #2c3e50;
}

.pelts-stats ul {
  padding-left: 20px;
}

.pelts-stats li {
  margin-bottom: 8px;
}
</style>
