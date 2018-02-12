import React from 'react';
import {View, Text, Image} from 'react-native';
import { CardSection } from './common/index';

const EventView = (props) => {
    return(
        <View>
            <CardSection>
                <Image source={{uri: this.props.event.image}}/>
                <Text>{this.props.event.duration}</Text>
                <Text>{this.props.event.address}</Text>
                <Text>{this.props.event.description}</Text>                
            </CardSection>
        </View>
    );
};

export default EventView;