<template>
  <div class="shop-page">
    <h2 class="page-title">🛒 Магазин</h2>
    <p class="subtitle">Купуй зброю та боєприпаси для вдалого полювання!</p>

    <div class="shop-section">
      <h3>🔫 Зброя</h3>
      <div class="items-grid">
        <div class="item-card" v-for="weapon in weaponsForSale" :key="weapon.id">
          <h4>{{ weapon.name }}</h4>
          <p>Пошкодження: {{ weapon.damage }}</p>
          <p>Ціна: {{ weapon.price }}₴</p>
          <button @click="buyItem(weapon)">Купити</button>
        </div>
      </div>
    </div>

    <div class="shop-section">
      <h3>💥 Боєприпаси</h3>
      <div class="items-grid">
        <div class="item-card" v-for="ammo in ammoTypes" :key="ammo.weaponId">
          <h4>{{ ammo.label }}</h4>
          <p>Ціна: {{ ammo.price }}₴</p>
          <button @click="buyAmmo(ammo.weaponId, ammo.amount, ammo.price)">Купити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopPage',
  data() {
    return {
      weaponsForSale: [
        { id: 1, name: 'Рушниця 12 калібру', damage: 2, price: 100 },
        { id: 2, name: 'Снайперська гвинтівка', damage: 4, price: 250 },
      ],
      ammoTypes: [
        { weaponId: 1, label: 'Патрони до рушниці (10 шт)', amount: 10, price: 10 },
        { weaponId: 2, label: 'Патрони до снайперки (5 шт)', amount: 5, price: 20 },
      ],
    };
  },
  methods: {
    buyItem(item) {
      let coins = Number(localStorage.getItem('coins') || 0);
      if (coins >= item.price) {
        coins -= item.price;
        localStorage.setItem('coins', coins);
        const weapons = JSON.parse(localStorage.getItem('weapons') || '[]');
        weapons.push(item);
        localStorage.setItem('weapons', JSON.stringify(weapons));
        window.dispatchEvent(new Event('coins-updated'));
        alert(`Куплено: ${item.name}`);
      } else {
        alert('Недостатньо коштів!');
      }
    },
    buyAmmo(weaponId, amount, price) {
      let coins = Number(localStorage.getItem('coins') || 0);
      if (coins >= price) {
        coins -= price;
        localStorage.setItem('coins', coins);

        let allAmmo = localStorage.getItem('ammo');
        try {
          allAmmo = JSON.parse(allAmmo);
          if (typeof allAmmo !== 'object' || allAmmo === null || Array.isArray(allAmmo)) {
            allAmmo = {};
          }
        } catch (e) {
          allAmmo = {};
        }

        if (!allAmmo[weaponId]) allAmmo[weaponId] = 0;
        allAmmo[weaponId] += amount;

        localStorage.setItem('ammo', JSON.stringify(allAmmo));
        window.dispatchEvent(new Event('coins-updated'));
        alert(`Куплено ${amount} патронів.`);
      } else {
        alert('Недостатньо коштів!');
      }
    },
  },
};
</script>

<style scoped>
.shop-page {
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
  color: #555;
}

.shop-section {
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 220px;
}

.item-card h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.item-card p {
  margin: 4px 0;
}

.item-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.item-card button:hover {
  background-color: #1e8449;
}
</style>
