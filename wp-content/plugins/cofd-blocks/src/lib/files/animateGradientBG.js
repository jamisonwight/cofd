import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { elementInDom } from '../utils'
import { gradientBlueTanStart, gradientBlueTanEnd } from '../gradients'


if (elementInDom('.animate-gradient-bg')) {
    gsap.registerPlugin(ScrollTrigger)

    // Create a function to set up the scroll-triggered animation
    function animateGradientBG() {
        const animationWrappers = document.querySelectorAll('.animate-gradient-bg')

        animationWrappers.forEach((wrapper) => {
            gsap.fromTo(
            wrapper,
            { background: gradientBlueTanStart },
            {
                background: gradientBlueTanEnd,
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top 60%', // Adjust this value as needed
                    end: 'bottom 40%', // Adjust this value as needed
                    scrub: 0.5, // Adjust this value as needed
                },
            }
            )
        })
    }

    // Call the setupScrollAnimation function when the DOM is ready
    document.addEventListener('DOMContentLoaded', animateGradientBG)
}