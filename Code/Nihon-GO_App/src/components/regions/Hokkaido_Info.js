import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Icon, Card, Text, Tile, Divider} from 'react-native-elements';

const main_IMG = require('../../resources/region_img/Hokkaido.jpg');
const top_IMG = require('../../resources/region_img/Hokkaido_1.jpg');
const bottom_IMG = require('../../resources/region_img/Hokkaido_2.jpg');

const Hokkaido_Info = () => {
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
				<Text h4>Hokkaido</Text>
				<Divider/>
				<Text>
					Hokkaido, the northernmost of Japan’s main islands, is known for its volcanoes, natural hot springs (onsen) and ski areas. Rugged Daisetsuzan National Park is home to steaming, volcanic Mount Asahi. Shikotsu-Tōya National Park contains caldera lakes, geothermal springs and a Mount Fuji look-alike, Mount Yōtei. Popular ski resorts include Rusutsu, Furano and Niseko.
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
export { Hokkaido_Info };