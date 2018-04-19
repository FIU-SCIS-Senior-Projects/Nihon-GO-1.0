import React, { Component } from 'react';
import * as firebase from 'firebase';

export const UploadPicture = (picture, location, triggeredFunction, funcParam) => {  
	
	handleImagePicked = async pickerResult => {
		try {
			if (!pickerResult.cancelled) {
				this.uploadImage(pickerResult.uri);
			}
		} catch (e) {
			console.log({ e });
			alert('Image upload failed, sorry :(');
		}
	};
	
	uploadImage = async(uri) => {
		
		const response = await fetch(uri);
		const blob = await response.blob();
		
		var storageRef = firebase.storage().ref();
		var uploadTask = storageRef.child(location).put(blob);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on('state_changed', function(snapshot){
		// Observe state change events such as progress, pause, and resume
		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
		switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSED: // or 'paused'
			console.log('Upload is paused');
			break;
			case firebase.storage.TaskState.RUNNING: // or 'running'
			console.log('Upload is running');
			break;
		}
		}, function(error) {
			// Handle unsuccessful uploads
			console.log(error);
		}, function() {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			var downloadURL = uploadTask.snapshot.downloadURL;
			
			// A function passed will always be called with downloadUrl as a parameter
			if (triggeredFunction && funcParam){
				triggeredFunction(funcParam, downloadURL);
			}
			else if(triggeredFunction){
				triggeredFunction(downloadURL);
			}

		});
	}

	this.handleImagePicked(picture);
}