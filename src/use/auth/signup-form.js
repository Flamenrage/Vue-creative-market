import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed} from "vue";
import {watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import Swal from 'sweetalert2'


export function useSignUpForm() {

    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const{handleSubmit, isSubmitting, submitCount} = useForm() //handleSubmit - функция обработки сабмита формы, isSubmitting - функция, позволяющая
    // например дизэйблить кнопку во время обработки запроса
    //submitCount - сколько раз мы сабмитили кнопку
    const{value: email,errorMessage: eError,handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Пожалуйста введите почтовый адрес').email('Пожалуйста введите корректный почтовый адрес') //утилита для валидации, строка, обрезанная + обязательная + тип email

    ) //хук для конфигурации валидации, 1й параметр - название поля
    //blur - убираем фокус и сразу валидируются данные
    const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите имя')
    )
    const MIN_PASSWORD = 6
    const{value: password,errorMessage: pError,handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Пожалуйста введите пароль').min(MIN_PASSWORD, `Пароль должен содержать не менее ${MIN_PASSWORD} символов`)
    )
    const isTooManyClicks = computed(() => submitCount.value >= 3) //было вызвано событие более трех раз, оборачиваем в computed свойство

    watch(isTooManyClicks, val => { //следим за количеством кликов, если функция вернула true, через некоторое время обновляем кнопку
        if (val){
            setTimeout(() => submitCount.value = 0, 1500)
        }
    })

    const onSubmit = handleSubmit(async values => {
        try {

            await store.dispatch('auth/signUp', {
                ...values,
                role: 'user'
            })
            await  router.push('/')

        } catch (e) {
            const message = e.toString().replace("Error: ", "")
            await Swal.fire({
                title: 'Ошибка',
                text: message,
                icon: 'error',
                confirmButtonText: 'Хорошо '
            })
        }
    })

    return{
        name,
        nameError,
        nameBlur,
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyClicks,
    }
}
