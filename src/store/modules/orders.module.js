import dbAxios from '@/axios/db'
import store from '@/store'
import {transform} from "@/use/transform";

export default {
    namespaced: true,
    state() {
        return {
            orders: []
        }
    },
    getters: {
        items(state) {
            return state.orders
        }
    },
    mutations: {
        load(state, payload) {
            state.orders = payload
        },
        add(state, payload) {
            const index = state.orders.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.orders.push(payload)
            }
        },
        update(state, payload) {
            const index = state.orders.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.orders[index] = payload
            }
        },
        remove(state, id) {
            const index = state.orders.findIndex(item => item.id === id)

            if (index !== -1) {
                state.orders.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/orders.json')

                commit('load', transform(data))
            } catch(e) {
                console.log(e)
            }
        },
        async add({ commit }, payload) {
            try {
                const { data } = await dbAxios.post(`/orders.json`, payload)

                const products = store.getters['products/items']

                payload.items.forEach(element => {
                    const storeCount = products.find(pd => pd.id === element.id).count //сколько товара на складе

                    if (storeCount < element.count) return //если не хватает - return

                    store.dispatch('products/update', { ...element, count: storeCount - element.count })
                    //обновляем продукт - меняем количество
                })

                commit('add', { ...payload,  id: data.name }) //добавляем новый заказ
            } catch(e) {
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                await dbAxios.patch(`/orders/${id}.json`, item)

                commit('update', payload)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
