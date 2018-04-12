import { ITINERARY_FETCH } from '../actions/types';
import data from './mock_data.json';

export default (state = [], action) => {
	switch (action.type) {
		case ITINERARY_FETCH:
			return action.payload;
		default:
			return state;
	}
};
