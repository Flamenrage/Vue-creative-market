import {ref, computed, watch} from 'vue'
import chunk from 'lodash.chunk'
import {useRoute, useRouter} from 'vue-router'


export function usePagination(items, limit = 5) {
    const route = useRoute()
    const router = useRouter()
    const lastPage = ref()


    const active_page = ref(route.query.page - 1 || 0)

    const pages = computed(() => chunk(items.value, limit))

    const index = computed(() => i => limit * active_page.value + i + 1)

    const teleport = page_ind => {
        if (page_ind < 0 || page_ind >= pages.value.length) {
            return
        }

        setTimeout(() => {
            let query = {}

            if (route.query.title || route.query.category) {
                query = {...route.query}

                delete query.page
            } else if (page_ind) {
                query.page = page_ind ++
            }

            router.replace({
                query
            })
        }, 5)


        active_page.value = page_ind
        if (pages.value.length - 1 > active_page.value) {
            lastPage.value = 0
        }
    }

    const prev = () => teleport(active_page.value - 1)

    const next = () => teleport(active_page.value + 1)

    watch(pages, () => {
        if (pages.value.length < active_page.value + 1) {
            lastPage.value = route.query.page ? route.query.page - 1 : 0
            teleport(0)
        }

        if (!pages.value.length || lastPage.value) {
            teleport(lastPage.value)
        }
    })

    return {
        pages,
        active_page,
        limit,
        index,
        to: teleport,
        prev,
        next
    }
}
