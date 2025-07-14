<template>
  <div id="app" class="app-container">
    <header class="main-header">
      <h1 class="game-title">🦅 Bird Hunter Tycoon</h1>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">Головна</router-link>
        <router-link to="/hunt" class="nav-link">Полювання</router-link>
        <router-link to="/inventory" class="nav-link">Інвентар</router-link>
        <router-link to="/shop" class="nav-link">Магазин</router-link>
        <router-link to="/market" class="nav-link">Ринок</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f4f6;
  color: #333;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-header {
  background-color: #1e3a8a;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.game-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #3b82f6;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #2563eb;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}
</style>
