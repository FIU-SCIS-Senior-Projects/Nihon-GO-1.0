import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Icon, Card, Text, Tile, Divider} from 'react-native-elements';

const main_IMG = require('../../resources/region_img/Tohoku.jpg');
const top_IMG = require('../../resources/region_img/Tohoku_1.jpg');
const bottom_IMG = require('../../resources/region_img/Tohoku_2.jpg');

const Tohoku_Info = () => {
	return (
		<View>
			<View style={styles.img_container1}>
				<Image source={main_IMG} style={{borderTopLeftRadius: 7, width: 200, height: 200}}/>
				<View style={styles.img_container2}>
					<Image source={top_IMG} style={{borderTopRightRadius: 7, width: 150, height: 100}}/>
					<Image source={bottom_IMG} style={{width: 150, height: 100}}/>
				</View>
			</View>
			<View style={styles.text_container}>
				<Text h4>Tohoku</Text>
				<Divider/>
				<Text>
					Tohoku, a region of Japan’s Honshu Island, is known for its volcanoes, mountainous terrain and skiing. It's home to the tiny, pine-covered islets of Matsushima Bay, and Lake Towada, a huge crater lake renowned for its bright-blue color and surrounding forests. Tohoku's biggest city is Sendai, site of the Osaki Hachimangu Shinto shrine and ornate Zuihoden, the tomb of feudal lord Date Masamune.
				</Text>
			</View>
			<Button
				onPress={() => console.log("Get itineraries")}
				icon={{name: 'card-travel'}}
				backgroundColor='#03A9F4'
				buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 15}}
				title='VIEW ITINERARIES' />
		</View>
	);
};

const styles = StyleSheet.create({
	img_container1: {
		flexDirection: 'row',
	},
	img_container2: {
		flexDirection: 'column',
	},
	text_container: {
		flex:3,
		flexDirection: 'column',
		padding: 15,
	},
});
export { Tohoku_Info };