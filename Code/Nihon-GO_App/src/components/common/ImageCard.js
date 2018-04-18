import React from 'React';
import {ImageBackground, Dimensions} from 'react-native';

const ImageCard = (props) => {
    return(
            <ImageBackground style={[styles.imageStyle, props.style]} source={props.source}>
                {props.children}
            </ImageBackground>
    );
};

const styles ={
    imageStyle:{
        flex: 1,
        height:  (Dimensions.get('window').width) / 1.618, //Golden Ratio
        justifyContent: 'flex-start',
        borderBottomWidth: 3,
    },
};

export { ImageCard };