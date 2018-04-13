import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Icon, Card, Text, Tile, Divider} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const Region = ({ region, text, img_1, img_2, img_3 }) => {
	return (
		<View>
            <View style={styles.img_container1}>
				<Image source={img_1} style={{borderTopLeftRadius: 7, width: 200, height: 200}}/>
				<View style={styles.img_container2}>
					<Image source={img_2} style={{borderTopRightRadius: 7, width: 150, height: 100}}/>
					<Image source={img_3} style={{width: 150, height: 100}}/>
				</View>
			</View>
			<View style={styles.text_container}>
				<Text h4>{region}</Text>
				<Divider/>
				<Text>
                    {text}
				</Text>
			</View>
			<Button
				onPress={() => Actions.itineraryList({region: region})}
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
export { Region };