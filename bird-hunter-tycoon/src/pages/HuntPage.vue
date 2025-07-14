<template>
  <div class="hunt-page">
    <h2 class="page-title">🎯 Полювання</h2>
    <p class="info">Цілься та стріляй по пташках! Заробляй шкури і гроші!</p>

    <div class="hunt-ui">
      <div class="weapon-info">
        <p>Поточна зброя: <strong>{{ currentWeapon.name }}</strong></p>
        <button @click="shoot" class="shoot-btn">🔫 Вистрілити</button>
      </div>

      <canvas ref="canvas" width="800" height="400" class="hunt-canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuntPage',
  data() {
    return {
      currentWeapon: {
        name: 'Мисливська рушниця',
        damage: 1,
      },
      birds: [],
      ctx: null,
      animationFrame: null,
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.spawnBirds();
    this.animate();
  },
  methods: {
    shoot() {
      // При натисканні буде перевірка попадання
      console.log('Постріл!');
    },
    spawnBirds() {
      // Створення випадкових пташок
      for (let i = 0; i < 3; i++) {
        this.birds.push({
          x: Math.random() * 700,
          y: Math.random() * 300,
          size: 40,
          speed: 1 + Math.random() * 2,
        });
      }
    },
    animate() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, 800, 400);
      for (const bird of this.birds) {
        bird.x += bird.speed;
        if (bird.x > 800) bird.x = -bird.size;

        ctx.fillStyle = 'brown';
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      this.animationFrame = requestAnimationFrame(this.animate);
    },
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrame);
  },
};
</script>

<style scoped>
.hunt-page {
  text-align: center;
  padding: 20px;
}

.page-title {
  font-size: 2rem;
  color: #2c3e50;
}

.info {
  margin-bottom: 20px;
  color: #555;
}

.hunt-ui {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.weapon-info {
  font-size: 1.2rem;
  color: #444;
}

.shoot-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.shoot-btn:hover {
  background-color: #c0392b;
}

.hunt-canvas {
  border: 2px solid #ccc;
  background-color: #ecf0f1;
  border-radius: 10px;
}
</style>
