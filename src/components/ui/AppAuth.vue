<template>
  <keep-alive>
    <component :is="active+'Form'"></component>
  </keep-alive>
  <div class="card">
    <button :class="['btn', {
        primary: active === 'signIn'
      }]" @click="active = 'signIn'">Уже есть аккаунт</button>
    <button :class="['btn', {
        primary: active === 'signUp'
      }]" @click="active = 'signUp'">Создать аккаунт</button>
  </div>
</template>

<script>
import SignInForm from "@/components/sign/SignInForm";
import {ref} from "vue";
import SignUpForm from "@/components/sign/SignUpForm";

export default {
  components:{SignInForm, SignUpForm},
  setup(){
    const active = ref('signIn')
    return{ active, }
  }
}
</script>

<style scoped>

</style>
