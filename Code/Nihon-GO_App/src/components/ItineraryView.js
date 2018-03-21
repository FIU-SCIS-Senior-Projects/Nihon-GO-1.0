import React, { Component } from 'react';
import {View, 
        Text, 
        Image, 
        TouchableWithoutFeedback, 
        TouchableOpacity,
        ScrollView } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Card } from './common/index';
import { Icon } from 'react-native-elements';
import EventList from './EventList';

class ItineraryView extends Component {
    constructor(props) {
        super(props);
        this.state = {expandedDesc: false};
    }
    renderDescription(){
        const { titleStyle, descriptionStyle } = styles;
        const { id, title, location, description, image, duration } = this.props.itinerary;

        if(this.state.expandedDesc){
            return (
                <Card style={{height: 200, flexDirection: 'row', marginTop: 5}}>
                    <View style={{flex: 5, justifyContent:'flex-start'}}>
                        <Text style={titleStyle}>{location}</Text>
                        <ScrollView>
                            <Text style={descriptionStyle}>{description}</Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                        <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} days</Text>
                        <TouchableOpacity onPress={() => {this.toggleExpand()}}>
                            <View style={{marginBottom: 15}}>
                                <Icon
                                name='angle-up'
                                type='font-awesome'
                                color='black'
                                size={35}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            );
        }
        else{
            return (
                <Card style={{height: 80, flexDirection: 'row', marginTop: 5}}>
                    <View style={{flex: 5}}>
                        <Text numberOfLines={1} style={titleStyle}>{location}</Text>
                        <Text numberOfLines={2} style={descriptionStyle}>
                            {description}
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                        <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} days</Text>
                        <TouchableOpacity onPress={() => {this.toggleExpand()}}>
                            <View style={{marginBottom: 10}}>
                                <Icon
                                name='angle-down'
                                type='font-awesome'
                                color='black'
                                size={35}
                                />
                            </View>
                            </TouchableOpacity>
                    </View>
                </Card>
            );
        }
    }

    toggleExpand(){
        this.setState(previousState => {
            return { expandedDesc: !previousState.expandedDesc };
          });
    }

    render(){
        const { id, title, location, description, image, duration } = this.props.itinerary;
        

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Image source={{uri: image}} style={{flex:1}} />
                    </View>
                    <View style={{flex: 2}}>
                        {this.renderDescription()}
                    <View style={{flex:1}}>
                        <EventList events={this.props.itinerary.event} />
                    </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        flex: 2,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 22,
        marginLeft: 10,
        marginTop: 5,
        maxHeight: 29,
    },
    descriptionStyle:{
        flex: 3,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 16,
        fontStyle: 'italic',
        marginLeft: 10,
    },
};

const mapStateToProps = state => {
    const itinerary = state.itineraries.find(item => item.itinerary.id === state.selectedItineraryId).itinerary;
    return { itinerary };
};

export default connect(mapStateToProps, actions)(ItineraryView);