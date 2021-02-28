<template>
  <ul class="pagination" v-if="items.length > 1">
    <li class="pagination-item">
      <button class="btn" @click="$emit('prev')" :disabled="!page">&lt;</button>
    </li>
    <li class="pagination-item" v-for="(item, i) in items"
        :key="i">
      <button
          :class="['btn', {active: i === page}]"
          @click="$emit('to', i)"
      >{{ i + 1 }}</button>
    </li>
    <li class="pagination-item">
      <button class="btn" @click="$emit('next')" :disabled="page === items.length - 1">&gt;</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    items: {
      type: Array,
      required: true
    },
    page: {
      type: Number
    }
  },
  emits: ['to', 'prev', 'next']
}
</script>

<style scoped>
.pagination {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.pagination-item > button {
  border: none;
  border-radius: 8px;
  background: #eee;
  transition: all 0.22s;
  color: inherit;
  font-weight: normal;
  padding: 0.5rem 1rem;
}

.pagination-item > button.active {
  background: #3eaf7c;
  color: #fff;
  font-weight: bold;
}
</style>
