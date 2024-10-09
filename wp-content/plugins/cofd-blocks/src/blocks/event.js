import { registerBlockType } from '@wordpress/blocks'
import { select, subscribe } from '@wordpress/data'
import { useEffect, RawHTML, createElement } from '@wordpress/element';
import { savePostAttributesToJSON, useAfterSave } from '../lib/utils'
import styles from '../styles/event'
import eStyles from '../styles/edit'
import moment from 'moment'
import squiggly from '../assets/images/squiggly-blue.svg'
import { TextControl, DateTimePicker, ToggleControl } from '@wordpress/components'
import {
    RichText,
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor'
import {
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor'


registerBlockType('cofd-blocks/event', {
    title: 'Event',
    icon: 'layout', // Replace with a suitable icon
    category: 'common',
    attributes: {
        eventID: {
            type: 'string',
            default: '',
        },
        eventTitle: {
            type: 'string',
            default: '',
        },
        eventImageID: {
            type: 'string',
            default: '',
        },
        eventImageURL: {
            type: 'string',
            default: '',
        },
        eventStartDate: {
            type: 'string',
            default: '',
        },
        eventEndDate: {
            type: 'string',
            default: '',
        },
        eventContent: {
            type: 'string',
            default: '<h1>HTML Goes here</h1>'
        },
        lButtonContent: {
            type: 'string',
            default: '',
        },
        lButtonText: {
            type: 'string',
            default: '',
        },
        lButtonURL: {
            type: 'object',
            default: {},
        },
        rButtonContent: {
            type: 'string',
            default: '',
        },
        rButtonText: {
            type: 'string',
            default: '',
        },
        rButtonURL: {
            type: 'object',
            default: {},
        },
        eventLink: {
            type: 'string',
            default: '',
        },
        eventHide: {
            type: 'boolen',
            default: false,
        },
    },
    schema: {
        attributes: {
            eventID: {
                type: 'string',
            },
            eventTitle: {
                type: 'string',
            },
            eventImageID: {
                type: 'string',
            },
            eventImageURL: {
                type: 'string',
            },
            eventStartDate: {
                type: 'string',
            },
            eventEndDate: {
                type: 'string',
            },
            eventContent: {
                type: 'string',
            },
            eventLink: {
                type: 'string',
            },
            eventHide: {
                type: 'boolen',
            },
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const {
            eventImageID,
            eventImageURL,
            eventStartDate,
            eventEndDate,
            eventContent,
            lButtonText,
            lButtonURL,
            lButtonContent,
            rButtonContent,
            rButtonText,
            rButtonURL,
            eventHide,
        } = attributes

        const isAfterSave = useAfterSave()

        const blockProps = useBlockProps()

        const renderHTML = (html) => { createElement(RawHTML, null, html) }

        // Function to update the event date
        const onChangeDate = (newDate, time) => {
            var newDateTime = moment(newDate).format( 'YYYY-MM-DD HH:mm' )

            if (time == 'start') setAttributes({ eventStartDate: newDateTime })
            if (time == 'end') setAttributes({ eventEndDate: newDateTime })
        }

        const onSelectImage = (media) => {
            setAttributes({
                eventImageID: media.id,
                eventImageURL: media.url,
            })
        }

        const onRemoveImage = () => {
            setAttributes({
                eventImageID: 0,
                eventImageURL: '',
            })
        }

        const toggleEventHide = () => {
            setAttributes({ eventHide: !eventHide })
        }

        const onWordPressUpdate = () => {
            const postID = select('core/editor').getCurrentPostId();
            savePostAttributesToJSON(attributes, postID, '/cofd-blocks/v1/save-event-attributes');
        }

        useEffect(() => {
            const postTitle = select("core/editor").getEditedPostAttribute("title")
            const postID = select("core/editor").getEditedPostAttribute("id")
            const postLink = select('core/editor').getEditedPostAttribute('link')

            // Update the attributes with post title and ID
            setAttributes({
                eventTitle: postTitle,
                eventID: postID.toString(),
                eventLink: postLink,
            })

            if ( isAfterSave ) {
                onWordPressUpdate()
            }
        }, [ isAfterSave ])

        console.log(eventContent)

        return (
            <div className={`event ${eStyles.main} ${eStyles.flex}`}>
                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Featured Image</h4>

                        <MediaUploadCheck>
                            {eventImageURL 
                            ? <img 
                                src={eventImageURL} 
                                alt="Featured Event Image"

                                className={eStyles.image} 
                                />
                            : null
                            }

                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={eventImageID}
                                render={({ open }) => (
                                    <div>
                                        {eventImageID ? (
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
                            tagName='p'
                            value={ eventContent }
                            onChange={( eventContent ) => {
                                setAttributes({ eventContent: eventContent })
                            }}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Start Date</h4>

                        <DateTimePicker
                            currentDate={eventStartDate}
                            onChange={(newDate) => onChangeDate(newDate, 'start')}
                            is12Hour
                            dateFormat="F j, Y"
                            timeFormat="g:i a"
                            placeholder="Select Event Date and Time"
                        />

                        <p>Selected Date: {eventStartDate}</p>
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>End Date</h4>

                        <DateTimePicker
                            currentDate={eventEndDate}
                            onChange={(newDate) => onChangeDate(newDate, 'end')}
                            is12Hour
                            dateFormat="F j, Y"
                            timeFormat="g:i a"
                            placeholder="Select Event Date and Time"
                        />

                        <p>Selected Date: {eventEndDate}</p>
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>First Button Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ lButtonContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( lButtonContent ) => setAttributes({ lButtonContent })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>First Button Text</h4>

                        <TextControl
                            value={lButtonText}
                            onChange={ ( lButtonText ) => setAttributes({ lButtonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>First Button URL</h4>

                        <LinkControl
                            value={lButtonURL}
                            onChange={(newURL) => setAttributes({ lButtonURL: newURL })}
                            onRemove={() => {
                                setAttributes({ lButtonURL: {} })}
                            }
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`${eStyles.my_sm} ${eStyles.pt_sm}`}>Second Button Content</h4>

                        <RichText
                            { ...blockProps }
                            tagName="p" 
                            value={ rButtonContent } 
                            allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                            onChange={ ( rButtonContent ) => setAttributes({ rButtonContent })} 
                            placeholder='Type Here...'
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Second Button Text</h4>

                        <TextControl
                            value={rButtonText}
                            onChange={ ( rButtonText ) => setAttributes({ rButtonText })}
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Second Button URL</h4>

                        <LinkControl
                            value={rButtonURL}
                            onChange={(newURL) => setAttributes({ rButtonURL: newURL })}
                            onRemove={() => {
                                setAttributes({ rButtonURL: {} })}
                            }
                        />
                    </div>

                    <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={eStyles.my_sm}>Hide Event From All Events Page</h4>

                        <ToggleControl
                            checked={eventHide}
                            onChange={toggleEventHide}
                        />
                    </div>

                    {/* <div className={`sub-item ${eStyles.sub_item} ${eStyles.flex_full}`}>
                        <h4 className={`text-red uppercase ${eStyles.mt_md} ${eStyles.pt_sm} ${eStyles.text_alert}`}>* This is required to update Event data *</h4>
                        <small className={`block ${eStyles.mb_md}`}>Clicking this updates the event data thats used for the COFD Blocks such as Events, Featured Events, etc. Make sure to also 
                            click the default post save/update button to save to the database. 
                        </small>

                        <button
                                className={eStyles.button_save}
                                onClick={() => {
                                    const postID = select('core/editor').getCurrentPostId();
                                    savePostAttributesToJSON(attributes, postID, '/cofd-blocks/v1/save-event-attributes');
                                }}
                            >
                            Save/Update Events JSON
                        </button>
                    </div> */}
                </div>
            </div>
        );
    },
    save: function ({ attributes }) {
        const {
            eventTitle,
            eventID,
            eventImageID,
            eventImageURL,
            eventStartDate,
            eventEndDate,
            eventContent,
            rButtonContent,
            lButtonText,
            lButtonURL,
            lButtonContent,
            rButtonText,
            rButtonURL,
        } = attributes

        // Get the current post's URL
        const postUrl = select("core/editor").getEditedPostAttribute("link")

        // Extract the site URL from the post URL
        const siteUrl = postUrl ? postUrl.split("/").slice(0, 3).join("/") : ""

        const getFormattedDate = () => {
            const startMoment = moment(eventStartDate)
            const endMoment = moment(eventEndDate)
        
            // Check if both start and end dates are the same
            const datesAreEqual = startMoment.isSame(endMoment, 'day')
        
            if (datesAreEqual) {
                // If start and end dates are the same, return only the formatted start date
                return startMoment.format('MMMM D YYYY')
            } else {
                // If start and end dates are different, format as per the original logic
                if (eventEndDate) {
                    return `${startMoment.format('MMMM D')}-${endMoment.format('D YYYY')}`
                } else {
                    return startMoment.format('MMMM D YYYY')
                }
            }
        }

        const formatTime = (dateTime) => {
            return moment(dateTime).format('h:mm A')
        }
        
        const getStartTime = () => {
            return formatTime(eventStartDate)
        }
        
        const getEndTime = () => {
            return eventEndDate ? `-${formatTime(eventEndDate)}` : ''
        }

        const renderHTML= (html) => createElement(RawHTML, null, html)

        console.log(eventContent)

        return (
            <div className={`event ${styles.main}`}>
                <div className={`gradients`}>
                    <div className='radial-gradient radial-gradient-top-right'></div>
                    <div className='radial-gradient radial-gradient-bottom-left'></div>
                </div>

                <div className={`content-container ${styles.content_container}`}>
                    <div className={`content-left ${styles.content_left}`}>
                        <div className={`image-container gradient-backdrop ${styles.image_container}`}>
                            <img 
                                src={eventImageURL} 
                                alt={`${eventTitle} Image`}
                                className={`image ${styles.image}`} />
                        </div>
                    </div>

                    <div className={`content-right ${styles.content_right}`}>
                        <div className={`title ${styles.title}`}>
                            <span className={styles.h3}>{eventTitle}</span>
                            <img 
                                className={`squiggly ${styles.squiggly}`} 
                                alt="Squiggly Icon"
                                src={squiggly} />
                        </div>

                        <span className={`date ${styles.date}`}>{getFormattedDate()}</span>

                        <div className={`time ${styles.time}`}>
                            <span className={`start-time ${styles.time_item}`}>{getStartTime()}</span>
                            <span className={`end-time ${styles.time_item}`}>{getEndTime()}</span>
                        </div>

                        <div className={`content ${styles.content}`}>
                            <RawHTML>{ eventContent }</RawHTML>
                        </div>

                        <div className={`callouts ${styles.callouts}`}>
                            {lButtonURL.url && 
                            <div className={`btn-container ${styles.btn_container}`}>
                                <div className={`content ${styles.btn_content}`}>
                                    <RichText.Content value={lButtonContent} tagName="p" />
                                </div>

                                <a 
                                    href={lButtonURL.url}
                                    className={styles.btn_left}
                                    target={(lButtonURL.opensInNewTab) ? '_blank' : '_self'}
                                    rel="noopener"
                                    >
                                    {lButtonText}
                                </a>
                            </div>
                            }

                            {rButtonURL.url &&
                            <div className={`btn-container ${styles.btn_container}`}>
                                <div className={`content ${styles.btn_content}`}>
                                    <RichText.Content value={rButtonContent} tagName="p" />
                                </div>

                                <a 
                                    href={rButtonURL.url}
                                    className={styles.btn_right}
                                    target={(rButtonURL.opensInNewTab) ? '_blank' : '_self'}
                                    rel="noopener"
                                    >
                                    {rButtonText}
                                </a>
                            </div>
                            }
                        </div>
                    </div>
                </div>

                <div className={`all-events ${styles.all_events}`}>
                    <a href={`/events`} className='btn-default btn-blue'>
                        All Events
                    </a>
                </div>
            </div>
        )
    },
})