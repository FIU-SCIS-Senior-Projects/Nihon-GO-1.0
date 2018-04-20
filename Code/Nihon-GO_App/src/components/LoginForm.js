import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { 
	emailChanged, 
	passwordChanged, 
	loginUser, 
	registerUser,
	guestUser,
	logoutUser
} from '../actions';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import { BlurView } from 'expo';

// Constants for image
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../resources/bg_screen1.jpg');

class LoginForm extends Component {
	// Used for register modal
	state = {
		modalVisible: false,
	}
	
	// Used for register modal
	constructor(props) {
		super(props);

	this.state = {retypePassword: ''};
	}

	// Used for register modal
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
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
		const { retypePassword } = this.state;
		
		if ((password == retypePassword) && (password > 5) && email) {
			this.props.registerUser({ email, password });
			this.setState({retypePassword: ''});
			this.setModalVisible(!this.state.modalVisible);
		}
	}
	
	// Runs after user presses guest button NO LONGER USED
	onGuestPress() {
		this.props.guestUser();
	}
	
	// Runs after user presses logout button
	onLogoutPress() {
		this.props.logoutUser();
	}
		
	// Render login input
 	renderInput() {
		// Render login input if user is NOT logged in
		if (!this.props.loggedIn) {
			return (
				<View style={styles.loginInput}>
					<BlurView tint="default" intensity={100}>
						<View style={{marginVertical: 10, width: 230}}>
							<TextInput
								placeholder="Email"
								placeholderTextColor= 'white'
								autoCorrect={false}
								keyboardType= 'email-address'
								style={{color: 'white', fontSize: 20, height: 40, fontWeight: 'bold', paddingLeft: 5}}
								onChangeText={this.onEmailChange.bind(this)}
								value={this.props.email}
							/>
						</View>
					</BlurView>
						
					<BlurView tint="default" intensity={100}>
						<View style={{marginVertical: 5, width: 230, marginBottom: 18}}>
							<TextInput
								secureTextEntry
								placeholder="Password"
								placeholderTextColor= 'white'
								style={{color: 'white', fontSize: 20, height: 40, fontWeight: 'bold', paddingLeft: 5}}
								onChangeText={this.onPasswordChange.bind(this)}
								value={this.props.password}
							/> 
						</View>
					</BlurView>
				</View>
			);
		}
	}
	
	// Render register input
 	renderModalInput() {
		const { retypePassword } = this.state;
		// Return register input if modal is visible
		return (
			<View style={{marginVertical: 10, width: 230}}>
				<TextInput
					placeholder="Email"
					placeholderTextColor= 'black'
					autoCorrect={false}
					keyboardType= 'email-address'
					style={{color: 'black', fontSize: 20, height: 40, paddingLeft: 5}}
					onChangeText={this.onEmailChange.bind(this)}
					value={this.props.email}
				/>
				
				<TextInput
					secureTextEntry
					placeholder="Password"
					placeholderTextColor= 'black'
					style={{color: 'black', fontSize: 20, height: 40, paddingLeft: 5}}
					onChangeText={this.onPasswordChange.bind(this)}
					value={this.props.password}
				/> 
							
				<TextInput
					secureTextEntry
					placeholder="Retype Password"
					placeholderTextColor= 'black'
					style={{color: 'black', fontSize: 20, height: 40, paddingLeft: 5}}
					onChangeText={(retypePassword) => this.setState({retypePassword})}
					value={retypePassword}
				/> 
			</View>
		);
	}
	
	// Render buttons
	renderButtons() {
		// Returns button with loading spinner
		if (this.props.loading) {
			return (
				<View style={styles.loginButton}>
					<Button
						textStyle={{fontWeight: 'bold', color: 'white', fontSize: 20}}
						loading={this.props.loading}
						buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 4, borderColor: 'white', borderRadius: 30}}
						containerViewStyle={{marginVertical: 10}}
					/>
				</View>
			);
		}
		
		// Renders logout button if user is logged in
		if (this.props.loggedIn) {
			return (
				<View style={styles.loginButton}>
					<Button
						title ='LOG OUT'
						textStyle={{fontWeight: 'bold', color: 'white', fontSize: 20}}
						loading={this.props.loading}
						buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 4, borderColor: 'white', borderRadius: 30}}
						containerViewStyle={{marginVertical: 10}}
						onPress={this.onLogoutPress.bind(this)}
					/>
				</View>
			);
		}
		
		// Renders login button
		return (
			<View style={styles.loginButton}>
				<Button
					title ='LOG IN'
					textStyle={{fontWeight: 'bold', color: 'white', fontSize: 20}}
					loading={this.props.loading}
					buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 4, borderColor: 'white', borderRadius: 30}}
					containerViewStyle={{marginVertical: 10}}
					onPress={this.onLoginPress.bind(this)}
				/>
			</View>
		);
	}
	
	// Render modal buttons
	renderModalButtons() {
		// Returns button if modal is visible
		return (
			<View style={{alignItems: 'center'}}>
				<Button
					title ='REGISTER'
					textStyle={{fontWeight: 'bold', color: 'black', fontSize: 20}}
					loading={this.props.loading}
					buttonStyle={{height: 50, width: 230, backgroundColor: 'transparent', borderWidth: 4, borderColor: 'black', borderRadius: 30}}
					containerViewStyle={{marginVertical: 10}}
					onPress={this.onRegisterPress.bind(this)}
				/>
				
				<Button
					title ='EXIT'
					textStyle={{fontWeight: 'bold', color: 'black', fontSize: 15}}
					loading={this.props.loading}
					buttonStyle={{height: 35, width: 100, backgroundColor: 'transparent', borderWidth: 4, borderColor: 'black', borderRadius: 30}}
					containerViewStyle={{marginVertical: 10, marginTop: -5}}
				onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
				/>
			</View>
		);
	}
	
	// Render errors
	renderError() {
		const { password } = this.props;
		const { retypePassword } = this.state;
		
		// Returns error if there is any
		if (this.props.error && !password) {
			if (this.state.modalVisible) {
				return (
					<View style={{ backgroundColor: 'transparent', marginBottom: -7, marginTop: -13}}>
						<Text style={styles.errorTextStyle}>
							{this.props.error}
						</Text>
					</View>
				);
			}
			return (
				<View style={{ backgroundColor: 'transparent', marginBottom: -18, marginTop: -3, width: 230}}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
		
		// Returns error if password length is less than 6 characters
		if ((password.length < 6) && password) {
			if (this.state.modalVisible) {
				return (
					<View style={{ backgroundColor: 'transparent', marginBottom: -7, marginTop: -13}}>
						<Text style={styles.errorTextStyle}>
							Minimum length is 6 characters!
						</Text>
					</View>
				);
			}
			return (
				<View style={{ backgroundColor: 'transparent', marginBottom: -18, marginTop: -3}}>
					<Text style={styles.errorTextStyle}>
						Minimum length is 6 characters!
					</Text>
				</View>
			);
		}
		
		// Returns error if password and retypePassword are not the same
		if ((password != retypePassword) && retypePassword && this.state.modalVisible)  {
			return (
				<View style={{ backgroundColor: 'transparent', marginBottom: -7, marginTop: -13}}>
					<Text style={styles.errorTextStyle}>
						Passwords do not match!
					</Text>
				</View>
			);
		}
	}
	
	// Render modal - appears after user clicked Create Account
	renderModal() {
		const { retypePassword } = this.state;
		
		return (
			<View style={styles.modalContainer}>
				<Modal
					isVisible={this.state.modalVisible}
					style={styles.centerModal}
					onBackdropPress={() => {this.setModalVisible(!this.state.modalVisible)}}
					onBackButtonPress={() => {this.setModalVisible(!this.state.modalVisible)}}
				>
					<View style={styles.modalContent}>
						<View style={{alignItems: 'center'}}>
							<Text style={{fontSize: 25, fontWeight: 'bold'}}>Registration Form</Text>

							{this.renderModalInput()}
							{this.renderError()}
							{this.renderModalButtons()}
						</View>
					</View>
				</Modal>
			</View>
		);
	}
	
	// Render login page
	render() {
		return (
			<KeyboardAvoidingView behavior="padding"  style={styles.container}>
				<ImageBackground
					source={BG_IMAGE}
					style={styles.bgImage}
				>
					<View style={styles.loginView}>
						<View style={styles.loginTitle}>
							<View style={{flexDirection: 'row'}}>
								<Text style={styles.headerText}>Nihon-GO</Text>
							</View>
						</View>
						
						{this.renderInput()}
						{this.renderError()}
						{this.renderButtons()}
						{this.renderModal()}
						
						<View style={styles.footerView}>
							<Text style={{color: 'white', fontSize: 15}}>
								New here?
							</Text>
							<Button
								title="Create an Account"
								textStyle={{color: 'white', fontSize: 17}}
								buttonStyle={{backgroundColor: 'transparent'}}
								containerViewStyle={{marginTop: -10}}
								onPress={() => {this.setModalVisible(true)}}
							/>
						</View>
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		);
	}
}

// Styles
const styles = StyleSheet.create({
		bgImage: {
			flex: 1,
			top: 0,
			left: 0,
			width: SCREEN_WIDTH,
			height: SCREEN_HEIGHT,
			justifyContent: 'center',
			alignItems: 'center'
		},
		centerModal: {
			justifyContent: 'center',
			alignItems: 'center',
			margin: 0
		},
		container: {
			flex: 1
		},
		errorTextStyle: {
			fontSize: 15,
			fontWeight: 'bold',
			alignSelf: 'center',
			color: 'red'
		},
		footerView: {
			marginTop: 20,
			flex: 0.5,
			justifyContent: 'center',
			alignItems: 'center'
		},
		headerText: {
			color: 'white',
			fontSize: 35,
			fontWeight: 'bold'
		},
		loginButton: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		loginInput: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		loginTitle: {
			flex: 1
		},
		loginView: {
			marginTop: 150,
			backgroundColor: 'transparent',
			width: 250,
			height: 350,
			justifyContent: 'center',
			alignItems: 'center'
		},
		modalContainer: {
			justifyContent: 'center',
			alignItems: 'center'
		},
		modalContent: {
			backgroundColor: '#ffffff',
			padding: 10,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 5
		}
	}
)

// Redux things
const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, loggedIn } = auth;
	return { email, password, error, loading, loggedIn };
};

// Redux things
export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser, registerUser, guestUser, logoutUser
})(LoginForm);