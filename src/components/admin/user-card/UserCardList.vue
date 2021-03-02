<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Имя</th>
      <th>Email</th>
      <th>Тип</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user, i) in pages[active_page]" :key="user.id">
      <td>{{ index(i) }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ roles[user.role] }}</td>
      <td>
        <button class="btn primary" @click="edit(user)" v-if="user.role !== 'admin'">Изменить</button>
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
import { useUsers } from '@/use/users'
import { usePagination } from '@/use/pagination'
import AppPagination from '@/components/ui/AppPagination'
import {useRouter} from "vue-router";
export default {
  components: { AppPagination },
  setup() {
    const router = useRouter()
    const edit =({ id }) => router.push(`/admin/users/${id}`)
    const {
      items: users,
      roles,
      open
    } = useUsers()
    return {
      users,
      roles,
      open,
      edit,
      ...usePagination(users)
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
