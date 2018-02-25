import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input } from './common';
import { userProfileUpdate, userProfileFetch, userProfileCreate } from '../actions';

class UserProfile extends Component {
	// Gets user profile data
	componentWillMount() {
		this.props.userProfileFetch();
	}
	
	// Renders user profile
	render() {
		const { username, country, languages, description, email } = this.props;
		
		return (
			<Card>
				<CardSection>
					<Text style={styles.titleTextStyle}>
						Name:
					</Text>
					<Text style={styles.textStyle}>
						{username}
					</Text>
				</CardSection>
			
				<CardSection>
					<Text style={styles.titleTextStyle}>
						Country:
					</Text>
					
					<Text style={styles.textStyle}>
						{country}
					</Text>
				</CardSection>
				
				<CardSection>
					<Text style={styles.titleTextStyle}>
						Languages:
					</Text>
					
					<Text style={styles.textStyle}>
						{languages}
					</Text>
				</CardSection>
				
				<CardSection>
					<Text style={styles.titleTextStyle}>
						Description:
					</Text>
					
					<Text style={styles.textStyle}>
						{description}
					</Text>
				</CardSection>
				
				<CardSection>
					<Text style={styles.titleTextStyle}>
						Picture:
					</Text>
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	titleTextStyle: {
		fontSize: 18,
		paddingLeft: 20
	},
	textStyle: {
		fontSize: 18,
		paddingLeft: 10,
		flex: 1,
		flexWrap: 'wrap'
	}
};

const mapStateToProps = (state) => {
	const { username, country, languages, description, email } = state.user;
	
	return { username, country, languages, description, email };
};

export default connect(mapStateToProps, { userProfileUpdate, userProfileFetch })(UserProfile);
