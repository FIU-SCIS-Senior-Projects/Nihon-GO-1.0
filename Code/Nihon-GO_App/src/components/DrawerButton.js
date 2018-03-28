import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Icon } from 'react-native-elements'

const DrawerButton = ({ onPress, children, icon, iconType }) => {
	const { buttonStyle, textStyle, containerStyle } = styles;
	
	return (
			<TouchableHighlight underlayColor='#95bcf2' onPress={onPress} style={buttonStyle}>
				<View style={containerStyle}>
					<Icon name={icon} type={iconType}/>
					<Text style={textStyle}>
						{children}
					</Text>
				</View>
			</TouchableHighlight>
	);
};

const styles = {
	textStyle: {
		textAlign:'left',
		textAlignVertical: 'center',
		marginLeft: 15,
		flex: 1,
		fontSize: 15,
		fontWeight: '400'
	},
	buttonStyle: {
		height:50,
		alignSelf: 'stretch',
	},
	containerStyle: {
		paddingLeft: 10,
		flex: 1,
		flexDirection: 'row',
	}
};

export { DrawerButton };