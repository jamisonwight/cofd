export default {
    main: `relative block`,
    content_container: `w-full flex flex-wrap`,
    content: {
        main: `relative flex justify-center items-center w-[50%] -lg:w-full py-[80px] overflow-hidden`,
        left: `justify-end lg:px-[60px] xl:px-[80px] -lg:px-[30px]`,
        right: `lg:px-[60px] xl:px-[80px] -lg:px-[30px]`,
        content_wrap: `relative w-full flex-col justify-center items-center text-center z-1`,
        title: `heading-2 mt-[40px] mb-[30px] [&>span]:italic`,
        heading: `block`,
        copy: `flex justify-center items-center mb-[40px] [&>p]:max-w-[450px]`,
        btn_container: `relative pb-[10px] mb-[30px]`,
        btn: `btn-box btn-box-dark`,
        gradient_container: `w-[100%] h-[100%] absolute left-[0] top-[0]`,
        gradient: `w-full h-full bottom-[0] right-[-30%] absolute object-cover z-0`
    }
}