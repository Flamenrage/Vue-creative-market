<template>
  <AppLoader v-if="isLoading"/>
  <component
      :is="layout + '-layout'"
      v-if="layout && !isLoading"
  />
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'
import { useCart } from '@/use/cart'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'
import AdminLayout from '@/layout/AdminLayout'
import AppLoader from '@/components/ui/AppLoader'
export default {
  name: 'App',
  components: { AppLoader, AdminLayout, AuthLayout, MainLayout },
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    const { load: loadProducts } = useProducts()
    const { load: loadCategories } = useCategories()
    const { load: loadCart } = useCart()
    const isLoading = ref()
    onMounted(async () => {
      isLoading.value = true
      await loadProducts()
      await loadCategories()
      await loadCart()
      isLoading.value = false
    })
    return {
      layout,
      isLoading
    }
  }
}
</script>


<style>
.navbar h3 a {
  color: #2c3e50;
}
.navbar-menu li a {
  cursor: pointer;
}
.product {
  position: relative;
}
.product-controls {
  width: 215px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.not-available,
.in-cart {
  text-align: center;
  font-size: 12px;
}
.not-available {
  opacity: .3;
}
.in-cart {
  position: absolute;
  top: 0;
  right: 15px;
  color: #fff;
  background: #3eaf7c;
  padding: 1px 7px;
  border-radius: 6px;
  display: inline-block;
}
</style>
