import React from 'react'
import { View, Text, ImageBackground, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const backgound_IMG = require('../../resources/texture.jpg');

const Background = (props) => {
	const { buttonStyle, textStyle } = styles;
	
	return (
        <ImageBackground
                    source={backgound_IMG}
                    style={styles.bgImage}
        >
            {props.children}
        </ImageBackground>
	);
};

const styles = {
	bgImage: {
		flex: 1,
        width: null,
        height: null,
	},
};

export { Background };