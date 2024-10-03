import apiFetch from '@wordpress/api-fetch'
import { useSelect, select, dispatch } from '@wordpress/data'
import { useRef, useState, useEffect } from '@wordpress/element';
import { store } from '../store/index'
import squigglyWhite from '../assets/images/squiggly-white.svg'
import squigglyBlue from '../assets/images/squiggly-blue.svg'
import squigglyBlueDark from '../assets/images/squiggly-blue-dark.svg'
import squigglyBlack from '../assets/images/squiggly.svg'

export function getElementContentWidth(element) {
    const styles = window.getComputedStyle(element);
    const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

    return element.clientWidth - padding;
}

export function elementInDom(selector) {
    const element = document.querySelector(selector);

    if (element && document.body.contains(element)) {
        return true;
    } else {
        return false;
    }
}

export function infiniteLoad(config) {
    // Your infiniteLoad function code here
}

export function createMarkup(content) {
    return { __html: content };
}


export function getSiteURL() {
     // Get the current post's URL
    const postUrl = select("core/editor").getEditedPostAttribute("link");

     // Extract the site URL from the post URL
    return postUrl ? postUrl.split("/").slice(0, 3).join("/") : "";
}

export function truncateText(text, wordCount) {
    const words = text.split(' ');
    if (words.length <= wordCount) {
      return text + ' ...';
    }
    const truncatedText = words.slice(0, wordCount).join(' ');
    return `${truncatedText} ...`;
}


export function getSquiggly(color) {
    switch (color) {
        case "white":
            return squigglyWhite
        case "blue": 
            return squigglyBlue
        case "blue-dark": 
            return squigglyBlueDark
        case "black":
            return squigglyBlack
    }
}

export function imageDimensions(defaultW, customW, defaultH, customH) {
    let width = (customW) ? `w-[${customW}]` : defaultW 
    let height = (customH) ? `!h-[${customH}]` : defaultH
    return `${width} ${height}`
}

export function savePostAttributesToJSON(attributes, postID, apiPath) {
    const jsonData = JSON.stringify(attributes);

    // Make an HTTP POST request to the custom endpoint
    apiFetch({
        path: apiPath,
        method: 'POST',
        data: {
            postID: postID,
            data: jsonData,
        },
    })
    .then((response) => {
        console.log(response.message); // Log the response from the server
    })
    .catch((error) => {
        console.error(error); // Log any errors
    });
}

export async function getDataToJSON(apiPath) {
    // Make an HTTP POST request to the custom endpoint
    return apiFetch({
        path: apiPath,
        method: 'GET',
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.error(error) // Log any errors
        throw error
    });
}


export const useAfterSave = () => {
    const [ isPostSaved, setIsPostSaved ] = useState( false );
    const isPostSavingInProgress = useRef( false );
    const { isSavingPost, isAutosavingPost } = useSelect( ( __select ) => {
        return {
            isSavingPost: __select( 'core/editor' ).isSavingPost(),
            isAutosavingPost: __select( 'core/editor' ).isAutosavingPost(),
        }
    } );

    useEffect( () => {
        if ( ( isSavingPost || isAutosavingPost ) && !isPostSavingInProgress.current ) {
            setIsPostSaved( false );
            isPostSavingInProgress.current = true;
        }
        if ( ! ( isSavingPost || isAutosavingPost ) && isPostSavingInProgress.current ) {
            // Code to run after post is done saving.
            setIsPostSaved( true );
            isPostSavingInProgress.current = false;
        }
    }, [ isSavingPost, isAutosavingPost ] );

    return isPostSaved;
}
