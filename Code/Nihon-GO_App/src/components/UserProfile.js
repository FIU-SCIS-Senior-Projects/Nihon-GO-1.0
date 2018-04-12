import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { userProfileUpdate, userProfileFetch, userProfileImageFetch } from '../actions';
import { Divider, Icon } from 'react-native-elements';
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
import { BlurView, ImagePicker } from 'expo';
import { UploadPicture } from './UploadPicture';

// Gets pictures for profile
const profilePicture = require('../resources/profilePicture.png');
const profileBackgroundPicture = require('../resources/profileBackground.jpg');

class UserProfile extends Component {
	
	// Gets user profile data
 	componentWillMount() {
		const { currentUser } = firebase.auth();
		var profilePictureLocation = `/UserProfile/ProfilePicture/${currentUser.uid}`;
		var backgroundPictureLocation = `/UserProfile/BackgroundPicture/${currentUser.uid}`;
		
		this.props.userProfileFetch();
		this.getURL(profilePictureLocation, "image");
		this.getURL(backgroundPictureLocation, "backImage");
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
				{ key: '1', title: 'info'},
				{ key: '2', title: 'view-list'},
				{ key: '3', title: 'favorite'},
			],
		},
		image: null,
		backImage: null,
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
	
	// Renders header
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
		// used for version 1
		/* const inputRange = props.navigationState.routes.map((x, i) => i)
		const outputRange = inputRange.map(
			inputIndex => (inputIndex === index ? 'black' : 'gray')
		)
		const color = props.position.interpolate({
			inputRange,
			outputRange,
		}) */
		
		// version 1
		/* return (
			<View style={styles.tabRow}>
				<Animated.Text style={[styles.tabLabelText, { color }]}>
					{route.title}
				</Animated.Text>
			</View>
		 )*/
		
		// version 2
		return (
			<View style={styles.tabRow}>
				<Animated.View style={styles.tabIcon}>
					<Icon 
						name={route.title}
						size={35}
					/>
				</Animated.View>
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
	
	// allows user to take a picture
	takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		this._handleImagePicked(pickerResult);
	};
	
	// allows user to pick a picture
	pickImage = async () => {
		let { image } = this.state;
		const { currentUser } = firebase.auth();
		const profilePictureLocation = `/UserProfile/ProfilePicture/${currentUser.uid}`;
		
		console.log("pickImage");
		
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		UploadPicture(pickerResult, profilePictureLocation);
		this.getURL(profilePictureLocation, "image");
		
	};
	
	// allows user to pick the background picture
	pickBackImage = async () => {
		const { currentUser } = firebase.auth();
		const backgroundPictureLocation = `/UserProfile/BackgroundPicture/${currentUser.uid}`;
		
		console.log("pickBackImage");
		
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		UploadPicture(pickerResult, backgroundPictureLocation);
		this.getURL(backgroundPictureLocation, "backImage");
	};
	
	// gets the download URL for profile picture and background picture
	getURL(location, type) {
		let { image, backImage } = this.state;

		//console.log("running getDownloadURL");
		//console.log(location);
		
 		var ref = firebase.storage().ref().child(location);
		ref.getDownloadURL()
			.then((url) => {
				if (type === "image") {
					this.setState({
						image: url
					});
				} else {
					this.setState({
						backImage: url
					});
				}
			})
			.catch ((error) => {
				console.log(error);
			})
	}
	
	// renders profile picture
	renderImage = () => {
		let { image } = this.state;
		if (!image) {
			return (
				<View>
					<Image source={profilePicture} style={styles.profileImage}/>
				</View>
			);
		}

		return (
			<View>
				<Image source={{ uri: image }} style={styles.profileImage}/>
			</View>
		);
	};
	
	// renders background picture
	renderBackImage = () => {
		const { username } = this.props;
		let { backImage } = this.state;
		if (!backImage) {
			return (
				<View>
					<ImageBackground
						source={profileBackgroundPicture}
						style={styles.coverImage}
					>
						<View style={styles.coverTitleContainer} />
						
						<BlurView tint="default" intensity={100}>
							<View style={styles.coverMetaContainer}>
								<Text style={styles.coverName}>{username}</Text>
							</View>
						</BlurView>
					</ImageBackground>
				</View>
			);
		}

		return (
			<View>
				<ImageBackground
						source={{ uri: backImage }}
						style={styles.coverImage}
					>
						<View style={styles.coverTitleContainer} />
						
						<BlurView tint="default" intensity={100}>
							<View style={styles.coverMetaContainer}>
								<Text style={styles.coverName}>{username}</Text>
							</View>
						</BlurView>
					</ImageBackground>
			</View>
		);
	};
	
	// Renders contact header for user
	renderContactHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={this.pickBackImage} style={styles.coverContainer}>
					<View>
						{this.renderBackImage()}
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={this.pickImage} style={styles.profileImageContainer}>
					<View>
						{this.renderImage()}
					</View>
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
	
	// REMOVE
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
  
	// REMOVE
	_maybeRenderImage = () => {
		let { image } = this.state;
		
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
					onPress={this.pickImage}
					title="Pick an image from camera roll"
				/>
					
				<Button onPress={this.takePhoto} title="Take a photo" />
				
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
	tabIcon: {
		alignContent: 'center',
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