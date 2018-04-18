import React from 'react';
import { View } from 'react-native';

const CaptionBox = (props) => {
    return(
        <View style={styles.shadowBox}>{props.children}</View>
    );
};

const styles = {
    shadowBox: {
        height: 85,
    },
};

export { CaptionBox };