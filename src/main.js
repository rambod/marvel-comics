import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import global SCSS files
// import '@/assets/scss/mixins.scss';
// import '@/assets/scss/variables.scss';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
