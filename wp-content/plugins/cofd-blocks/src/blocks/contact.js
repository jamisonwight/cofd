import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/contact'
import eStyles from '../styles/edit'
import { useEffect } from 'react'
import { getSquiggly, getDataToJSON } from '../lib/utils'
import { TextControl } from '@wordpress/components'
import {
    RichText,
    useBlockProps, 
} from '@wordpress/block-editor'

registerBlockType('cofd-blocks/contact', {
    title: 'Contact',
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
        formShortcode: {
            type: 'string',
            default: '',
        },
        email: {
            type: 'string',
            default: '',
        },
        phone: {
            type: 'string',
            default: '',
        },
        address: {
            type: 'string',
            default: '',
        },
        studioHours: {
            type: 'string',
            default: '',
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            title,
            content,
            formShortcode,
        } = attributes

        const blockProps = useBlockProps()

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const optionData = await getDataToJSON('cofd-blocks/v1/acf-options');
                    console.log(optionData)
        
                    setAttributes({
                        email: optionData.email,
                        phone: optionData.phone,
                        address: optionData.address,
                        studioHours: optionData.studio_hours,
                    })
                } catch (error) {
                    console.error(error)
                }
            }
        
            fetchData()
        }, [])
        
        return (
            <div className={`contact ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Contact</h2>
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h3 className={eStyles.my_sm}>Content</h3>
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
                        <h4 className={eStyles.my_sm}>Form Shortcode</h4>

                        <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                            <RichText
                                { ...blockProps }
                                tagName="p" 
                                value={ formShortcode } 
                                allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                                onChange={ ( formShortcode ) => setAttributes({ formShortcode })} 
                                placeholder='Paste Shortcode Here...'
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    save: function ({ attributes }) {
        const { 
            title,
            content,
            formShortcode,
            phone,
            email,
            address,
            studioHours,
        } = attributes

        return (
            <div className={`contact-form ${styles.main}`}>
                <div className={`gradients ${styles.gradients}`}>
                    <div className='radial-gradient radial-gradient-top-right'></div>
                    <div className='radial-gradient radial-gradient-bottom-left'></div>
                </div>

                <div className={`content-container ${styles.content_container}`}>
                    <div className={`form-container ${styles.form_container}`}>
                        <div className={`intro ${styles.intro}`}>
                            <h1 className={styles.h1}>{title}</h1>
                            <img
                                src={getSquiggly('blue')}
                                alt={'squiggly line'}
                                className={styles.squiggly}
                            />
                            <RichText.Content 
                                value={content} 
                                tagName="p"
                                className={`heading ${styles.content}`} 
                            />
                            <RichText.Content 
                                value={formShortcode} 
                                tagName="div"
                                className={`form-embed ${styles.form}`} 
                            />
                        </div>
                    </div>

                    <div className={`contact-info ${styles.contact_info}`}>
                        <div className={`content-wrap ${styles.content_wrap}`}>
                            <span className={styles.contact_title}><strong>Conservatory of Dance</strong></span>
                            <RichText.Content value={address} tagName="p" className={styles.address}/>

                            <span className={styles.contact_title}><strong>General Inquiries</strong></span>

                            <span className={styles.contact_item}>
                                <strong>Phone:&nbsp;</strong>{phone}
                            </span>

                            <span className={styles.contact_item}>
                                <strong>Email:&nbsp;</strong>
                                <a className={styles.anchor} href={`mailto: ${email}`}> {email}</a>
                            </span>
                        </div>

                        <div className={`content-wrap ${styles.content_wrap}`}>
                            <span className={styles.contact_title}><strong>Office Hours</strong></span>
                            <RichText.Content value={studioHours} tagName="p" className={styles.studio_hours}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})