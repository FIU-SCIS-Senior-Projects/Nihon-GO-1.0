import React, {Component} from 'react';
import { ScrollView, View } from 'react-native';
import {connect} from 'react-redux';
import data from '../reducers/LibraryList.json';
import ItineraryPreview from './ItineraryPreview';
import EventView from './EventView';

class ItineraryList extends Component {
    state={
        itineraries: [],
    };

    componentWillMount(){
        this.setState({
            itineraries: data,
        });
    }
    
    renderItineraries(){
        return this.state.itineraries.map(itinerary => 
            <ItineraryPreview onPress={() => <EventView />} key={itinerary.description} itinerary={itinerary}/>
        );
    }    
    
    render(){
        console.log(this.state);
        return (
            <ScrollView>
                {this.renderItineraries()}
            </ScrollView>
        );
    }  
}

export default ItineraryList;