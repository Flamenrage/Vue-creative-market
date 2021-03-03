<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Дата</th>
      <th>Содержимое заказа</th>
      <th>Сумма</th>
      <th>Статус</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(order, i) in pages[active_page]" :key="order.id">
      <td>{{ index(i) }}</td>
      <td>{{ new Date(order.date).toLocaleString() }}
      </td>
      <td> <button class="btn primary" @click="$emit('update:modelValue', modelValue=order.items)">
        Продукты
      </button></td>
      <td>{{ total(order.items) }}</td>
      <td>
        <div class="form-control">
          <select
              :class="order.status"
              :value="order.status"
              disabled>
            <option
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
            >
              {{ status.title }}
            </option>
          </select>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <app-pagination
      :items="pages"
      :page="active_page"
      @to="to"
      @next="next"
      @prev="prev"
  />

</template>

<script>
import { computed } from 'vue'
import { useOrders } from '@/use/orders'
import { usePagination } from '@/use/pagination'

import { currency } from '@/utils/currency'
import AppPagination from '@/components/ui/AppPagination'
import {ref} from "vue";
import AppModal from "@/components/ui/AppModal";

export default {
  components: {  AppPagination, AppModal },
  props: {
    items: Array,
    modelValue: ''
  },
  emits: ['update:modelValue'],
  setup(props) {
    const {
      statuses,
      update
    } = useOrders()

    const orders = computed(() => props.items)
    const total = items => currency(items.reduce((accumulator, current) => accumulator + current.price * current.count, 0))
    return {
      statuses,
      total,
      ...usePagination(orders)
    }
  }
}
</script>

<style scoped>
.table small {
  display: block;
  margin-top: 7px;
}
.table small i {
  color: #3eaf7c;
  font-style: normal;
  font-weight: bold;
}
.done {
  background: rgba(0, 255, 0, .1) !important;
}
.cancel {
  background: rgba(255, 0, 0, .1) !important;
}
.active {
  background: rgba(112, 245, 189, .5 ) !important;
}
.pending {
  background: rgba(255, 255, 0, .1) !important;
}
.table tbody td:nth-child(4) {
  font-size: 14px;
  line-height: 1.5;
}
</style>
