
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    ITINERARY_UPDATE
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

export const selectItinerary = (itineraryId) => {
	Actions.itineraryView();

	return {
		type: 'select_itinerary',
		payload: itineraryId
	};
};