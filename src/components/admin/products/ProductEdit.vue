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
    <button class="btn primary" v-if="id" :disabled="!isValid || !hasChanges" @click="onUpdate">Сохранить</button>
    <button class="btn primary" v-else :disabled="!isValid" @click="onCreate">Добавить</button>
    <small v-if="!isValid">Заполните все поля корректными значениями</small>
  </form>
  <teleport to="body">
    <app-confirm
        v-if="leave"
        title="Есть несохраненные изменения. Вы хотите покинуть страницу?"
        @reject="leave = false"
        @confirm="navigate" />
  </teleport>
</template>
<script>

import { ref, computed } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'
import AppConfirm from "@/components/ui/AppConfirm";
import {useLeaveGuard} from "@/use/leave-guard";
export default {
  props: {
    action: {
      type: Function
    }
  },
  emits: ['action'],
  components:{AppConfirm},
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
    const hasChanges = computed(() => {
      return !!((route.params.id) && (product.value.title !== title.value ||
          product.value.img !== img.value ||
          product.value.price !== Number(price.value) ||
          product.value.count !== Number(count.value) ||
          product.value.category !== category.value));
    })

    const onCreate = async () => {
      const item = {
        title: title.value,
        img: img.value,
        price: Number(price.value),
        count: Number(count.value),
        category: category.value
      }
      await add(item)
      emit('action')
    }
    const onUpdate = async () => {
      const item = {
        title: title.value,
        img: img.value,
        price: Number(price.value),
        count: Number(count.value),
        category: category.value
      }
      await update({id, ...item})
      emit('action')
    }
    const isValid = computed(() =>
        title.value && img.value && price.value > 0 && count.value >-1 && category.value
    )

    return {
      id,
      categories,
      title,
      img,
      price,
      count,
      category,
      onCreate,onUpdate,
      isValid, hasChanges,
      ...useLeaveGuard(hasChanges)

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
