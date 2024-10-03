import { registerBlockType } from '@wordpress/blocks'
import styles from '../styles/table-content'
import eStyles from '../styles/edit'
import { 
    TextControl, 
} from '@wordpress/components'
import {
    RichText,
    useBlockProps  
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/table-content', {
    title: 'Table Content',
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
        btnText: {
            type: 'string',
            default: '',
        },
        btnURL: {
            type: 'string',
            default: '',
        },
        tRows: {
            type: 'array',
            default: [],
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            title,
            content,
            btnText,
            btnURL,
            tRows
        } = attributes

        const blockProps = useBlockProps()

        const addTRow = () => {
            const newRow = {
                classes: '',
                monthlyFee: '',
                yearlyTuition: '',
                prePayDiscount: ''
            }

            const newTRows = [...tRows, newRow]

            setAttributes({
                tRows: newTRows,
            })
        }

        const removeRow = (index) => {
            const newTRows = [...tRows]
            newTRows.splice(index, 1)
            setAttributes({
                tRows: newTRows
            })
        }

        return (
            <div className={`table-content ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h2 className={eStyles.my_sm}>Table Content</h2>
                </div>

                <div className={`item bg-black text-blue-light ${eStyles.item} ${eStyles.flex_full}`}>
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
                            onChange={(content) => { setAttributes({ content })}}
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item}`}>
                        <h4 className={eStyles.my_sm}>Button Text</h4>

                        <TextControl
                            value={btnText}
                            onChange={(btnText) => { setAttributes({ btnText })}}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item}`}>
                        <h4 className={eStyles.my_sm}>Button URL</h4>

                        <LinkControl
                            label="Link URL"
                            value={{ url: btnURL }}
                            onChange={(newUrl) => {
                                setAttributes({ btnURL: newUrl.url })
                            }}
                        />
                    </div>
                </div>

                <div className={`item bg-blue-light ${eStyles.item} ${eStyles.flex_full}`}>
                    <h4 className={eStyles.my_sm}>Pricing Table</h4>
                    {tRows.length > 0 &&
                    <div className={`table-content-rows w-full`}>
                        {tRows.map((row, index) => (
                            <div 
                                className={`table-content-row ${eStyles.flex} ${eStyles.inner_block}`} 
                                key={index}
                                >
                                <div className={`item ${eStyles.flex_3}`}>
                                    <h5 className={eStyles.my_sm}>Classes</h5>
                                    
                                    <TextControl
                                        value={row.classes}
                                        onChange={(newValue) => {
                                            const newTRows = [...tRows]
                                            newTRows[index].classes = newValue
                                            setAttributes({ tRows: newTRows })
                                        }}
                                    />
                                </div>

                                <div className={`item ${eStyles.flex_3}`}>
                                    <h5 className={eStyles.my_sm}>Monthly Fee</h5>
                                    
                                    <TextControl
                                        value={row.monthlyFee}
                                        onChange={(newValue) => {
                                            const newTRows = [...tRows]
                                            newTRows[index].monthlyFee = newValue
                                            setAttributes({ tRows: newTRows })
                                        }}
                                    />
                                </div>

                                <div className={`item ${eStyles.flex_3}`}>
                                    <h5 className={eStyles.my_sm}>Yearly Tuition</h5>
                                    
                                    <TextControl
                                        value={row.yearlyTuition}
                                        onChange={(newValue) => {
                                            const newTRows = [...tRows]
                                            newTRows[index].yearlyTuition = newValue
                                            setAttributes({ tRows: newTRows })
                                        }}
                                    />
                                </div>

                                <div className={`item ${eStyles.flex_3}`}>
                                    <h5 className={eStyles.my_sm}>Pre-Play Discount</h5>
                                    
                                    <TextControl
                                        value={row.prePayDiscount}
                                        onChange={(newValue) => {
                                            const newTRows = [...tRows]
                                            newTRows[index].prePayDiscount = newValue
                                            setAttributes({ tRows: newTRows })
                                        }}
                                    />
                                </div>

                                <div className={`item ${eStyles.flex_full}`}>
                                    <button className={eStyles.button} onClick={() => removeRow(index)}>Remove Row</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                </div>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <button className={eStyles.button} onClick={addTRow}>Add Row</button>
                </div>
            </div>
        )
    },
    save: function ({ attributes }) {
        const { 
            title,
            content,
            btnText,
            btnURL,
            tRows,
        } = attributes

        return (
            <div className={`callout-blocks ${styles.main}`}>
                <div className={`content-container ${styles.content_container}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={styles.gradient_left}></div>

                        <div className={`content-wrapper ${styles.content_wrapper}`}>
                            <RichText.Content 
                                value={title} 
                                tagName="span"
                                role="heading" 
                                className={`title ${styles.title}`} 
                            />
                            <RichText.Content 
                                value={content} 
                                tagName="p" 
                                className={styles.paragragh} 
                            />
                            <a href={btnURL} className={styles.btn}>
                                {btnText}
                            </a>
                        </div>
                    </div>
                    
                    <div className={`tg-wrap ${styles.table_content}`}>
                        <table id="tg-Mz6Gt" className={`tg ${styles.table}`} style="undefined;table-layout: fixed; width: 413px">
                            <colgroup>
                                <col style="width: 120px"></col>
                                <col style="width: 110px"></col>
                                <col style="width: 105px"></col>
                                <col style="width: 112px"></col>
                            </colgroup>

                            <thead>
                                <tr>
                                    <th className="tg-baqh">Classes</th>
                                    <th className="tg-baqh">Monthly Fee</th>
                                    <th className="tg-baqh">Yearly Tuition</th>
                                    <th className="tg-baqh">Pre-Pay Discount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tRows && 
                                    tRows.map((row) => {
                                        return (
                                            <tr>
                                                <td className="tg-0lax">{row.classes}</td>
                                                <td className="tg-0lax">{row.monthlyFee}</td>
                                                <td className="tg-0lax">{row.yearlyTuition}</td>
                                                <td className="tg-0lax">{row.prePayDiscount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
})