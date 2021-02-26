import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import {error} from "@/utils/error";


export function useCategories() {
    const store = useStore()
    const router = useRouter()

    const items = computed(() => store.getters['categories/items'])

    const products = computed(() => store.getters['products/items'])

    const activeItems = computed(() => items.value. //вытаскиваем из объекта категории тип, ищем продукты, у которых поле "категория"
        // совпадает с типом категории, т.е. "desserts"(category=>type) === "desserts"(product=>category) и так далее
    filter(({ type }) => products.value.find(({ category }) => category === type)))

    const productsTotal = ({ type }) =>
        products.value.filter(({ category }) => category === type).length //количество продуктов данной категории

    const load = async() => await store.dispatch('categories/load')

    const open = ({ type }) => router.push(`/?category=${type}`) //из объекта category в шаблоне вытаскиваем тип и пушим по этому адресу

    const add = async item => await store.dispatch('categories/add', item)

    const edit = ({ id }) => router.push(`/admin/categories/${id}`)

    const update = async item => {
        await store.dispatch('categories/update', item)

        router.push('/admin/categories')
    }

    const remove = async ({ id }) => {
        if (activeItems.value.find(item => item.id === id)) {
            await Swal.fire({
                title: 'Ошибка',
                text:'Нельзя удалить категорию, у которой еще есть товары',
                icon: 'error',
                confirmButtonText: 'Хорошо '
            })
        } else {
            await store.dispatch('categories/remove', id)
        }
    }

    return {
        items,
        activeItems,
        productsTotal,
        load,
        open,
        add,
        edit,
        update,
        remove
    }
}
