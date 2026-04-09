import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FormView from '../views/FormView.vue'
import ApiView from '../views/ApiView.vue'
import TodoDetailView from '../views/TodoDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/todo/:id', // :id 是動態參數
    name: 'todo-detail',
    component: TodoDetailView
  },
  {
    path: '/form',
    name: 'form',
    component: FormView
  },
  {
    path: '/api',
    name: 'api',
    component: ApiView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router