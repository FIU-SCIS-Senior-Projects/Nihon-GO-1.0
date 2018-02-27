import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const BlogButtonPlus = ({ onPress, children }) => {
	const { buttonStyle, textStyle } = styles;
	
	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>
				{children}
			</Text>
			<Image
       		 style={styles.imageStyle}
        	source={require('../../resources/plus.png')} />
		</TouchableOpacity>
	);
};


const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#007aff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 2,
	},
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
		marginTop: 5
	},
	imageStyle: {
		height: 50,
        width: 50,
		alignSelf: 'center',
		paddingBottom: 10,
		paddingTop: 10
	}
};

export { BlogButtonPlus };