import { ITINERARY_FETCH, ITINERARY_RESET } from '../actions/types';

const INITIAL_STATE = { 
	itineraryList: [],
	loading: true,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ITINERARY_FETCH:
            return {...state, loading: false, itineraryList: action.payload};
        case ITINERARY_RESET:
            return INITIAL_STATE;
		default:
			return state;
	}
};
