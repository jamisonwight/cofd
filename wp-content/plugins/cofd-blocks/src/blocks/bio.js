import { registerBlockType } from '@wordpress/blocks'
import { select } from '@wordpress/data'
import { useEffect } from '@wordpress/element';
import { savePostAttributesToJSON, getSquiggly, useAfterSave } from '../lib/utils'
import styles from '../styles/bio'
import eStyles from '../styles/edit'
import { TextControl } from '@wordpress/components'
import {
    RichText,
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/bio', {
    title: 'Bio',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        bioID: {
            type: 'string',
            default: '',
        },
        bioName: {
            type: 'string',
            default: '',
        },
        bioCareerTitle: {
            type: 'string',
            default: '',
        },
        bioImageID: {
            type: 'string',
            default: '',
        },
        bioImageURL: {
            type: 'string',
            default: '',
        },        
        bioContent: {
            type: 'string',
            default: '',
        },
        bioLink: {
            type: 'string',
            default: '',
        },
    },
    schema: {
        attributes: {
            bioID: {
                type: 'string',
            },
            bioName: {
                type: 'string',
            },
            bioCareerTitle: {
                type: 'string',
            },
            bioImageID: {
                type: 'string',
            },
            bioImageURL: {
                type: 'string',
            },        
            eventContent: {
                type: 'string',
            },
            bioLink: {
                type: 'string',
            },
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props

        const isAfterSave = useAfterSave()

        const {
            bioImageID,
            bioImageURL,
            bioContent,
            bioCareerTitle,
        } = attributes

        const blockProps = useBlockProps()

        const onSelectImage = (media) => {
            setAttributes({
                bioImageID: media.id, 
                bioImageURL: media.url,
            })
        }

        const onRemoveImage = () => {
            setAttributes({
                bioImageID: 0,
                bioImageURL: '',
            })
        }

        const onWordPressUpdate = () => {
            const postID = select('core/editor').getCurrentPostId();
            savePostAttributesToJSON(attributes, postID, '/cofd-blocks/v1/save-bio-attributes');
        }

        useEffect(() => {
            const postTitle = select("core/editor").getEditedPostAttribute("title")
            const postID = select("core/editor").getEditedPostAttribute("id")
            const postLink = select('core/editor').getEditedPostAttribute('link')
            // Update the attributes with post title and ID
            setAttributes({
                bioName: postTitle,
                bioID: postID.toString(),
                bioLink: postLink,
            })

            if ( isAfterSave ) {
                onWordPressUpdate()
            }
        }, [ isAfterSave ])

        return (
            <div className={`bio ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Career Title</h4>

                        <TextControl
                            value={ bioCareerTitle }  
                            onChange={ ( bioCareerTitle ) => setAttributes({ bioCareerTitle })} 
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Bio Image</h4>

                        <MediaUploadCheck>
                            {bioImageURL 
                            ? <img 
                                src={bioImageURL} 
                                alt="Featured Bio Image"

                                className={eStyles.image} 
                                />
                            : null
                            }

                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={bioImageID}
                                render={({ open }) => (
                                    <div>
                                        {bioImageID ? (
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

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ bioContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={( bioContent ) => setAttributes({ bioContent })} 
                            placeholder='Type Here...'
                        />
                    </div>
                </div>
            </div>
        );
    },
    save: function ({ attributes }) {
        const {
            bioName,
            bioImageURL,
            bioContent,
            bioCareerTitle,
        } = attributes

        return (
            <div className={`bio ${styles.main}`}>
                <div className={`gradients ${styles.gradients}`}>
                    <div className='radial-gradient radial-gradient-top-right'></div>
                    <div className='radial-gradient radial-gradient-bottom-left'></div>
                </div>

                <div className={`content-container ${styles.content_container}`}>
                    <div className={`content-left ${styles.content_left}`}>
                        <div className={`image-container ${styles.image_container}`}>
                            <img 
                                src={bioImageURL} 
                                alt={`${bioName} Image`}
                                className={`image ${styles.image}`} 
                            />
                        </div>
                    </div>

                    <div className={`content-right ${styles.content_right}`}>
                        <div className={`name ${styles.name}`}>
                            <span className={styles.h1}>{bioName}</span>

                            <img 
                                className={`squiggly ${styles.squiggly}`} 
                                alt="Squiggly Icon"
                                src={getSquiggly('blue')} />
                        </div>

                        <span className={`career-title ${styles.career_title}`}>{bioCareerTitle}</span>

                        <div className={`content ${styles.content}`}>
                            <RichText.Content value={bioContent} tagName="p" />
                        </div>

                        <div className={`all-faculty ${styles.all_faculty}`}>
                            <a href={`/our-faculty`} className='btn-default btn-blue'>
                                See All Our Faculty
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})