import React, {Component} from 'react';
import { FlatList, ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import EventPreview from './EventPreview';
import * as actions from '../actions';

class EventList extends Component {

     _renderItem = ({item}) => (
        <EventPreview event={item} mode={'start'}/>
    );
    
    _renderFooter = () => {
        return (
            <View style={styles.footer}/>
        )
    }
    
    render(){
        return (
            <View style={{flex:1}}>
                <View>
                    <FlatList
                        data={this.props.events}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={this._renderItem}
                        ListFooterComponent={this._renderFooter}
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
        backgroundColor: '#424242',
        marginLeft: 22,
    },
    footer:{
        flex: 1,
        width: 4,
        backgroundColor: '#424242',
        marginLeft: 22,
        height:200, 
    }
};

const mapStateToProps = state => {
    const events = state.itineraries.itineraryList.find(item => 
        item.id === state.selectedItineraryId).data.events;
    return { events };
};

export default connect(mapStateToProps, actions)(EventList);