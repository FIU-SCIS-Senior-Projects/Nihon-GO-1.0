import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser, userProfileFetch } from '../actions';
import { Card, CardSection, Input, Spinner } from './common';
import { Icon, Avatar, Button } from 'react-native-elements'
import { primary_color, primary_text_color, dark_color, dark_text_color, light_color}  from './common/AppPalette';

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
						source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
						large/>
				</View>
			);
		} else {
			return (
				<View>
					<Avatar
						overlayContainerStyle={{backgroundColor: 'grey'}}
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
						borderRadius={2}
						backgroundColor={light_color}
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
		paddingLeft: 10,
		paddingTop: 5,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	btnContainer: {
		paddingBottom: 5,
		flex: 1,
		justifyContent:'flex-end',
		alignItems: 'flex-end',
	},
	textContainer: {
		flex: 1,
		marginLeft:5,
		marginRight:5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	userName: {
		fontWeight: 'bold',
		color:'white',
		fontSize: 20,
	},
	logoutBtn: {
		padding: 10,
		marginRight: 7,
		flex: 1,
		justifyContent:'flex-end',
		alignItems: 'flex-end',
	},
	logoutText: {
		flex: 1,
		justifyContent:'flex-end',
		alignSelf: 'flex-end',
		textAlign: 'right',
		color:'black',
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
	const { username,  } = state.user;
	return { username, loggedIn };
};

// Redux things
export default connect(mapStateToProps, { logoutUser, userProfileFetch })(UserCard);
