import { PUBLISHED_ITN_FETCH, PUBLISHED_ITN_RESET } from '../actions/types';

const INITIAL_STATE = {
	itineraryList: [],
	loading: true,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PUBLISHED_ITN_FETCH:
        return {...state, loading: false, itineraryList: action.payload};
    case PUBLISHED_ITN_RESET:
        return INITIAL_STATE;
		default:
			return state;
	}
};
