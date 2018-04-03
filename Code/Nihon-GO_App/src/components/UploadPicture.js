import React, { Component } from 'react';
import * as firebase from 'firebase';

class UploadPicture extends Component {   

	_handleImagePicked = async pickerResult => {
		try {
			this.setState({ uploading: true });
			
			if (!pickerResult.cancelled) {
				//uploadUrl = await uploadImageAsync(pickerResult.uri);
				//this.setState({ image: uploadUrl });
				this.uploadImage(pickerResult.uri);
			}
		} catch (e) {
			console.log({ e });
			alert('Upload failed, sorry :(');
		} finally {
			this.setState({ uploading: false });
		}
	};
	
	uploadImage = async(uri) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		var ref = firebase.storage().ref().child("my-image");
		
		//return ref.put(blob);
		
		ref.put(blob)
			.then (
				ref.getDownloadURL()
					.then((url) => {
						console.log(url);
						this.setState({ image: url });
					})
					.catch ((error) => {
						console.log(error);
					})
			);
	}
}

export default UploadPicture;