<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Кол-во товаров</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(category, i) in pages[active_page]" :key="category.id">
      <td>{{ index(i) }}</td>
      <td>{{ category.title }}</td>
      <td>{{ category.type }}</td>
      <td>{{ productsTotal(category) }}</td>
      <td>
        <button class="btn" @click="open(category)">Посмотреть</button>
        <button class="btn primary" @click="edit(category)">Изменить</button>
        <button class="btn danger" @click="confirm = true, id = category.id" v-if="!productsTotal(category)">Удалить</button>
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
  <teleport to="body">
      <app-confirm  v-if="confirm"
                    title="Вы уверены, что хотите удалить категорию?"
                    @reject="confirm = false"
                    @confirm="remove(id),confirm = false">
        <p>Текущая категория будет удалена</p>
      </app-confirm>
  </teleport>
</template>

<script>
import {useCategories} from '@/use/categories'
import AppConfirm from "@/components/ui/AppConfirm";
import {ref} from 'vue';
import {usePagination} from "@/use/pagination";
import {onMounted, watch} from "vue";
import AppPagination from "@/components/ui/AppPagination";

export default {
  components: {AppConfirm, AppPagination},
  setup() {
    const id = ref(null)
    const {
      items: categories,
      productsTotal,
      open,
      edit,
      remove
    } = useCategories()


    return {
      categories,
      productsTotal,
      open,
      edit,
      remove,
      confirm: ref(false),
      id,
      ...usePagination(categories)

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
