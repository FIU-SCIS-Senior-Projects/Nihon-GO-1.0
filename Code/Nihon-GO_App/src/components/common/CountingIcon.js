import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const CountingIcon = ({ onPress, children, iconName, iconType, iconColor, count, textColor }) =>{
    const {viewStyle, iconViewStyle, textStyle} = styles;

    return(
            <TouchableOpacity onPress={onPress}>
                <View style={viewStyle}>
                    <View style={iconViewStyle}>
                        <Icon
                            name={iconName}
                            type={iconType}
                            color={iconColor || 'white'}
                            />
                    </View>
                    <View>
                        <Text style={[textStyle, {color: textColor || 'white'}]}>{count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
    );
};

const styles = {
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 20,
    },
    iconViewStyle: {
        marginRight: 6,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export { CountingIcon };