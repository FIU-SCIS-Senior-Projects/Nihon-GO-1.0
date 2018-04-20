import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';
import { userProfileUpdate, userProfileFetch, userProfileSave } from '../actions';

class EditProfile extends Component {
	// Gets user profile data
	componentWillMount() {
		_.each(this.props, (value, prop) => {
			this.props.userProfileUpdate({ prop, value });
		});
	}
	
	// Updates user profile using user inputed data
	onButtonPress() {
		const { username, country, languages, description, email } = this.props;
		
		this.props.userProfileSave({ username, country, languages, description, email });
	}
	
	// Renders user profile to edit
	render() {			
		const { username, country, languages, description, email } = this.props;
		
		return (
			<Card>
				<CardSection>
					<Input
						label="Name:"
						placeholder="Jane"
						value={username}
						onChangeText={value => this.props.userProfileUpdate({ prop: 'username', value })}
					/>
				</CardSection>
			
				<CardSection>
					<Input
						label="Country:"
						placeholder="United States"
						value={country}
						onChangeText={value => this.props.userProfileUpdate({ prop: 'country', value })}
					/>
				</CardSection>
				
				<CardSection>
					<Input
						label="Languages:"
						placeholder="English, Japanese"
						value={languages}
						onChangeText={value => this.props.userProfileUpdate({ prop: 'languages', value })}
					/>
				</CardSection>
				
				<CardSection>
					<Input
						multiline
						label="Description:"
						placeholder="I like traveling."
						value={description}
						onChangeText={value => this.props.userProfileUpdate({ prop: 'description', value })}
					/>
				</CardSection>
				
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
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

export default connect(mapStateToProps, { userProfileUpdate, userProfileFetch, userProfileSave })(EditProfile);