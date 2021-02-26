<template>
  <div class="product-detail">
    <div class="product-img">
      <img :src="product.img">
    </div>
    <p>Категория: <strong>{{ category(product) }}</strong></p>
    <div class="text-center" v-if="product.count">
      <button class="btn primary" v-if="!isEditing"
              @click.stop="isEditing = true">{{price(product)}}</button>
      <product-dynamics v-else :product="product"/>
    </div>
    <p class="not-available" v-else>Нет в наличии</p>
    <p class="in-cart" v-if="productCount(product)">В корзине</p>
  </div>
</template>

<script>
import { useProducts } from '@/use/products'
import { useCart } from '@/use/cart'
import ProductDynamics from "@/components/product/ProductDynamics";
export default {
  components: {ProductDynamics},
  props: {
    product: Object
  },
  setup() {
    const {
      isEditing,
      price,
      category,
    } = useProducts()
    const { productCount } = useCart()
    return {
      productCount,
      isEditing,
      price,
      category
    }
  }
}
</script>

<style scoped>
.product-detail {
  position: relative;
  width: 300px;
  max-width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
