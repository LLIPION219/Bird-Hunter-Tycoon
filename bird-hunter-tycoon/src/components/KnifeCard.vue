<template>
  <div class="knife-card">
    <h4>{{ knife.name }}</h4>
    <p>Підходить для: {{ knife.suitableFor }}</p>
    <p>Ціна: {{ knife.price }}₴</p>
    <button @click="$emit('buy', knife)">Купити</button>
  </div>
</template>

<script>
export default {
  name: 'KnifeCard',
  props: {
    knife: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.knife-card {
  background-color: #e8f5e9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 220px;
}

.knife-card h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.knife-card p {
  margin: 4px 0;
  color: #444;
}

.knife-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.knife-card button:hover {
  background-color: #1b5e20;
}
</style>
