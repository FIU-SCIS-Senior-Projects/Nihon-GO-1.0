import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { USER_PROFILE_FETCH, USER_PROFILE_UPDATE, USER_PROFILE_SAVE } from './types';

// Update user information
export const userProfileUpdate = ({ prop, value }) => {
	return {
		type: USER_PROFILE_UPDATE,
		payload: { prop, value }
	};
};

// Fetch user profile data OR create a generic profile if none found
export const userProfileFetch = () => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}`)
			.on('value', snapshot => {
				if (snapshot.val()) {
					dispatch({ type: USER_PROFILE_FETCH, payload: snapshot.val() });
				} else {
					console.log('Created generic profile for user.');
					firebase.database().ref(`/users/${currentUser.uid}`)
						.set({ 
							username: "Flopsy Bunny",
							email: currentUser.email,
							country: "Hopperland",
							languages: "Bunnish",
							description: "I come from a land, from a far away place."
						});
				};
			});
	};
};

// Updates user profile using data
export const userProfileSave = (data) => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}`)
			.update(data);
	};
};

export const userUpdateFavorites = (key) => {
	const { currentUser } = firebase.auth();
	console.log('id');
	console.log(key);
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/fav_itinerary`)
			.update({key});
	};
};