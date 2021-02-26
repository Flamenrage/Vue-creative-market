<template>
  <admin-navbar></admin-navbar>
  <div class="container with-nav">
    <RouterView/>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar'

export default {
  components: {  AdminNavbar }
}
</script>

<style scoped>
</style>
