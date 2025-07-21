<template>
  <div class="inventory-page">
    <h2 class="page-title">🎒 Інвентар</h2>
    <p class="subtitle">Переглянь свою зброю та здобич, активуй спорядження.</p>

    <div class="inventory-section">
      <h3>🔫 Зброя</h3>
      <div class="items-grid">
  
        <div
          class="item-card"
          v-for="weapon in filteredWeapons"
          :key="weapon.id"
        >
          <h4>{{ weapon.name }}</h4>
          <p>Пошкодження: {{ weapon.damage }}</p>
          <button @click="equipWeapon(weapon.id)">
            {{ activeWeaponId === weapon.id ? '✅ Активовано' : 'Взяти' }}
          </button>
        </div>
      </div>
    </div>

    <div class="inventory-section">
      <h3>🪶 Здобич</h3>
      <div class="items-grid">
        <div class="item-card" v-for="(bird, i) in birds" :key="i">
          <h4>{{ bird.type }}</h4>
          <p>Якість: {{ bird.quality }}</p>
          <button @click="skinBird(i)">Здерти шкуру</button>
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
      weapons: [],
      birds: [],
      activeWeaponId: Number(localStorage.getItem('activeWeaponId') || -1),
    };
  },
  computed: {
    filteredWeapons() {
      // Повертаємо зброю без рогатки
      return this.weapons.filter(w => w.name !== 'Рогатка');
    },
  },
  methods: {
    loadData() {
      this.weapons = JSON.parse(localStorage.getItem('weapons') || '[]');
      this.birds = JSON.parse(localStorage.getItem('birds') || '[]');
    },
    equipWeapon(id) {
      this.activeWeaponId = id;
      localStorage.setItem('activeWeaponId', id);
    },
    skinBird(index) {
      const bird = this.birds[index];
      const pelts = JSON.parse(localStorage.getItem('pelts') || '[]');
      const quality = bird.quality;
      let price = 10;
      if (quality === 'Висока') price = 25;
      else if (quality === 'Середня') price = 15;
      else price = 5;

      pelts.push({ type: bird.type, quality, price });

      this.birds.splice(index, 1);
      localStorage.setItem('birds', JSON.stringify(this.birds));
      localStorage.setItem('pelts', JSON.stringify(pelts));
      alert(`Знято шкуру з ${bird.type}`);
    },
  },
  mounted() {
    this.loadData();
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
  font-size: 2rem;
  text-align: center;
}
.subtitle {
  text-align: center;
  margin-bottom: 30px;
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
  background-color: #f0f4f8;
  padding: 15px;
  border-radius: 10px;
  flex: 1 1 220px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.item-card button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #10b981;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.item-card button:hover {
  background-color: #0e9e6e;
}
</style>
