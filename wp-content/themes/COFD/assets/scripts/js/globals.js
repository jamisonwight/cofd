
export default {
    isMenuOpen: false,
    modules: [],
    getElementContentWidth: (element) => {
        var styles = window.getComputedStyle(element);
        var padding = parseFloat(styles.paddingLeft) +
                        parseFloat(styles.paddingRight);

        return element.clientWidth - padding;
    },
    addModule: (obj, index) => {
        var moduleSelector = document.querySelectorAll(obj.class)

        if (!obj.loaded) {
            import(obj.path).then(function(module) {
                // Render module
                module.render(index)
                obj.loaded = true;
                moduleSelector.forEach((module, index) => {
                    moduleObserver.unobserve(module)
                })
            })
        }
    },
    elementInDom: (selector) => {
        if (document.body.contains(document.querySelector(selector))) {
            return true
        } else {
            return false
        }
    },
    infiniteLoad: (config) => {
        var loadMoreButton = document.querySelector(config.buttonEl)

        // set the count of more listings with global variable
        // show more listings  
        var items = $(config.itemEl).slice(0, config.initCount)
        items.css({display: 'grid'})

        // Scroll to first listing
        // globals.setScrollPosition(listings, 320)

        $(loadMoreButton).on('click', (e) => { // click event for load more
            e.preventDefault()

            var hiddenItems = $(config.itemEl + ':hidden').slice(0, config.loadCount) // select next 10 hidden divs and show them
            $(hiddenItems).css({display: 'grid'})

            if ($(config.itemEl + ':hidden').length == 0) { // check if any hidden divs still exist
                $(loadMoreButton).hide()
            }
        })

        if ($(config.itemEl + ':hidden').length == 0) { // check if any hidden divs still exist
            $(loadMoreButton).hide()
        }
    }
}