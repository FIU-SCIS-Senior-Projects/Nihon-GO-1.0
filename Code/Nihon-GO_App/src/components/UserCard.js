import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
	emailChanged, 
	passwordChanged, 
	loginUser, 
	registerUser,
	guestUser,
	logoutUser,
	userProfileFetch
} from '../actions';
import { Card, CardSection, Input, Spinner } from './common';
import { Icon, Avatar, Button } from 'react-native-elements'
import { primary_color, primary_text_color, dark_color, dark_text_color}  from './common/AppPalette';

class UserCard extends Component {
	// Gets user profile data
	componentWillMount() {
		if (this.props.loggedIn) {
			this.props.userProfileFetch();
		}
	}
	
	// Runs after user presses logout button
	onLogoutPress() {
		this.props.logoutUser();
	}
	
	renderAvatar(){
		if (this.props.loggedIn) {
			return (
				<View>
					<Avatar
						rounded
						source={{uri: "https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg"}}
						large/>
				</View>
			);
		} else {
			return (
				<View>
					<Avatar
						rounded
						title="?"
						large/>
				</View>
			);
		}
	}
	
	//Renders right side of card
	renderUsername() {
		//if logged in show username and logout button
		if (this.props.loggedIn) {
			return (
				<View style={styles.textContainer}>
					<Text style={styles.userName}>
						{this.props.username}
					</Text>
					<TouchableNativeFeedback style={styles.logoutBtn} onPress={this.onLogoutPress.bind(this)}>
						<Text style={styles.logoutText}>
							Sign Out
						</Text>
					</TouchableNativeFeedback>
				</View>
			);
		} 
		//render login button
		else {
			return (
				<View style={styles.btnContainer}>
					<Button
						backgroundColor={dark_color}
						color={dark_text_color}
						raised
						title='SIGN IN'
						onPress={() => Actions.login()}/>
				</View>
			);
		}
	}
	
	//renders card with image on left
	render() {
		return (
			<View style={styles.container}>
				{this.renderAvatar()}
				{this.renderUsername()}
			</View>
		);
	}
};

const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 12,
	},
	btnContainer: {
		flex: 1,
		paddingRight: 0,
		padding: 12,
		paddingBottom: 40,
	},
	textContainer: {
		marginLeft: 12,
		marginRight: 0,
		flex: 1,
		paddingTop: 12,
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	userName: {
		fontSize: 20,
		height:68,
	},
	logoutBtn: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent:'flex-end',
	},
	logoutText: {
		alignSelf: 'stretch',
		textAlign: 'right',
		color:primary_text_color,
		textDecorationLine:'underline'
	},
	photo: {
		height: 70,
		width: 70,
		borderRadius: 35,
	},
};

// Redux things
const mapStateToProps = (state) => {
	const { loggedIn } = state.auth;
	const { username } = state.user;
	return { username, loggedIn };
};

// Redux things
export default connect(mapStateToProps, { logoutUser, userProfileFetch })(UserCard);