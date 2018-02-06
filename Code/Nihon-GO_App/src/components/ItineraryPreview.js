import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { ImageCard, CaptionBox } from './common/index';
import { EventView } from './EventView';

const ItineraryPreview = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <ImageCard  source={{uri: props.itinerary.image}}>
                <CaptionBox>
                    <Text 
                        style={styles.titleText}
                        >
                        {props.itinerary.location}
                    </Text>
                    <Text
                        style={styles.captionText}
                    >
                        {props.itinerary.description}
                    </Text>
                </CaptionBox>
            </ImageCard>
        </TouchableOpacity>
    );
};

const styles = {
    titleText: {
        flex: 1,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    captionText:{
        flex: 1,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18,
    },
};

export default ItineraryPreview;