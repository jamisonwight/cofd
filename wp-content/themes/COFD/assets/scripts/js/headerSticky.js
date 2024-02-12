import g from './globals'

const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

if (isDesktop && g.elementInDom('.header-wrapper')) {
    const trigger = document.querySelector('.sticky-trigger');
    const header = document.querySelector('header');
    const header_wrapper = document.querySelector('.header-wrapper');
    const sticky = header.offsetTop;
    var hasInitialLightHeader = false;

    if (header.classList.contains('header-light')) {
        hasInitialLightHeader = true;
    }

    const buffer = 20; // Adjust this value as needed

    const observer = new IntersectionObserver(
    ([e]) => {
        if (e.intersectionRatio < 1) {
            header_wrapper.classList.add("header-sticky");
            if (!hasInitialLightHeader) header.classList.add("header-light");
        } else {
            header_wrapper.classList.remove("header-sticky");
            if (!hasInitialLightHeader) header.classList.remove("header-light");
        }
    },
    { threshold: [1], rootMargin: `-${buffer}px 0px` }
    );

    observer.observe(trigger);
}