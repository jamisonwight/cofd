export default {
    main: `relative block`,
    content_container: `w-full flex flex-row flex-wrap`,
    content: {
        title_container: `relative flex justify-center items-center w-[50%] -lg:w-full py-[80px] ` + 
            `overflow-hidden text-center`,
        content_container: `relative flex justify-center w-[50%] -lg:w-full py-[80px] overflow-hidden`,
        left: `lg:px-[60px] xl:px-[80px] -lg:px-[30px]`,
        right: `lg:px-[60px] xl:px-[80px] -lg:px-[30px]`,
        title_wrap: `relative w-full flex flex-col items-center z-1`,
        content_wrap: `relative w-full flex flex-col z-1`,
        title: `heading-2 mt-[40px] mb-[30px] [&>span]:italic [&>span]:txt-blue`,
        heading: `block`,
        copy: `paragraph-lg flex flex-col -lg:items-center lg:pl-[60px] [&>p]:max-w-[450px] -lg:text-center`,
        paragraph: `paragraph-lg`,
        btn_container: `w-full relative mt-[30px] lg:max-w-[450px]`,
        btn: `btn-default btn-blue`,
        gradient_container: `w-[100%] h-[100%] absolute left-[0] top-[0]`,
        gradient: `w-full h-full bottom-[0] right-[-30%] absolute object-cover z-0`
    }
}