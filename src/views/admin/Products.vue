<template>
  <app-content title="Товары">
    <template #header>
      <button class="btn primary" @click="modalIsOpen = true">Добавить</button>
    </template>
    <admin-products-list />
    <app-modal title="Добавить товар" @close="modalIsOpen = false" v-if="modalIsOpen">
      <product-edit @action="modalIsOpen = false" />
    </app-modal>
  </app-content>
</template>

<script>
import { ref } from 'vue'
import AppContent from '@/components/ui/AppContent'
import AdminProductsList from '@/components/admin/AdminProductsList'
import AppModal from '@/components/ui/AppModal'
import ProductEdit from '@/components/product/ProductEdit'
export default {
  components: { ProductEdit, AppModal, AdminProductsList, AppContent },
  setup() {
    const modalIsOpen = ref()
    return {
      modalIsOpen
    }
  }
}
</script>

<style scoped>
</style>
