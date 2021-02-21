import { createStore, createLogger } from 'vuex'

import auth from './modules/auth.module'
import products from './modules/products.module'
import cart from './modules/cart.module'

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
    cart
  },
  plugins
})


export default store
