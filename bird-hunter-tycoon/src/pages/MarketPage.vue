<template>
  <div class="market-page">
    <h2 class="page-title">💰 Ринок</h2>
    <p class="subtitle">Продай шкури та зароби монети.</p>

    <div v-if="pelts.length" class="pelts-grid">
      <div class="pelt-card" v-for="(pelt, i) in pelts" :key="i">
        <h4>{{ pelt.type }}</h4>
        <p>Якість: {{ pelt.quality }}</p>
        <p>Ціна: {{ pelt.price }}₴</p>
        <button @click="sellPelt(i)">Продати</button>
      </div>
    </div>
    <div v-else class="no-pelts">
      У тебе немає шкур для продажу.
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketPage',
  data() {
    return {
      pelts: JSON.parse(localStorage.getItem('pelts') || '[]'),
    };
  },
  methods: {
    sellPelt(index) {
      const pelt = this.pelts[index];
      let coins = Number(localStorage.getItem('coins') || '0');
      coins += pelt.price;
      localStorage.setItem('coins', coins);
      this.pelts.splice(index, 1);
      localStorage.setItem('pelts', JSON.stringify(this.pelts));
      window.dispatchEvent(new Event('coins-updated'));
      alert(`Продано ${pelt.type} за ${pelt.price}₴`);
    },
  },
};
</script>

<style scoped>
.market-page {
  padding: 30px;
  max-width: 1000px;
  margin: auto;
}
.page-title {
  font-size: 2rem;
  text-align: center;
}
.subtitle {
  text-align: center;
  margin-bottom: 20px;
}
.pelts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.pelt-card {
  flex: 1 1 220px;
  background-color: #fff3cd;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #f0ad4e;
}
.pelt-card button {
  margin-top: 10px;
  background-color: #f39c12;
  color: white;
  padding: 6px 14px;
  border: none;
  border-radius: 5px;
}
.pelt-card button:hover {
  background-color: #d68910;
}
.no-pelts {
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  margin-top: 50px;
}
</style>
