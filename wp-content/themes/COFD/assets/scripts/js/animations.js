import ScrollReveal from 'scrollreveal'
import g from './globals'


document.addEventListener("DOMContentLoaded", function () {

    ScrollReveal().reveal('.animContainer', {
        afterReveal: (el) => {
            if (el.querySelector('.animInUp') !== null) {
                el.querySelector('.animInUp').classList.add('animInUpActive')
            }

            if (el.querySelector('.animInUpSmall') !== null) {
                el.querySelector('.animInUpSmall').classList.add('animInUpSmallActive')
            }

            if (el.querySelector('.animInDown') !== null) {
                el.querySelector('.animInDown').classList.add('animInDownActive')
            }

            if (el.querySelector('.animInDownSmall') !== null) {
                el.querySelector('.animInDownSmall').classList.add('animInDownSmallActive')
            }

            if (el.querySelector('.animInFade') !== null) {
                el.querySelector('.animInFade').classList.add('animInFadeActive')
            }

            if (el.querySelector('.animInLeft') !== null) {
                el.querySelector('.animInLeft').classList.add('animInLeftActive')
            }

            if (el.querySelector('.animInFarLeft') !== null) {
                el.querySelector('.animInFarLeft').classList.add('animInFarLeftActive')
            }

            if (el.querySelector('.animInRight') !== null) {
                el.querySelector('.animInRight').classList.add('animInRightActive')
            }

            if (el.querySelector('.animInScale') !== null) {
                el.querySelector('.animInScale').classList.add('animInScaleActive')
            }

            if (el.querySelector('.animInScaleDelay') !== null) {
                el.querySelector('.animInScaleDelay').classList.add('animInScaleDelayActive')
            }

        },
        viewFactor: 0.3,
        easing: 'ease-in' 
    })

})