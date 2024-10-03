import { elementInDom } from '../utils'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css'

if (elementInDom('.callout-sliders')) {
    const sliders = document.querySelectorAll('.callout-sliders .callout')

    sliders.forEach((obj, index) => {
        const container = obj.querySelector('.slider-container')

        const swiper = new Swiper(container, {
            direction: 'horizontal',
            modules: [ Navigation, Autoplay, EffectFade ],
            loop: true,
            spaceBetween: 10,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: obj.querySelector('.nav-prev'),
                nextEl: obj.querySelector('.nav-next'),
            },
        })
    })
}