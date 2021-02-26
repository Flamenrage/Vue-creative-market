<template>
  <form @submit.prevent>
    <div class="form-body">
      <div class="form-control">
        <label for="title">Название</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div class="form-control">
      <label for="img">Изображение</label>
        <input type="text" id="img" v-model="img">
      </div>
      <div class="form-control">
      <label for="price">Цена</label>
        <input type="number" min="0" id="price" v-model="price">
      </div>
      <div class="form-control">
      <label for="count">Количество</label>
        <input type="number" min="0" id="count" v-model="count">
      </div>
      <div class="form-control">
      <label for="category">Категория</label>
        <select id="category" v-model="category">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.type"
          >{{ category.title }}</option>
        </select>
      </div>
    </div>
      <button class="btn primary" :disabled="!isValid" @click="onSubmit">{{id ? 'Сохранить' : 'Добавить'}}</button>
      <small v-if="!isValid">Заполните все поля корректными значениями</small>
  </form>
</template>
<script>

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'
export default {
  props: {
    action: {
      type: Function
    }
  },
  emits: ['action'],
  setup(_, { emit }) {
    const route = useRoute()
    const {
      items: products,
      add,
      update
    } = useProducts()
    const {
      items: categories
    } = useCategories()
    const { id } = route.params
    const product = computed(() => id ? products.value.find(item => item.id === id) : null)
    const title = ref(id ? product.value.title : '')
    const img = ref(id ? product.value.img : '')
    const price = ref(id ? product.value.price : '')
    const count = ref(id ? product.value.count : '')
    const category = ref(id ? product.value.category : '')
    const onSubmit = async () => {
      const item = {
        title: title.value,
        img: img.value,
        price: Number(price.value),
        count: Number(count.value),
        category: category.value
      }

      if (id) {
        await update({
          id,
          ...item
        })
      } else {
        await add(item)
      }
      emit('action')
    }
    const isValid = computed(() =>
        title.value && img.value && price.value > 0 && count.value > 0
    )

    return {
      id,
      categories,
      title,
      img,
      price,
      count,
      category,
      onSubmit, isValid
    }
  }
}
</script>

<style scoped>
.form-inline .form-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form-inline .form-control {
  width: 48%;
}
.form-control {
  margin-bottom: 15px;
}
</style>
