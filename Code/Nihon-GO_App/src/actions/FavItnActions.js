import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { FAV_ITN_FETCH, FAV_ITN_RESET } from './types';

export const favUpdate = (key, favorites) => {
	return (dispatch) => {
		firebase.database().ref(`/itineraries/${key}`)
			.update({favorites});
	}
}

export const favItnFetch = (dispatch, favKeys) => {
    var itineraries = [];
    var ref = firebase.database().ref('/itineraries');
    ref.orderByChild("favorites").once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var data_val = childSnapshot.val();
			if (!favKeys){
				favKeys = [];
			}
            if(favKeys.includes(key)){
                itineraries.push({id: key, data: data_val})
            }
        });
        dispatch({ type: FAV_ITN_FETCH, payload: itineraries.reverse() });

    });
}