import { createRouter, createWebHistory } from 'vue-router'
import PersonalBook from '../views/PersonalFunc/PersonalBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/PersonalBook',
      name: 'PersonalBook',
      component: PersonalBook
    },
    {
      path: '/PersonalSetting',
      name: 'PersonalSetting',
      component: PersonalSetting
    },
  ]
})

export default router
