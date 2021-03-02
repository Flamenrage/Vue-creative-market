<template>
  <app-content title="Зарегистрироваться">
    <form @submit.prevent="onSubmit">
      <div class="form-control" :class="['form-control', {invalid: nameError}]">
        <label for="name"> Имя </label>
        <input type="text" id="name" class="type" v-model="name" @blur="nameBlur">
        <small v-if="nameError">{{nameError}}</small>
      </div>
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
      <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyClicks">Создать</button>
      <span class="text-danger" v-if="isTooManyClicks">Вы слишком часто обращаетесь к серверу, остановитесь, прошу!</span>
    </form>
  </app-content>
</template>

<script>
import {error} from "@/utils/error";
import AppContent from "@/components/ui/AppContent";
import {useSignUpForm} from "@/use/auth/signup-form";


export default {

  components:{AppContent},
  setup(){

    return{...useSignUpForm()}
  }
}
</script>

<style scoped>

</style>
