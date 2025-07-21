<template>
  <div class="market-page">
    <h2 class="page-title">💰 Ринок</h2>
    <p class="subtitle">Продай шкури, щоб заробити гроші на нову зброю та спорядження.</p>

    <div v-if="pelts.length" class="pelts-grid">
      <div class="pelt-card" v-for="(pelt, index) in pelts" :key="index">
        <h4>{{ pelt.type }}</h4>
        <p>Якість: {{ pelt.quality }}</p>
        <p>Ціна: {{ pelt.price }}₴</p>
        <button @click="sellPelt(index)">Продати</button>
      </div>
      <div class="sell-all">
        <button class="sell-all-btn" @click="sellAll">Продати все</button>
      </div>
    </div>

    <div v-else class="no-pelts">
      <p>У тебе немає шкур для продажу.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketPage',
  data() {
    return {
      pelts: [],
    };
  },
  mounted() {
    this.pelts = JSON.parse(localStorage.getItem('pelts') || '[]');
  },
  methods: {
    sellPelt(index) {
      const pelt = this.pelts[index];
      if (!pelt) return;

      let coins = Number(localStorage.getItem('coins') || 0);
      coins += pelt.price;
      localStorage.setItem('coins', coins);
      window.dispatchEvent(new Event('coins-updated'));

      this.pelts.splice(index, 1);
      localStorage.setItem('pelts', JSON.stringify(this.pelts));
    },
    sellAll() {
      let coins = Number(localStorage.getItem('coins') || 0);
      this.pelts.forEach(p => {
        coins += p.price;
      });
      localStorage.setItem('coins', coins);
      window.dispatchEvent(new Event('coins-updated'));
      this.pelts = [];
      localStorage.removeItem('pelts');
    },
  },
};
</script>

<style scoped>
.market-page {
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

.pelts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.pelt-card {
  background-color: #fdf6e3;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 220px;
}

.pelt-card h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.pelt-card p {
  margin: 4px 0;
  color: #555;
}

.pelt-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pelt-card button:hover {
  background-color: #d68910;
}

.sell-all {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.sell-all-btn {
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.sell-all-btn:hover {
  background-color: #1e8449;
}

.no-pelts {
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  margin-top: 50px;
}
</style>