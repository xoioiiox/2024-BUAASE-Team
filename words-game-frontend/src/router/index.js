import { createRouter, createWebHistory } from 'vue-router'
import PersonalBook from '../views/PersonalFunc/PersonalBook.vue'
import PersonalSetting from '../views/PersonalFunc/PersonalSetting.vue'
import PersonalInfo from '../views/PersonalFunc/PersonalInfo.vue'

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
    {
      path: '/PersonalInfo',
      name: 'PersonalInfo',
      component: PersonalInfo
    },
  ]
})

export default router
