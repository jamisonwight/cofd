import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/hero'
import eStyles from '../styles/edit'
import {
    MediaUpload, 
    MediaUploadCheck,
    RichText,
    useBlockProps  
} from '@wordpress/block-editor'
import { 
    TextControl, 
    SelectControl,
    ToggleControl,
} from '@wordpress/components'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'
import { getSquiggly } from '../lib/utils'


registerBlockType('cofd-blocks/hero', {
    title: 'Hero',
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
        hero_type: {
            type: 'string',
            default: 'image'
        },
        imageID: {
            type: 'number', // Store the image ID as a number
            default: 0,      // Default value is 0 (no image selected)
        },
        imageURL: {
            type: 'string',
            default: ''
        },
        posterID: {
            type: 'number',
            default: 0
        },
        posterURL: {
            type: 'string',
            default: ''
        },
        videoID: {
            type: 'number', // Store the image ID as a number
            default: 0,      // Default value is 0 (no image selected)
        },
        videoURL: {
            type: 'string',
            default: ''
        },
        buttonURL: {
            type: 'string',
            default: ''
        },
        buttonText: {
            type: 'string',
            default: ''
        },
        header_offset: {
            type: 'boolean',
            default: true,
        },
        text_light: {
            type: 'boolean',
            default: true,
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
            imageID, 
            imageURL,
            posterID,
            posterURL,
            videoID,
            videoURL,
            buttonURL,
            buttonText, 
            hero_type,
            header_offset,
            text_light,
            opensInNewTab, 
        } = attributes

        const blockProps = useBlockProps()

        const onSelectImage = (media) => {
            setAttributes({
                imageID: media.id,
                imageURL: media.url,
            })
        }

        const onRemoveImage = () => {
            setAttributes({
                imageID: 0,
                imageURL: '',
            })
        }

        const onSelectVideo = (media) => {
            setAttributes({
                videoID: media.id,
                videoURL: media.url,
            })
        }

        const onRemoveVideo = () => {
            setAttributes({
                videoID: 0,
                videoURL: '',
            })
        }

        const onSelectPoster = (media) => {
            setAttributes({
                posterURL: media.id,
                posterURL: media.url,
            })
        }

        const onRemovePoster = () => {
            setAttributes({
                posterID: 0,
                posterURL: '',
            })
        }

        const onRemoveURL = () => {
            setAttributes({
                buttonURL: '',
            })
        }

        const offsetCheckbox = () => {
            setAttributes({ header_offset: !header_offset })
        }

        const textLightCheckbox = () => {
            setAttributes({ text_light: !text_light })
        }
        

        return (
            <div className={`hero ${eStyles.main} ${eStyles.flex}`}>
                <h2 className={eStyles.my_sm}>Hero</h2>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Header Offset</h4>
                    <ToggleControl
                        checked={header_offset}
                        onChange={offsetCheckbox}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Text Light</h4>
                    <ToggleControl
                        checked={text_light}
                        onChange={textLightCheckbox}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Hero Type</h4>
                    <SelectControl
                        value={hero_type}
                        options={[
                            { label: 'Image', value: 'image' },
                            { label: 'Video', value: 'video' },
                        ]}
                        onChange={(hero_type) => setAttributes({ hero_type })}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    {hero_type == 'image' &&
                    <div className={`image-container`}>
                        <h4 className={eStyles.my_sm}>Background Image</h4>

                        <MediaUploadCheck>
                            {imageURL 
                            ? <img 
                                src={imageURL} 
                                alt="Featured Hero Image"
                                className={eStyles.image} 
                                />
                            : null
                            }

                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={imageID}
                                render={({ open }) => (
                                    <div>
                                        {imageID ? (
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
                    }

                    {hero_type == 'video' &&
                    <div className={`image-container`}>
                        <h4 className={eStyles.my_sm}>Video</h4>

                        <MediaUploadCheck>
                            {videoURL 
                            ? <span>Video URL: {videoURL}</span>
                            : null
                            }

                            <MediaUpload
                                onSelect={onSelectVideo}
                                allowedTypes={['video']}
                                value={videoID}
                                render={({ open }) => (
                                    <div>
                                        {videoID ? (
                                            <button
                                                onClick={onRemoveVideo}
                                                className={eStyles.button}
                                                >
                                                Remove Video
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={open}
                                                className={eStyles.button}
                                                >
                                                Select Video
                                            </button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                    }
                </div>

                {hero_type == 'video' && 
                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Video Poster Image</h4>

                    <MediaUploadCheck>
                        {posterURL 
                            ? <img 
                                src={posterURL} 
                                alt="Video Poster Image"
                                className={eStyles.image} 
                                />
                        : null
                        }

                        <MediaUpload
                            onSelect={onSelectPoster}
                            allowedTypes={['image']}
                            value={posterID}
                            render={({ open }) => (
                                <div>
                                    {posterID ? (
                                        <button
                                            onClick={onRemovePoster}
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
                }

                <div className={`item bg-black text-white ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Title</h4>
                    <TextControl
                        value={ title }
                        onChange={ ( title ) => setAttributes({ title }) }
                    />

                    <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Content</h4>
                    <RichText
                        { ...blockProps }
                        tagName="p" 
                        value={ content } 
                        allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                        onChange={ ( content ) => setAttributes({ content })} 
                        placeholder='Type Here...'
                    />


                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Button Text</h4>

                        <TextControl
                            value={buttonText}
                            onChange={ ( buttonText ) => setAttributes({ buttonText })}
                        />
                    </div>

                    <div className={`sub-item`}>
                        <h4 className={eStyles.my_sm}>Button URL</h4>

                        <LinkControl
                            key='hero-button-link'
                            value={{ url: buttonURL, opensInNewTab: opensInNewTab }}
                            onChange={(newURL) => setAttributes({ buttonURL: newURL.url, opensInNewTab: newURL.opensInNewTab })}
                            onRemove={onRemoveURL}
                            forceIsEditingLink={true}
                        />

                        <button
                            onClick={onRemoveURL}
                            className={`my-[20px] ${eStyles.button}`}
                            >
                            Clear URL
                        </button>
                    </div>
                </div>
            </div>
        );
    },
    save: function ({ attributes }) {
        const { 
            hero_type,
            title,
            content, 
            imageID,
            imageURL,
            posterID,
            posterURL,
            videoID,
            videoURL,
            buttonURL,
            buttonText, 
            header_offset,
            text_light,
            opensInNewTab, 
        } = attributes

        const offset = (header_offset) ? styles.header_offset : ''
        const textTheme = (text_light) ? 'text-white' : 'text-black'
        const squiggleTheme = (text_light) ? getSquiggly('blue') : getSquiggly('black')
        const targetTab = (opensInNewTab) ? '_blank' : '_self'

        return (
            <div className={`hero ${styles.main} ${offset}`}>
                <div className={`hero-container ${styles.hero_container}`}>
                    {hero_type == 'image' &&
                    <div className={`image-container ${styles.image_container}`}>
                        {imageID && 
                        <img
                            src={imageURL}
                            alt="Hero Feature Image"
                            className={styles.background_image}
                        />
                        }
                    </div>
                    }

                    {hero_type == 'video' &&
                    <div className={`video-container ${styles.video_container}`}>
                        <video 
                            src={videoURL}
                            poster={posterURL}
                            className={`video ${styles.video}`}
                            autoPlay
                            muted
                            playsInline
                            loop
                        />
                    </div>
                    }

                    <div className={`content-container ${styles.content_container} ${textTheme}`}>
                        <div className={`content ${styles.content}`}>
                            <span className={`title ${styles.title}`} role="heading">{title}</span>

                            <img 
                                className={`squiggly ${styles.squiggly}`} 
                                alt="Squiggly Icon"
                                src={squiggleTheme} />

                            <RichText.Content
                                value={content} 
                                tagName="p"
                                className={styles.p} 
                            />

                            {buttonText &&
                            <a 
                                href={buttonURL}
                                className={`event-link ${styles.link} ${textTheme}`}
                                target={targetTab}
                                rel="noopener"
                                >
                                {buttonText}
                            </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})