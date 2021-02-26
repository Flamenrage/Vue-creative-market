<template>
  <nav class="navbar">
    <h3>
      <RouterLink to="/">
        <img src="../assets/images/logo.png" class="navbar-logo">
      </RouterLink>
    </h3>
    <ul class="navbar-menu">
      <li>
        <RouterLink to="/">Магазин</RouterLink>
      </li>
      <li>
        <RouterLink to="/cart">Корзина <i v-if="cartCount">{{ cartCount }}</i></RouterLink>
      </li>
      <li v-if="isAuthorized">
        <RouterLink to="/admin">В админку</RouterLink>
      </li>
      <li v-if="isAuthorized">
        <a @click="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useCart } from '@/use/cart'
import { useAuth } from '@/use/auth'
export default {
  name: 'TheNavbar',
  setup() {
    const { count: cartCount } = useCart()
    const {
      isAuthorized,
      logout
    } = useAuth()
    return {
      cartCount,
      isAuthorized,
      logout
    }
  }
}
</script>

<style scoped>
.navbar li {
  position: relative;
  padding-right: 15px;
  margin-right: 1rem;
}
.navbar li i {
  position: absolute;
  top: -5px;
  right: 0;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  color: #fff;
  background: #c25205;
  border-radius: 50%;
}
</style>
