import {
    ITINERARY_UPDATE,
    RESET_ITINERARY_FORM,
} from '../actions/types';

const INITIAL_STATE = {
    titleInput: '',
    location: '',
    description: '',
    image: '',
    duration: 0,
    events: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ITINERARY_UPDATE:
            return {...state, [action.payload.prop]: action.payload.value };
        case RESET_ITINERARY_FORM:
            return {INITIAL_STATE};
        default:
            return state;
    }
};