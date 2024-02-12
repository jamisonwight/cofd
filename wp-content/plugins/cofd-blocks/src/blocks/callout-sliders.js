import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/callout-sliders'
import eStyles from '../styles/edit'
import navArrow from '../assets/images/nav-arrow.svg'
import { 
    TextControl, 
    SelectControl,
} from '@wordpress/components'
import {
    MediaUpload, 
    MediaUploadCheck,
    RichText,
    useBlockProps  
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/callout-sliders', {
    title: 'Callout Sliders',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        callouts: {
            type: 'array',
            default: [],
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            callouts
        } = attributes

        const blockProps = useBlockProps()

        const addCallout = () => {
            const newCallout = {
                row_type: 'two-column',
                title: '',
                content: '',
                buttonURL: [],
                buttonText: '',
                opensInNewTab: false,
                sliders: [],
            }
            const newCallouts = [...callouts, newCallout]

            setAttributes({
                callouts: newCallouts,
            })
        }

        const removeCallout = (index) => {
            const newCallouts = [...callouts]
            newCallouts.splice(index, 1)
            setAttributes({
                callouts: newCallouts
            })
        }

        const addSlide = (index) => {
            const newSlide = {
                imageID: '',
                imageURL: '',
            }
            const newCallouts = [...callouts]

            newCallouts[index].sliders.push(newSlide)

            setAttributes({
                callouts: newCallouts,
            })
        }

        const removeSlide = (index, slideIndex) => {
            const newCallouts = [...callouts]

            newCallouts[index].sliders.splice(slideIndex, 1)

            setAttributes({
                callouts: newCallouts
            })
        }

        const onSelectImage = (media, index, slideIndex) => {
            const newCallouts = [...callouts]
            const slide = newCallouts[index].sliders[slideIndex]

            slide.imageID = media.id
            slide.imageURL = media.url

            setAttributes({
                callouts: newCallouts
            })
        }

        const onRemoveImage = (index, slideIndex) => {
            const newCallouts = [...callouts]
            const slide = newCallouts[index].sliders[slideIndex]

            slide.imageID = 0
            slide.imageURL = ''

            setAttributes({
                callouts: newCallouts
            })
        }
        
        return (
            <div className={`callout-rows ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Callout Sliders</h2>
                </div>

                <div className={`item ${eStyles.item}`}>
                    <h4 className={eStyles.my_sm}>Callouts</h4>
                    {callouts.length > 0 &&
                    <div className={`callouts-container w-full`}>
                        {callouts.map((callout, index) => (
                            <div 
                                className={`callout-item bg-black text-blue-light ${eStyles.flex} ${eStyles.inner_block}`} 
                                key={index}
                                >
                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <h4 className={eStyles.my_sm}>Row Type</h4>
                                    <SelectControl
                                        value={callout.row_type}
                                        options={[
                                            { label: 'Two Column', value: 'two-column' },
                                            { label: 'Two Column Reverse', value: 'two-column-reverse' },
                                        ]}
                                        onChange={(row_type) => callout['row_type'] = row_type }
                                    />
                                </div>

                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <h4 className={eStyles.my_sm}>Title</h4>

                                    <TextControl
                                        value={callout.title}
                                        onChange={(newValue) => {
                                            const newCallouts = [...callouts]
                                            newCallouts[index].title = newValue
                                            setAttributes({ callouts: newCallouts })
                                        }}
                                    />

                                    <div className={`sub-item ${eStyles.sub_item}`}>
                                        <h4 className={eStyles.my_sm}>Content</h4>

                                        <RichText
                                            { ...blockProps }
                                            tagName="p" 
                                            value={ callout.content } 
                                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                                            onChange={ ( content ) => callout['content'] = content } 
                                            placeholder='Type Here...'
                                        />
                                    </div>

                                    <div className={`sub-item ${eStyles.sub_item}`}>
                                        <h4 className={eStyles.my_sm}>Button Text</h4>

                                        <TextControl
                                            value={callout.buttonText}
                                            onChange={(newValue) => {
                                                const newCallouts = [...callouts]
                                                newCallouts[index].buttonText = newValue
                                                setAttributes({ callouts: newCallouts })
                                            }}
                                        />
                                    </div>

                                    <div className={`sub-item ${eStyles.sub_item}`}>
                                        <h4 className={eStyles.my_sm}>Button URL</h4>

                                        <LinkControl
                                            label="Link URL"
                                            value={{ url: callout.buttonURL.url, opensInNewTab: callout.opensInNewTab }}
                                            onChange={(newUrl) => {
                                                const newCallouts = [...callouts]
                                                newCallouts[index].buttonURL = newUrl
                                                newCallouts[index].opensInNewTab = newUrl.opensInNewTab
                                                setAttributes({ callouts: newCallouts })
                                            }}
                                            onRemove={() => {
                                                const newCallouts = [...callouts]
                                                newCallouts[index].buttonURL = ''
                                                setAttributes({ buttonURL: newCallouts })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={`item text-white ${eStyles.item} ${eStyles.flex_full}`}>
                                    <h4 className={eStyles.my_sm}>Image Slides</h4>

                                    {callout.sliders.length > 0 && 
                                        <div className={`slides-container w-full flex flex-wrap`}>
                                            {callout.sliders.map((slide, slideIndex) => (
                                                <div className={`slide-container ${eStyles.repeater_item}`}>
                                                    <h4 className={eStyles.my_sm}>Image</h4>

                                                    <MediaUploadCheck>
                                                        {slide.imageURL 
                                                        ? <img 
                                                            src={slide.imageURL} 
                                                            alt="Featured Callout Image"
                                                            className={eStyles.image_small} 
                                                            />
                                                        : null
                                                        }
                
                                                        <MediaUpload
                                                            onSelect={(media) => onSelectImage(media, index, slideIndex)}
                                                            allowedTypes={['image']}
                                                            value={slide.imageID}
                                                            render={({ open }) => (
                                                                <div>
                                                                    {slide.imageID ? (
                                                                        <button
                                                                            onClick={() => onRemoveImage(index, slideIndex)}
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

                                                    <div className={`item ${eStyles.flex_full}`}>
                                                        <button className={`${eStyles.button_remove} ${eStyles.my_sm}`} onClick={() => removeSlide(index, slideIndex)}>Remove Slide</button>
                                                    </div>
                                                </div>
                                                
                                            ))}
                                        </div>
                                    }

                                    <div className={`item ${eStyles.flex_full}`}>
                                        <button className={eStyles.button} onClick={() => addSlide(index)}>Add Image Slide</button>
                                    </div>
                                </div>

                                <div className={`item ${eStyles.item} ${eStyles.flex_end}`}>
                                    <button className={eStyles.button_remove} onClick={() => removeCallout(index)}>Remove Callout</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <button className={eStyles.button} onClick={addCallout}>Add Callout</button>
                </div>
            </div>
        )
    },
    save: function ({ attributes }) {
        const { 
            callouts
        } = attributes

        return (
            <div className={`callout-sliders ${styles.main}`}>
                <div className={`content-container ${styles.content_container}`} >
                    {callouts && 
                        callouts.map((callout) => {
                            const targetTab = (callout.opensInNewTab) ? '_blank' : '_self'

                            if (callout.row_type == 'two-column') {
                                return (
                                    <div className={`callout callout-two-column ${styles.row_type.two_column}`}>
                                        <div className={`content ${styles.content}`}>
                                            <div className={styles.gradient_left}></div>

                                            <div className={`content-wrapper ${styles.content_wrapper}`}>
                                                <RichText.Content 
                                                    value={callout.title} 
                                                    tagName="span"
                                                    role="heading" 
                                                    className={`title ${styles.title}`} 
                                                />
                                                <RichText.Content 
                                                    value={callout.content} 
                                                    tagName="p" 
                                                    className={styles.paragragh} 
                                                />

                                                {callout.buttonURL &&
                                                <a 
                                                    href={callout.buttonURL.url} 
                                                    className={styles.btn}
                                                    target={targetTab}
                                                    rel="noopener"
                                                    >
                                                    {callout.buttonText}
                                                </a>
                                                }
                                            </div>
                                        </div>

                                        <div className={`image-container ${styles.image_container}`}>
                                            {callout.sliders.length > 0 &&
                                            <div className={`slider-container ${styles.slider_container}`}>
                                                <div className={`swiper-wrapper ${styles.swiper_wrapper}`}>
                                                    {callout.sliders.map((slide, slideIndex) => (
                                                        <div className={`swiper-slide ${styles.swiper_slide}`}>
                                                            <img
                                                                src={slide.imageURL}
                                                                alt={`${callout.title} slide image ${slideIndex + 1}`}
                                                                className={`slide-image ${styles.image}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            }

                                            <div className={`nav-prev ${styles.nav_prev}`}>
                                                <img 
                                                    src={navArrow}
                                                    className={styles.nav_arrow}
                                                />
                                            </div>

                                            <div className={`nav-next ${styles.nav_next}`}>
                                                <img 
                                                    src={navArrow}
                                                    className={styles.nav_arrow}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            else if (callout.row_type == 'two-column-reverse') {
                                return (
                                    <div className={`callout callout-two-column-reverse ${styles.row_type.two_column_reverse}`}>
                                        <div className={`image-container ${styles.image_container}`}>
                                            {callout.sliders.length > 0 &&
                                            <div className={`slider-container ${styles.slider_container}`}>
                                                <div className={`swiper-wrapper ${styles.swiper_wrapper}`}>
                                                    {callout.sliders.map((slide, slideIndex) => (
                                                        <div className={`swiper-slide ${styles.swiper_slide}`}>
                                                            <img
                                                                src={slide.imageURL}
                                                                alt={`${callout.title} slide image ${slideIndex + 1}`}
                                                                className={`slide-image ${styles.image}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            }

                                            <div className={`nav-prev ${styles.nav_prev}`}>
                                                <img 
                                                    src={navArrow}
                                                    className={styles.nav_arrow}
                                                />
                                            </div>

                                            <div className={`nav-next ${styles.nav_next}`}>
                                                <img 
                                                    src={navArrow}
                                                    className={styles.nav_arrow}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className={`content ${styles.content}`}>
                                            <div className={styles.gradient_right}></div>

                                            <div className={`content-wrapper ${styles.content_wrapper} ${styles.content_reverse_wrapper}`}>
                                                <RichText.Content 
                                                    value={callout.title} 
                                                    tagName="span"
                                                    role="heading" 
                                                    className={`title ${styles.title} ${styles.title_right}`} 
                                                />
                                                <RichText.Content 
                                                    value={callout.content} 
                                                    tagName="p" 
                                                    className={styles.paragragh} 
                                                />

                                                {callout.buttonURL &&
                                                <a 
                                                    href={callout.buttonURL.url} 
                                                    className={styles.btn}
                                                    target={targetTab}
                                                    rel="noopener"
                                                    >
                                                    {callout.buttonText}
                                                </a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
})