<template>
  <div id="app">
    <header class="header">
      <h1>🦅 Bird Hunter Tycoon</h1>
      <nav class="nav">
        <router-link to="/">🏠 Головна</router-link>
        <router-link to="/hunt">🎯 Полювання</router-link>
        <router-link to="/shop">🛒 Магазин</router-link>
        <router-link to="/inventory">🎒 Інвентар</router-link>
        <router-link to="/market">💰 Ринок</router-link>
      </nav>
      <div class="wallet">💵 {{ coins }} монет</div>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      coins: 0,
    };
  },
  mounted() {
    this.coins = Number(localStorage.getItem('coins') || 0);
    window.addEventListener('coins-updated', this.updateCoins);
  },
  beforeUnmount() {
    window.removeEventListener('coins-updated', this.updateCoins);
  },
  methods: {
    updateCoins() {
      this.coins = Number(localStorage.getItem('coins') || 0);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f3f4f6;
  color: #333;
  min-height: 100vh;
}
.header {
  background: #1e3a8a;
  color: white;
  padding: 15px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.nav {
  display: flex;
  gap: 10px;
}
.nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 12px;
  background: #2563eb;
  border-radius: 5px;
}
.nav a:hover {
  background: #3b82f6;
}
.wallet {
  background: #10b981;
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
}
</style>
