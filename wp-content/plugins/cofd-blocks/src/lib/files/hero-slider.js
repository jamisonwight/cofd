import { elementInDom } from '../utils'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css'

if (elementInDom('.hero-slider')) {
    const sliders = document.querySelectorAll('.hero-slider')

    sliders.forEach((obj, index) => {
        const container = obj.querySelector('.slider-container')

        const swiper = new Swiper(container, {
            direction: 'horizontal',
            modules: [ Navigation, Pagination, Autoplay, EffectFade ],
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            centeredSlides: false,
            pagination: {
                el: container.querySelector('.swiper-pagination'),
            },
        })
    })
}