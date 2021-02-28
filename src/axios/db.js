import axios from 'axios'
// import router from '@/router'

const dbAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL //DB_URL - локалка
})

dbAxios.interceptors.response.use( null, error => {
    if (error.response.status === 401) {
        // router.push('/auth?message=auth')
    }

    return Promise.reject(error)
});

export default dbAxios
