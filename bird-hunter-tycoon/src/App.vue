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
      <div class="info-box">
        💵 {{ coins }}₴ | 🔫 {{ ammoDisplay }}
      </div>
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
      ammo: {},
    };
  },
  computed: {
    ammoDisplay() {
      return Object.entries(this.ammo)
        .map(([type, amount]) => `${amount}x ${type}`)
        .join(', ');
    },
  },
  mounted() {
    this.updateData();
    window.addEventListener('storage', this.updateData);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateData);
  },
  methods: {
    updateData() {
      this.coins = Number(localStorage.getItem('coins') || 0);
      this.ammo = JSON.parse(localStorage.getItem('ammo') || '{}');
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
.info-box {
  background: #10b981;
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
}
</style>
