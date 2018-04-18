import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import ItineraryList from './itinerary/ItineraryList';
import { Actions } from 'react-native-router-flux';
import { Icon, Header } from 'react-native-elements';
import Map from './Map';
import ActionBtn from './ActionBtn';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const backgound_IMG = require('../resources/texture.jpg');

class HomePage extends Component {
	// Render login page
	render() {
		return (
			<View style={styles.containerStyle}>
				<ImageBackground
					source={backgound_IMG}
					style={styles.bgImage}
				>
				
					<View style={styles.containerMap}>
						<Map/>
					</View>
					<ActionBtn/>
					
				</ImageBackground>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex:1,
		justifyContent: 'space-around'
	},
	bgImage: {
		flex: 1,
		top: 0,
		left: 0,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerMap: {
		flex:1,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT
	},
	floatingButton: {
        bottom: 10,
        right: 10,
        position: 'absolute',
    },
};

export default HomePage