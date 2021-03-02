import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useUsers() {
    const store = useStore()
    const router = useRouter()

    const roles = {
        admin: 'Администратор',
        user: 'Пользователь'
    }

    const items = computed(() => store.getters['users/items'])

    const load = async () => await store.dispatch('users/load')

    const update = async item => {
        await store.dispatch('users/update', item)

        router.go(-1)
    }

    return {
        items,
        roles,
        load,
        update
    }
}
