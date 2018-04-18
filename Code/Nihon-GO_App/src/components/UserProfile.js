import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input } from './common';
import { userProfileUpdate, userProfileFetch, userProfileImageFetch } from '../actions';
import { Avatar, Divider } from 'react-native-elements';
import LibraryList from './LibraryList'; // TESTING ONLY
import {
	ActivityIndicator,
	Animated,
	Button,
	Dimensions,
	Image,
	ImageBackground,
	Platform,
	ScrollView,
	Share,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	TabBar,
	TabViewAnimated,
	TabViewPagerPan,
	TabViewPagerScroll,
} from 'react-native-tab-view';
import { ImagePicker } from 'expo';
import { UploadPicture } from './UploadPicture';

// Gets pictures for profile
const profilePicture = require('../resources/profilePicture.png');
const profileBackgroundPicture = require('../resources/profileBackground.jpg');

class UserProfile extends Component {
	// Gets user profile data
	componentWillMount() {
		this.props.userProfileFetch();
	}
	
	static defaultProps = {
		containerStyle: {},
		tabContainerStyle: {},
	}
	
	// State
	state = {
		tabs: {
			index: 0,
			routes: [
				{ key: '1', title: 'ABOUT'},
				{ key: '2', title: 'ITINERARY'},
				{ key: '3', title: 'FAVORITES'},
			],
		},
		image: null,
		uploading: false,
	}
	
	// Used to handle tabs
	handleIndexChange = index => {
		this.setState({
			tabs: {
				...this.state.tabs,
				index,
			},
		})
	}
	
	renderHeader = props => {
		return (
			<TabBar
				{...props}
				indicatorStyle={styles.indicatorTab}
				pressOpacity={0.8}
				renderLabel={this.renderLabel(props)}
				style={styles.tabBar}
			/>
		)
	}
	
	// Renders correct tab
	renderScene = ({ route: { key } }) => {
		switch (key) {
			case '1':
				return this.renderAbout()
			case '2':
				return this.renderList()
			case '3':
				return this.renderItinerary()
			default:
				return <View />
			}
	}
	
	// Render tab labels
	renderLabel = props => ({ route, index }) => {
		const inputRange = props.navigationState.routes.map((x, i) => i)
		const outputRange = inputRange.map(
			inputIndex => (inputIndex === index ? 'black' : 'gray')
		)
		const color = props.position.interpolate({
			inputRange,
			outputRange,
		})

		return (
			<View style={styles.tabRow}>
				<Animated.Text style={[styles.tabLabelText, { color }]}>
					{route.title}
				</Animated.Text>
			</View>
		)
	}
	
	renderPager = props => {
		return Platform.OS === 'ios' ? (
			<TabViewPagerScroll {...props} />
			) : (
			<TabViewPagerPan {...props} />
		)
	}
	
	// Renders profile picture, background picture, and user name
	renderContactHeader = () => {
		const { username } = this.props;
		let { image } = this.state;
		if (image) {
			console.log(image);
			profilePicture = { uri: image };
		}
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity style={styles.coverContainer}>
					<ImageBackground
						source={profileBackgroundPicture}
						style={styles.coverImage}
					>
						<View style={styles.coverTitleContainer}>
							<Text style={styles.coverTitle} />
						</View>
						
						<View style={styles.coverMetaContainer}>
							<Text style={styles.coverName}>{username}</Text>
						</View>
					</ImageBackground>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={this._pickImage} style={styles.profileImageContainer}>
					<Image
						source={profilePicture}
						style={styles.profileImage}
					/>
				</TouchableOpacity>
			</View>
		);
	}
	
	// Render about tab - countains user information
	renderAbout() {
		const { username, country, languages, description } = this.props;
		return (
			<View>
				<Text style={styles.titleTextStyle}>Bio</Text>
				<Divider style={{ backgroundColor: 'blue' }} />
				<Text style={styles.textStyle}>
					{description}
				</Text>
				
				<Text style={styles.titleTextStyle}>Info</Text>
				<Divider style={{ backgroundColor: 'blue' }} />
				<Text style={styles.textStyle}>
					Name: {username}
				</Text>
				<Text style={styles.textStyle}>
					Country: {country}
				</Text>
				<Text style={styles.textStyle}>
					Languages: {languages}
				</Text>
				
				<Text style={styles.titleTextStyle}>Extra</Text>
				<Divider style={{ backgroundColor: 'blue' }} />
				<Text style={styles.textStyle}>
					Nothing
				</Text>
			</View>
		);
	}
	
	renderList() {
		return <LibraryList/>;
	}
	
	_maybeRenderUploadingOverlay = () => {
		if (this.state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center',
						},
					]}>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		}
	};
  
	_maybeRenderImage = () => {
		let { image } = this.state;
		console.log('image');
		console.log(image);
		if (!image) {
		return;
		}

		return (
			<View
				style={{
				marginTop: 30,
				width: 250,
				borderRadius: 3,
				elevation: 2,
				}}>
				
				<View
					style={{
						borderTopRightRadius: 3,
						borderTopLeftRadius: 3,
						shadowColor: 'rgba(0,0,0,1)',
						shadowOpacity: 0.2,
						shadowOffset: { width: 4, height: 4 },
						shadowRadius: 5,
						overflow: 'hidden',
				}}>
					<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
				</View>

				<Text
					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
				>
					{image}
				</Text>
			</View>
		);
	};
	
	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		this._handleImagePicked(pickerResult);
	};
	
	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		UploadPicture(pickerResult, "UserProfile/ProfilePicture/0001");
	};
	
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
	
	// Renders itinerary list
	renderItinerary() {
		let { image } = this.state;
		
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				{image ? null : (
					<Text
						style={{
							fontSize: 20,
							marginBottom: 20,
							textAlign: 'center',
							marginHorizontal: 15,
						}}>
						Example: Upload ImagePicker result
					</Text>
				)}		
				
				<Button
					onPress={this._pickImage}
					title="Pick an image from camera roll"
				/>
					
				<Button onPress={this._takePhoto} title="Take a photo" />
				
				{this._maybeRenderImage()}
				{this._maybeRenderUploadingOverlay()}
				
			</View>
		);
	}
	
	render() {
		return (
			<ScrollView style={styles.scroll}>
				<View style={[styles.container, this.props.containerStyle]}>
					<View style={styles.cardContainer}>
						{this.renderContactHeader()}
						<TabViewAnimated
							navigationState={this.state.tabs}
							onIndexChange={this.handleIndexChange}
							renderHeader={this.renderHeader}
							renderPager={this.renderPager}
							renderScene={this.renderScene}
							style={[styles.tabContainer, this.props.tabContainerStyle]}
						/>
					</View>
				</View>
		  </ScrollView>
		);
	}
}

async function uploadImageAsync(uri) {
	
	const response = await fetch(uri);
	const blob = await response.blob();
	const ref = firebase.storage().ref().child('images');
	const task = ref.put(blob);	
		
	return new Promise((resolve, reject) => {
		task.on(
			'state_changed',
			() => {
			/* noop but you can track the progress here */
			},
			reject /* this is where you would put an error callback! */,
			() => resolve(task.snapshot.downloadURL)
		);
	});
}

const styles = {
	cardContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	coverContainer: {
		marginBottom: 55,
		position: 'relative',
	},
	coverImage: {
		height: Dimensions.get('window').width * (3 / 4),
		width: Dimensions.get('window').width,
	},
	coverMetaContainer: {
		backgroundColor: 'transparent',
		paddingBottom: 10,
		paddingLeft: 135,
	},
	coverName: {
		color: '#FFF',
		fontSize: 28,
		fontWeight: 'bold',
		paddingBottom: 2,
	},
	coverTitle: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	coverTitleContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: 45,
	},
	headerContainer: {
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	indicatorTab: {
		backgroundColor: 'transparent',
	},
	profileImage: {
		borderColor: '#FFF',
		borderRadius: 55,
		borderWidth: 3,
		height: 110,
		width: 110,
	},
	profileImageContainer: {
		bottom: 0,
		left: 10,
		position: 'absolute',
	},
	scroll: {
		backgroundColor: '#FFF',
	},
	tabBar: {
		backgroundColor: 'transparent',
		marginBottom: 20,
		marginLeft: 130,
	},
	tabContainer: {
		flex: 1,
		marginBottom: 12,
		marginTop: -55,
		position: 'relative',
		zIndex: 10,
	},
	tabRow: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	tabLabelText: {
		color: 'black',
		fontSize: 18,
		textAlign: 'center',
	},
	textStyle: {
		fontSize: 18,
		paddingLeft: 10,
		flexWrap: 'wrap'
	},
	titleTextStyle: {
		fontSize: 20,
		paddingLeft: 20,
		fontWeight: 'bold'
	},
};

const mapStateToProps = (state) => {
	const { username, country, languages, description, email } = state.user;
	
	return { username, country, languages, description, email };
};

export default connect(mapStateToProps, { userProfileUpdate, userProfileFetch, userProfileImageFetch })(UserProfile);