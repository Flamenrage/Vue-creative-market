import axios from 'axios'
import { error } from '@/utils/error'
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
import store from '@/store'
const REFRESH_KEY = process.env.VUE_APP_REFRESH_KEY
const EXPIRES_KEY = process.env.VUE_APP_EXPIRES_KEY

const SIGN_IN_URL = process.env.VUE_APP_SIGN_IN_URL
const SIGN_UP_URL = process.env.VUE_APP_SIGN_UP_URL
const REFRESH_URL = process.env.VUE_APP_REFRESH_URL
const USER_KEY = process.env.VUE_APP_USER_KEY


export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY), //токен
            refreshToken: localStorage.getItem(REFRESH_KEY),
            expiresDate: new Date(localStorage.getItem(EXPIRES_KEY)),
            user: JSON.parse(localStorage.getItem(USER_KEY))
        }
    },
    mutations: {
        setToken(state, {refreshToken, idToken, expiresIn = '3600'}) {
            const expiresDate = new Date(new Date().getTime() + Number(expiresIn) * 1000)
            state.token = idToken
            state.refreshToken = refreshToken
            state.expiresDate = expiresDate
            localStorage.setItem(TOKEN_KEY, idToken)
            localStorage.setItem(REFRESH_KEY, refreshToken)
            localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
        },
        setUser(state, user) {
            state.user = user
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        },
        logout(state) {
            state.token = null
            state.refreshToken = null
            state.expiresDate = null
            state.user = null
            localStorage.removeItem(USER_KEY)
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(REFRESH_KEY)
            localStorage.removeItem(EXPIRES_KEY)

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

                const user = store //обращаемся к хранилищу и ищем пользователя с такой почтой
                    .getters['users/items']
                    .find(user => user.email === payload.email)

                delete user.password //удаляем пароль из полученного пользователя

                commit('setUser', user)
                commit('setToken', data)

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

                const user = { // создаем объект с новым пользователем
                    ...payload,
                    id: data.name
                }

                delete user.password //удаляем пароль из данных

                commit('setUser', user)
                commit('setToken', data)

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
        },
        isExpired(state) {
            return new Date() >= state.expiresDate
        }
    }
}
