import { ITINERARY_FETCH } from '../actions/types';

export default (state = [], action) => {
	switch (action.type) {
		case ITINERARY_FETCH:
			return action.payload;
		default:
			return state;
	}
};
