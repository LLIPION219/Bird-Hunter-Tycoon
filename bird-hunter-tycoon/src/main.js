// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Якщо у тебе є глобальні стилі — розкоментуй рядок нижче і створи style.css в папці src
// import './style.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
