import { createRouter, createWebHashHistory } from "vue-router";
import PersonalBook from "../views/PersonalFunc/PersonalBook.vue";
import PersonalSetting from "../views/PersonalFunc/PersonalSetting.vue";
import WordDetail from "../components/WordDetail.vue";
import PersonalInfo from "../views/PersonalFunc/PersonalInfo.vue";
import Home from "@/views/Home.vue";
import SavedWords from "../views/PersonalFunc/SavedWords.vue";

import StartWordHome from "@/views/StartWordHome.vue";
import PersonalStats from "../views/PersonalFunc/PersonalStats.vue";


import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReciteView from '../views/ReciteView.vue'


import { useUserStore } from '@/stores/userStore.js';

import PunchIn from '../components/PunchIn.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false // 表示需要登录权限
      }
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
      component: StartWordHome,
      meta: { requiresAuth: true }

    },
    {
      path: "/PersonalBook",
      name: "PersonalBook",
      component: PersonalBook,
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
      path: "/Statistics",
      name: "Statistics",
      component: PersonalStats,
    },
    {
      path: "/WordDetail",
      name: "WordDetail",
      component: WordDetail,
    },
    {
      path: "/PersonalInfo",
      name: "PersonalInfo",
      component: PersonalInfo
    },
    {
      path: '/PunchIn',
      name: 'PunchIn',
      component: PunchIn
      //component: () => import('../components/PunchIn.vue') 
    }
  ]
})

/*
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
});*/

// 全局导航守卫
router.beforeEach((to, from, next) => {

  const userStore = useUserStore();

  // 检查用户是否已登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 如果用户未登录且当前路由需要登录权限，则重定向到登录页面
    next('/login');
  } else {
    // 允许导航
    next();
  }

  console.log(userStore.isLoggedIn)
  console.log(to.meta.requiresAuth)
});

export default router
