import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input } from './common';
import { userProfileUpdate, userProfileFetch, userProfileImageFetch } from '../actions';
import { Avatar } from 'react-native-elements';

class UserProfile extends Component {
	// Gets user profile data
	componentWillMount() {
		this.props.userProfileFetch();
	}
	
	// Renders user profile
	render() {
		const { username, country, languages, description, email } = this.props;
		return (
			<Card style={{borderColor: 'black', borderWidth: 3, borderBottomWidth: 3}}>
				<CardSection style={{backgroundColor: 'lightgreen'}}>			
					<Avatar  
						xlarge 
						rounded
						source={{uri: 'https://firebasestorage.googleapis.com/v0/b/nihon-go-fiu.appspot.com/o/UserProfile%2FProfilePicture%2FFloor%20Sticker.png?alt=media&token=61ce1803-1c38-4296-99b4-4da4610bcb94'}} 
						avatarStyle={{borderColor: 'black', borderWidth: 1, borderRadius: 20}}
					/>
			
					<View style={{flexDirection: 'column', justifyContent: 'center'}}>
						<Text style={styles.titleTextStyle}>
							{username}
						</Text>
					
						<Text style={styles.textStyle}>
							{country}
						</Text>
					
						<Text style={styles.textStyle}>
							{languages}
						</Text>
					</View>
				</CardSection>
				
				<CardSection style={{backgroundColor: 'lightblue'}}>
					<Text style={styles.textStyle}>
						{description}
					</Text>
				</CardSection>
				
				<CardSection style={{borderBottomWidth: 0, flexDirection: 'column'}}>
						<Text style={styles.titleTextStyle}>
							Itineraries:
						</Text>
					
						<Text style={styles.textStyle}>
							Itinerary 1
						</Text>
						<Text style={styles.textStyle}>
							Itinerary 2
						</Text>
						<Text style={styles.textStyle}>
							Itinerary 3
						</Text>
						<Text style={styles.textStyle}>
							Itinerary 4
						</Text>
						<Text style={styles.textStyle}>
							Itinerary 5
						</Text>
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	titleTextStyle: {
		fontSize: 20,
		paddingLeft: 10,
		fontWeight: 'bold'
	},
	textStyle: {
		fontSize: 18,
		paddingLeft: 10,
		flexWrap: 'wrap'
	},
	imageStyle: {
		height: 100,
		width: 100,
		resizeMode: 'contain',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	}
};

const mapStateToProps = (state) => {
	const { username, country, languages, description, email } = state.user;
	
	return { username, country, languages, description, email };
};

export default connect(mapStateToProps, { userProfileUpdate, userProfileFetch, userProfileImageFetch })(UserProfile);
