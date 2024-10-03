import { elementInDom } from "../utils";

if (elementInDom('.featured-bios')) {
    const elements = document.querySelectorAll('.bio-item')

    elements.forEach((obj, index) => {
        const videoContainer = obj.querySelector('.bio-video-cursor')
        const video = obj.querySelector('.bio-video-cursor video')
        const offset = 40

        if (video) {
            let isHovering = false

            obj.addEventListener('mouseenter', (e) => {
                e.preventDefault()
                console.log('mouse entering')
                // Set isHovering to true when entering the content area
                isHovering = true
            })

            obj.addEventListener('pointermove', (e) => {
                e.preventDefault()
                const { clientX, clientY } = e
                const cursorWidth = videoContainer.offsetWidth
                const cursorHeight = videoContainer.offsetHeight

                console.log(clientY)

                // Calculate the position of the video cursor
                let x = clientX - cursorHeight + 200
                let y = clientY - cursorWidth + 400

                // Set the video cursor position
                videoContainer.style.left = `${x}px`
                videoContainer.style.top = `${y}px`

                // Play the video and show the video cursor
                video.play()
                videoContainer.style.opacity = 1
            })

            obj.addEventListener('mouseleave', (e) => {
                e.preventDefault()
                console.log('mouse leaving')
                // Pause the video and hide the video cursor when leaving the content area
                isHovering = false
                video.pause()
                videoContainer.style.opacity = 0
            })
        }
    })
}
