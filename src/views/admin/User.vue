<template>
  <app-content title="Редактирование пользователя" back>
    <user-card-info/>
  </app-content>
</template>

<script>
import UserCardInfo from '@/components/admin/user-card/UserCardInfo'
import AppContent from "@/components/ui/AppContent";

export default {
  components: { UserCardInfo, AppContent }
}
</script>

<style scoped>
</style>
