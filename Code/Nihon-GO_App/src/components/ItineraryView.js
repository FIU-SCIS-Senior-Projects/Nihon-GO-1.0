import React, { Component } from 'react';
import {
        Animated,
        View, 
        Text, 
        Image, 
        TouchableWithoutFeedback, 
        TouchableOpacity,
        ScrollView } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Card, Background } from './common/index';
import { Icon, Button } from 'react-native-elements';
import EventList from './EventList';
import { primary_color}  from './common/AppPalette';
  
class ItineraryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedDesc: false,
            offsetY: new Animated.Value(0),
        };
    }
    
    animateStart(){
        Animated.sequence([
            Animated.timing(                  // Animate over time
                this.state.offsetY,
                { toValue: -30 }
            ),
            Animated.timing(                  // Animate over time
                this.state.offsetY,
                { toValue: 100 }
            ),
        ]).start(); // start the sequence group
    }
    
    renderDescription(){
        const { titleStyle, descriptionStyle } = styles;
        const { id, data } = this.props.itinerary;
		const { title, location, description, image, duration } = data;
        if(this.state.expandedDesc){
            return (
                <Card style={{height: 200, flexDirection: 'row', marginTop: 5, backgroundColor: 'white',}}>
                    <View style={{flex: 5, justifyContent:'flex-start'}}>
                        <Text style={titleStyle}>{location}</Text>
                        <ScrollView>
                            <Text style={descriptionStyle}>{description}</Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                        <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} Hours</Text>
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
                <Card style={{height: 80, flexDirection: 'row', marginTop: 5, backgroundColor: 'white',}}>
                    <View style={{flex: 5}}>
                        <Text numberOfLines={1} style={titleStyle}>{location}</Text>
                        <Text numberOfLines={2} style={descriptionStyle}>
                            {description}
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                        <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} Hours</Text>
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
	
	rendrEvents(){
		const { data } = this.props.itinerary;
		if(data.events)
			return(<EventList events={data.event} />);
		else
			return(<View/>);
	}
    
	renderStartBtn(){
        if(this.props.mode==='view'){
            return(
                <Animated.View style={{
                    transform: [{translateY: this.state.offsetY}], 
                    paddingBottom: 15, 
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 0,
                }}>
                    <Button
                        raised
                        large
                        borderRadius={2}
                        icon={{name: 'card-travel'}}
                        title='START THIS ITINERARY!'
                        onPress={() => {this.animateStart()}}
                        buttonStyle={{paddingBottom: 15, backgroundColor: primary_color,}}
                    />
                </Animated.View>
            );
        }
        else{
            return(
                <View/>
            );
        }
    }
    render(){
        const { id, data } = this.props.itinerary;
		const { title, location, description, image, duration } = data;
        

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Image source={{uri: image}} style={{flex:1}} />
                    </View>
                    <View style={{flex: 2}}>
                        <Background>
                            {this.renderDescription()}
                            <View style={{flex:1}}>
                                {this.rendrEvents()}
                            </View>
                            {this.renderStartBtn()}
                        </Background>
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
    const itinerary = state.itineraries.itineraryList.find(item => item.id === state.selectedItineraryId);
    return { itinerary };
};

export default connect(mapStateToProps, actions)(ItineraryView);