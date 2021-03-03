import dbAxios from '@/axios/db'
import store from '@/store'
import axios from 'axios'
import { error } from '@/utils/error'
import {transform} from "@/use/transform";

export default {
    namespaced: true,
    state() {
        return {
            users: []
        }
    },
    getters: {
        items(state) {
            return state.users
        }
    },
    mutations: {
        load(state, payload) {
            state.users = payload
        },
        add(state, payload) {
            const index = state.users.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.users.push(payload)
            }
        },
        update(state, payload) {
            const index = state.users.findIndex(item => item.id === payload.id)

            if (index !== -1) { //если нашелся пользователь - обновляем
                state.users[index] = payload
            }
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/users.json')

                commit('load',transform(data))
            } catch(e) {
                throw new Error(error(e.response.data.error.message))
            }
        },
        async add({ commit }, payload) {
            try {
                const { data } = await dbAxios.post(`/users.json`, payload)

                commit('add', {...payload, id: data.name})
            } catch(e) {
                throw new Error(error(e.response.data.error.message))
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                await dbAxios.patch(`/users/${id}.json`, item)

                commit('update', payload)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
