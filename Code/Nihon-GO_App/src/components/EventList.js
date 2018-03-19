import React, {Component} from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import EventPreview from './EventPreview';
import * as actions from '../actions';

class EventList extends Component {

    componentWillMount(){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(this.props.events);
    }
    
    renderRow(event){
        return(
            <EventPreview event={event}/>
        );
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View>
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
                <View style={styles.bottomLine}></View>
            </View>
        );
    }  
}

const styles={
    bottomLine: {
        flex: 1,
        width: 4,
        backgroundColor: '#9E9E9E',
        marginLeft: 22,
    },
};

const mapStateToProps = state => {
    const events = state.itineraries.find(item => 
        item.itinerary.id === state.selectedItineraryId).itinerary.event;
    return { events };
};

export default connect(mapStateToProps, actions)(EventList);