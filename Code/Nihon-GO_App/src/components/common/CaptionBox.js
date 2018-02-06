import React from 'react';
import { View } from 'react-native';

const CaptionBox = (props) => {
    return(
        <View style={styles.shadowBox}>{props.children}</View>
    );
};

const styles = {
    shadowBox: {
        backgroundColor: '#20A38199',
        height: 85,
    },
};

export { CaptionBox };