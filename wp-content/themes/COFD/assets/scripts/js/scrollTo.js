import g from './globals'

setTimeout(() => {
    if (g.elementInDom('#delivery-options')) {
        const deliveryOptions = document.querySelector('#delivery-options')

        if (window.location.hash) {
            deliveryOptions.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            })
        }
    }
}, 1000)


if (g.elementInDom('.header-bar')) {
    const newsletter = document.querySelector('#newsletter')
    const subscribe = document.querySelector('.header-bar .subscribe-btn')

    subscribe.addEventListener('click', (e) => {
        e.preventDefault()
        newsletter.scrollIntoView({
            block: 'end',
            behavior: 'smooth'
        })
    })

}
