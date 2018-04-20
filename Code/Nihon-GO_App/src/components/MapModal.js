import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { primary_text_color } from './common/AppPalette';
import regionData from './Regions_Data';
import { Region } from './Region';

const { height: deviceHeight } = Dimensions.get("window");

export default class MapModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			offset: new Animated.Value(-deviceHeight)
		};
	}

	componentDidMount() {
		Animated.timing(this.state.offset, {
			duration: 300,
			toValue: 0
		}).start();
	}

	closeModal() {
		Animated.timing(this.state.offset, {
			duration: 300,
			toValue: -deviceHeight
		}).start(Actions.pop);
	}
  
	render() {
		return (
			<View style={styles.container}>
				<Animated.View
                    style={[styles.container2, 
                        { backgroundColor: 'white' },
                        { transform: [{ translateY: this.state.offset }] }]}
				>
					<Region
                        region = {this.props.data.region}
                        text = {this.props.data.text}
                        img_1 = {this.props.data.img_1}
                        img_2 = {this.props.data.img_2}
                        img_3 = {this.props.data.img_3}
                    />
					<Icon 
                        containerStyle={{position: 'absolute', top: 5, right: 5}} 
                        color={primary_text_color} 
                        name="close" 
                        onPress={this.closeModal.bind(this)}
                    />
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(52,52,52,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container2:{
		position: 'absolute',
		borderRadius: 7,
		width: 350,
		height: 480,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	textStyle:{
		padding: 10,
		fontSize: 20,
	},
	closeBtn:{
		alignSelf: 'flex-end',
		position: 'absolute'
	}
});