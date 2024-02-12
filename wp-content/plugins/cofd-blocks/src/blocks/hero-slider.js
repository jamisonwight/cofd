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
} from '@wordpress/components'

registerBlockType('cofd-blocks/hero-slider', {
    title: 'Hero Slider',
    icon: 'layout', // Replace with a suitable icon
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
                title: '',
                content: '',
                bgGradient: 'linear-gradient(135deg, hsla(15, 3%, 72%, 1) 0%, hsla(36, 15%, 74%, 1) 0%, hsla(229, 31%, 60%, 1) 100%)',
                imageID: '',
                imageURL: '',
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
                        {slides.map((slide, index) => (
                            <div 
                                className={`slide ${eStyles.flex} ${eStyles.inner_block}`} 
                                key={index}
                                style={{
                                    background: slide.bgGradient,
                                }}
                                >
                                <div className={`item bg-black ${eStyles.item} ${eStyles.flex_6}`}>
                                    <h4 className={eStyles.my_sm}>Title</h4>

                                    <TextControl
                                        value={slide.title}
                                        onChange={(newValue) => {
                                            const newSlides = [...slides]
                                            newSlides[index].title = newValue
                                            setAttributes({ slides: newSlides })
                                        }}
                                    />

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

                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <button className={eStyles.button} onClick={() => removeSlide(index)}>Remove Slide</button>
                                </div>
                            </div>
                        ))}
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

        return (
            <div className={`hero-slider ${styles.main} ${offset}`}>
                <div className={`slider-container ${styles.slider_container}`}>
                    {slides.length > 0 && (
                        <div className={`swiper-wrapper ${styles.swiper_wrapper}`}>
                            {slides.map((slide, index) => (
                                <div 
                                    className={`swiper-slide ${styles.swiper_slide} ${offset}`} 
                                    key={index}
                                    style={{
                                        background: slide.bgGradient,
                                    }}
                                    >
                                    <div className={`cutout-image ${styles.cutout.main}`}>
                                        {slide.imageID && 
                                        <img
                                            src={slide.imageURL}
                                            alt="Hero Slider Feature Image"
                                            className={styles.cutout.image}
                                        />
                                        }
                                    </div>

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