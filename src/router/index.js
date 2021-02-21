import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Shop.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: {
      layout: 'auth',
      auth: false
    },
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "product" */ '../views/Product')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  console.log(requireAuth)
  console.log(store.getters['auth/isAuthorized'])
  if(requireAuth && store.getters['auth/isAuthorized']){
    next() //если требуется авторизация и пользователь авторизован => разрешаем переход на след страницы
  }
  else if (requireAuth && !store.getters['auth/isAuthorized']) {
    next({ path: '/auth' })
  }
  else if(store.getters['auth/isAuthorized'] && !requireAuth) {
    next({ path: '/' })
  }
  else {
    next()
  }
})

export default router
