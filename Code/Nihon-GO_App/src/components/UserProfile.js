import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { userProfileSave, userProfileUpdate, userProfileFetch, userUpdateFavorites } from '../actions';
import { Button, Divider, Icon } from 'react-native-elements';
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Share,
	StyleSheet,
	Text,
	TextInput,
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
import ItineraryListProfile from './ItineraryListProfile';

// Gets pictures for profile
const profilePicture = require('../resources/profilePicture.png');
const profileBackgroundPicture = require('../resources/profileBackground.jpg');

class UserProfile extends Component {
	
    componentWillMount() {
		this.props.userProfileFetch();
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
		edit: false
	}
	
	// Used for user information
	setEditable(editable) {
		this.setState({edit: editable});
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
				return this.renderUserItineraries()
			case '3':
				return this.renderFavoriteItineraries()
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
	
	// allows user to take a picture **NOT USED**
	takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		this._handleImagePicked(pickerResult);
	};
	
	// allows user to pick a picture
	pickImage = async () => {
		const { currentUser } = firebase.auth();
		const { profileImage } = this.props;
		const profilePictureLocation = `/UserProfile/ProfilePicture/${currentUser.uid}`;
		
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		function updateImage(value) {
			this.props.userProfileSave({ profileImage: value });
			this.props.userProfileUpdate({ prop: 'profileImage', value });
		}
		
		UploadPicture(pickerResult, profilePictureLocation, updateImage.bind(this));
	};
	
	// allows user to pick the background picture
	pickBackImage = async () => {
		const { currentUser } = firebase.auth();
		const { profileBackImage } = this.props;
		const backgroundPictureLocation = `/UserProfile/BackgroundPicture/${currentUser.uid}`;
		
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		
		function updateImage(value) {
			this.props.userProfileSave({ profileBackImage: value });
			this.props.userProfileUpdate({ prop: 'profileBackImage', value });
		}
		
		UploadPicture(pickerResult, backgroundPictureLocation, updateImage.bind(this));
	};
	
	// renders profile picture
	renderImage = () => {
		const { profileImage } = this.props;
		
		if (!profileImage) {
			return (
				<View>
					<Image source={profilePicture} style={styles.profileImage}/>
				</View>
			);
		}

		return (
			<View>
				<Image source={{ uri: profileImage }} style={styles.profileImage}/>
			</View>
		);
	};
	
	// renders background picture
	renderBackImage = () => {
		const { username } = this.props;
		const { profileBackImage } = this.props;
		
		if (!profileBackImage) {
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
						source={{ uri: profileBackImage }}
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
	
	// Render about tab - contains user information
	renderAbout() {
		const { username, country, languages, description } = this.props;

		return (
			<View>
				<Text style={styles.titleTextStyle}>Bio</Text>
				<Divider style={{ backgroundColor: 'blue' }} />
				<TextInput
					placeholder="Write a short bio on yourself"
					style={styles.textStyle}
					onChangeText={value => this.props.userProfileUpdate({ prop: 'description', value })}
					value={description}
					underlineColorAndroid="transparent"
					editable={this.state.edit}
					multiline = {true}
				/>

				<Text style={styles.titleTextStyle}>Info</Text>
				<Divider style={{ backgroundColor: 'blue' }} />
				<TextInput
					placeholder="Edit Name"
					style={styles.textStyle}
					onChangeText={value => this.props.userProfileUpdate({ prop: 'username', value })}
					value={username}
					underlineColorAndroid="transparent"
					editable={this.state.edit}
				/>
				<TextInput
					placeholder="Where are you from?"
					style={styles.textStyle}
					onChangeText={value => this.props.userProfileUpdate({ prop: 'country', value })}
					value={country}
					underlineColorAndroid="transparent"
					editable={this.state.edit}
				/>
				<TextInput
					placeholder="What languages do you speak?"
					style={styles.textStyle}
					onChangeText={value => this.props.userProfileUpdate({ prop: 'languages', value })}
					value={languages}
					underlineColorAndroid="transparent"
					editable={this.state.edit}
				/>

				<Text style={styles.titleTextStyle}>Extra</Text>
				<Divider style={{ backgroundColor: 'blue' }} />
				<Text style={styles.textStyle}>
					Nothing
				</Text>

				{this.renderAboutButtons()}
			</View>
		);
	}
	
	renderAboutButtons() {
		const { username, country, languages, description } = this.props;
		if (this.state.edit) {
			return (	
				<Button
					title ='Done Editing'
					onPress={() => {
						this.setEditable(!this.state.edit)
						this.props.userProfileSave({ username, country, languages, description })
					}}
					buttonStyle={{backgroundColor: '#2196f3'}}
					containerViewStyle={{marginTop: 20}}
				/>
			);
		}
		
		return (
			<Button
				title ='Edit Profile'
				onPress={() => {this.setEditable(!this.state.edit)}}
				buttonStyle={{backgroundColor: '#2196f3'}}
				containerViewStyle={{marginTop: 20}}
			/>
		);
	}
	
	// Renders user itineraries tab
	renderUserItineraries() {
		return <ItineraryListProfile itineraries={this.props.publishedItn}/>;
	}
	
	// Renders favorite itineraries tab
	renderFavoriteItineraries() {
		return <ItineraryListProfile itineraries={this.props.favItn}/>;
	}
	
	render() {
		return (
			<KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding">
				<ScrollView style={styles.scroll}>
					<View style={styles.container}>
						<View style={styles.cardContainer}>
							{this.renderContactHeader()}
							<TabViewAnimated
								navigationState={this.state.tabs}
								onIndexChange={this.handleIndexChange}
								renderHeader={this.renderHeader}
								renderPager={this.renderPager}
								renderScene={this.renderScene}
								style={styles.tabContainer}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
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
	const { username, country, languages, description, email, profileImage, profileBackImage, fav_itinerary } = state.user;
	const publishedItn = state.publishedItn;
	const favItn = state.favItn;
	
	return { username, country, languages, description, email, profileImage, profileBackImage, fav_itinerary, publishedItn, favItn };
};

export default connect(mapStateToProps, { userProfileSave, userProfileUpdate, userProfileFetch, userUpdateFavorites })(UserProfile);