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
        <div
          class="item-card"
          v-for="(pelt, index) in pelts"
          :key="index"
        >
          <h4>{{ pelt.type }}</h4>
          <p>Якість: {{ pelt.quality }}</p>
          <p>Ціна: {{ pelt.price }}₴</p>
          <button @click="sellPelt(index)">💰 Зняти шкуру і продати</button>
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
        { id: 0, name: 'Саморобний пістолет', damage: 1 },
        { id: 1, name: 'Рушниця 12 калібру', damage: 2 },
        { id: 2, name: 'Снайперська гвинтівка', damage: 4 },
      ],
      knives: [
        { id: 0, name: 'Кухонний ніж', suitableFor: 'малі птахи' },
        { id: 1, name: 'Мисливський ніж', suitableFor: 'великі птахи' },
        { id: 2, name: 'Філейний ніж', suitableFor: 'малі птахи' },
      ],
      pelts: [],
    };
  },
  mounted() {
    const storedPelts = JSON.parse(localStorage.getItem('pelts') || '[]');
    this.pelts = storedPelts;
  },
  methods: {
    sellPelt(index) {
      const pelt = this.pelts[index];
      if (pelt) {
        // Додати гроші
        let coins = Number(localStorage.getItem('coins') || '0');
        coins += pelt.price;
        localStorage.setItem('coins', coins);

        // Видалити шкуру з інвентаря
        this.pelts.splice(index, 1);
        localStorage.setItem('pelts', JSON.stringify(this.pelts));

        alert(`Продано: ${pelt.type} за ${pelt.price}₴`);
      }
    },
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
  position: relative;
}

.item-card h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.item-card p {
  margin: 4px 0;
  color: #444;
}

.item-card button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.item-card button:hover {
  background-color: #27ae60;
}
</style>
