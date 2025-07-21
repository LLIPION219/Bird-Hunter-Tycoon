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
        💵 {{ coins }}₴ 
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
      const ammoEntries = Object.entries(this.ammo);
      if (ammoEntries.length === 0) return 'Немає патронів';
      return ammoEntries
        .map(([type, amount]) => `${amount}x ${type}`)
        .join(', ');
    },
  },
  mounted() {
    this.updateData();
    window.addEventListener('storage', this.updateData);
    setInterval(this.updateData, 1000); 
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
  min-height: 100vh;
  color: #333;
  background: linear-gradient(135deg, #cfe9f1, #a0d2eb, #c5e3bf);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
}


@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.header {
  background: rgba(30, 58, 138, 0.9);
  color: rgb(231, 241, 255);
  padding: 15px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #2563eb;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  transition: background 0.3s, transform 0.2s;
}
.nav a:hover {
  background: #3b82f6;
  transform: scale(1.05);
}

.info-box {
  background: #10b981;
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
</style>
