import { createWebHistory, createRouter } from 'vue-router'
import GalerijeView from './views/GalerijeView.vue'
import EventsView from './views/EventsView.vue'
import DjelaView from './views/DjelaView.vue'


const routes = [
  { path: '/', component: EventsView , meta: { requiresAuth: true } },
  { path: '/galerije', component: GalerijeView , meta: { requiresAuth: true } },
  { path: '/djela', component: DjelaView , meta: { requiresAuth: true } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
