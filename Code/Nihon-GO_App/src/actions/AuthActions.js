import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_START_SPINNER,
	LOGOUT
} from './types';

export * from './ItineraryActions'

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

// Logs in user
export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_START_SPINNER });
		
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				console.log(error);
				console.log("WORKED");
				loginUserFail(dispatch);
			});
	};
};

// Registers user
export const registerUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_START_SPINNER });
		
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				console.log(error);
				loginUserFail(dispatch);
			});
	};
};

// Create guest user
export const guestUser = () => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_START_SPINNER });
		
		firebase.auth().signInAnonymously()
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				console.log(error);
				loginUserFail(dispatch);
			});
	};
};

// Logs out user
export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: LOGOUT });
		
		firebase.auth().signOut();
	};
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL});
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	
	Actions.homepage();
};

//tech-stack
export const selectLibrary = (libraryId) => {
	return {
		type: 'select_library',
		payload: libraryId
	};
};

export const selectItinerary = (itineraryId) => {
	Actions.eventList();
	
	return {
		type: 'select_itinerary',
		payload: itineraryId
	};
};