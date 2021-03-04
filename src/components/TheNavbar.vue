<template>
  <nav class="navbar" v-if="!isAdmin">
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
      <li v-if="!isAuthorized">
        <RouterLink to="/auth">Войти</RouterLink>
      </li>
      <li v-if="isAuthorized" class="navbar-user">
        <RouterLink to="/cabinet">{{user.email}}</RouterLink>
      </li>
      <li v-if="isAuthorized">
        <a @click="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useCart} from '@/use/cart'
import {useAuth} from '@/use/auth/auth-info'

export default {
  name: 'TheNavbar',
  setup() {
    const {count: cartCount} = useCart()
    const {
      isAuthorized,
      logout, isAdmin, user
    } = useAuth()
    return {
      cartCount,
      isAuthorized,
      logout, isAdmin, user
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

.navbar-user {
  position: relative;
  font-size: 18px;
  color: #777;
  padding-left: 35px;
}

.navbar-user:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background-image: url('../assets/images/user.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
