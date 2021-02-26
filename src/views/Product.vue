<template>
  <app-content v-if="product" back center :title="product.title">
    <product-info :product="product" />
  </app-content>
  <h3 class="text-center text-white" v-else>
    Товар не найден.
  </h3>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'
import AppContent from '@/components/ui/AppContent'
import ProductInfo from '@/components/product/ProductInfo'
export default {
  components: {AppContent, ProductInfo },
  setup() {
    const route = useRoute()
    const { items: products } = useProducts()
    const { items: categories } = useCategories()
    const { id } = route.params
    const product = computed(() => products.value.find(product => product.id === id))
    const category = computed(() => categories.value.find(category => category.type === product.value.category).title)
    return {
      product,
      category
    }
  }
}
</script>

<style scoped>

</style>
