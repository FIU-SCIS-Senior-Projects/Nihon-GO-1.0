import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { USER_PROFILE_FETCH, USER_PROFILE_UPDATE, USER_PROFILE_SAVE } from './types';

// Update user input as user types
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
							username: "Generic Name",
							email: currentUser.email,
							country: "Generic Country",
							languages: "Generic Language",
							description: "Doing generic things."
						});
				};
			});
	};
};

// Updates user profile using user inputed data
export const userProfileSave = ({ username, country, languages, description, email }) => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}`)
			.set({ username, email, country, languages, description })
			.then(() => {
				Actions.pop();
			});
	};
};

export const userProfileImageFetch = () => {
	const picture = firebase.storage().ref('UserProfile/ProfilePicture/Floor Sticker.png');
	console.log(picture.location);
	return null;
};