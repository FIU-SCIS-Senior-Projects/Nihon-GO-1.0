import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
	emailChanged, 
	passwordChanged, 
	loginUser, 
	registerUser,
	guestUser,
	logoutUser
} from '../actions';
import { Card, CardSection, Input, Spinner } from './common';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginForm extends Component {
	// Runs after user edits email
	onEmailChange(text) {
		this.props.emailChanged(text);
	}
	
	// Runs after user edits password
	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}
	
	// Runs after user presses login button
	onLoginPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password});
	}
	
	// Runs after user presses register button
	onRegisterPress() {
		const { email, password } = this.props;
		this.props.registerUser({ email, password});
	}
	
	// Runs after user presses guest button
	onGuestPress() {
		this.props.guestUser();
	}
	
	// Runs after user presses logout button
	onLogoutPress() {
		this.props.logoutUser();
	}
	
	// Render login input if user is NOT logged in
 	renderLoginInput() {		
		if (!this.props.loggedIn) {
			return (
				<View>		
					<CardSection>
						<Input
							label={
								<Icon
									name='envelope'
									size={40}
									color='black'
								/>
							}
							placeholder="Email"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
						/>
					</CardSection>
				
					<CardSection>
						<Input
							secureTextEntry
							label={
								<Icon
									name='lock'
									size={50}
									color='black'
								/>
							}
							placeholder="Password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/> 
					</CardSection>
				</View>
			);
		}
	}
	
	// Render buttons
	renderButtons() {
		// Returns loading spinner
		if (this.props.loading) {
			return (
				<CardSection>
					<Spinner size="large" />
				</CardSection>
			);
		}
		
		// Renders logout button if user is logged in
		if (this.props.loggedIn) {
			return (
				<View>					
					<CardSection>
						<Button onPress={this.onLogoutPress.bind(this)}
							title='Log out'
							rounded
							backgroundColor='green'
							icon={{name: 'exit-to-app', type: 'MaterialIcons'}}
							containerViewStyle={{flex: 1}}
						/>
					</CardSection>
				</View>
			);
		}
		
		// Renders login, register, and guest buttons
		return (
			<View>
				<CardSection>
					<Button onPress={this.onLoginPress.bind(this)}
						title='Log in'
						rounded
						backgroundColor='green'
						icon={{name: 'exit-to-app', type: 'MaterialIcons'}}
						containerViewStyle={{flex: 1}}
					/>
				</CardSection>
				
				<CardSection>
					<Button onPress={this.onRegisterPress.bind(this)}
						title='Register'
						rounded
						backgroundColor='green'
						icon={{name: 'person-add', type: 'MaterialIcons'}}
						containerViewStyle={{flex: 1}}
					/>
				</CardSection>
			</View>
		);
	}
	
	// Render errors
	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}
	
	// Render login page
	render() {
		return (
			<Card>
				{this.renderLoginInput()}
				
				{this.renderError()}
				
				{this.renderButtons()}
			</Card>
		);
	}
}

// Styles
const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}

// Redux things
const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, loggedIn } = auth;
	return { email, password, error, loading, loggedIn };
};

// Redux things
export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser, registerUser, guestUser, logoutUser
})(LoginForm);