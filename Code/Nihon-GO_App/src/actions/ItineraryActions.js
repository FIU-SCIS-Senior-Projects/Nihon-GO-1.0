
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    ITINERARY_UPDATE,
	ITINERARY_FETCH,
    ITINERARY_RESET
} from './types';
import { startItnFetch, startedItnUpdate } from './index'

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
export const itineraryFetch = (filters) => {

    var itineraries = [];
    var ref = firebase.database().ref('/itineraries');

    //filter by region
    if (filters.hasOwnProperty('region')){
        return (dispatch) => {
            ref.orderByChild("favorites").once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var data_val = childSnapshot.val();
                    if( filters.region == 'ALL' || data_val.location == filters.region){
                        itineraries.push({id: key, data: data_val})
                    }
                });
                dispatch({ type: ITINERARY_FETCH, payload: itineraries.reverse() });

            });
        };
    }
    //filter by key
    else if (filters.hasOwnProperty('id')){
        return (dispatch) => {
            ref.orderByKey().equalTo(filters.id).once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var data_val = childSnapshot.val();
                    itineraries.push({id: key, data: data_val});
                    Actions.itineraryView({ title: itineraries[0].data.title, itinerary: itineraries[0]});
                });
                dispatch({ type: ITINERARY_FETCH, payload: itineraries });
            });
        };
    }
};
