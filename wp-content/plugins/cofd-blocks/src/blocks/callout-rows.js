import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/callout-rows'
import eStyles from '../styles/edit'
import { imageDimensions } from '../lib/utils'
import { 
    TextControl, 
    SelectControl,
    ToggleControl,
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

registerBlockType('cofd-blocks/callout-rows', {
    title: 'Callout Rows',
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
                imageID: '',
                imageURL: '',
                imageCustomWidth: '',
                imageCustomHeight: '',
                buttonURL: [],
                buttonText: '',
                opensInNewTab: false,
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

        const onSelectImage = (media, index) => {
            const newCallouts = [...callouts]
            newCallouts[index].imageID = media.id
            newCallouts[index].imageURL = media.url

            setAttributes({
                callouts: newCallouts
            })
        }

        const onRemoveImage = (index) => {
            const newCallouts = [...callouts]
            newCallouts[index].imageID = 0
            newCallouts[index].imageURL = ''

            setAttributes({
                callouts:  newCallouts
            })
        }
        
        return (
            <div className={`callout-rows ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Callout Rows</h2>
                </div>

                <div className={`item bg-black text-blue-light ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Callouts</h4>
                    {callouts.length > 0 &&
                    <div className={`callouts w-full`}>
                        {callouts.map((callout, index) => (
                            <div 
                                className={`slide ${eStyles.flex} ${eStyles.inner_block}`} 
                                key={index}
                                >
                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <h4 className={eStyles.my_sm}>Row Type</h4>
                                    <SelectControl
                                        value={callout.row_type}
                                        options={[
                                            { label: 'Two Column', value: 'two-column' },
                                            { label: 'Two Column Reverse', value: 'two-column-reverse' },
                                            { label: 'Full Column', value: 'full-column' },
                                        ]}
                                        onChange={(row_type) => callout['row_type'] = row_type }
                                    />
                                </div>

                                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
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
                                        />
                                    </div>
                                </div>

                                <div className={`item text-blue-light ${eStyles.item} ${eStyles.flex_6}`}>
                                    <h4 className={eStyles.my_sm}>Image</h4>

                                    <MediaUploadCheck>
                                        {callout.imageURL 
                                        ? <img 
                                            src={callout.imageURL} 
                                            alt="Featured Callout Image"
                                            className={eStyles.image} 
                                            />
                                        : null
                                        }

                                        <MediaUpload
                                            onSelect={(media) => onSelectImage(media, index)}
                                            allowedTypes={['image']}
                                            value={callout.imageID}
                                            render={({ open }) => (
                                                <div>
                                                    {callout.imageID ? (
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

                                    <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                        <h4 className={eStyles.my_sm}>Custom Image Width</h4>

                                        <TextControl
                                            value={callout.imageCustomWidth}
                                            onChange={(newValue) => {
                                                const newCallouts = [...callouts]
                                                newCallouts[index].imageCustomWidth = newValue
                                                setAttributes({ callouts: newCallouts })
                                            }}
                                        />
                                    </div>

                                    <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                        <h4 className={eStyles.my_sm}>Custom Image Height</h4>

                                        <TextControl
                                            value={callout.imageCustomHeight}
                                            onChange={(newValue) => {
                                                const newCallouts = [...callouts]
                                                newCallouts[index].imageCustomHeight = newValue
                                                setAttributes({ callouts: newCallouts })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <button className={eStyles.button} onClick={() => removeCallout(index)}>Remove Callout</button>
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
            <div className={`callout-rows ${styles.main}`}>
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
                                                <a 
                                                    href={callout.buttonURL.url} 
                                                    className={styles.btn}
                                                    target={targetTab}
                                                    rel="noopener"
                                                    >
                                                    {callout.buttonText}
                                                </a>
                                            </div>
                                        </div>

                                        <div className={`image-container ${styles.image_container} ` +
                                            `${imageDimensions(
                                                styles.image_width,
                                                callout.imageCustomWidth, 
                                                styles.image_height, 
                                                callout.imageCustomHeight)}`}
                                            >
                                            <img 
                                                src={callout.imageURL} 
                                                alt={`${callout.title} Image`} 
                                                className={`image ${styles.image}`}
                                            />
                                        </div>
                                    </div>
                                )
                            }

                            else if (callout.row_type == 'two-column-reverse') {
                                return (
                                    <div className={`callout callout-two-column-reverse ${styles.row_type.two_column_reverse}`}>

                                        <div className={`image-container ${styles.image_container} ` + 
                                            `${imageDimensions(
                                                styles.image_width,
                                                callout.imageCustomWidth, 
                                                styles.image_height, 
                                                callout.imageCustomHeight)}`}
                                                >
                                            <img 
                                                src={callout.imageURL} 
                                                alt={`${callout.title} Image`} 
                                                className={`image ${styles.image}`}
                                            />
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
                                                <a 
                                                    href={callout.buttonURL.url} 
                                                    className={styles.btn}
                                                    target={targetTab}
                                                    rel="noopener"
                                                    >
                                                    {callout.buttonText}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            else if (callout.row_type == 'full-column') {
                                return (
                                    <div className={`callout callout-full-column ${styles.row_type.full_column}`}>
                                        <div className={`content-full ${styles.content_full}`}>
                                            <div className={styles.gradient_center}></div>
                                            
                                            <div className={`content ${styles.content_wrapper}`}>
                                                <RichText.Content 
                                                    value={callout.title} 
                                                    tagName="span"
                                                    role="heading" 
                                                    className={`title ${styles.title} ${styles.title_center}`} 
                                                />
                                                <RichText.Content 
                                                    value={callout.content} 
                                                    tagName="p" 
                                                    className={styles.paragragh} 
                                                />
                                                <a 
                                                    href={callout.buttonURL.url} 
                                                    className={styles.btn}
                                                    target={targetTab}
                                                    rel="noopener"
                                                    >
                                                    {callout.buttonText}
                                                </a>
                                            </div>
                                        </div>

                                        <div className={`image-full ${styles.image_full} ` + 
                                            `${imageDimensions(
                                                styles.image_full_width,
                                                callout.imageCustomWidth, 
                                                styles.image_full_height, 
                                                callout.imageCustomHeight)}`}
                                            >
                                            <img 
                                                src={callout.imageURL} 
                                                alt={`${callout.title} Image`} 
                                                className={`image ${styles.image}`}
                                            />
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