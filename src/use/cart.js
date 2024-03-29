import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
    const store = useStore()
    const items = computed(() => store.getters['cart/getCart'])
    const count = computed(()=> items.value.length)
    const total = computed(() => items.value.reduce((acc, item) => acc + item.price * item.count, 0)) //подсчитываем итоговую сумму в корзине

    const productCount = computed(() => product => {
        const item = items.value.find(({id}) => id === product.id) //находим нужный товар по айди

        return item ? item.count : 0 // получаем его количество
    })

    const add = item => store.commit('cart/add', item)

    const up =  item => {
        const { id } = item //из объекта item достаем id

        if (items.value.findIndex(item => item.id === id) === -1) {
             add({
                ...item,
                count: 0
            }) //если в корзине нет товара с таким id, помещаем его туда
        }

        const count = items.value.find(item => item.id === id).count //количество продукта в корзине

         store.commit('cart/update', { //обновляем корзину
            ...item,
            count: count + 1
        })
    }

    const decr =  item => {
        const { id } = item

        if (items.value.findIndex(item => item.id === id) === -1) {
            return //если в корзине нет товара с таким id - return
        }

        const count = items.value.find(item => item.id === id).count

         store.commit('cart/update', {
            ...item,
            count: count - 1
        })
    }

    const get = id => items.value.find(item => item.id === id)

    return {
        items,
        count,
        total,
        productCount,
        add,
        up,
        decr,
        get,
    }
}
