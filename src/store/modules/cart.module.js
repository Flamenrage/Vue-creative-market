const CART_KEY = process.env.VUE_APP_CART_KEY

export default {
    namespaced: true,
    state() {
        return {
            cart: JSON.parse(localStorage.getItem(CART_KEY)) || []
        }
    },
    getters: {
        getCart(state) {
            return state.cart
        }
    },
    mutations: {
        add(state, payload) {
            const index = state.cart.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.cart.push(payload)
                localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
            }
        },
        update(state, payload) {
            const index = state.cart.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                if (payload.count) {
                    state.cart[index] = payload
                } else {
                    state.cart.splice(index, 1)
                }
            }
            localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
        },
        remove(state, id) {
            const index = state.cart.findIndex(item => item.id === id)

            if (index !== -1) {
                state.cart.splice(index, 1)
                localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
            }
        },
        clear(state) {
            state.cart = []
            localStorage.setItem(CART_KEY, JSON.stringify([]))
        }
    }
}
