import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {Hokkaido_Info, Tohoku_Info, Kanto_Info, Chubu_Info} from './regions';
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
	
	renderRegion(){
		switch(this.props.data) {
			case "Hokkaido":
				return(
					<Hokkaido_Info/>
				)
				break;
			case "Tohoku":
				return(
					<Tohoku_Info/>
				)
				break;
			case "Chubu":
				return(
					<Chubu_Info/>
				)
				break;
			case "Kanto":
				return(
					<Kanto_Info/>
				)
				break;
			case "kansai":
				return(
					<View>
						<Text style={styles.textStyle}>{this.props.data}</Text>
					</View>
				)
				break;
			case "Chugoku":
				return(
					<View>
						<Text style={styles.textStyle}>{this.props.data}</Text>
					</View>
				)
				break;
			case "Shikoku":
				return(
					<View>
						<Text style={styles.textStyle}>{this.props.data}</Text>
					</View>
				)
				break;
			case "Kyushu":
				return(
					<View>
						<Text style={styles.textStyle}>{this.props.data}</Text>
					</View>
				)
				break;
			case "Okinawa":
				return(
					<View>
						<Text style={styles.textStyle}>{this.props.data}</Text>
					</View>
				)
				break;
			default:
				return(
					<View>
						<Text style={styles.textStyle}>!</Text>
					</View>
				)
		}
	}
  
	render() {
		return (
			<View style={styles.container}>
				<Animated.View
				style={[styles.container2, 
				{ backgroundColor: 'white' },
				{ transform: [{ translateY: this.state.offset }] }]}
				>
					{this.renderRegion()}
					<Icon containerStyle={{position: 'absolute', top: 5, right: 5}} color="#4fc3f7" name="close" onPress={this.closeModal.bind(this)}/>
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
