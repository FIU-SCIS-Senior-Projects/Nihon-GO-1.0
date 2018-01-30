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
import { Card, CardSection, Input, Button, Spinner } from './common';
import LibraryList from './LibraryList';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}
	
	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}
	
	onLoginPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password});
	}
	
	onRegisterPress() {
		const { email, password } = this.props;
		this.props.registerUser({ email, password});
	}
	
	onGuestPress() {
		this.props.guestUser();
	}
	
	onLogoutPress() {
		this.props.logoutUser();
	}
	
	renderButtons() {
		if (this.props.loading) {
			return (
				<CardSection>
					<Spinner size="large" />
				</CardSection>
			);
		}
		
		console.log(this.props.loggedIn);
		
		if (this.props.loggedIn) {
			return (
				<View>
					<CardSection>
						<Button onPress={this.onLogoutPress.bind(this)}>
							Log Out
						</Button>
					</CardSection>
					<LibraryList />
				</View>
			);
		}
		//else return below
		
		return (
			<View>
				<CardSection>
					<Button onPress={this.onLoginPress.bind(this)}>
						Login
					</Button>
				</CardSection>
				
				<CardSection>
					<Button onPress={this.onRegisterPress.bind(this)}>
						Register
					</Button>
				</CardSection>
				
				<CardSection>
					<Button onPress={this.onGuestPress.bind(this)}>
						Guest
					</Button>
				</CardSection>
			</View>
		);
	}
	
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
	
	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>
				
				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/> 
				</CardSection>
				
				{this.renderError()}
				
				{this.renderButtons()}
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, loggedIn } = auth;
	return { email, password, error, loading, loggedIn };
};

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser, registerUser, guestUser, logoutUser
})(LoginForm);