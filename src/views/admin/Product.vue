<template>
  <app-content title="Редактирование товара" back>
    <product-edit />
  </app-content>
</template>

<script>
import AppContent from '@/components/ui/AppContent'
import ProductEdit from '@/components/admin/products/ProductEdit'
export default {
  components: { ProductEdit, AppContent }
}
</script>

<style scoped>
</style>
