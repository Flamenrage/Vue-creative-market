<template>
  <app-content title="Товары">
    <template #header>
      <button class="btn primary" @click="modalIsOpen = true">Добавить</button>
    </template>
    <admin-product-filter v-model:filter="filter" />
    <admin-products-list :items="products" />
    <app-modal title="Добавить товар" @close="modalIsOpen = false" v-if="modalIsOpen">
      <product-edit @action="modalIsOpen = false" />
    </app-modal>
  </app-content>
</template>

<script>
import { ref } from 'vue'
import AppContent from '@/components/ui/AppContent'
import AdminProductsList from '@/components/admin/products/AdminProductsList'
import AppModal from '@/components/ui/AppModal'
import ProductEdit from '@/components/admin/products/ProductEdit'
import AdminProductFilter from "@/components/admin/products/AdminProductFilter";
import {useProducts} from "@/use/products";
export default {
  components: {AdminProductFilter, ProductEdit, AppModal, AdminProductsList, AppContent },
  setup() {
    const modalIsOpen = ref()
    const {
      items: products,
      filter
    } = useProducts()

    return {
      products,filter,
      modalIsOpen
    }
  }
}
</script>

<style scoped>
</style>
