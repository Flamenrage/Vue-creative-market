<template>
  <nav class="navbar">
    <img src="../assets/images/logo.png" class="navbar-logo">
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">
          Корзина
        </router-link>
      </li>
      <li v-if="isAuth">
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRouter} from "vue-router";

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isAuth = computed(() => store.getters['auth/isAuthorized'])
    return {
      logout: () => {
        store.dispatch('auth/removeToken')
        router.push('/auth')
      },
      isAuth
    }
  }
}
</script>

<style scoped>

</style>
