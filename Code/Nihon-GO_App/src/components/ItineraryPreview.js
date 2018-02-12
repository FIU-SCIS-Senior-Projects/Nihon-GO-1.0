import React, { Component } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { ImageCard, CaptionBox } from './common/index';
import { EventView } from './EventView';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ItineraryPreview extends Component {
    renderEvents(){
        const { itinerary, selectedItineraryId } = this.props;

        if (itinerary.id === selectedItineraryId){
            console.log(itinerary.event[0])
        }
    }
    render(){
        const {titleStyle, captionStyle } = styles;
        const { id, image, location, description } = this.props.itinerary;

        return(
            <TouchableOpacity onPress={() => this.props.selectItinerary(id)}>
                <ImageCard  source={{uri: image}}>
                    <CaptionBox>
                        <Text 
                            style={titleStyle}
                            >
                            {location}
                        </Text>
                        <Text numberOfLines={2}
                            style={captionStyle}
                        >
                            {description}
                        </Text>
                    </CaptionBox>
                    {this.renderEvents()}
                </ImageCard>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        flex: 2,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    captionStyle:{
        flex: 3,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18,
    },
};

const mapStateToProps = state => {
    return { selectedItineraryId: state.selectedItineraryId };
};

export default connect(mapStateToProps, actions)(ItineraryPreview);