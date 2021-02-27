<template>
  <nav class="navbar">
    <h3>
      <RouterLink to="/admin"><img src="../../assets/images/logo.png" class="navbar-logo"></RouterLink>
    </h3>
    <ul class="navbar-menu">
      <li>
        <RouterLink to="/admin/products">Продукты</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/categories">Категории</RouterLink>
      </li>
      <li>
        <RouterLink to="/">Магазин</RouterLink>
      </li>
      <li>
        <a @click="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useAuth} from '@/use/auth'

export default {
  setup() {
    const {
      logout
    } = useAuth()
    return {
      logout
    }
  }
}
</script>

<style scoped>
</style>
