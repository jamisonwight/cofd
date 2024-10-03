import { registerBlockType } from '@wordpress/blocks'
import eStyles from '../styles/edit'
import moment from 'moment'
import eventsJson from '../json/events.json'

registerBlockType('cofd-blocks/featured-events', {
    title: 'Featured Events',
    icon: 'layout',
    category: 'common',
    attributes: {
        featuredEvents: {
            type: 'array',
            default: [],
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const [eventsData, setEventsData] = wp.element.useState([])
        const baseUrl = cofdData.siteUrl

        wp.element.useEffect(() => {
            fetch(`${baseUrl}/wp-content/plugins/cofd-blocks/src/json/events.json`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") === -1) {
                        throw new TypeError("Received non-JSON content");
                    }
                    return response.json();
                })
                .then((data) => setEventsData(Object.values(data)))
                .catch((error) => console.error('Error fetching events:', error));
        }, []);

        const toggleFeaturedEvent = (eventID) => {
            let updatedFeaturedEvents = [...attributes.featuredEvents];

            if (updatedFeaturedEvents.includes(eventID)) {
                updatedFeaturedEvents = updatedFeaturedEvents.filter((id) => id !== eventID);
            } else {
                updatedFeaturedEvents.push(eventID);
            }
            setAttributes({ featuredEvents: updatedFeaturedEvents });
        }

        return (
            <div className={`featured-events ${eStyles.main} ${eStyles.flex}`}>
                <h2 className={eStyles.my_sm}>Featured Events</h2>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h3 className={eStyles.my_sm}>Select Events</h3>
                    <p>Click the events in the order you want them to be displayed</p>

                    <ul className={`event-select ${eStyles.postSelect.main}`}>
                        {eventsData.map((event) => (
                        <li
                            key={event.eventID}
                            onClick={() => toggleFeaturedEvent(event.eventID)}
                            className={attributes.featuredEvents.includes(event.eventID) ? eStyles.postSelect.selected : ''}
                            >
                            <h4 className={`title ${eStyles.postSelect.title}`}>
                                <i>{event.eventTitle}</i><br></br> 
                                <small>{moment(event.eventStartDate).format('MMMM D, YYYY')}-{moment(event.eventEndDate).format('MMMM D, YYYY')}</small>
                            </h4>
                            <img className={`image ${eStyles.postSelect.image}`} src={event.eventImageURL} alt={event.eventTitle} />
                            {attributes.featuredEvents.includes(event.eventID) && 
                                <span className={eStyles.postSelect.index}>{attributes.featuredEvents.indexOf(event.eventID) + 1}</span>
                            }
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    },
    save: function () {
        // Template is in '/dynamic-blocks/featured-events.php
        return null;
    },
});