import dbAxios from '@/axios/db'

export default {
    namespaced: true,
    state() {
        return {
            cart: []
        }
    },
    getters: {
        getCart(state) {
            return state.cart
        }
    },
    mutations: {
        load(state, payload) {
            state.cart = payload
        },
        add(state, payload) {
            const index = state.cart.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.cart.push(payload)
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
        },
        remove(state, id) {
            const index = state.cart.findIndex(item => item.id === id)

            if (index !== -1) {
                state.cart.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/cart')

                commit('load', data)
            } catch(e) {
                console.log(e)
            }
        },
        async add({ commit }, payload) {
            try {
                const { data } = await dbAxios.post(`/cart`, payload)

                commit('add', data)
            } catch(e) {
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id } = payload

            try {
                if (payload.count) {
                    const { data } = await dbAxios.patch(`/cart/${id}`, payload)
                    commit('update', data)
                } else {
                    await dbAxios.delete(`/cart/${id}`)
                    commit('remove', id)
                }
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
