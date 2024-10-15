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
        title: {
            type: 'string',
            default: '',
        },
        code: {
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
            title,
            code,
            css,
        } = attributes

        const blockProps = useBlockProps()

        useEffect(() => {
            const postTitle = select("core/editor").getEditedPostAttribute("title")

            // Update the attributes with post title and ID
            setAttributes({
                title: postTitle,
            })
        }, [])

        const handleDocChange = (newContent) => {
            setAttributes({ code: newContent });
        };

        // Use the custom hook to initialize CodeMirrors for html and CSS
        const codeMirrorCodeRef = useCodeMirror(code, handleDocChange);
        const codeMirrorCSSRef = useCodeMirror(css, handleDocChange);

        return (
            <div className={`event ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h1 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Code Block</h1>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>HTML</h4>
                        <div ref={codeMirrorCodeRef} style={{ border: '1px solid #ccc', height: '600px' }} />
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