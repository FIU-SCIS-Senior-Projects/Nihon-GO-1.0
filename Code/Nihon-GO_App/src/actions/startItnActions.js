import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { STARTED_UPDATE, STARTED_FETCH, STARTED_RESET } from './types';

// Update user input as user types
export const startedItnUpdate = ({ prop, value }) => {
	return {
		type: STARTED_UPDATE,
		payload: { prop, value }
	};
};

// Fetch started data
export const startItnFetch = (dispatch, startedData) => {

	const { events, progress, started, title } = startedData;
    const isStarted = started != 'no';
    
    dispatch({
        type: STARTED_FETCH,
        payload: { isStarted, events, progress, started, title, isViewing: false }
    });
};

export const startedItnReset = (dispatch) => {
    if(!dispatch){
        return {
            type: STARTED_RESET
        };
    }
    dispatch({
        type: STARTED_RESET
    });
};

// Updates user profile using user inputed data
export const startedItnSave = ({ events, progress, started, title }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/start_itn`)
			.update({ events, progress, started, title })
	};
};
