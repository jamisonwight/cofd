export default {
    main: `relative block bg-black -lg:py-[40px] lg:pb-[100px] lg:pt-0 overflow-hidden border-b-blue border-b-[1px] border-b-solid`,
    content_container: `w-full flex-col justify-center items-center grid-medium -lg:px-[30px]`,
    row_type: {
        two_column: `w-full flex flex-row flex-wrap lg:justify-between lg:items-center pt-[100px] animate-title ` + 
            `-lg:pt-[40px] -lg:text-center -lg:items-center -lg:flex-col-reverse`,
        two_column_reverse: `w-full flex flex-row-reversed flex-wrap lg:justify-between lg:items-center pt-[100px] animate-title ` +
            `-lg:pt-[40px] -lg:text-center -lg:justify-center`,
    },
    image_container: `relative animate-gradient-bg w-[300px] h-[200px] md:w-[420px] md:h-[320px] ` + 
        `lg:w-[420px] lg:h-[320px]`,
    slider_container: `relative w-full h-full overflow-hidden p-[10px] z-[1]`,
    swiper_wrapper: ``,
    swiper_slide: `w-full h-full`,
    image: `relative w-full h-full object-cover z-[3]`,
    nav_prev: `absolute left-[-20px] top-[50%] translate-y-[-50%] w-[60px] h-[60px] z-[3]`,
    nav_next: `absolute right-[-20px] top-[50%] translate-y-[-50%] rotate-180 w-[60px] h-[60px] z-[3]`,
    nav_arrow: `w-full h-full cursor-pointer`,
    content: `relative w-full lg:w-[calc(100%_-_600px)] -lg:my-[40px]`,
    content_full: `relative flex-col text-center mb-[60px] z-[3]`,
    image_full: `relative animate-gradient-bg md:w-[588px] md:h-[382px] lg:w-[688px] lg:h-[382px] z-[3]`,
    content_wrapper: `relative w-full text-white -lg:text-center -lg:flex -lg:flex-col -lg:items-center`,
    content_reverse_wrapper: `lg:text-right`,
    title: `heading-2 block animate-title-text`,
    paragragh: `pt-[20px] max-w-[678px]`,
    btn: `block mt-[40px] btn-default btn-blue`,
    gradient_left: `text-radial-gradient text-radial-gradient-left z-1`,
    gradient_right: `text-radial-gradient text-radial-gradient-right z-1`,
    gradient_center: `text-radial-gradient text-radial-gradient-center z-1`,
    title_right: `justify-end`,
    title_center: `justify-center`,
}