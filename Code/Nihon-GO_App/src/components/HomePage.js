import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LibraryList from './LibraryList';
import { 
	emailChanged, 
	passwordChanged, 
	loginUser, 
	registerUser,
	guestUser,
	logoutUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class HomePage extends Component {
	
	renderButtons() {
		
		// Renders login, register, and guest buttons
		return (
			<View style={styles.containerButton}>
					<Button>
						Guides\Tips
					</Button>
					<Button>
						Sign in
					</Button>
			</View>
		);
	}
	
	// Render login page
	render() {
		return (
			<View style={styles.containerStyle}>
				<Card>
					<Text style={styles.mapPlaceholder}>MAP</Text>
				</Card>
				<LibraryList/>
				{this.renderButtons()}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex:1,
		justifyContent: 'space-around'
	},
	containerButton: {
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative'
	},
	mapPlaceholder:{
		alignSelf: 'center',
		fontSize: 32,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
		height: 300,
		justifyContent: 'center'
	}
};

// Redux things
const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, loggedIn } = auth;
	return { email, password, error, loading, loggedIn };
};

// Redux things
export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser, registerUser, guestUser, logoutUser
})(HomePage);