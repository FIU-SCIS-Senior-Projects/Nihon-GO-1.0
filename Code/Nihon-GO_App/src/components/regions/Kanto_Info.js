import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Icon, Card, Text, Tile, Divider} from 'react-native-elements';

const main_IMG = require('../../resources/region_img/Kanto.jpg');
const top_IMG = require('../../resources/region_img/Kanto_1.jpg');
const bottom_IMG = require('../../resources/region_img/Kanto_2.jpg');

const Kanto_Info = () => {
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
				<Text h4>Kanto</Text>
				<Divider/>
				<Text>
					The Kantō region is a geographical area of Honshu, the largest island of Japan. The region includes the Greater Tokyo Area and encompasses seven prefectures: Gunma, Tochigi, Ibaraki, Saitama, Tokyo, Chiba, and Kanagawa.
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
export { Kanto_Info };