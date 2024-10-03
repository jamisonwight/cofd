export default {
    main: `relative block overflow-clip`,
    header_offset: `lg:mt-[-195.55px] h-[calc(100vh_-_59.51px)] md:h-[750px] lg:h-[100vh]`,
    slider_container: `grid w-full h-full`,
    swiper_wrapper: `relative w-full flex justify-center items-center`,
    swiper_slide: `w-full h-full -lg:flex -lg:items-end gradient-overlay z-[2]`,
    video_container: `w-full h-full absolute top-0 left-0 gradient-overlay gradient-overlay-top`,
    video: `w-full h-full object-cover -lg:object-top`,
    cutout: {
        main: `block w-full text-center -lg:h-[750px] -md:h-[450px] gradient-overlay-top`,
        image: `-lg:max-h-[calc(100vh_-_215.55px)] lg:h-[calc(100vh_-_185.55px)] h-full object-cover`,
    },
    content: {
        main: `w-full absolute bottom-[40px] -lg:text-center z-[3] max-w-[1024px] ` +
            `lg:left-[50%] lg:translate-x-[-50%] lg:flex lg:flex-col lg:items-end lg:justify-end lg:px-[20px] xl:px-0`,
        title: `heading-3 text-white pb-[10px] block`,
        btn_container: `relative pb-[10px] mb-[30px]`,
        btn: `block`,
    },
    logo: `inline-block mb-[20px] lg:hidden max-w-[200px] invert`
}