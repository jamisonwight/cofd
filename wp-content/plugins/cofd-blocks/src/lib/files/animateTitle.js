import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { elementInDom } from '../utils'


if (elementInDom('.animate-title')) {
    gsap.registerPlugin(ScrollTrigger)

    // Create a function to set up the scroll-triggered animation
    function animateTitles() {
        const animationWrappers = document.querySelectorAll('.animate-title');

        animationWrappers.forEach((wrapper) => {
            const textWrapper = wrapper.querySelector('.animate-title-text');
            const words = textWrapper.innerHTML.split(/\s+(?![^<]*>)/); // Split text into words, excluding HTML tags

            textWrapper.innerHTML = words.map((word) => {
                if (word.startsWith('<span') && word.endsWith('</span>')) {
                    // Preserve the span-wrapped word and apply text animation to each character
                    const innerSpan = document.createElement('span');
                    innerSpan.innerHTML = word;
                    const innerText = innerSpan.textContent;
                    const existingClass = innerSpan.querySelector('span').classList.value; // Get the existing class
                    return `<span class='word ${existingClass}'>${Array.from(innerText).map(char => `<span class='letter'>${char}</span>`).join(' ')}</span>`;
                }
                return `<span class='word'>${Array.from(word).map(char => `<span class='letter'>${char}</span>`).join(' ')}</span>`;
            }).join(' ');

            const wordTimelines = Array.from(textWrapper.querySelectorAll('.word')).map((word, index) => {
                const letters = Array.from(word.querySelectorAll('.letter'));

                return gsap.timeline({
                    scrollTrigger: {
                        trigger: textWrapper,
                        start: "bottom 100%",
                        end: "top+=200px 0",
                        scrub: 2,
                        markers: false,
                    }
                }).from(letters, {
                    translateX: 40,
                    translateZ: 0,
                    opacity: 0,
                    ease: "expo.out",
                    duration: 1.2,
                    stagger: {
                        amount: 1,
                        grid: [1, letters.length],
                        from: "start",
                    },
                }).to(letters, {
                    translateX: -40,
                    translateZ: 0,
                    opacity: 0,
                    ease: "expo.in",
                    duration: 1.2,
                    stagger: {
                        amount: 1,
                        grid: [1, letters.length],
                        from: "end",
                    },
                });
            });
        });
    }

    // Call the setupScrollAnimation function when the DOM is ready
    document.addEventListener('DOMContentLoaded', animateTitles);
}