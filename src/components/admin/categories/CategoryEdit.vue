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
    <button class="btn primary" v-if="id" :disabled="!isValid || !hasChanges" @click="onUpdate">Сохранить</button>
    <button class="btn primary" v-else :disabled="!isValid" @click="onCreate">Добавить</button>
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
import { useRoute } from 'vue-router'
import { useCategories } from '@/use/categories'
import {useLeaveGuard} from "@/use/leave-guard";
import AppConfirm from "@/components/ui/AppConfirm";

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
    const hasChanges = computed(() => {
      return !!((route.params.id) && (category.value.title !== title.value ||
          category.value.type !== type.value));
    })
    const onCreate = async () => {
      const item = {
        title: title.value,
        type: type.value
      }
      await add(item)
      emit('action')
    }
    const onUpdate = async () => {
      const item = {
        title: title.value,
        type: type.value
      }
      await update({id, ...item})
      emit('action')
    }
    return {
      id,
      categories,
      title,
      type,
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
