import { createReduxStore, register } from '@wordpress/data';
import eventsJson from '../json/events.json';

const DEFAULT_STATE = {
    eventsData: [],
    biosData: [],
}

export const actions = {
    setEventsData( data ) {
        return {
            type: 'SET_EVENTS_DATA',
            data
        };
    },
    setBiosData( data ) {
        return {
            type: 'SET_BIOS_DATA',
            data
        };
    },
}

export const store = createReduxStore('cofd/data', {
    reducer: (state = DEFAULT_STATE, action) => {
        switch (action.type) {
            case 'SET_EVENTS_DATA':
                return { ...state, eventsData: action.data };
            case 'SET_BIOS_DATA':
                return { ...state, biosData: action.data };
        }

        return state
    },
    actions,
    selectors: {
        getEventsData: (state) => {
            return state.eventsData
        },
    },
});

register(store)

actions.setEventsData(eventsJson)