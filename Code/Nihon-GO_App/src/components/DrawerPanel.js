import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner  } from './common';
import UserCard from './UserCard';
import { connect } from 'react-redux';

class Drawer extends Component {
	
	// Renders profile button only if logged in
	renderProfileBtn() {
		if (this.props.loggedIn) {
			return (
				<Button onPress={() => Actions.userProfile()}>
					Profile
				</Button>
			);
		}
	}
	
	renderButtons() {
		// Renders home and guides buttons
		return (
			<View style={styles.containerButton}>
					<Button onPress={() => Actions.homepage()}>
						Home
					</Button>
					<Button onPress={() => Actions.blog()}>
						Guides\Tips
					</Button>
					{this.renderProfileBtn()}
			</View>
		);
	}
	renderUserCard() {
		// Renders user card
		return (
			<View style={styles.containerUser}>
				<UserCard/>
			</View>
		);
	}
	render() {
		return (
			<View>
				{this.renderUserCard()}
				{this.renderButtons()}
			</View>
		)
	}
}

const styles = {
	containerButton: {
		paddingTop: 5,
        flexDirection: 'column',
		height: 150
	},
	containerUser: {
		paddingTop: 25,
		paddingBottom: 5,
		justifyContent:'flex-start',
		height: 150,
		elevation: 1,
		backgroundColor: '#cccccc',
	},
};

// Redux things
const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, loggedIn } = auth;
	return { email, password, error, loading, loggedIn };
};

// Redux things
export default connect(mapStateToProps)(Drawer);