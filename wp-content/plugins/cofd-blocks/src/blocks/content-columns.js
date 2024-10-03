import { registerBlockType } from '@wordpress/blocks'
import { getSquiggly } from '../lib/utils'
import styles from '../styles/content-columns'
import eStyles from '../styles/edit'
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


registerBlockType('cofd-blocks/content-columns', {
    title: 'Content Columns',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        title: {
            type: 'string',
            default: ''
        },
        columns: {
            type: 'array',
            default: [],
        },
        textTheme: {
            type: 'string',
            default: 'white',
        },
        btnTheme: {
            type: 'string',
            default: 'white',
        },
        bgGradient: {
            type: 'string',
            default: 'linear-gradient(16deg, #505774 0%, #C6BEB2 100%)'
        },
        bgImageURL: {
            type: 'string',
            default: '',
        },
        bgImageID: {
            type: 'string',
            default: '',
        },
        content_center: {
            type: 'boolean',
            default: false,
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props

        const {
            title,
            columns,
            textTheme,
            btnTheme,
            bgGradient,
            bgImageURL,
            bgImageID,
            content_center,
        } = attributes

        const blockProps = useBlockProps()

        const onSelectImage = (media) => {
            setAttributes({
                bgImageID: media.id,
                bgImageURL: media.url,
            })
        }

        const onRemoveImage = () => {
            setAttributes({
                bgImageID: 0,
                bgImageURL: '',
            })
        }

        const addColumn = () => {
            const newColumn = {
                title: '',
                content: '',
                btnText: '',
                btnURL: ''
            }

            const newColumns = [...columns, newColumn]

            setAttributes({
                columns: newColumns,
            })
        }

        const removeColumn = (index) => {
            const newColumns = [...columns]
            newColumns.splice(index, 1)
            setAttributes({
                columns: newColumns
            })
        }

        const contentCenterCheckbox = () => {
            setAttributes({ content_center: !content_center })
        }

        return (
            <div 
                className={`content-columns txt-${textTheme} ${eStyles.main} ${eStyles.flex}`}
                style={{background: (bgImageURL) ? `url(${bgImageURL})` : bgGradient }}
                >
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Content Columns</h2>
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Title</h4>
                    
                    <TextControl
                        value={ title}
                        onChange={(title) => { setAttributes({ title })}}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Text Theme</h4>

                    <SelectControl
                        value={ textTheme }
                        options={[
                            { label: 'White', value: 'white' },
                            { label: 'Blue', value: 'blue'},
                            { label: 'Blue Dark', value: 'blue-dark'},
                            { label: 'Black', value: 'black' },
                        ]}
                        onChange={(textTheme) => setAttributes({ textTheme })}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Content Center</h4>
                    <ToggleControl
                        checked={content_center}
                        onChange={contentCenterCheckbox}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Button Theme</h4>

                    <SelectControl
                        value={ btnTheme }
                        options={[
                            { label: 'White', value: 'white' },
                            { label: 'Blue', value: 'blue' },
                            { label: 'Blue Dark', value: 'blue-dark'},
                            { label: 'Black', value: 'black' },
                        ]}
                        onChange={(btnTheme) => setAttributes({ btnTheme })}
                    />
                </div>

                <div className={`item ${eStyles.item}`}>
                    <h4 className={eStyles.my_sm}>Background Gradient</h4>
                    
                    <TextControl
                        value={ bgGradient }
                        onChange={(bgGradient) => { setAttributes({ bgGradient })}}
                    />
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_6}`}>
                    <h4 className={eStyles.my_sm}>Background Image</h4>

                    <MediaUploadCheck>
                        {bgImageURL 
                        ? <img 
                            src={bgImageURL} 
                            alt="Featured Hero Image"
                            className={eStyles.image} 
                            />
                        : null
                        }

                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={bgImageID}
                            render={({ open }) => (
                                <div>
                                    {bgImageID ? (
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

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Text Columns</h4>
                    {columns.length > 0 &&
                    <div className={`content-columns w-full`}>
                        {columns.map((col, index) => (
                            <div 
                                className={`content-column ${eStyles.flex} ${eStyles.inner_block}`} 
                                key={index}
                                >
                                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                                    <h4 className={eStyles.my_sm}>Title</h4>

                                    <TextControl
                                        value={ col.title }
                                        onChange={(title) => { 
                                            const newColumnns = [...columns]
                                            newColumnns[index].title = title
                                            setAttributes({ columns: newColumnns })}
                                        }
                                    />

                                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                                        <h4 className={eStyles.my_sm}>Content</h4>

                                        <RichText
                                            { ...blockProps }
                                            tagName="p" 
                                            value={ col.content } 
                                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                                            onChange={(content) => { 
                                                const newColumns = [...columns]
                                                newColumns[index].content = content
                                                setAttributes({ columns: newColumns })}
                                            }
                                            placeholder='Type Here...'
                                        />
                                    </div>

                                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                                        <h4 className={eStyles.my_sm}>Button Text</h4>

                                        <TextControl
                                            value={ col.btnText }
                                            onChange={(btnText) => { 
                                                const newColumns = [...columns]
                                                newColumns[index].btnText = btnText
                                                setAttributes({ columns: newColumns })}
                                            }
                                        />
                                    </div>

                                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                                        <h4 className={eStyles.my_sm}>Button URL</h4>

                                        <LinkControl
                                            label="Link URL"
                                            value={col.btnURL}
                                            onChange={(newUrl) => {
                                                const newColumns = [...columns]
                                                newColumns[index].btnURL = newUrl
                                                setAttributes({ columns: newColumns })
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className={`item ${eStyles.flex_full}`}>
                                    <button className={eStyles.button} onClick={() => removeColumn(index)}>Remove Column</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <button className={eStyles.button} onClick={addColumn}>Add Row</button>
                </div>
            </div>
        )
    },
    save: function ({ attributes }) {
        const {
            title, 
            columns,
            textTheme,
            btnTheme,
            bgGradient,
            bgImageURL,
            content_center,
        } = attributes

        const bg = (bgImageURL) ? `url(${bgImageURL})` : bgGradient 
        const contentAlign = (content_center) ? styles.content_center : styles.content_left

        return (
            <div 
                className={`content-columns ${styles.main}`}
                style={{ background: bg }}
                >
                <div className={`content-container ${styles.content_container}`}>
                    <div className={`title-container ${styles.title_container}`}>
                        <RichText.Content 
                            value={title} 
                            tagName="span"
                            role="heading" 
                            className={`title txt-${textTheme} ${styles.main_title}`} 
                        />

                        <img
                            src={getSquiggly(textTheme)}
                            alt={`squiggly divider`}
                            className={styles.squiggly}
                        />
                    </div>

                    <div className={`content ${styles.content}`}>
                        {columns && 
                            columns.map((col) => {
                                return (
                                    <div className={`column-item txt-${textTheme} ${styles.column} ${contentAlign}`}>
                                        <RichText.Content 
                                            value={col.title} 
                                            tagName="span"
                                            role="heading" 
                                            className={`title ${styles.title}`} 
                                        />
                                        <RichText.Content 
                                            value={col.content} 
                                            tagName="p" 
                                            className={styles.paragraph} 
                                        />

                                        {col.btnURL &&
                                        <a href={col.btnURL.url} className={`btn-${btnTheme} ${styles.btn}`}>
                                            {col.btnText}
                                        </a>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
})