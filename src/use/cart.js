import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
    const store = useStore()
    const items = computed(() => store.getters['cart/getCart'])
    const total = computed(() => items.value.reduce((acc, item) => acc + item.price * item.count, 0)) //подсчитываем итоговую сумму в корзине
    const isLoading = computed(() => !store.getters['cart/isLoaded'])

    const up = item => {
        store.dispatch('cart/update', {
            ...item,
            count: item.count + 1
        })
    }

    const decr = item => {
        if (item.count > 1)
            store.dispatch('cart/update', {
                ...item,
                count: item.count - 1
            })
        else {
            store.dispatch('cart/remove',item.id)
        }
    }

    const load = store.dispatch('cart/load')

    return {
        items,
        total,
        isLoading,
        up,
        decr,
        load
    }
}
