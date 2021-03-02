<template>
  <app-loader v-if="isLoading" />
  <app-content v-else title="Пользователи">
    <user-card-list/>
  </app-content>
  <app-modal title="Добавить пользователя" @close="modalIsOpen = false" v-if="modalIsOpen">
    <user-card-info @action="modalIsOpen = false" />
  </app-modal>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUsers } from '@/use/users'
import AppContent from '@/components/ui/AppContent'
import UserCardList from '@/components/admin/user-card/UserCardList'
import UserCardInfo from '@/components/admin/user-card/UserCardInfo'
import AppModal from '@/components/ui/AppModal'
import AppLoader from '@/components/ui/AppLoader'


export default {
  components: {AppContent, AppLoader, AppModal, UserCardInfo, UserCardList },
  setup() {
    const modalIsOpen = ref()
    const isLoading = ref()
    const {
      load: loadUsers
    } = useUsers()
    onMounted(async() => {
      isLoading.value = true
      await loadUsers()
      isLoading.value = false
    })
    return {
      isLoading,
      modalIsOpen
    }
  }
}
</script>

<style scoped>
</style>
