import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/gallery'
import eStyles from '../styles/edit'
import { getSquiggly } from '../lib/utils'
import { TextControl } from '@wordpress/components'
import pattern from '../assets/images/patterns.svg'
import {
    MediaUpload, 
    MediaUploadCheck,
    RichText,
    useBlockProps  
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/gallery', {
    title: 'Gallery',
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
        buttonText: {
            type: 'string',
            default: '',
        },
        buttonURL: {
            type: 'string',
            default: '',
        },
        images: {
            type: 'array',
            default: [],
        },
        opensInNewTab: {
            type: 'boolean',
            default: false,
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            title,
            content,
            buttonText,
            buttonURL,
            images,
            opensInNewTab,
        } = attributes

        const blockProps = useBlockProps()

        const addGalleryImage = () => {
            const newImage = {
                imageID: '',
                imageURL: '',
                width: '',
                height: '',
            }
            const newImages = [...images, newImage]

            setAttributes({
                images: newImages,
            })
        }

        const removeGalleryImage = (index) => {
            const newImages = [...images]

            newImages.splice(index, 1)

            setAttributes({
                images: newImages
            })
        }

        const onSelectImage = (media, index) => {
            const newImages = [...images]

            newImages[index].imageID = media.id
            newImages[index].imageURL = media.url
            newImages[index].width = media.width
            newImages[index].height = media.height

            setAttributes({
                images: newImages
            })
        }

        const onRemoveImage = (index) => {
            const newImages = [...images]

            newImages[index].imageID = 0
            newImages[index].imageURL = ''
            newImages[index].width = ''
            newImages[index].height = ''

            setAttributes({
                images: newImages
            })
        }
        
        return (
            <div className={`gallery ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Gallery</h2>
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Title</h4>

                    <TextControl
                        value={title}
                        onChange={(title) => { setAttributes({ title })}}
                    />

                    <div className={`sub-item ${eStyles.sub_item}`}>
                        <h4 className={eStyles.my_sm}>Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ content } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( content ) => { setAttributes({ content })}} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item}`}>
                        <h4 className={eStyles.my_sm}>Button Text</h4>

                        <TextControl
                            value={buttonText}
                            onChange={(buttonText) => { setAttributes({ buttonText })}}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item}`}>
                        <h4 className={eStyles.my_sm}>Button URL</h4>

                        <LinkControl
                            label="Link URL"
                            value={{ url: buttonURL, opensInNewTab: opensInNewTab }}
                            onChange={(newURL) => setAttributes({ buttonURL: newURL.url, opensInNewTab: newURL.opensInNewTab })}
                            onRemove={() => setAttributes({ buttonURL: '' })}
                        />
                    </div>
                </div>

                <div className={`item text-black ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Image Gallery</h4>

                    {images.length > 0 && 
                        <div className={`slides-container w-full flex flex-wrap`}>
                            {images.map((image, index) => (
                                <div className={`slide-container ${eStyles.repeater_item}`}>
                                    <h4 className={eStyles.my_sm}>Image</h4>

                                    <MediaUploadCheck>
                                        {image.imageURL 
                                        ? <img 
                                            src={image.imageURL} 
                                            alt="Featured gallery Image"
                                            className={eStyles.image_small} 
                                            />
                                        : null
                                        }

                                        <MediaUpload
                                            onSelect={(media) => onSelectImage(media, index)}
                                            allowedTypes={['image']}
                                            value={image.imageID}
                                            render={({ open }) => (
                                                <div>
                                                    {image.imageID ? (
                                                        <button
                                                            onClick={() => onRemoveImage(index)}
                                                            className={eStyles.button}
                                                            >
                                                            Replace Image
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

                                    <div className={`item ${eStyles.flex_full} ${eStyles.mt_sm}`}>
                                        <button className={eStyles.button_remove} onClick={() => removeGalleryImage(index)}>Remove Gallery Image</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <div className={`item ${eStyles.flex_full}`}>
                        <button className={eStyles.button} onClick={() => addGalleryImage()}>Add Gallery Image</button>
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
            images,
            opensInNewTab,
        } = attributes

        const targetTab = (opensInNewTab) ? '_blank' : '_self'

        return (
            <div className={`gallery ${styles.main}`}>
                <div 
                    className={`content-container ${styles.content_container}`}
                    style={{ background: `url(${ pattern })`}}
                    >
                    <div className={`content ${styles.content}`}>
                        <div className={`content-wrapper ${styles.content_wrapper}`}>
                            <div className={`title-container ${styles.title_container}`}>
                                <RichText.Content 
                                    value={title} 
                                    tagName="span"
                                    role="heading" 
                                    className={`title ${styles.title}`} 
                                />

                                <img
                                    src={getSquiggly('blue')}
                                    alt={`squiggly divider`}
                                    className={styles.squiggly}
                                />

                                {content && 
                                <RichText.Content 
                                    value={`<span class="${styles.paragraph}">${content}</span>`} 
                                    tagName="p" 
                                />
                                }

                                {buttonURL &&
                                <a 
                                    href={buttonURL} 
                                    className={styles.btn}
                                    target={targetTab}
                                    rel="noopener"
                                    >
                                    {buttonText}
                                </a>
                                }
                            </div>
                        </div>
                    </div>

                    {images &&
                    <div className={`gallery-container ${styles.gallery_container}`}>
                        {images.map((image, index) => (
                            <a 
                                href={image.imageURL} 
                                className={styles.anchor} 
                                data-pswp-width={image.width} 
                                data-pswp-height={image.height}
                                >
                                <img 
                                    src={image.imageURL} 
                                    className={`image ${styles.image}`} 
                                    alt={`Gallery Image ${index + 1}`}
                                />
                            </a>
                        ))}
                    </div>
                    }
                </div>
            </div>
        )
    }
})