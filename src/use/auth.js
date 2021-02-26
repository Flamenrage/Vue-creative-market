import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useAuth() {
    const store = useStore()
    const router = useRouter()

    const isAuthorized = ref(store.getters['auth/isAuthorized'])

    const logout = () => {
        store.dispatch('auth/removeToken')
        router.push('/auth')
    }

    return {
        isAuthorized,
        logout
    }
}
