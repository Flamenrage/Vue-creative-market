<template>
  <app-content title="Корзина товаров" back>
    <div class="cart">
      <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
      <cart-block v-else :items="items" />
      <hr>
      <cart-summary :total="total" />
      <cart-dynamics/>
    </div>
  </app-content>
</template>

<script>
import { useCart } from '@/use/cart'
import CartBlock from '@/components/cart/CartBlock'
import CartSummary from '@/components/cart/CartSummary'
import CartDynamics from '@/components/cart/CartDynamics'
import AppContent from "@/components/ui/AppContent";
export default {
  components: {CartDynamics, CartBlock, CartSummary, AppContent},
  setup() {
    const {
      items,
      total
    } = useCart()

    return {
      items,
      total
    }
  }
}
</script>

<style scoped>
.cart {
  width: 100%;
}
</style>
