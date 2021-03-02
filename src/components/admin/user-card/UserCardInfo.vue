<template>
  <form @submit.prevent>
    <div class="form-body">
      <div class="form-control">
        <label for="name">Имя</label>
        <input type="text" id="name" v-model="name">
      </div>
      <div class="form-control">
        <label for="email">email</label>
        <input class="disabled" type="email" id="email" v-model="email" readonly>
      </div>
      <div class="form-control">
      <label for="role">Тип</label>
        <select name="role" id="role" v-model="role">
          <option
              v-for="(role, value) in roles"
              :key="role"
              :value="value"
          >{{ role }}</option>
        </select>
      </div>
    </div>
    <div class="form-submit">
      <button class="btn primary" v-if="id" :disabled="!isValid || !hasChanges" @click="onUpdate">Сохранить</button>
    </div>
  </form>
  <app-confirm
      v-if="leave"
      title="Есть несохраненные изменения. Вы хотите покинуть страницу?"
      @reject="leave = false"
      @confirm="navigate" />
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUsers } from '@/use/users'
import {useLeaveGuard} from "@/use/leave-guard";
import AppConfirm from '@/components/ui/AppConfirm'
import {useSignUpForm} from "@/use/auth/signup-form";
export default {
  components: { AppConfirm },
  props: {
    action: {
      email: Function
    }
  },
  emits: ['action'],
  setup(_, { emit }) {
    const route = useRoute()
    const {
      items: users,
      roles,
      update
    } = useUsers()

    const { id } = route.params
    const user = computed(() => id ? users.value.find(item => item.id === id) : null)
    const name = ref(id ? user.value.name : '')
    const email = ref(id ? user.value.email : '')
    const role = ref(id ? user.value.role : '')

    const hasChanges = computed(() => {
      return !!((route.params.id) && (user.value.name !== name.value ||
          user.value.role !== role.value));
    })

    const onUpdate = async () => {
      const item = {
        name: name.value,
        email: email.value,
        role: role.value
      }
      await update({id, ...item})
      emit('action')
    }
    return {
      id,
      users,
      roles,
      name,
      email,
      role,
      hasChanges,
      isValid: computed(() =>
          name.value && email.value  && role.value),
      ...useLeaveGuard(hasChanges),
      onUpdate
    }
  }
}
</script>

<style scoped>
.form-inline .form-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form-inline .form-control {
  width: 48%;
}
.form-control {
  margin-bottom: 15px;
}
.disabled {
  background: #dddddd;
}
</style>
