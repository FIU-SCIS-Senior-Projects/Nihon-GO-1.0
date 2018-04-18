import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_START_SPINNER,
	LOGOUT
} from '../actions/types';

const INITIAL_STATE = { 
	email: '',
	password: '',
	user: null,
	error: '',
	loading: false,
	loggedIn: false
};

export default (state = INITIAL_STATE, action) => {	
	switch (action.type) {
		case EMAIL_CHANGED:
			return {...state, email: action.payload };
		case PASSWORD_CHANGED:
			return {...state, password: action.payload };
		case LOGIN_USER_START_SPINNER:
			return {...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS:
			return {...state, ...INITIAL_STATE, user: action.payload, loggedIn: true };
		case LOGIN_USER_FAIL:
			return {...state, password: '', loading: false, error: 'Authentication Failed.' };
		case LOGOUT:
			return {...state, ...INITIAL_STATE};
		default:
			return state;
	}
};