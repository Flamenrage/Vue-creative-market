<template>

  <app-content title="Редактирование категории" back>
    <category-edit />
  </app-content>
</template>

<script>
import AppContent from '@/components/ui/AppContent'
import CategoryEdit from '@/components/admin/categories/CategoryEdit'
export default {
  components: { CategoryEdit, AppContent }
}
</script>

<style scoped>


</style>
