import React, {Component} from 'react';
import { FlatList, ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import EventPreview from './EventPreview';
import * as actions from '../actions';

class EventList extends Component {
     constructor(props) {
        super(props);
    }

     _renderItem = ({item, index}) => (
        <EventPreview event={item} selectedItineraryId={this.props.selectedItineraryId} index={index}/>
    );

    _renderFooter = (style) => {

        const completed = (this.props.numEvents == this.props.progress);
        if(completed){
            style = {...style, backgroundColor: '#2196F3' };
        }
        if(this.props.started == this.props.selectedItineraryId){
            return (
                <View style={style}/>
            )
        }
        else{
            return (
                <View style={{height:200,}}/>
            )
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View>
                    <FlatList
                        data={this.props.events}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={this._renderItem}
                        ListFooterComponent={this._renderFooter(styles.footer)}
                    />
                </View>
                {this._renderFooter(styles.bottomLine)}
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
    const start_itn = state.StartItn;
    const { events, progress, started, isStarted } = start_itn;
    const numEvents = events;
    return { numEvents, progress, started, isStarted };
};

export default connect(mapStateToProps, actions)(EventList);
