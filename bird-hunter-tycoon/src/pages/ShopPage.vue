<template>
  <div class="shop-page">
    <h2 class="page-title">🛒 Магазин</h2>
    <p class="subtitle">Купуй зброю, ножі та боєприпаси для полювання!</p>

    <div class="shop-section">
      <h3>🔫 Зброя</h3>
      <div class="items-grid">
        <div class="item-card" v-for="weapon in weaponsForSale" :key="weapon.id">
          <h4>{{ weapon.name }}</h4>
          <p>Пошкодження: {{ weapon.damage }}</p>
          <p>Ціна: {{ weapon.price }}₴</p>
          <button @click="buyItem(weapon, 'weapons')">Купити</button>
        </div>
      </div>
    </div>

    <div class="shop-section">
      <h3>🔪 Ножі</h3>
      <div class="items-grid">
        <div class="item-card" v-for="knife in knivesForSale" :key="knife.id">
          <h4>{{ knife.name }}</h4>
          <p>Для: {{ knife.suitableFor }}</p>
          <p>Ціна: {{ knife.price }}₴</p>
          <button @click="buyItem(knife, 'knives')">Купити</button>
        </div>
      </div>
    </div>

    <div class="shop-section">
      <h3>💥 Патрони</h3>
      <div class="items-grid">
        <div class="item-card">
          <h4>Патрони (10 шт)</h4>
          <p>Ціна: 10₴</p>
          <button @click="buyAmmo">Купити</button>
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
      knivesForSale: [
        { id: 1, name: 'Мисливський ніж', suitableFor: 'великі птахи', price: 50 },
        { id: 2, name: 'Філейний ніж', suitableFor: 'малі птахи', price: 30 },
      ],
    };
  },
  methods: {
    buyItem(item, type) {
      const coins = Number(localStorage.getItem('coins') || 0);
      if (coins < item.price) return alert('Недостатньо коштів!');
      localStorage.setItem('coins', coins - item.price);

      const list = JSON.parse(localStorage.getItem(type) || '[]');
      list.push(item);
      localStorage.setItem(type, JSON.stringify(list));

      window.dispatchEvent(new Event('coins-updated'));
      alert(`Куплено: ${item.name} за ${item.price}₴`);
    },
    buyAmmo() {
      const coins = Number(localStorage.getItem('coins') || 0);
      if (coins < 10) return alert('Недостатньо коштів!');
      localStorage.setItem('coins', coins - 10);

      let ammo = Number(localStorage.getItem('ammo') || 0);
      ammo += 10;
      localStorage.setItem('ammo', ammo);

      window.dispatchEvent(new Event('coins-updated'));
      alert('Куплено 10 патронів за 10₴');
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