import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Icon, Card, Text, Tile, Divider} from 'react-native-elements';

const main_IMG = require('../../resources/region_img/Chubu.jpg');
const top_IMG = require('../../resources/region_img/Chubu_1.jpg');
const bottom_IMG = require('../../resources/region_img/Chubu_2.jpg');

const Chubu_Info = () => {
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
				<Text h4>Chubu</Text>
				<Divider/>
				<Text>
					Chūbu is a central region on Japan’s main island, Honshu, comprising 9 prefectures. Mount Fuji, Japan’s highest mountain and an active volcano, straddles the eastern prefectures of Yamanashi and Shizuoka. At the foot of the mountain, the Fuji Five Lakes region features trails and clear lakes. Beneath the southern foothills of the Japanese Alps, Nagoya is an economic center in western Aichi prefecture.
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
export { Chubu_Info };