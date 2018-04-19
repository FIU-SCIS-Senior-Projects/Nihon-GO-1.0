import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    ITINERARY_UPDATE,
	ITINERARY_FETCH,
    ITINERARY_RESET,
    RESET_ITINERARY_FORM,
} from './types';
import { startItnFetch, startedItnUpdate } from './index'
import { UploadPicture } from '../components/UploadPicture';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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

export const itineraryCreate = ({ titleInput, location, description, itineraryImage, duration, events }) => {
    Actions.pop();
    return (dispatch)  =>{
        const { currentUser } = firebase.auth();
        firebase.database().ref('/itineraries')
            .push({ 
                title: titleInput,
                location,
                description,
                image: '',
                duration,
                events,
                publisher: currentUser.uid,
                favorites: 0,
            })
            .then((snap) => {
                const key = snap.key;
                var itineraryImageLocation = '/Itinerary/Main/' + key + '_main';
                
                //Uploading Itinerary Image
                function updateImageUrl (key, imageUrl){
                    firebase.database().ref('/itineraries/' + key).update({
                        image: imageUrl
                    })
                    .catch ((error) => {
                        console.log(error)
                    });
                }

                UploadPicture(itineraryImage, itineraryImageLocation, updateImageUrl, key);
                
                //Uploads all event images
                uploadEventImages(events, key);           
            }).then(dispatch({type: RESET_ITINERARY_FORM}))
            .catch ((error) => {
						console.log(error);
            });
            
    }
};

const uploadEventImages = (events, key) =>{
    //Recursive callback function that calls itselft to upload multiple pictures at once (event images)
    function uploadAnother({count, index, proxyEvents, key, urlList, uploadAnother}, imageUrl){
        urlList.push(imageUrl);
        if(count>0){
            var eventsImageLocation = 'Itinerary/Events/' + key + '_event_' + index;
            UploadPicture(proxyEvents[index].image, eventsImageLocation, uploadAnother, 
                {count: count - 1, index: index + 1, proxyEvents, key, urlList, uploadAnother});
        }else{  
            //All recursive calls done
            var newEvents = [];
            for (var i = 0; i< proxyEvents.length; i++){
                var p = proxyEvents[i];

                event={
                    title: p.title,
                    address: p.address,
                    description: p.description,
                    duration: p.duration,
                    image: urlList[i]
                }

                newEvents.push(event);
            }

            firebase.database().ref('/itineraries/' + key).update({
                events: newEvents
            })
        }
    }

    var urlList = [];
    var eventsImageLocation = 'Itinerary/Events/' + key + '_event_' + 0;

    UploadPicture(events[0].image, eventsImageLocation, uploadAnother, 
        {count: events.length - 1, index: 1, proxyEvents: events, key, urlList, uploadAnother});
}

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


