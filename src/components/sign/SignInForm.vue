<template>
  <app-content title="Войти в систему">
    <form @submit.prevent="onSubmit">
      <div class="form-control" :class="['form-control', {invalid: eError}]">
        <label for="email"> Email </label>
        <input type="email" id="email" class="type" v-model="email" @blur="eBlur">
        <small v-if="eError">{{eError}}</small>
      </div>
      <div :class="['form-control', {invalid: pError}]">
        <label for="password"> пароль </label>
        <input type="password" id="password" class="type"  v-model="password" @blur="pBlur">
        <small v-if="pError">{{pError}}</small>
      </div>
      <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyClicks">Войти</button>
      <span class="text-danger" v-if="isTooManyClicks">Вы слишком часто обращаетесь к серверу, остановитесь, прошу!</span>
    </form>
  </app-content>
</template>

<script>
import {useLoginForm} from "@/use/auth/login-form";
import {error} from "@/utils/error";
import AppContent from "@/components/ui/AppContent";


export default {

  components:{AppContent},
  setup(){
    return{...useLoginForm()}
  }
}
</script>

<style scoped>

</style>
