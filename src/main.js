import { createApp } from 'vue';
import App from './App.vue';
import router from './router/script';
import store from './store/script';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
