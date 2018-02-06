import React from 'React';
import {ImageBackground, Dimensions} from 'react-native';

const ImageCard = (props) => {
    return(
            <ImageBackground style={styles.imageStyle} source={props.source}>
                {props.children}
            </ImageBackground>
    );
};

const styles ={
    imageStyle:{
        flex: 1,
        height:  (Dimensions.get('window').height - 60) * .5,
        justifyContent: 'flex-end',
    },
};

export { ImageCard };

