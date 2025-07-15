<template>
  <div class="register-page">
    <div class="card">
      <h2>📝 Реєстрація</h2>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <button type="submit">Зареєструватися</button>
        <p class="login-redirect">
          Вже маєш акаунт?
          <router-link to="/login">Увійти</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const register = () => {
      localStorage.setItem('user', JSON.stringify({ email: email.value, password: password.value }));
      router.push('/');
    };

    return {
      email,
      password,
      register,
    };
  },
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #93c5fd, #1e3a8a);
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
  color: #1e3a8a;
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
  background-color: #1e3a8a;
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
  background-color: #3b82f6;
}

.login-redirect {
  margin-top: 15px;
}
</style>
