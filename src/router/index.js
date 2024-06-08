import { createRouter, createWebHashHistory } from "vue-router";
import PersonalBook from "../views/PersonalFunc/PersonalBook.vue";
import PersonalRank from "../views/PersonalFunc/PersonalRank.vue";
import PersonalAchieve from "../views/PersonalFunc/PersonalAchieve.vue";

import WordDetail from "../views/WordDetail.vue";
import PersonalInfo from "../views/PersonalFunc/PersonalInfo.vue";
import Home from "@/views/Home.vue";
import SavedWords from "../views/PersonalFunc/SavedWords.vue";

import StartWordHome from "@/views/StartWordHome.vue";
import PersonalStats from "../views/PersonalFunc/PersonalStats.vue";

import Guide from "@/views/Guide.vue";


import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReciteView from '../views/ReciteView.vue'
import DrawView from '../views/DrawView.vue'


import { useUserStore } from '@/stores/userStore.js';

import PunchIn from '../components/PunchIn.vue'
import event1 from "@/components/eventCards/event1.vue";
import event2 from "@/components/eventCards/event2.vue";
import event3 from "@/components/eventCards/event3.vue";

import StartGameHome from "@/views/StartGameHome.vue"

import SnakeGame from "@/views/SnakeGame/SnakeGame.vue"

import GameChoose from "@/views/GameChoose.vue";

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
      name: 'recite',
      component: ReciteView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
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
      path: "/PersonalRank",
      name: "PersonalRank",
      component: PersonalRank,
    },
    {
      path: "/PersonalAchieve",
      name: "PersonalAchieve",
      component: PersonalAchieve,
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
    },
    {
      path: '/guide',
      name: 'guide',
      component: Guide
    },
    {
      path: '/event1',
      name: 'evnet1',
      component: event1
    },
    {
      path: '/event2',
      name: 'evnet2',
      component: event2
    },
    {
      path: '/event3',
      name: 'evnet3',
      component: event3
    },
    {
      path: '/StartGameHome',
      name: 'StartGameHome',
      component: StartGameHome
    },
    {
      path: '/DrawView',
      name: 'DrawView',
      component: DrawView
    },
    {
      path: '/SnakeGame',
      name: 'SnakeGame',
      component: SnakeGame
    },
    {
      path: '/GameChoose',
      name: 'GameChoose',
      component: GameChoose,
      meta: { requiresAuth: true }
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
