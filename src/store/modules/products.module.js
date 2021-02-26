import dbAxios from '@/axios/db'

export default {
    namespaced: true,
    state() {
        return {
            products: []
        }
    },
    getters: {
        items(state) {
            return state.products
        }
    },
    mutations: {
        load(state, payload) {
            state.products = payload
        },
        add(state, payload) {
            const index = state.products.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.products.push(payload)
            }
        },
        update(state, payload) {
            const index = state.products.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.products[index] = payload
            }
        },
        remove(state, id) {
            const index = state.products.findIndex(item => item.id === id)

            if (index !== -1) {
                state.products.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/products')

                commit('load', data)
            } catch(e) {
                console.log(e)
            }
        },
        async add({ commit }, payload) {
            try {
                const { data } = await dbAxios.post(`/products`, payload)

                commit('add', data)
            } catch(e) {
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id } = payload

            try {
                const { data } = await dbAxios.patch(`/products/${id}`, payload)
                commit('update', data)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                await dbAxios.delete(`/products/${id}`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
