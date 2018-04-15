import { STARTED_FETCH, STARTED_UPDATE, STARTED_RESET } from '../actions/types';

const INITIAL_STATE = {
	isStarted: false,
	events: 0,
    progress: 0,
    started: 'no',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STARTED_FETCH:
			return action.payload;
		case STARTED_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value };
        case STARTED_RESET:
			return INITIAL_STATE;
		default:
			return state;
	}
};