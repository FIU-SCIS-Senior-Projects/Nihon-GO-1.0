import React, { Component } from 'react';
import firebase from 'firebase';
//import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input } from './common';
import { userProfileUpdate, userProfileFetch, userProfileImageFetch } from '../actions';
import { Avatar, Divider } from 'react-native-elements';
import LibraryList from './LibraryList'; // TESTING ONLY
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  TabBar,
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
} from 'react-native-tab-view';

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
	
	// State of the tabs
	state = {
		tabs: {
			index: 0,
			routes: [
				{ key: '1', title: 'ABOUT'},
				{ key: '2', title: 'ITINERARY'},
			],
		},
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
		return (
			<View style={styles.headerContainer}>
				<View style={styles.coverContainer}>
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
				</View>
				
				<View style={styles.profileImageContainer}>
					<Image
						source={profilePicture}
						style={styles.profileImage}
					/>
				</View>
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
	
	// Renders itinerary list
	renderList() {
		return <LibraryList/>
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