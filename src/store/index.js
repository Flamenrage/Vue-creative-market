import { createStore, createLogger } from 'vuex'

import auth from './modules/auth.module'
import products from './modules/products.module'
import cart from './modules/cart.module'
import categories from './modules/categories.module'
import users from './modules/users.module'


const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

const store = createStore({
  state() {
    return {
    }
  },
  getters: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    products,
    categories,
    cart,
    users
  },
  plugins
})


export default store
