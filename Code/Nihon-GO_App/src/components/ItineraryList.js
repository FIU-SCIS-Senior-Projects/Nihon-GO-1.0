import React, {Component} from 'react';
import { ListView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ItineraryPreview from './ItineraryPreview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ActionBtn from './ActionBtn';
import { itineraryFetch, itineraryReset } from '../actions';
import { Background, Spinner } from './common';

class ItineraryList extends Component {

    componentDidMount(){
        this.props.itineraryFetch(this.props.filters);
    }

    componentWillUnmount() {
        this.props.itineraryReset();
        Actions.main();
    }

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
                        <ActionBtn />
                    </View>
                </Background>
            );
        }
    }
}

const styles = {
    floatingButton: {
        bottom: 10,
        right: 10,
        position: 'absolute',
    },
};

const mapStateToProps = state => {
    return { itineraries: state.itineraries };
};

export default connect(mapStateToProps, { itineraryFetch, itineraryReset })(ItineraryList);
