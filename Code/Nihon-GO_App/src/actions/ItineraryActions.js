
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    ITINERARY_UPDATE,
	ITINERARY_FETCH,
    ITINERARY_RESET
} from './types';

export const itineraryUpdate = ({ prop, value }) => {
    return {
        type: ITINERARY_UPDATE,
        payload: { prop, value }
    };
};

export const itineraryReset= () => {
    return {
        type: ITINERARY_RESET
    };
};
export const itineraryCreate = ({ title, location, description, image, duration, events }) => {
    return ()  =>{
        firebase.database().ref('/itineraries')
            .push({ title, location, description, image, duration, events })
            .then(() => Actions.pop());
    }
};

// Fetch itineraries
export const itineraryFetch = (region) => {
	var itineraries = [];
    var ref = firebase.database().ref('/itineraries')
    if (region == 'ALL'){
        return (dispatch) => {
            ref.orderByChild("favorites").once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var data_val = childSnapshot.val();
                        itineraries.push({id: key, data: data_val})
                });
                dispatch({ type: ITINERARY_FETCH, payload: itineraries.reverse() });
            });
        };
    }
    else {
        return (dispatch) => {
            ref.orderByChild("favorites").once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var data_val = childSnapshot.val();
                        if( data_val.location== region)
                            itineraries.push({id: key, data: data_val})
                });
                dispatch({ type: ITINERARY_FETCH, payload: itineraries.reverse() });
            });
        };
    }
};

export const selectItinerary = (itineraryId, itinerarytitle) => {
	Actions.itineraryView({ title: itinerarytitle, mode:'view' });

	return {
		type: 'select_itinerary',
		payload: itineraryId
	};
};
