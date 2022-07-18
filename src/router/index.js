import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import KnockOutsView from '../views/KnockOutsView.vue'
import KnockOutView from '../views/KnockOutView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Home
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // About page
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      // List of Knock-Outs
      path: '/knockouts',
      name: 'knockouts',
      component: KnockOutsView
    },
    {
      // Detail of Knock-Out
      path: '/knockout/:id',
      name: 'single-knockout',
      props: true,
      component: KnockOutView,
    },
    {
      // List of Knock-Outs
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router
