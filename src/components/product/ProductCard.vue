<template>
  <div class="product-card" @click="open(product)">
    <div class="product">
      <div class="product-img">
        <img :src="product.img">
      </div>
      <h4 class="product-title">{{ product.title }}</h4>
      <div class="text-center" v-if="product.count">
       <button class="btn primary" v-if="!isEditing" @click.stop="isEditing = true">
         {{price(product)}}
       </button>
        <product-dynamics v-else :product="product"/>
      </div>
      <p class="not-available" v-else>Нет в наличии</p>
      <p class="in-cart" v-if="productCount(product)">В корзине</p>
    </div>
  </div>
</template>

<script>
import { useProducts } from '@/use/products'
import { useCart } from '@/use/cart'
import ProductDynamics from "@/components/product/ProductDynamics";
export default {
  components: {ProductDynamics },
  props: {
    product: Object
  },
  setup() {
    const {
      isEditing,
      price,
      open
    } = useProducts()
    const { productCount } = useCart()
    return {
      productCount,
      isEditing,
      price,
      open
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 215px;
  height: 200px;
}
</style>
