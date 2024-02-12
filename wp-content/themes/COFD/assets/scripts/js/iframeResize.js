import iFrameResize from 'iframe-resizer/js/iframeResizer'
import g from './globals'

if (g.elementInDom('#locator-iframe')) {
    iFrameResize({ log:true, scrolling:'auto', resizeFrom:'parent', bodyMargin:'20px 0' }, '#locator-iframe')
}
