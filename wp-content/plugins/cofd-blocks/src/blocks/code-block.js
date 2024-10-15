import { registerBlockType } from '@wordpress/blocks'
import { select, subscribe } from '@wordpress/data'
import { useEffect } from '@wordpress/element';
import useCodeMirror from '../hooks/useCodeMirror';
import eStyles from '../styles/edit'
import { useBlockProps } from '@wordpress/block-editor'



registerBlockType('cofd-blocks/code-block', {
    title: 'Code Block',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        html: {
            type: 'string',
            default: '',
        },
        css: {
            type: 'string',
            default: '',
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            html,
            css,
        } = attributes

        const blockProps = useBlockProps()

        const handleHTMLChange = (newHTML) => {
            setAttributes({ html: newHTML });
        };

        const handleCSSChange = (newCSS) => {
            setAttributes({ css: newCSS });
        };

        // Use the custom hook to initialize CodeMirrors for html and CSS
        const codeMirrorHTMLRef = useCodeMirror(html, handleHTMLChange);
        const codeMirrorCSSRef = useCodeMirror(css, handleCSSChange);

        return (
            <div className={`event ${eStyles.main} ${eStyles.flex}`} {...blockProps}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h1 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Code Block</h1>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>HTML</h4>
                        <div ref={codeMirrorHTMLRef} style={{ border: '1px solid #ccc', height: '600px' }} />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>CSS</h4>
                        <div ref={codeMirrorCSSRef} style={{ border: '1px solid #ccc', height: '600px' }} />
                    </div>
                </div>
            </div>
        );
    },
    save: function () {
        // Template is in '/dynamic-blocks/code-block.php
        return null;
    },
})