<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <h1>Корзина</h1>

    <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>

    <cart-block v-else :items="items"></cart-block>

    <hr>
    <cart-summary :total="total" />
    <cart-dynamics></cart-dynamics>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useCart } from '@/use/cart'
import { currency } from '@/utils/currency'
import AppLoader from '@/components/ui/AppLoader'
import CartBlock from '@/components/cart/CartBlock'
import CartSummary from '@/components/cart/CartSummary'
import CartDynamics from '@/components/cart/CartDynamics'
export default {
  components: {CartDynamics, CartBlock, CartSummary, AppLoader},
  setup() {
    const {
      isLoading,
      items,
      total,
      load
    } = useCart()

    onMounted(load)

    return {
      isLoading,
      items,
      total
    }
  }
}
</script>

<style scoped>
</style>
