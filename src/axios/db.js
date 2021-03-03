import axios from 'axios'
import store from '@/store'
import router from '@/router'

const dbAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL
})

dbAxios.defaults.params = {}

dbAxios.interceptors.request.use( async config => {
    if (store.getters['auth/isAuthorized']) {
        if (store.getters['auth/isExpired']) {
            await store.dispatch('auth/refresh')
        }

        config.params['auth'] = store.getters['auth/token']
    }

    return config
})

dbAxios.interceptors.response.use( null, error => {
    if (error.response.status === 401) {
        store.commit('auth/logout')
        router.push('/auth?message=auth')
    }

    return Promise.reject(error)
})

export default dbAxios
