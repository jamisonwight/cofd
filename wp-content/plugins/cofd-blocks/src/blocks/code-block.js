import { registerBlockType } from '@wordpress/blocks'
import { select, subscribe } from '@wordpress/data'
import { useEffect } from '@wordpress/element';
import useCodeMirror from '../hooks/useCodeMirror';
import eStyles from '../styles/edit'
import { useBlockProps } from '@wordpress/block-editor'

const CodeMirrorEditor = ({ title, content, onChange }) => {
    const codeMirrorRef = useCodeMirror(content, onChange);

    return (
        <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
            <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>{title}</h4>
            <div
                ref={codeMirrorRef}
                style={{ border: '1px solid #ccc', height: '600px' }} // You can extract this to a style object
            />
        </div>
    );
};

registerBlockType('cofd-blocks/code-block', {
    title: 'Code Block',
    icon: 'editor-code', // Replace with a suitable icon
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
        const { html, css } = attributes

        const blockProps = useBlockProps()

        const handleHTMLChange = (newHTML) => {
            setAttributes({ html: newHTML });
        };

        const handleCSSChange = (newCSS) => {
            setAttributes({ css: newCSS });
        };

        return (
            <div className={`event ${eStyles.main} ${eStyles.flex}`} {...blockProps}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h1 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Code Block</h1>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>HTML</h4>
                        <CodeMirrorEditor title="HTML" content={html} onChange={handleHTMLChange} />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>CSS</h4>
                        <CodeMirrorEditor title="CSS" content={css} onChange={handleCSSChange} />
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