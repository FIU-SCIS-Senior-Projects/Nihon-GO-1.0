import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { primary_color }  from './AppPalette';

const Spinner= ({ size }) => {
	return (
		<View style={styles.spinnerStyle}>
			<ActivityIndicator size={size || 'large'} color={primary_color} />
		</View>
	);
};

const styles = {
	spinnerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export { Spinner };