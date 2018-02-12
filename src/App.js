import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/common';
import ZoneViewer from './components/ZoneViewer';

class App extends Component {
	render() {
		return (
			<View>
				<Header headerText="NihonGO" />
				<ZoneViewer/>
			</View>
		);
	}
}

export default App;