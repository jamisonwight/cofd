// import main SASS file
import '../../styles/scss/style.scss'

// Import Foundation
import './init-foundation'

// import './lazyload'
import './ie'
import './fancybox'
import './animations'
import './sliders'
import './scheduleModal'
import './headerSticky'

// Mac Specific Font Spacing Hack
if (navigator.userAgent.match(/Macintosh/) || navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.querySelectorAll('.heading-1, .heading-2, .heading-3, .heading-4, .heading-5, .btn-default, .btn, .section-title').forEach((obj, index) => {
        obj.classList.add('is-mac')
    })
}

// Add Classes To Target Safari  
var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;

if (isSafari) {
    document.querySelectorAll('.grid-container').forEach((obj, index) => {
        obj.classList.add('is-safari')
    })
}