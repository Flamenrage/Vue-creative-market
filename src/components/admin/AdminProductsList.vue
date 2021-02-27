<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Изображение</th>
      <th>Цена</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(product, i) in products" :key="product.id">
      <td>{{ i + 1 }}</td>
      <td>{{ product.title }}</td>
      <td>
        <img :src="product.img" :alt="product.title">
      </td>
      <td>{{ price(product) }}</td>
      <td>{{ category(product) }}</td>
      <td>{{ product.count }}</td>
      <td>
        <button class="btn" @click="open(product)">Посмотреть</button>
        <button class="btn primary" @click="edit(product)">Изменить</button>
        <button class="btn danger" @click="confirm = true, id = product.id">Удалить</button>
      </td>
    </tr>
    </tbody>
  </table>
  <teleport to="body">
    <app-confirm  v-if="confirm"
                  title="Вы уверены, что хотите удалить данный товар?"
                  @reject="confirm = false"
                  @confirm="remove(id),confirm = false">
      <p>Текущий товар будет удален</p>
    </app-confirm>
  </teleport>
</template>

<script>
import { useProducts } from '@/use/products'
import AppConfirm from "@/components/ui/AppConfirm";
import {ref} from "vue";

export default {
  components: {AppConfirm},
  setup() {
    const id = ref(null)
    const {
      items: products,
      category,
      price,
      open,
      edit,
      remove
    } = useProducts()
    return {
      products,
      category,
      price,
      open,
      edit,
      remove, id, confirm: ref(false)
    }
  }
}
</script>

<style scoped>
.table img {
  width: 50px;
}
.table td:last-child {
  width: 100px;
}
.table .btn {
  width: 150px;
  margin: 5px 0;
}
</style>
