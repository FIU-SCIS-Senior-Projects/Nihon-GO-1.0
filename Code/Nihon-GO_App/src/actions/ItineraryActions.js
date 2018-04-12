
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    ITINERARY_UPDATE,
	ITINERARY_FETCH
} from './types';

export const itineraryUpdate = ({ prop, value }) => {
    return {
        type: ITINERARY_UPDATE,
        payload: { prop, value }
    };
};

export const itineraryCreate = ({ titleInput, location, description, image, duration, events }) => {
    return ()  =>{
        firebase.database().ref('/itineraries')
            .push({ titleInput, location, description, image, duration, events })
            .then(() => Actions.pop());
    }
};

// Fetch user profile data OR create a generic profile if none found
export const itineraryFetch = () => {
	var itineraries = [];
	return (dispatch) => {
		firebase.database().ref('/itineraries')
			.once('value', function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
						itineraries.push({id: childSnapshot.key, data: childSnapshot.val()})
				});
				dispatch({ type: ITINERARY_FETCH, payload: itineraries });
			});
	};
};

export const selectItinerary = (itineraryId) => {
	Actions.itineraryView();

	return {
		type: 'select_itinerary',
		payload: itineraryId
	};
};
