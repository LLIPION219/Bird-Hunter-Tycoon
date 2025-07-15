<template>
  <div class="login-page">
    <div class="card">
      <h2>🔐 Вхід</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <button type="submit">Увійти</button>
        <p class="register-redirect">
          Немає акаунту?
          <router-link to="/register">Зареєструватися</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = () => {
      const savedUser = JSON.parse(localStorage.getItem('user'));

      if (
        savedUser &&
        savedUser.email === email.value &&
        savedUser.password === password.value
      ) {
        router.push('/');
      } else {
        alert('Невірний email або пароль');
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #facc15, #b45309);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 20px;
  color: #b45309;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: #b45309;
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d97706;
}

.register-redirect {
  margin-top: 15px;
}
</style>
