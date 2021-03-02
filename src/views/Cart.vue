<template>
  <app-content title="Корзина товаров" back>
    <div class="cart">
      <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
      <cart-block v-else :items="items" />
      <hr>
      <cart-summary v-if="total" :total="total" />
      <cart-dynamics v-if="isAuthorized"/>
    </div>
    <div class="text-center" v-if="!isAuthorized">
      <h3 v-if="!isAuthorized">Чтобы сделать заказ необходимо авторизоваться</h3>
      <button class="btn primary" @click="auth">
        Авторизуйтесь
      </button>
    </div>
  </app-content>
</template>

<script>
import { useCart } from '@/use/cart'
import CartBlock from '@/components/cart/CartBlock'
import CartSummary from '@/components/cart/CartSummary'
import CartDynamics from '@/components/cart/CartDynamics'
import AppContent from "@/components/ui/AppContent";
import {useAuth} from "@/use/auth/auth-info";
import {useRouter} from "vue-router";

export default {
  components: {CartDynamics, CartBlock, CartSummary, AppContent},
  setup() {
    const router = useRouter()
    const {
      items,
      total
    } = useCart()
    const auth = () => router.push('/auth')
    const { isAuthorized } = useAuth()
    return {
      items,
      total,
      isAuthorized,
      auth
    }
  }
}
</script>

<style scoped>
.cart {
  width: 100%;
}
</style>
