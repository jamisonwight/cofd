import { registerBlockType } from '@wordpress/blocks'
import { select, subscribe } from '@wordpress/data'
import { useEffect } from '@wordpress/element';
import styles from '../styles/content'
import eStyles from '../styles/edit'
import moment from 'moment'
import squiggly from '../assets/images/squiggly-blue.svg'
import { TextControl, DateTimePicker } from '@wordpress/components'
import {
    RichText,
    useBlockProps,
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/content', {
    title: 'Content',
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
        },
        firstButtonContent: {
            type: 'string',
            default: '',
        },
        firstButtonText: {
            type: 'string',
            default: '',
        },
        firstButtonURL: {
            type: 'string',
            default: '',
        },
        secondButtonContent: {
            type: 'string',
            default: '',
        },
        secondButtonText: {
            type: 'string',
            default: '',
        },
        secondButtonURL: {
            type: 'string',
            default: '',
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
            content,
            firstButtonContent,
            firstButtonText,
            firstButtonURL,
            secondButtonContent,
            secondButtonText,
            secondButtonURL,
            openInNewTabFirst,
            openInNewTabSecond,
        } = attributes

        const blockProps = useBlockProps()

        useEffect(() => {
            const postTitle = select("core/editor").getEditedPostAttribute("title")

            // Update the attributes with post title and ID
            setAttributes({
                title: postTitle,
            })
        }, [])

        return (
            <div className={`event ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ content } 
                            onChange={ ( content ) => setAttributes({ content })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>First Button Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ firstButtonContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( firstButtonContent ) => setAttributes({ firstButtonContent })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>First Button Text</h4>

                        <TextControl
                            value={firstButtonText}
                            onChange={ ( firstButtonText ) => setAttributes({ firstButtonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>First Button URL</h4>

                        <LinkControl
                            value={{ url: firstButtonURL, opensInNewTab: openInNewTabFirst, }}
                            onChange={(newURL) => {
                                setAttributes({ 
                                    firstButtonURL: newURL.url,
                                    openInNewTabFirst: newURL.opensInNewTab 
                                })
                            }}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Second Button Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ secondButtonContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( secondButtonContent ) => setAttributes({ secondButtonContent })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Second Button Text</h4>

                        <TextControl
                            value={secondButtonText}
                            onChange={ ( secondButtonText ) => setAttributes({ secondButtonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Second Button URL</h4>

                        <LinkControl
                            value={{ url: secondButtonURL, opensInNewTab: openInNewTabSecond }}
                            onChange={(newURL) => {
                                setAttributes({ 
                                    secondButtonURL: newURL.url,
                                    openInNewTabSecond: newURL.opensInNewTab 
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    },
    save: function ({ attributes }) {
        const {
            title,
            content,
            firstButtonContent,
            firstButtonText,
            firstButtonURL,
            secondButtonContent,
            secondButtonText,
            secondButtonURL,
            openInNewTabFirst,
            openInNewTabSecond,
        } = attributes

        return (
            <div className={`event ${styles.main}`}>
                <div className={`gradients`}>
                    <div className='radial-gradient radial-gradient-top-right'></div>
                    <div className='radial-gradient radial-gradient-bottom-left'></div>
                </div>

                <div className={`content-container ${styles.content_container}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={`title ${styles.title}`}>
                            <span className={styles.h3}>{title}</span>
                            <img 
                                className={`squiggly ${styles.squiggly}`} 
                                alt="Squiggly Icon"
                                src={squiggly} />
                        </div>

                        <div className={`content ${styles.content}`}>
                            <RichText.Content value={content} tagName="p" />
                        </div>

                        <div className={`callouts ${styles.callouts}`}>
                            {firstButtonURL && 
                            <div className={`btn-container ${styles.btn_container}`}>
                                <div className={`content ${styles.btn_content}`}>
                                    <RichText.Content value={firstButtonContent} tagName="p" />
                                </div>

                                <a 
                                    href={firstButtonURL}
                                    className={styles.btn_first}
                                    target={openInNewTabFirst ? '_blank' : '_self'}
                                    rel={openInNewTabFirst ? 'noopener noreferrer' : ''}
                                    >
                                    {firstButtonText}
                                </a>
                            </div>
                            }

                            {secondButtonURL &&
                            <div className={`btn-container ${styles.btn_container}`}>
                                <div className={`content ${styles.btn_content}`}>
                                    <RichText.Content value={secondButtonContent} tagName="p" />
                                </div>

                                <a 
                                    href={secondButtonURL}
                                    className={styles.btn_second}
                                    target={openInNewTabSecond ? '_blank' : '_self'}
                                    rel={openInNewTabSecond ? 'noopener noreferrer' : ''}
                                    >
                                    {secondButtonText}
                                </a>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})