import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './components/HomeView.vue';
import ComicDetail from './components/ComicDetail.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/comic/:id', component: ComicDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
