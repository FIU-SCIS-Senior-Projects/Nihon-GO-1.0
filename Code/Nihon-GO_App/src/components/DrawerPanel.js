import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Spinner  } from './common';
import { Icon, Button, Slider  } from 'react-native-elements'
import { DrawerButton } from './DrawerButton';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import { primary_color, primary_text_color, dark_color, dark_text_color, light_color}  from './common/AppPalette';
import { itineraryFetch, startedItnUpdate } from '../actions';

class Drawer extends Component {

	continueItn(id){
		console.log(id);
		this.props.itineraryFetch({id: id});
		this.props.startedItnUpdate({ prop: 'isViewing', value: true });
	}

	goToTopItn(){
        Actions.main();
        Actions.itineraryList({title: 'Top Itineraries', filters:{region:'ALL'}});
  }

	// Renders profile button only if logged in
	renderProfileBtn() {
		if (this.props.loggedIn) {
			//focuses button is is current scene
			if (Actions.currentScene == "_userProfile") {
				return (
					<View style={styles.focus}>
						<DrawerButton icon='account-circle' focus={true} onPress={() => Actions.userProfile()}>
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
		if (Actions.currentScene == "_homepage" || Actions.currentScene == "_main" || Actions.currentScene == "DrawerOpen") {
			return (
				<View style={styles.focus}>
					<DrawerButton icon='home' focus={true} onPress={() => Actions.homepage()}>
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
					<DrawerButton icon='info' focus={true} onPress={() => Actions.blog()}>
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

	//Renders Itinerary button and focuses button if is current scene
	renderItineraryBtn(){
		if (Actions.currentScene == "_itineraryList") {
			return (
				<View style={styles.focus}>
					<DrawerButton icon='public' focus={true} onPress={() => this.goToTopItn()}>
						Itineraries
					</DrawerButton>
				</View>
			);
		} else {
			return (
				<View>
					<DrawerButton icon='public' onPress={() => Actions.itineraryList({title: 'Top Itineraries', filters:{region:'ALL'}})}>
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

	// Renders user card
	renderUserCard() {
		return (
			<View style={styles.containerUser}>
				<UserCard/>
			</View>
		);
	}

	renderProgress(){
		return(
			<View style={{flexDirection: 'row', alignItems:'center', paddingTop: 5,paddingBottom: 5}}>
				<Text style={{marginBottom:3, fontSize: 20, color:'white',paddingRight: 5,}}>
					Progress:
				</Text>
				<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
					<Slider
					trackStyle={{height:10}}
					thumbStyle={{width:0,height:0}}
					minimumTrackTintColor={'#76FF03'}
					maximumValue={this.props.events}
			    value={this.props.progress}
			    disabled />
				</View>
			</View>
		);
	}

	renderStarted(){
		if(this.props.isStarted){
			return (
				<View style={{flex: 1,justifyContent:'flex-end', flexDirection: 'column'}}>
					<View style={styles.containerStarted}>
						<Text style={styles.startedTitle}>
							Itinerary: {this.props.title}
						</Text>
						{this.renderProgress()}
						<Button
							borderRadius={2}
							backgroundColor={light_color}
							color={dark_text_color}
							raised
							title='CONTINUE ITINERARY'
							onPress={() => this.continueItn(this.props.started)}/>
					</View>
				</View>
			);
		}
		else{
			return(<View/>);
		}
	}
	render() {
		return (
			<View style={styles.background}>
				{this.renderUserCard()}
				{this.renderButtons()}
				{this.renderStarted()}
			</View>
		);
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
		backgroundColor: '#FF4081',
	},
	focus: {
		backgroundColor: '#E0E0E0',
	},
	background: {
		flex:1,
	},
	containerStarted: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding:10,
		backgroundColor: dark_color,
	},
	startedTitle:{
		fontWeight: 'bold',
		color:'white',
		fontSize: 20,
	}
};

// Redux things
const mapStateToProps = (state) => {
	const start_itn = state.StartItn;
	const { events, progress, started, title, isStarted } = start_itn;
	const { loggedIn } = state.auth;
	return { loggedIn, events, progress, started, title, isStarted };
};

// Redux things
export default connect(mapStateToProps, { itineraryFetch, startedItnUpdate })(Drawer);
