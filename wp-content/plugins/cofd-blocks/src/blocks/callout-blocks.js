import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/callout-blocks'
import eStyles from '../styles/edit'
import { useEffect } from 'react'
import lines from '../assets/images/line-bg.png'
import gradient from '../assets/images/radial-gradient.svg'
import { createMarkup } from '../lib/utils'
import { TextControl } from '@wordpress/components'
import {
    RichText,
    useBlockProps, 
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'

registerBlockType('cofd-blocks/callout-blocks', {
    title: 'Callout Blocks',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        lTitle: {
            type: 'string',
            default: '',
        },
        lContent: {
            type: 'string',
            default: '',
            selector: 'p'
        },
        lButtonText: {
            type: 'string',
            default: '',
        },
        lButtonURL: {
            type: 'string',
            default: ''
        },
        rTitle: {
            type: 'string',
            default: '',
        },
        rContent: {
            type: 'string',
            default: '',
            selector: 'p'
        },
        rButtonText: {
            type: 'string',
            default: '',
        },
        rButtonURL: {
            type: 'string',
            default: ''
        },
        openInNewTabFirst: {
            type: 'boolean',
            default: false,
        },
        openInNewTabSecond: {
            type: 'boolean',
            default: false,
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            lTitle,
            lContent,
            lButtonText,
            lButtonURL,
            rTitle,
            rContent,
            rButtonText,
            rButtonURL,
            openInNewTabFirst,
            openInNewTabSecond,
        } = attributes

        const blockProps = useBlockProps()
        
        return (
            <div className={`callout-blocks ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Callout Blocks</h2>
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`} style={{ background: `url(${lines})` }}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h3 className={eStyles.my_sm}>Block Left</h3>
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Title</h4>

                        <TextControl
                            value={ lTitle }
                            onChange={ ( lTitle ) => setAttributes({ lTitle })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ lContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( lContent ) => setAttributes({ lContent })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button Text</h4>

                        <TextControl
                            value={lButtonText}
                            onChange={ ( lButtonText ) => setAttributes({ lButtonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button URL</h4>

                        <LinkControl
                            value={{ url: lButtonURL, opensInNewTab: openInNewTabFirst }}
                            onChange={ ( newURL ) => setAttributes({ lButtonURL: newURL.url, openInNewTabFirst: newURL.opensInNewTab })}
                        />
                    </div>
                </div>

                <div className={`item bg-black text-white ${eStyles.item} ${eStyles.flex_6}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h3 className={eStyles.my_sm}>Block Right</h3>
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Title</h4>

                        <TextControl
                            value={ rTitle }
                            onChange={ ( rTitle ) => setAttributes({ rTitle })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ rContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( rContent ) => setAttributes({ rContent })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button Text</h4>

                        <TextControl
                            value={rButtonText}
                            onChange={ ( rButtonText ) => setAttributes({ rButtonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button URL</h4>

                        <LinkControl
                            label="Link URL"
                            value={ { url: rButtonURL, opensInNewTab: openInNewTabSecond } }
                            onChange={ ( rButtonURL ) => setAttributes({ rButtonURL: rButtonURL.url, openInNewTabSecond: rButtonURL.opensInNewTab })}
                        />
                    </div>
                </div>
            </div>
        )
    },
    save: function ({ attributes }) {
        const { 
            lTitle,
            lContent,
            lButtonText,
            lButtonURL,
            rTitle,
            rContent,
            rButtonText,
            rButtonURL,
            openInNewTabFirst,
            openInNewTabSecond,
        } = attributes

        const TargetTabFirst = (openInNewTabFirst) ? '_blank' : '_self'
        const TargetTabSecond = (openInNewTabSecond) ? '_blank' : '_self'

        return (
            <div className={`callout-blocks ${styles.main}`}>
                <div className={`content-container ${styles.content_container}`}>
                    <div 
                        className={`l-content ${styles.content.main} ${styles.content.left}`}
                        style={{ background: `url(${lines})` }}
                        >
                        <div className={`content-wrap ${styles.content.content_wrap}`}>
                            <div className={`title ${styles.content.title}`}>
                                <span 
                                    role='heading' 
                                    dangerouslySetInnerHTML={createMarkup(lTitle)} 
                                    className={styles.content.heading}>
                                </span>
                            </div>

                            <div className={`copy ${styles.content.copy}`}>
                                <RichText.Content value={lContent} tagName="p" />
                            </div>

                            <div className={`btn-container ${styles.content.btn_container}`}>
                                <a 
                                    href={lButtonURL}
                                    className={styles.content.btn}
                                    target={TargetTabFirst}
                                    rel="noopener"
                                    >
                                    {lButtonText}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={`r-content bg-black text-white ${styles.content.main} ${styles.content.right}`}>
                        <div className={`gradient-container ${styles.content.gradient_container}`}>
                            <img className={`gradient ${styles.content.gradient}`} alt='radial gradient' src={gradient} />
                        </div>

                        <div className={`content-wrap text-white ${styles.content.content_wrap}`}>
                            <div className={`title ${styles.content.title}`}>
                                <span role='heading' className={styles.content.heading}>{rTitle}</span>
                            </div>

                            <div className={`copy ${styles.content.copy}`}>
                                <RichText.Content value={rContent} tagName="p" />
                            </div>

                            <div className={`btn-container ${styles.content.btn_container}`}>
                                <a 
                                    href={rButtonURL}
                                    className={styles.content.btn}
                                    target={TargetTabSecond}
                                    rel="noopener" 
                                    >
                                    {rButtonText}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})