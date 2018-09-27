import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import welcome from '@/components/welcome'
import user from '@/components/user'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      redirect: 'welcome',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/welcome',
          name: '欢迎回来',
          meta: {
            requireAuth: true
          },
          component: welcome
        },
        {
          path: '/user',
          name: '用户管理',
          meta: {
            requireAuth: true
          },
          component: user
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('username')) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router
