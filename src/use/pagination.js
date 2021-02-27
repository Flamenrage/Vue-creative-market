import { ref, computed } from 'vue'
import chunk from 'lodash.chunk'
import { useRoute, useRouter } from 'vue-router'


export function usePagination(items = [], limit = 5) {
    const route = useRoute()
    const router = useRouter()

    const active_page = ref(route.query.page - 1 || 0)

    const pages = computed(() => chunk(items.value, limit))

    const index = computed(() => i => limit * active_page.value + i + 1)

    const teleport = page_ind => {
        if (page_ind < 0 || page_ind >= pages.value.length) {
            return
        }

        router.push({
            query: page_ind ? {
                page: page_ind + 1
            } : null
        })

        active_page.value = page_ind
    }

    const prev = () => teleport(active_page.value - 1)

    const next = () => teleport(active_page.value + 1)

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
