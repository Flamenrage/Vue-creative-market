import {onBeforeRouteLeave} from 'vue-router'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

export function useLeaveGuard(hasChanges) {
    const router = useRouter()
    const leave = ref(false) //флаг перехода
    const canLeave = ref(false) //можем ли перейти
    const leaveTo = ref(null) //переходим куда

    const navigate = async ( ) => { //функция перехода
        leave.value = false
        canLeave.value = true
        await router.push(leaveTo.value)
    }

    onBeforeRouteLeave(to => {
        if (canLeave.value) { //если можем перейти - разрешаем переход
            return true
        }

        if (hasChanges.value) { //если есть изменения
            leave.value = true //флаг перехода true
            leaveTo.value = to.path //путь следующей страницы перехода
            return false
        }

        return true
    })

    return {leave, navigate}
}
