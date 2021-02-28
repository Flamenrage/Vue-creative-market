import dbAxios from '@/axios/db'
import {transform} from "@/use/transform";
import store from '@/store'

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
                const { data } = await dbAxios.get(`/products.json`)

                commit('load', transform(data))
            } catch(e) {
                console.log(e)
            }
        },
        async add({ commit }, payload) {
            try {
                const token = store.getters['auth/token']
                const { data } = await dbAxios.post(`/products.json?auth=${token}`, payload)

                commit('add', {
                    ...payload,
                    id: data.name
                })
            } catch(e) {
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                const token = store.getters['auth/token']
                await dbAxios.put(`/products/${id}.json?auth=${token}`, item)

                commit('update', payload)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                const token = store.getters['auth/token']
                await dbAxios.delete(`/products/${id}.json?auth=${token}`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
