<template>
  <div class="product-controls" @click.stop>

    <button class="btn danger" @click="decr(product)"  :disabled="!productCount(product)">-</button>
    <strong>
      {{ productCount(product) }}
    </strong>
    <button class="btn primary" @click="up(product)"  :disabled="productCount(product) >= product.count">+</button>
  </div>
</template>

<script>
import { useCart } from '@/use/cart'
export default {
  props: {
    product: Object
  },
  setup() {
    const {
      productCount,
      up,
      decr
    } = useCart()
    return {
      productCount,
      up,
      decr
    }
  }
}
</script>

<style scoped>
</style>
