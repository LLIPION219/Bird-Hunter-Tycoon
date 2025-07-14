<template>
  <div class="weapon-card">
    <h4>{{ weapon.name }}</h4>
    <p>Пошкодження: {{ weapon.damage }}</p>
    <p>Ціна: {{ weapon.price }}₴</p>
    <button @click="$emit('buy', weapon)">Купити</button>
  </div>
</template>

<script>
export default {
  name: 'WeaponCard',
  props: {
    weapon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.weapon-card {
  background-color: #f0f4f8;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 220px;
}

.weapon-card h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.weapon-card p {
  margin: 4px 0;
}

.weapon-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.weapon-card button:hover {
  background-color: #1e8449;
}
</style>
