import { createRouter, createWebHistory } from 'vue-router'
import PersonalBook from '../views/PersonalFunc/PersonalBook.vue'
import PersonalSetting from "@/views/PersonalFunc/PersonalSetting.vue"
import WordDetail from '@/components/WordDetail.vue'
import PersonalInfo from '../views/PersonalFunc/PersonalInfo.vue'
import Home from "@/views/Home.vue";
import SavedWords from "../views/PersonalFunc/SavedWords.vue";
import StartWordHome from "@/views/StartWordHome.vue";
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReciteView from '../views/ReciteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    
    {
      path: '/recite',
      component: ReciteView
    },
    {
      path: '/login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/StartWordHome',
      name: 'StartWordHome',
      component: StartWordHome
    },
    {
      path: '/PersonalBook',
      name: 'PersonalBook',
      component: PersonalBook
    },
    {
      path: "/PersonalSetting",
      name: "PersonalSetting",
      component: PersonalSetting,
    },
    {
      path: "/SavedWords",
      name: "SavedWords",
      component: SavedWords,
    },
    {
      path: "/WordDetail",
      name: "WordDetail",
      component: WordDetail,
    },
    { path: "/PersonalInfo", 
      name: "PersonalInfo", 
      component: PersonalInfo
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userInfo");
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      ElMessage({
          message: '您必须先登录才能访问此页面',
          type: 'error'
      });
      // 如果用户未登录且访问需要登录才能访问的页面，则重定向到登录页面
      next('/login');
  } else {
      next();
  }
});

export default router
