import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/callout-banner'
import eStyles from '../styles/edit'
import { useEffect } from 'react'
import lines from '../assets/images/line-bg.png'
import gradient from '../assets/images/radial-gradient.svg'
import { createMarkup } from '../lib/utils'
import { TextControl } from '@wordpress/components'
import {
    RichText,
    useBlockProps,
    MediaUpload, 
    MediaUploadCheck, 
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/callout-banner', {
    title: 'Callout Banner',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        title: {
            type: 'string',
            default: '',
        },
        content: {
            type: 'string',
            default: '',
            selector: 'p'
        },
        customBGID: {
            type: 'number',
            default: 0,
        },
        customBGURL: {
            type: 'string',
            default: '',
        },
        buttonText: {
            type: 'string',
            default: '',
        },
        buttonURL: {
            type: 'string',
            default: ''
        },
        opensInNewTab: {
            default: 'boolean',
            type: false,
        }
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            title,
            content,
            buttonText,
            buttonURL,
            customBGID,
            customBGURL,
            opensInNewTab,
        } = attributes

        const blockProps = useBlockProps()

        const onSelectImage = (media) => {
            setAttributes({
                customBGID: media.id,
                customBGURL: media.url,
            })
        }

        const onRemoveImage = () => {
            setAttributes({
                customBGID: 0,
                customBGURL: '',
            })
        }
        
        return (
            <div className={`callout-banner ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Callout Banner</h2>
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                        <h4 className={eStyles.my_sm}>Custom Background Image</h4>

                        <MediaUploadCheck>
                            {customBGURL 
                            ? <img 
                                src={customBGURL} 
                                alt="Banner Background Image"
                                className={eStyles.image} 
                                />
                            : null
                            }

                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={customBGID}
                                render={({ open }) => (
                                    <div>
                                        {customBGID ? (
                                            <button
                                                onClick={onRemoveImage}
                                                className={eStyles.button}
                                                >
                                                Remove Image
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={open}
                                                className={eStyles.button}
                                                >
                                                Select Image
                                            </button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`} style={{ background: `url(${lines})` }}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h3 className={eStyles.my_sm}>Title Block</h3>
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Title</h4>

                        <TextControl
                            value={ title }
                            onChange={ ( title ) => setAttributes({ title })}
                        />
                    </div>
                </div>

                <div className={`item bg-black text-white ${eStyles.item} ${eStyles.flex_6}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h3 className={eStyles.my_sm}>Content</h3>
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ content } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( content ) => setAttributes({ content })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button Text</h4>

                        <TextControl
                            value={buttonText}
                            onChange={ ( buttonText ) => setAttributes({ buttonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button URL</h4>

                        <LinkControl
                            label="Link URL"
                            value={{ url: buttonURL, opensInNewTab: opensInNewTab }}
                            onChange={ ( newURL ) => setAttributes({ buttonURL: newURL.url, opensInNewTab: newURL.opensInNewTab })}
                            onRemove={() => { setAttributes({ buttonURL: '' }) }}
                        />
                    </div>
                </div>
            </div>
        )
    },
    save: function ({ attributes }) {
        const { 
            title,
            content,
            buttonText,
            buttonURL,
            customBGURL,
            opensInNewTab,
        } = attributes

        const bg = (customBGURL) ? `url(${customBGURL})` : `url(${lines})`
        const targetTab = (opensInNewTab) ? '_blank' : '_self'

        return (
            <div className={`callout-banner ${styles.main}`}>
                <div className={`content-container ${styles.content_container}`}>
                    <div 
                        className={`title-container ${styles.content.title_container} ${styles.content.left}`}
                        style={{ background: bg }}
                        >
                        <div className={`title-wrap ${styles.content.title_wrap}`}>
                            <RichText.Content 
                                value={title} 
                                tagName="h2"
                                className={`heading ${styles.content.title}`} 
                            />
                        </div>
                    </div>

                    <div className={`content ${styles.content.content_container} ${styles.content.right}`}>
                        <div className={`content-wrap ${styles.content.content_wrap}`}>
                            <div className={`copy ${styles.content.copy}`}>
                                <RichText.Content value={content} tagName="p" className={styles.paragraph}/>

                                <div className={`btn-container ${styles.content.btn_container}`}>
                                    <a 
                                        className={styles.content.btn} 
                                        href={buttonURL}
                                        target={targetTab}
                                        rel="noopener"
                                        >
                                        {buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})