import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import ComicDetailView from './components/ComicDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/comic/:id',
    name: 'ComicDetail',
    component: ComicDetailView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
