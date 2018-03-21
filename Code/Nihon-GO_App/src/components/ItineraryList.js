import React, {Component} from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ItineraryPreview from './ItineraryPreview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class ItineraryList extends Component {

    componentWillMount(){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(this.props.itineraries);
    }
    
    renderRow(itinerary){
        return(
            <ItineraryPreview itinerary={itinerary.itinerary}/>
        );
    }

    renderItAddButton(){
        const { floatingButton } = styles;

        return(
            <View style={floatingButton}>
                <Icon
                    raised
                    name='plus'
                    type='entypo'
                    color='#2196F3'
                    size={30}
                    onPress={() => {Actions.itineraryCreate()}}
                    />
            </View>
        );
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <ListView style={{backgroundColor: 'black'}}
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                {this.renderItAddButton()}
            </View>

        );
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

export default connect(mapStateToProps)(ItineraryList);