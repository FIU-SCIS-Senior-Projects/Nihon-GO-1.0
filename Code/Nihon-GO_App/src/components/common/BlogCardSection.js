import React from 'react';
import { View } from 'react-native';

const BlogCardSection = (props) => {
	return (
		<View style={styles.containerStyles}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyles: {
		borderBottomWidth: 1,
		paddingTop: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#666E6D',
		position: 'relative'
	}
};

export { BlogCardSection };