import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Icon } from 'react-native-elements'
import { primary_color, primary_text_color, dark_color, dark_text_color, light_color}  from './common/AppPalette';

const DrawerButton = ({ onPress, children, icon, iconType, focus }) => {
	const { buttonStyle, textStyle, containerStyle, textStyleFocus } = styles;
	if(focus){
			return (
					<TouchableHighlight underlayColor='#95bcf2' onPress={onPress} style={buttonStyle}>
						<View style={containerStyle}>
							<Icon name={icon} color={primary_color} type={iconType}/>
							<Text style={textStyleFocus}>
								{children}
							</Text>
						</View>
					</TouchableHighlight>
			);
	}
	else{
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
	}
};

const styles = {
	textStyle: {
		fontWeight: 'bold',
		textAlign:'left',
		textAlignVertical: 'center',
		marginLeft: 15,
		flex: 1,
		fontSize: 15,
	},
	textStyleFocus: {
		fontWeight: 'bold',
		color:primary_color,
		textAlign:'left',
		textAlignVertical: 'center',
		marginLeft: 15,
		flex: 1,
		fontSize: 15,
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
