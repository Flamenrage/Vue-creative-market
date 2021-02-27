<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="title">
      <span class="form-control-clear" @click="title = ''">&times;</span>
    </div>
    <ul class="list">
      <li class="list-item" @click="reset">
        Все
      </li>
      <li
          v-for="cat in categories"
          :key="cat.id"
          :class="['list-item', {
            'is-active': cat.type === category
          }]"
          @click="changeCategory(cat.type)"
      >
        {{ cat.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useCategories } from '@/use/categories'
export default {
  props: {
    filter: Object
  },
  emits: ['update:filter'],
  setup(props, { emit }) {
    const {
      activeItems: categories
    } = useCategories()
    const title = ref('')
    const category = ref()
    const changeCategory = type => category.value = type
    const reset = () => {
      title.value = ''
      category.value = ''
    }
    watch([title, category], values => {
      emit('update:filter', {
        title: values[0],
        category: values[1]
      })
    })
    return {
      categories,
      title,
      category,
      changeCategory,
      reset
    }
  }
}
</script>

<style scoped>
.is-active {
  background: #3eaf7c !important;
  color: #fff;
}
</style>
