<template>
  <div class="hunt-container">
    <canvas ref="canvas" class="hunt-canvas" @click="shoot" />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'HuntPage',
  setup() {
    const canvas = ref(null);
    let ctx = null;
    let animationFrameId = null;

    const birds = [];

    // Unicode пташки
    const birdEmojis = ['🐦', '🥙', '🦆'];

    class Bird {
      constructor(emoji) {
        this.emoji = emoji;
        this.size = 40 + Math.random() * 20;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (window.innerHeight * 0.6);
        this.speed = 1 + Math.random() * 2;
        this.alive = true;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        if (!this.alive) return;
        this.x += this.speed * this.direction;
        if (this.x > window.innerWidth + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = window.innerWidth + this.size;
      }

      draw(ctx) {
        if (!this.alive) return;
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.emoji, this.x, this.y);
      }

      isHit(mx, my) {
        return (
          mx >= this.x &&
          mx <= this.x + this.size &&
          my >= this.y - this.size &&
          my <= this.y
        );
      }
    }

    function spawnBirds() {
      birds.length = 0;
      for (let i = 0; i < 10; i++) {
        const emoji = birdEmojis[i % birdEmojis.length];
        birds.push(new Bird(emoji));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      birds.forEach((bird) => {
        bird.update();
        bird.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    function shoot(event) {
      const rect = canvas.value.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;

      birds.forEach((bird) => {
        if (bird.alive && bird.isHit(mx, my)) {
          bird.alive = false;

          const pelts = JSON.parse(localStorage.getItem('pelts') || '[]');

          if (bird.emoji === '🐦') {
            pelts.push({ type: 'Голуб', quality: 'Висока', price: 25 });
          } else if (bird.emoji === '🦆') {
            pelts.push({ type: 'Качка', quality: 'Середня', price: 15 });
          } else {
            pelts.push({ type: 'Лебідь', quality: 'Висока', price: 30 });
          }

          localStorage.setItem('pelts', JSON.stringify(pelts));
        }
      });
    }

    onMounted(() => {
      canvas.value.width = window.innerWidth;
      canvas.value.height = window.innerHeight * 0.8;
      ctx = canvas.value.getContext('2d');

      spawnBirds();
      animate();

      window.addEventListener('resize', () => {
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight * 0.8;
      });
    });

    onBeforeUnmount(() => {
      cancelAnimationFrame(animationFrameId);
    });

    return {
      canvas,
      shoot,
    };
  },
};
</script>

<style scoped>
.hunt-container {
  position: relative;
  width: 100%;
  height: 80vh;
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1920&q=80') center/cover no-repeat;
  overflow: hidden;
  user-select: none;
  cursor: crosshair;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(30, 58, 138, 0.7);
}

.hunt-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
