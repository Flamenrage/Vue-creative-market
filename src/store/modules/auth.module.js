import axios from 'axios'
import { error } from '@/utils/error'
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
import store from '@/store'
const USER_KEY = process.env.VUE_APP_USER_KEY


export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY), //токен
            user: JSON.parse(localStorage.getItem(USER_KEY))
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setUser(state, user) {
            state.user = user
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        },
        logout(state) {
            state.token = null
            state.user = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)
        }
    },
    actions: {
        async signIn({ commit, dispatch }, payload) {
            const link = process.env.VUE_APP_SIGN_IN_URL + process.env.VUE_APP_FB_KEY

            try {
                const { data } = await axios.post(link, { //отправляем запрос с данными на сервер
                    ...payload,
                    returnSecureToken: true
                })
                console.log(data)

                const { idToken: token } = data // достаем токен из данных
                console.log(token)

                const user = store //обращаемся к хранилищу и ищем пользователя с такой почтой
                    .getters['users/items']
                    .find(user => user.email === payload.email)

                delete user.password //удаляем пароль из полученного пользователя

                commit('setUser', user)
                commit('setToken', token)

            } catch(e) {
                throw new Error(error(e.response.data.error.message))
            }
        },
        async removeToken({ commit }){
            commit('logout')
        },
        async signUp({ commit, dispatch }, payload) {
            const link = process.env.VUE_APP_SIGN_UP_URL + process.env.VUE_APP_FB_KEY

            console.log(payload)

            try {
                const { data } = await axios.post(link, { //отправляем запрос с данными на сервер
                    ...payload,
                    returnSecureToken: true
                })

                const { idToken: token } = data // достаем токен из данных

                const user = { // создаем объект с новым пользователем
                    ...payload,
                    id: data.name
                }

                delete user.password //удаляем пароль из данных

                commit('setUser', user)
                commit('setToken', token)

                await dispatch('users/add', user, { // добавляем нового пользователя в БД
                    root: true
                })

            } catch(e) {
                throw new Error(error(e.response.data.error.message))
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthorized(_, getters) {
            return !!getters.token
        },
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.user ? state.user.role === 'admin' : false
        }
    }
}
