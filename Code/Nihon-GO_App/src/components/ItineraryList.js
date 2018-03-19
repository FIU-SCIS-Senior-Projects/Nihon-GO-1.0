import React, {Component} from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ItineraryPreview from './ItineraryPreview';
import { Icon } from 'react-native-elements';

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
                    size={35}
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
        marginRight: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
    },
};

const mapStateToProps = state => {
    return { itineraries: state.itineraries };
};

export default connect(mapStateToProps)(ItineraryList);