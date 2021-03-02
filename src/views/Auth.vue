<template>
<app-auth></app-auth>
</template>

<script>
import {useLoginForm} from "@/use/auth/login-form";
import {useRoute} from "vue-router";
import Swal from 'sweetalert2'
import {error} from "@/utils/error";
import AppContent from "@/components/ui/AppContent";
import SignInForm from "@/components/sign/SignInForm";
import AppAuth from "@/components/ui/AppAuth";


export default {

  components:{AppAuth},
  setup(){
    const route = useRoute()
    if (route.query.message){
      Swal.fire({
        title: 'Ошибка',
        text:error(route.query.message),
        icon: 'error',
        confirmButtonText: 'Хорошо '
      })
    }
    return{ }
  }
}
</script>

<style scoped>

</style>
