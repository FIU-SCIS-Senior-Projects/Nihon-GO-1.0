import {
    ITINERARY_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    titleInput: '',
    location: '',
    description: '',
    image: '',
    duration: '',
    events: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ITINERARY_UPDATE:
            return {...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};