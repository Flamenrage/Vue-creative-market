<template>
  <form @submit.prevent>
    <div class="form-body">
      <div class="form-control">
      <label for="title">Название</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div class="form-control">
      <label for="type">Тип</label>
        <input type="text" id="type" v-model="type">
      </div>
    </div>
      <button class="btn primary" :disabled="!isValid" @click="onSubmit">{{id ? 'Сохранить' : 'Добавить'}}</button>
      <small v-if="!isValid">Заполните все поля корректными значениями</small>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
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
      items: categories,
      add,
      update
    } = useCategories()
    const { id } = route.params
    const category = computed(() => id ? categories.value.find(item => item.id === id) : null)
    const title = ref(id ? category.value.title : '')
    const type = ref(id ? category.value.type : '')
    const isValid = computed(() =>
        title.value && type.value
    )
    const onSubmit = async () => {
      const item = {
        title: title.value,
        type: type.value
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
    return {
      id,
      categories,
      title,
      type,
      isValid,
      onSubmit
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
