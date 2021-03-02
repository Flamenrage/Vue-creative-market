import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {computed} from "vue";

export function useAuth() {
    const store = useStore()
    const router = useRouter()

    const isAuthorized = ref(store.getters['auth/isAuthorized'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])
    const user = computed(() => store.getters['auth/user'])
    const logout = async () => {
        await store.dispatch('auth/removeToken')
        await router.push('/auth')
    }

    return {
        isAuthorized,
        logout, user, isAdmin
    }
}
