<template>
  <table class="table" v-if="items.length">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item.id">
      <td>{{ item.title }}</td>
      <td>
        <button class="btn danger" @click="decr(item)">-</button>
        {{ item.count }} шт.
        <button class="btn primary" @click="up(item)">+</button>
      </td>
      <td>{{ currency(item.price) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { useCart } from '@/use/cart'
import { currency } from '@/utils/currency'
export default {
  name: 'CartTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup() {
    const {
      up,
      decr
    } = useCart()
    return {
      up,
      decr,
      currency
    }
  }
}
</script>

<style scoped>
</style>
