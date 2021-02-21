<template>
  <p class="text-right"><strong>Итоговая сумма: {{ currency(total) }}</strong></p>
</template>

<script>
import {currency} from '@/utils/currency'

export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      currency
    }
  }
}
</script>

<style scoped>
</style>
