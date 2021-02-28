<template>
  <div class="card">
    <button class="btn" @click="create">Create</button>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import database from '../../../database.json'
export default {
  setup() {
     const store = useStore()
     const data = database.products.map(d =>{
       delete d.id //избавляемся от id в json файле, т.к. FB генерирует кастомные id
       return d
     })
     console.log(data)
    function create() {
      let index = 0

      setInterval(async () => {
        await store.dispatch('products/add', data[index])
        index++ //отправляем запрос на сервер FB раз в секунду с добавлением продукта
      }, 1000)
    }
    return {
      create
    }
  }
}
</script>

<style scoped>

</style>
