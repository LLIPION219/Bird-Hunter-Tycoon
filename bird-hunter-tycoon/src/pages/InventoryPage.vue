<template>
  <div class="inventory-page">
    <h2 class="page-title">🎒 Інвентар</h2>
    <p class="subtitle">Озброюйся та вирушай на полювання!</p>

    <div class="inventory-section">
      <h3>🔫 Зброя</h3>
      <div class="items-grid">
        <div class="item-card" v-for="weapon in weapons" :key="weapon.id">
          <h4>{{ weapon.name }}</h4>
          <p>Пошкодження: {{ weapon.damage }}</p>
          <p v-if="weapon.infiniteAmmo">♾️ Безкінечні патрони</p>
          <p v-else>Патрони: {{ ammo[weapon.ammoType] || 0 }}</p>
          <button @click="equipWeapon(weapon.id)">
            {{ activeWeaponId === weapon.id ? '✅ Активовано' : 'Взяти' }}
          </button>
          <button v-if="weapon.price > 0" @click="sellWeapon(weapon.id)">💰 Продати</button>
        </div>
      </div>
    </div>

    <div class="inventory-section">
      <h3>🎯 Патрони</h3>
      <div class="items-grid">
        <div class="item-card" v-for="(amount, type) in ammo" :key="type">
          <h4>{{ type }}</h4>
          <p>Кількість: {{ amount }}</p>
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
      ammo: {},
      activeWeaponId: null,
      defaultWeapon: {
        id: 0,
        name: 'Рогатка',
        damage: 1,
        infiniteAmmo: true,
        price: 0,
        ammoType: null,
      },
    };
  },
  methods: {
    loadData() {
      this.weapons = JSON.parse(localStorage.getItem('weapons') || '[]');
      this.birds = JSON.parse(localStorage.getItem('birds') || '[]');
      this.ammo = JSON.parse(localStorage.getItem('ammo') || '{}');
      this.activeWeaponId = Number(localStorage.getItem('activeWeaponId') || 0);

      if (!this.weapons.some(w => w.id === this.defaultWeapon.id)) {
        this.weapons.unshift(this.defaultWeapon);
        localStorage.setItem('weapons', JSON.stringify(this.weapons));
      }
    },
    equipWeapon(id) {
      this.activeWeaponId = id;
      localStorage.setItem('activeWeaponId', id);
    },
    sellWeapon(id) {
      const weapon = this.weapons.find(w => w.id === id);
      if (!weapon || weapon.price <= 0) return;

      const money = Number(localStorage.getItem('money') || '0');
      const updatedMoney = money + Math.floor(weapon.price / 2);
      localStorage.setItem('money', updatedMoney);

      this.weapons = this.weapons.filter(w => w.id !== id);
      if (this.activeWeaponId === id) {
        this.activeWeaponId = 0;
        localStorage.setItem('activeWeaponId', 0);
      }

      localStorage.setItem('weapons', JSON.stringify(this.weapons));
      alert(`Продано ${weapon.name} за ${Math.floor(weapon.price / 2)} монет`);
    },
    skinBird(index) {
      const bird = this.birds[index];
      const pelts = JSON.parse(localStorage.getItem('pelts') || '[]');
      const quality = bird.quality;
      let price = 10;
      if (quality === 'Висока') price = 25;
      else if (quality === 'Середня') price = 15;
      else price = 5;

      pelts.push({
        type: bird.type,
        quality,
        price,
      });

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
