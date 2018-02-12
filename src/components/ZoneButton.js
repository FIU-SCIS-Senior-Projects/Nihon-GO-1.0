import React from 'react'
import { View, Text} from 'react-native'
import { Button, CardItem } from './common';

const ZoneButton = ({name, description, onPress}) => {
	return (
		<View>
		
			<CardItem>
				<Button onPress={onPress}>
					{name}
				</Button>
			</CardItem>
			
			<CardItem>
				<Text>{description}</Text>
			</CardItem>
			
		</View>
	);
};


export default ZoneButton;