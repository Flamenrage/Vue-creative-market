import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useProductForm() {
    const { handleSubmit, isSubmitting } = useForm()

    const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField(
        'text',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите название')
    )

    const { value: img, errorMessage: imgError, handleBlur: imgBlur } = useField(
        'text',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите путь до изображения')
    )

    const { value: price, errorMessage: priceError, handleBlur: priceBlur } = useField(
        'number',
        yup
            .string()
            .trim()
            .min(0)
            .required('Значение может быть меньше 0')
    )

    const { value: count, errorMessage: countError, handleBlur: countBlur } = useField(
        'number',
        yup
            .string()
            .trim()
            .min(0)
            .required('Значение не может быть меньше 0')
    )

    const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField(
        'text',
        yup
            .string()
            .trim()
            .required('Выберите категорию')
    )

    return {
        title,
        titleError,
        titleBlur,
        img,
        imgError,
        imgBlur,
        price,
        priceError,
        priceBlur,
        count,
        countError,
        countBlur,
        category,
        categoryError,
        categoryBlur,
        isSubmitting,
        handleSubmit
    }
}
