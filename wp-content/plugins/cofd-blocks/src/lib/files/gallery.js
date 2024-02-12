import { elementInDom } from '../utils'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

if (elementInDom('.gallery')) {
    const galleries = document.querySelectorAll('.gallery-container')

    galleries.forEach((obj) => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: obj,
            children: 'a',
            pswpModule: () => import('photoswipe')
        })

        lightbox.init()
    })
}
