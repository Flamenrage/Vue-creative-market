const formatter = new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
})

export const currency = value => formatter.format(value)
