<template>
  <div v-if="products.length" class="products-table">
    <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
    />
  </div>
  <p class="empty" v-else>Товары не найдены</p>
</template>

<script>
import ProductCard from '@/components/product/ProductCard'
export default {
  components: { ProductCard },
  props: {
    products: Array
  }
}
</script>

<style scoped>
.products-table {
  width: 750px;
}
.empty {
  width: 750px;
  text-align: center;
  padding: 1rem;
  margin: 0;
}
</style>
