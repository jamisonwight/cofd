import g from './globals'
import MicroModal from 'micromodal'

MicroModal.init()

if (g.elementInDom('.modal-trigger')) {
    const triggers = document.querySelectorAll('.modal-trigger')

    triggers.forEach((obj) => {
        obj.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault()
            return false
        })

        obj.addEventListener('click', (e) => {
            e.preventDefault()
            MicroModal.show('schedule-modal')
        })
    })
}