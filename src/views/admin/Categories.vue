<template>
  <app-content title="Категории">
    <template #header>
      <button class="btn primary" @click="modalIsOpen = true">Добавить</button>
    </template>
    <admin-categories-list/>
    <app-modal title="Добавить товар" @close="modalIsOpen = false" v-if="modalIsOpen">
      <category-edit @action="modalIsOpen = false" />
    </app-modal>
  </app-content>
</template>

<script>
import { ref } from 'vue'
import AppContent from '@/components/ui/AppContent'
import AdminCategoriesList from '@/components/admin/categories/AdminCategoriesList'
import AppModal from '@/components/ui/AppModal'
import CategoryEdit from '@/components/admin/categories/CategoryEdit'
export default {
  components: { CategoryEdit, AppModal, AdminCategoriesList, AppContent },
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
