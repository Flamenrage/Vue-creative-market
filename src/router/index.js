import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

import Shop from '@/views/Shop'
import Product from '@/views/Product'
import Cart from '@/views/Cart'
import Auth from '@/views/Auth'
import Cabinet from "@/views/Cabinet";

const routes = [{
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {
        layout: 'main',
        shop: true
    }
}, {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    meta: {
        layout: 'main'
    }
}, {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
        layout: 'main'
    }
}, {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
        layout: 'auth',
        sign: true
    }
}, {
    path: '/cabinet',
    name: 'Cabinet',
    component: Cabinet,
    meta: {
        layout: 'main'
    }
}, {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */'@/views/Admin.vue'),
    meta: {
        layout: 'admin',
        admin: true
    },
    children: [{
        path: '',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Home.vue')
    }, {
        path: 'products',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Products.vue')
    }, {
        path: 'products/:id',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Product.vue')
    }, {
        path: 'categories',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Categories.vue')
    }, {
        path: 'categories/:id',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Category.vue')
    }, {
        path: 'users',
        component: () => import(/* webpackChunkName: "admin" */'../views/admin/Users.vue')
    }, {
        path: 'users/:id',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/User.vue')
    }, {
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Orders.vue'),
        path: 'orders'
    }]
}, {
    path: '/:notFound(.*)',
    name: '404',
    redirect: '/'
}]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth
    const signPage = to.meta.sign
    const adminRoot = to.meta.admin
    if (requireAuth && store.getters['auth/isAuthorized']) {
        next() //если требуется авторизация и пользователь авторизован => разрешаем переход на след страницы
    } else if (requireAuth && !store.getters['auth/isAuthorized']) {
        next()
    } else if (store.getters['auth/isAuthorized'] && signPage) {
        next({path: '/'})
    } else if (!store.getters['auth/isAdmin'] && adminRoot) {
        next('/')
    } else if (store.getters['auth/isAdmin'] && to.meta.shop) {
        next('/admin')
    } else {
        next()
    }
})

export default router
