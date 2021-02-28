<template>
  <div class="filter">
    <div class="form-control">
      <select
          v-model="category"
          name="category"
          id="category"
      >
        <option value="">Все</option>
        <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.type"
        >
          {{cat.title}}
        </option>
      </select>
    </div>
    <div class="form-control">
      <input type="text" v-model="title" placeholder="Поиск по названию..." />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'
export default {
  emits: ['update:filter'],
  props: {
    filter: Object
  },
  setup(_, { emit }) {
    const {
      filter
    } = useProducts()
    const {
      items: categories
    } = useCategories()
    const title = ref(filter.value.title)
    const category = ref(filter.value.category)
    watch([title, category], values => emit('update:filter', {
      title: values[0],
      category: values[1]
    }))
    return {
      title,
      category,
      categories
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
}
.filter .form-control {
  width: 48%;
  margin: 0;
  margin-right: 1rem;
}
</style>
