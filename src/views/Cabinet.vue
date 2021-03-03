<template>
  <app-loader v-if="isLoading" />
  <app-content
      v-else
      title="Мои заказы"
  >
    <orders-list :items="userOrders" v-model="orderList"/>
    <app-modal title="Список продуктов" @close="orderList = null" v-if="orderList">
      <div class="text-center" v-for="(product, ind) in orderList" :key="product.id">
        <strong>{{product.title}} - </strong> цена: {{product.price}} рублей, {{product.count}} шт
        <hr>
      </div>
    </app-modal>
  </app-content>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useOrders } from '@/use/orders'
import AppLoader from '@/components/ui/AppLoader'
import AdminOrdersFilter from '@/components/admin/orders/AdminOrdersFilter'
import AdminOrdersList from '@/components/admin/orders/AdminOrdersList'
import AppContent from "@/components/ui/AppContent";
import AppModal from "@/components/ui/AppModal";
import OrdersList from "@/components/orders/OrdersList";
import {useUsers} from "@/use/users";
import {useAuth} from "@/use/auth/auth-info";
import {computed} from "vue";
import {useStore} from "vuex";
export default {
  components: { OrdersList, AppLoader, AppContent, AppModal },
  setup() {
    const store = useStore()
    const { load: loadOrders, statuses } = useOrders()
    const { user } = useAuth()
    const orderList = ref()
    const isLoading = ref()
    const userOrders = computed(() => store.getters['orders/items']
        .filter(reqArray => {return user.value.id === reqArray.user.id})
        .sort((first, second) => statuses
            .findIndex(status => first.status === status.value) -
        statuses.findIndex(status => second.status === status.value))
    )
    onMounted(async () => {
      isLoading.value = true
      await loadOrders()
      isLoading.value = false
    })
    return {
      isLoading,
      userOrders,
      orderList
    }
  }
}
</script>

<style scoped>
</style>
