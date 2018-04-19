import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { PUBLISHED_ITN_FETCH, PUBLISHED_ITN_RESET } from './types';

export const publishedItnReset = (dispatch) => {
    if(!dispatch){
        return {
            type: PUBLISHED_ITN_RESET
        };
    }
    dispatch({
        type: PUBLISHED_ITN_RESET
    });
};


export const publishedItnFetch = (dispatch, uid) => {
    var itineraries = [];
    var ref = firebase.database().ref('/itineraries');
    ref.orderByChild("favorites").once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var data_val = childSnapshot.val();
            if(data_val.publisher == uid){
                itineraries.push({id: key, data: data_val})
            }
        });
        dispatch({ type: PUBLISHED_ITN_FETCH, payload: itineraries.reverse() });

    });
}