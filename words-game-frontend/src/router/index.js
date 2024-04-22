import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReciteView from '../views/ReciteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
