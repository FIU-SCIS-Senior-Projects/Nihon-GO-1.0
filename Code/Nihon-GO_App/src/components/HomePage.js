import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import ItineraryList from './ItineraryList';
import { Actions } from 'react-native-router-flux';
import { Icon, Header } from 'react-native-elements';
import Map from './Map';
import ActionBtn from './ActionBtn';
import { Background } from './common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomePage extends Component {
	// Render login page
	render() {
		return (
			<View style={styles.containerStyle}>
				<Background>
					<View style={styles.containerMap}>
						<Map/>
					</View>
					<ActionBtn/>
				</Background>
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