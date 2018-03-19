import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ItineraryList from './ItineraryList';
import { Card, Button } from './common';
import { Actions } from 'react-native-router-flux';
import Map from './Map';

class HomePage extends Component {
	
	// Render login page
	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={styles.containerMap}>
					<Map/>
				</View>
				<View style={styles.containerButton}>
					<Button onPress={() => Actions.itineraryList()}>
						Sample Itineraries
					</Button>
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex:1,
		justifyContent: 'space-around'
	},
	containerMap: {
		flex:8,
		backgroundColor: '#607D8B'
	},
	containerButton: {
		flex: 2,
		padding: 20,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative'
	}
};

export default HomePage