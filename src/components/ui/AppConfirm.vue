<template>
  <app-modal :title="title" @close="$emit('reject')">
    <div class="text-center">
      <slot></slot>
      <button class="btn primary" @click="$emit('confirm')">Да</button>
      <button class="btn danger" @click="$emit('reject')">Нет</button>
    </div>
  </app-modal>
</template>

<script>
import AppModal from './AppModal'
export default {
  emits: ['confirm', 'reject'],
  props: ['title'],
  components: {AppModal}
}
</script>

<style scoped>

</style>
