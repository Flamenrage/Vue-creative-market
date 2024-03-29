export function pay({amount, description, accountId, data = {} }) {
    const widget = new cp.CloudPayments()

    return new Promise((resolve, reject) => { //обернули в промис ради ассинхронки
        widget.pay('charge',
            {
                publicId: 'test_api_00000000000000000000001',
                currency: 'RUB',
                skin: 'mini',
                description,
                amount,
                accountId,
                data
            },
            {
                onSuccess(options) {
                    resolve(options)
                },
                onFail(reason, options) {
                    reject(reason)
                }
            }
        )
    })
}
