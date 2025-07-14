<template>
  <div class="inventory-page">
    <h2 class="page-title">🎒 Інвентар</h2>
    <p class="subtitle">Тут ти можеш переглянути свою зброю, ножі та здобуті шкури.</p>

    <div class="inventory-section">
      <h3>🔫 Зброя</h3>
      <div class="items-grid">
        <div class="item-card" v-for="weapon in weapons" :key="weapon.id">
          <h4>{{ weapon.name }}</h4>
          <p>Пошкодження: {{ weapon.damage }}</p>
        </div>
      </div>
    </div>

    <div class="inventory-section">
      <h3>🔪 Ножі</h3>
      <div class="items-grid">
        <div class="item-card" v-for="knife in knives" :key="knife.id">
          <h4>{{ knife.name }}</h4>
          <p>Підходить для: {{ knife.suitableFor }}</p>
        </div>
      </div>
    </div>

    <div class="inventory-section">
      <h3>🪶 Шкури</h3>
      <div class="items-grid">
        <div class="item-card" v-for="pelt in pelts" :key="pelt.id">
          <h4>{{ pelt.type }}</h4>
          <p>Якість: {{ pelt.quality }}</p>
          <p>Ціна: {{ pelt.price }}₴</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryPage',
  data() {
    return {
      weapons: [
        { id: 1, name: 'Рушниця 12 калібру', damage: 2 },
        { id: 2, name: 'Снайперська гвинтівка', damage: 4 },
      ],
      knives: [
        { id: 1, name: 'Мисливський ніж', suitableFor: 'великі птахи' },
        { id: 2, name: 'Філейний ніж', suitableFor: 'малі птахи' },
      ],
      pelts: [
        { id: 1, type: 'Голуб', quality: 'Висока', price: 25 },
        { id: 2, type: 'Качка', quality: 'Середня', price: 15 },
      ],
    };
  },
};
</script>

<style scoped>
.inventory-page {
  padding: 30px;
  max-width: 1000px;
  margin: auto;
  color: #2c3e50;
}

.page-title {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  margin-bottom: 30px;
  color: #555;
}

.inventory-section {
  margin-bottom: 40px;
}

.items-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item-card {
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  flex: 1 1 200px;
}

.item-card h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.item-card p {
  margin: 4px 0;
  color: #444;
}
</style>
