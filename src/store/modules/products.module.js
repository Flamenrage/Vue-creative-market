import dbAxios from '@/axios/db'

export default {
    namespaced: true,
    state() {
        return {
            products: [],
            isLoaded: false
        }
    },
    getters: {
        all(state) {
            return state.products
        },
        isLoaded(state) {
            return state.isLoaded
        }
    },
    mutations: {
        update(state, payload) {
            state.products = payload
        },
        loaded(state, payload) {
            state.isLoaded = payload
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/products')

                commit('update', data)
            } catch(e) {
                commit('update', [])
                console.log(e)
            }

            commit('loaded', true)
        }
    }
}
