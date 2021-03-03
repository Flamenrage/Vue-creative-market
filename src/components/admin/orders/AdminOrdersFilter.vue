<template>
  <div class="filter">
    <div class="form-control">
      <select
          name="status"
          id="status"
          v-model="status"
      >
        <option value="">Все</option>
        <option
            v-for="status in statuses"
            :key="status.value"
            :value="status.value"
        >
          {{ status.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useOrders } from '@/use/orders'
export default {
  emits: ['update:filter'],
  props: {
    filter: Object
  },
  setup(_, { emit }) {
    const {
      statuses,
      filter
    } = useOrders()
    const status = ref(filter.value.status)
    watch(status, () => emit('update:filter', {
      status: status.value
    }))
    return {
      statuses,
      status
    }
  }
}
</script>

<style scoped>
.filter .form-control {
  margin-right: 1rem;
  margin-bottom: 0;
}
.filter select {
  min-width: 167px;
}
</style>
