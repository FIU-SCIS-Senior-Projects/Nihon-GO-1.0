import React, {Component} from 'react';
import { ListView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ItineraryPreview from './ItineraryPreview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { itineraryFetch, itineraryReset } from '../actions';
import { Background, Spinner } from './common';

class ItineraryListProfile extends Component {

    _renderItem = ({item}) => (
        <ItineraryPreview itinerary={item}/>
    );

    _renderFooter = () => {
        return (
            <View style={{height:200, backgroundColor: 'transparent',}}/>
        )
    }

    render(){
        if(this.props.itineraries.loading){
            return (<Background><Spinner size={70}/></Background>);
        }
        else{
            return (
                <Background>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.props.itineraries.itineraryList}
                            keyExtractor={(item) => item.id}
                            renderItem={this._renderItem}
                            ListFooterComponent={this._renderFooter}
                        />
                    </View>
                </Background>
            );
        }
    }
}

export default ItineraryListProfile;