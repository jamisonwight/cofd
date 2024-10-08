import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/hero-slider'
import eStyles from '../styles/edit'
import logo from '../../../../themes/COFD/assets/images/logo.png'
import {
    MediaUpload, 
    MediaUploadCheck,
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'
import { 
    TextControl, 
    ToggleControl,
    SelectControl,
} from '@wordpress/components'

registerBlockType('cofd-blocks/hero-slider', {
    title: 'Hero Slider',
    icon: 'layout', // Replace with a suitable icon
    version: '2',
    category: 'common',
    attributes: {
        slides: {
            type: 'array',
            default: [],
        },
        header_offset: {
            type: 'boolean',
            default: true,
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            slides,
            header_offset,
        } = attributes

        const addSlide = () => {
            const newSlide = {
                slideMediaType: 'image',
                title: '',
                content: '',
                bgGradient: 'linear-gradient(135deg, hsla(15, 3%, 72%, 1) 0%, hsla(36, 15%, 74%, 1) 0%, hsla(229, 31%, 60%, 1) 100%)',
                imageID: '',
                imageURL: '',
                videoID: '',
                videoURL: '',
                posterURL: '',
                posterID: '',
                buttonURL: [],
                buttonText: '',
                opensInNewTab: false,
            }
            const newSlides = [...slides, newSlide]

            setAttributes({
                slides: newSlides,
            })
        }

        const removeSlide = (index) => {
            const newSlides = [...slides]
            newSlides.splice(index, 1)
            setAttributes({
                slides: newSlides
            })
        }

        const onSelectImage = (media, index) => {
            const newSlides = [...slides]
            newSlides[index].imageID = media.id
            newSlides[index].imageURL = media.url

            setAttributes({
                slides: newSlides
            })
        }

        const onRemoveImage = (index) => {
            const newSlides = [...slides]
            newSlides[index].imageID = 0
            newSlides[index].imageURL = ''

            setAttributes({
                slides:  newSlides
            })
        }

        const onSelectVideo = (media, index) => {
            const newSlides = [...slides]
            newSlides[index].videoID = media.id
            newSlides[index].videoURL = media.url

            setAttributes({
                slides: newSlides
            })
        }

        const onRemoveVideo = (index) => {
            const newSlides = [...slides]
            newSlides[index].videoID = 0
            newSlides[index].videoURL = ''

            setAttributes({
                slides:  newSlides
            })
        }

        const onSelectPoster = (media, index) => {
            const newSlides = [...slides]
            newSlides[index].posterID = media.id
            newSlides[index].posterURL = media.url

            setAttributes({
                slides: newSlides
            })
        }

        const onRemovePoster = (index) => {
            const newSlides = [...slides]
            newSlides[index].posterID = 0
            newSlides[index].posterURL = ''

            setAttributes({
                slides:  newSlides
            })
        }

        const offsetCheckbox = () => {
            setAttributes({ header_offset: !header_offset })
        }

        return (
            <div className={`hero-slider ${eStyles.main} ${eStyles.flex}`}>
                <h2 className={eStyles.my_sm}>Hero Slider</h2>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Header Offset</h4>
                    <ToggleControl
                        checked={header_offset}
                        onChange={offsetCheckbox}
                    />
                </div>

                <div className={`item bg-black text-white ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Slides</h4>
                    {slides.length > 0 &&
                    <div className={`slides w-full`}>
                        {slides.map((slide, index) => {
                            return (
                            <div 
                                className={`slide ${eStyles.flex} ${eStyles.inner_block}`} 
                                key={index}
                                style={{
                                    background: slide.slideMediaType === 'image' ? slide.bgGradient : 'none',
                                }}
                                >
                                <div className={`item bg-black ${eStyles.item} ${eStyles.flex_6}`}>
                                    <h4 className={eStyles.my_sm}>Slide Media Type</h4>
                                    <SelectControl
                                        value={slide.slideMediaType}
                                        options={[
                                            { label: 'Image', value: 'image' },
                                            { label: 'Video', value: 'video' },
                                        ]}
                                        onChange={(newType) => {
                                            const newSlides = [...slides]
                                            newSlides[index].slideMediaType = newType
                                            setAttributes({ slides: newSlides })
                                        }}
                                    />

                                    <h4 className={eStyles.my_sm}>Title</h4>
                                    <TextControl
                                        value={slide.title}
                                        onChange={(newValue) => {
                                            const newSlides = [...slides]
                                            newSlides[index].title = newValue
                                            setAttributes({ slides: newSlides })
                                        }}
                                    />

                                    {slide.slideMediaType === 'image' &&
                                    <div className={`sub-item ${eStyles.sub_item}`}>
                                        <h4 className={eStyles.my_sm}>Background CSS</h4>

                                        <TextControl
                                            value={slide.bgGradient}
                                            onChange={(newValue) => {
                                                const newSlides = [...slides]
                                                newSlides[index].bgGradient = newValue
                                                setAttributes({ slides: newSlides })
                                            }}
                                        />
                                    </div>
                                    }

                                    <div className={`sub-item ${eStyles.sub_item}`}>
                                        <h4 className={eStyles.my_sm}>Button Text</h4>

                                        <TextControl
                                            value={slide.buttonText}
                                            onChange={(newValue) => {
                                                const newSlides = [...slides]
                                                newSlides[index].buttonText = newValue
                                                setAttributes({ slides: newSlides })
                                            }}
                                        />
                                    </div>

                                    <div className={`sub-item ${eStyles.sub_item}`}>
                                        <h4 className={eStyles.my_sm}>Button URL</h4>

                                        <LinkControl
                                            label="Link URL"
                                            value={slide.buttonURL}
                                            onChange={(newUrl) => {
                                                const newSlides = [...slides]
                                                newSlides[index].buttonURL = newUrl
                                                setAttributes({ slides: newSlides })
                                            }}
                                        />
                                    </div>
                                </div>

                                {slide.slideMediaType === 'image' &&
                                <div className={`item text-black ${eStyles.item} ${eStyles.flex_6}`}>
                                    <h4 className={eStyles.my_sm}>Cutout Image</h4>

                                    <MediaUploadCheck>
                                        {slide.imageURL 
                                        ? <img 
                                            src={slide.imageURL} 
                                            alt="Featured Cutout Image"
                                            className={eStyles.image} 
                                            />
                                        : null
                                        }

                                        <MediaUpload
                                            onSelect={(media) => onSelectImage(media, index)}
                                            allowedTypes={['image']}
                                            value={slide.imageID}
                                            render={({ open }) => (
                                                <div>
                                                    {slide.imageID ? (
                                                        <button
                                                            onClick={() => onRemoveImage(index)}
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

                                {slide.slideMediaType === 'video' &&
                                <div className={`video-container ${eStyles.item} ${eStyles.flex_6}`}>
                                    <h4 className={eStyles.my_sm}>Video</h4>

                                    <MediaUploadCheck>
                                        {slide.videoURL 
                                        ? <span>Video URL: {slide.videoURL}</span>
                                        : null
                                        }

                                        <MediaUpload
                                            onSelect={(media) => onSelectVideo(media, index)}
                                            allowedTypes={['video']}
                                            value={slide.videoID}
                                            render={({ open }) => (
                                                <div>
                                                    {slide.videoID ? (
                                                        <button
                                                        onClick={() => onRemoveVideo(index)}
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

                                    <h4 className={eStyles.my_sm}>Video Poster Image</h4>

                                        <MediaUploadCheck>
                                            {slide.posterURL
                                                ? <img 
                                                    src={slide.posterURL} 
                                                    alt="Video Poster Image"
                                                    className={eStyles.image} 
                                                    />
                                            : null
                                            }

                                            <MediaUpload
                                                onSelect={(media) => onSelectPoster(media, index)}
                                                allowedTypes={['image']}
                                                value={slide.posterID}
                                                render={({ open }) => (
                                                    <div>
                                                        {slide.posterID ? (
                                                            <button
                                                                onClick={() => onRemovePoster(index)}
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

                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <button className={eStyles.button} onClick={() => removeSlide(index)}>Remove Slide</button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    }
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <button className={eStyles.button} onClick={addSlide}>Add Slide</button>
                </div>
            </div>
        );
    },
    save: function ({ attributes }) {
        const { slides, header_offset } = attributes
        const offset = (header_offset) ? styles.header_offset : ''
        const mainStyles = styles.main

        return (
            <div className={`hero-slider ${styles.main} ${offset}`}>
                <div className={`slider-container ${styles.slider_container}`}>
                    {slides.length > 0 && (
                        <div className={`swiper-wrapper ${styles.swiper_wrapper}`}>
                            {slides.map((slide, index) => (
                                <div 
                                    className={`swiper-slide ${styles.swiper_slide}`} 
                                    key={index}
                                    style={{
                                        background: slide.slideMediaType === 'image' ? slide.bgGradient : 'none',
                                    }}
                                    >
                                    {slide.slideMediaType === 'image' &&
                                    <div className={`cutout-image ${styles.cutout.main}`}>
                                        {slide.imageID && 
                                        <img
                                            src={slide.imageURL}
                                            alt="Hero Slider Feature Image"
                                            className={styles.cutout.image}
                                        />
                                        }
                                    </div>
                                    }

                                    {slide.slideMediaType === 'video' &&
                                        <div className={`video-container ${styles.video_container}`}>
                                            <video 
                                                src={slide.videoURL}
                                                poster={slide.posterURL}
                                                className={`video ${styles.video}`}
                                                autoPlay
                                                muted
                                                playsInline
                                                loop
                                            />
                                        </div>
                                    }

                                    <div className={`content ${styles.content.main}`}>
                                        <img
                                            src={logo}
                                            alt="COFD Logo"
                                            className={styles.logo}
                                        />

                                        <h2 className={`title ${styles.content.title}`}>{slide.title}</h2>

                                        {slide.buttonText &&
                                        <div className={`btn-container ${styles.content.btn_container}`}>
                                            <a 
                                                className={`btn-default btn-white ${styles.content.btn}`} 
                                                href={slide.buttonURL.url}
                                                target={(slide.buttonURL.opensInNewTab) ? '_blank' : '_self'}
                                                rel="noopener"
                                                >
                                                {slide.buttonText}
                                            </a>
                                        </div>
                                        }
                                    </div>
                                </div>
                            ))}
                    </div>
                    )}

                    <div className='swiper-pagination'></div>
                </div>
            </div>
        )
    }
})