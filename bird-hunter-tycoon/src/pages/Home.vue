<template>
  <div class="home">
    <h1 class="title">🐦 Bird Hunter Tycoon</h1>
    <p class="subtitle">Ласкаво просимо до мисливської пригоди!</p>

    <div class="nav-buttons">
      <router-link to="/hunt" class="btn">🎯 Полювання</router-link>
      <router-link to="/inventory" class="btn">🎒 Інвентар</router-link>
      <router-link to="/shop" class="btn">🛒 Магазин</router-link>
      <router-link to="/market" class="btn">💰 Ринок</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px 20px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 30px;
}

.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  margin: 0 auto;
}

.btn {
  display: block;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
</style>