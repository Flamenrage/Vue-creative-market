<template>
  <app-content title="Каталог товаров">
    <div class="products">
      <products-filter v-model:filter="filter" />
      <products-scroll :products="products"/>
    </div>
  </app-content>
</template>

<script>
import { useProducts } from '@/use/products'
import AppContent from '@/components/ui/AppContent'
import ProductsFilter from '@/components/products/ProductsFilter'
import ProductsScroll from '@/components/products/ProductsScroll'
export default {
  components: { ProductsScroll, ProductsFilter, AppContent },
  setup() {
    const {
      items: products,
      filter
    } = useProducts()
    return {
      products,
      filter
    }
  }
}
</script>
<style scoped>
.products {
  display: flex;
}
</style>
