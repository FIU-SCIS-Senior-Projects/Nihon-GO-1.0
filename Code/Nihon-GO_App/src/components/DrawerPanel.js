import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner  } from './common';
import { DrawerButton } from './DrawerButton';
import UserCard from './UserCard';
import { connect } from 'react-redux';

class Drawer extends Component {
	
	// Renders profile button only if logged in
	renderProfileBtn() {
		if (this.props.loggedIn) {
			//focuses button is is current scene
			if (Actions.currentScene == "_userProfile") {
				return (
					<View style={styles.focus}>
						<DrawerButton icon='account-circle' onPress={() => Actions.userProfile()}>
							Profile
						</DrawerButton>
					</View>
				);
			} else {
				return (
					<View>
						<DrawerButton icon='account-circle' onPress={() => Actions.userProfile()}>
							Profile
						</DrawerButton>
					</View>
				);
			}
		}
	}
	
	// Renders home button and focuses button if is current scene
	renderHomeBtn(){
		if (Actions.currentScene == "_homepage" || Actions.currentScene == "_main") {
			return (
				<View style={styles.focus}>
					<DrawerButton icon='home' onPress={() => Actions.homepage()}>
						Home
					</DrawerButton>
				</View>
			);
		} else {
			return (
				<View>
					<DrawerButton icon='home' onPress={() => Actions.homepage()}>
						Home
					</DrawerButton>
				</View>
			);
		}
	}
	
	// Renders guides button and focuses button if is current scene
	renderBlogBtn(){
		if (Actions.currentScene == "_blog") {
			return (
				<View style={styles.focus}>
					<DrawerButton icon='info' onPress={() => Actions.blog()}>
						Guides\Tips
					</DrawerButton>
				</View>
			);
		} else {
			return (
				<View>
					<DrawerButton icon='info' onPress={() => Actions.blog()}>
						Guides\Tips
					</DrawerButton>
				</View>
			);
		}
	}

	renderItineraryBtn(){
		if (Actions.currentScene == "_itineraryList") {
			return (
				<View style={styles.focus}>
					<DrawerButton icon='globe' iconType='entypo' onPress={() => Actions.itineraryList()}>
						Itineraries
					</DrawerButton>
				</View>
			);
		} else {
			return (
				<View>
					<DrawerButton icon='globe' iconType='entypo' onPress={() => Actions.itineraryList()}>
						Itineraries
					</DrawerButton>
				</View>
			);
		}
	}

	// Renders home all
	renderButtons() {
		return (
			<View style={styles.containerButton}>
				{this.renderHomeBtn()}
				{this.renderBlogBtn()}
				{this.renderItineraryBtn()}
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
	focus: {
		backgroundColor: '#95bcf2',
	}
};

// Redux things
const mapStateToProps = (state) => {
	const { loggedIn } = state.auth;
	return { loggedIn };
};

// Redux things
export default connect(mapStateToProps)(Drawer);