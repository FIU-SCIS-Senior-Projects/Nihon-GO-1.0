import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';
import { Header } from './src/components/common';
import BlogList from './src/components/BlogList';

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
				<View style={{flex:1}}>
					<Header headerText="Nihon-GO" />
					<BlogList/>
				</View>
			</Provider>
		);
	}
}

AppRegistry.registerComponent('Nihon-GO', () => App);
