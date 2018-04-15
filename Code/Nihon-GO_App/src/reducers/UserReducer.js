import { USER_PROFILE_FETCH, USER_PROFILE_UPDATE } from '../actions/types';

const INITIAL_STATE = {
	username: '',
	country: '',
	languages: '',
	description: '',
	email: '',
    start_itn: {
        events: 0,
        progress: 0,
        started: 'no',
    },
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_PROFILE_FETCH:
			return action.payload;
		case USER_PROFILE_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value };
		default:
			return state;
	}
};