import {ref, computed, watch} from 'vue'
import {useStore} from 'vuex'
import Swal from 'sweetalert2'
import {useRouter, useRoute} from 'vue-router'
import {error} from "@/utils/error";

export function useOrders() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const statuses = [{title: 'Активен', value: 'active'}, {title: 'Выполняется', value: 'pending'},
        { title: 'Завершен', value: 'done'}, { title: 'Отменен', value: 'cancel' }]

    const filter = ref({ status: route.query.status || '' })
    const items = computed(() => store.getters['orders/items']
        .sort((first, second) => first.date - second.date)  //сортируем по дате
        .sort((first, second) => statuses
            .findIndex(status => first.status === status.value) -
            statuses.findIndex(status => second.status === status.value)) //сортируем по статусам
        .filter(item => {
            if (filter.value.status) {
                return item.status === filter.value.status
            }
            return true
        }))

    const userItems = computed((email) => store.getters['orders/items'].filter(user => user.email === email.value))

    const load = async () => await store.dispatch('orders/load')

    const add = async item => {
        await store.dispatch('orders/add', {
            ...item,
            date: Date.now(),
            status: 'active'
        })
        await Swal.fire({
            title: 'Ваш заказ успешно создан',
            text:'Спасибо! Приходите к нам еще :)',
            icon: 'success',
            confirmButtonText: ' Ок'
        })
        store.commit('cart/clear')
        await router.push('/')
    }

    const update = async item => await store.dispatch('orders/update', item)

    watch(filter, () => {
        const query = {}

        Object.entries(filter.value).forEach(([key, value]) => {
            if (value) {
                query[key] = value
            }
        })
        router.replace({ query })
    })

    return {
        items,
        statuses,
        filter,
        load,
        add,
        open,
        update
    }
}
