import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';

export const UploadPicture = (picture, location) => {  
	
	handleImagePicked = async pickerResult => {
		try {
			if (!pickerResult.cancelled) {
				//uploadUrl = await uploadImageAsync(pickerResult.uri);
				//this.setState({ image: uploadUrl });
				this.uploadImage(pickerResult.uri);
			}
		} catch (e) {
			console.log({ e });
			alert('Upload failed, sorry :(');
		}
	};
	
	uploadImage = async(uri) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		var ref = firebase.storage().ref().child(location);
		
		//return ref.put(blob);
		
		ref.put(blob)
			.then (
				ref.getDownloadURL()
					.then((url) => {
						console.log(url);
						return url;
					})
					.catch ((error) => {
						console.log(error);
					})
			);
	}
	
	this.handleImagePicked(picture);
}