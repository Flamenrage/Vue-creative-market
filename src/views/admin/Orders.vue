<template>
  <app-loader v-if="isLoading" />
  <app-content
      v-else
      title="Заказы"
  >
    <template #header>
      <admin-orders-filter v-model:filter="filter" />
    </template>
    <admin-orders-list :items="orders" v-model="orderList"/>
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
export default {
  components: { AdminOrdersFilter, AdminOrdersList, AppLoader, AppContent, AppModal },
  setup() {
    const {
      items: orders,
      load: loadOrders,
      filter
    } = useOrders()
    const orderList = ref()
    const isLoading = ref()

    onMounted(async () => {
      isLoading.value = true
      await loadOrders()
      isLoading.value = false
    })
    return {
      isLoading,
      filter,
      orders,
      orderList
    }
  }
}
</script>

<style scoped>
</style>
