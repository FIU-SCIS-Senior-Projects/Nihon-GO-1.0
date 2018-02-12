import firebase from 'firebase';
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
    /*firebase.database().ref('/itineraries')
.push({ titleInput, location, description, image, duration });*/
};