import { registerBlockType } from '@wordpress/blocks'
import { RichText } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'
import { truncateText, getSiteURL, getSquiggly } from '../lib/utils'
import eStyles from '../styles/edit'
import styles from '../styles/events'
import moment from 'moment'
import eventsJson from '../json/events.json'


registerBlockType('cofd-blocks/events', {
    title: 'Events',
    icon: 'layout',
    category: 'common',
    attributes: {
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const eventsData = Object.values(eventsJson)

        return (
            <div className={`featured-events ${eStyles.main} ${eStyles.flex}`}>
                <h2 className={eStyles.my_sm}>Events</h2>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <p>Events can be edited in the events.js block file through the COFD Blocks plugin directory. 
                        Events data is pulled in from the events.json file which is created when a new event is published.</p>
                </div>
            </div>
        )
    },
    save: function () {
        return null
    },
});