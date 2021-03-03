<template>
  <app-content title="Корзина товаров" back>
    <div class="cart">
      <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
      <cart-block v-else :items="items" />
      <hr>
      <cart-summary v-if="total" :total="total" />
    </div>
    <p class="text-right" v-if="isAuthorized">
      <button class="btn" @click="makeOrder">Оплатить</button>
    </p>
    <div class="text-center" v-if="!isAuthorized && total">
      <h3>Чтобы сделать заказ необходимо авторизоваться</h3>
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
import AppContent from "@/components/ui/AppContent";
import {useAuth} from "@/use/auth/auth-info";
import {useRouter} from "vue-router";
import {useOrders} from "@/use/orders";

export default {
  components: { CartBlock, CartSummary, AppContent},
  setup() {
    const router = useRouter()
    const {
      items,
      total
    } = useCart()

    const auth = () => router.push('/auth')
    const { add: addOrder } = useOrders()
    const { isAuthorized, user } = useAuth()
    const makeOrder = async () => {
      await addOrder({
        user: user.value,
        items: items.value
      })
    }
    return {
      items,
      total,
      isAuthorized,
      auth, makeOrder
    }
  }
}
</script>

<style scoped>
.cart {
  width: 100%;
}
</style>
