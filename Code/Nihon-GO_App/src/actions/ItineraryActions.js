
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

export const itineraryCreate = ({ titleInput, location, description, image, duration }) => {
    
    return ()  =>{
        firebase.database().ref('/itineraries')
        .push({ titleInput, location, description, image, duration })
        .then(() => Actions.pop());
    }
};

export const selectItinerary = (itineraryId) => {
    //Actions.eventList();
	return {
		type: 'select_itinerary',
		payload: itineraryId
	};
};