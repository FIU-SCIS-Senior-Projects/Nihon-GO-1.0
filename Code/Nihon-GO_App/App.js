import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';
import { Header } from './src/components/common';

export default class App extends Component {
	componentWillMount() {
		// Initialize Firebase
		const config = {
			apiKey: "AIzaSyAlqk-VtZdT_j8HGxc8TLQi5UUxwJVrQuY",
			authDomain: "nihon-go-fiu.firebaseapp.com",
			databaseURL: "https://nihon-go-fiu.firebaseio.com",
			projectId: "nihon-go-fiu",
			storageBucket: "nihon-go-fiu.appspot.com",
			messagingSenderId: "75675857241"
		};
		
		firebase.initializeApp(config);
	}
	
	// Render application
	render() {
		// Redux things
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		
		// Home view
		return (
			// TIP: Provider ONLY allows one component
			<Provider store={store}>
				<View>
					<Header headerText="Nihon-GO" />
					{/* ADD IMPORTED CODE HERE. EXAMPLE <LoginForm /> */}
				</View>
			</Provider>
		);
	}
}

AppRegistry.registerComponent('Nihon-GO', () => App);
