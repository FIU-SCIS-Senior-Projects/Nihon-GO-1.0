import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ItineraryList from './ItineraryList';
import { Card, Button } from './common';
import { Actions } from 'react-native-router-flux';

class HomePage extends Component {
	
	// Render login page
	render() {
		return (
			<View style={styles.containerStyle}>
				<Card>
					<Text style={styles.Placeholder}>MAP</Text>
				</Card>
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
	containerButton: {
		padding: 80,
		paddingTop: 200,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative'
	},
	Placeholder:{
		paddingTop: 5,
		alignSelf: 'center',
		fontSize: 32,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
		height: 300,
		justifyContent: 'center'
	}
};

export default HomePage