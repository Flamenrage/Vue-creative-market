import dbAxios from '@/axios/db'

export default {
    namespaced: true,
    state() {
        return {
            cart: [],
            isLoaded: false
        }
    },
    getters: {
        getCart(state) {
            return state.cart
        },
        isLoaded(state) {
            return state.isLoaded
        }
    },
    mutations: {
        load(state, payload) {
            state.cart = payload
        },
        update(state, payload) {
            const index = state.cart.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.cart[index] = payload
            }
        },
        remove(state, id) {
            const index = state.cart.findIndex(item => item.id === id)

            if (index !== -1) {
                state.cart.splice(index, 1)
            }
        },
        loaded(state, payload) {
            state.isLoaded = payload
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/cart')

                commit('load', data)
                commit('loaded', true)
            } catch(e) {
                commit('load', [])
                commit('loaded', true)
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                const { data } = await dbAxios.patch(`/cart/${id}`, item)

                commit('update', data)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                await dbAxios.delete(`/cart/${id}`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
