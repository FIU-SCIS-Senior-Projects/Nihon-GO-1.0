import React, {Component} from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ItineraryPreview from './ItineraryPreview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ActionBtn from '../ActionBtn';
import { itineraryFetch } from '../../actions';

class ItineraryList extends Component {
    
    componentDidMount(){
        this.props.itineraryFetch(this.props.region);
    }

    renderRow(itinerary){
        return(
            <ItineraryPreview itinerary={itinerary}/>
        );
    }

    render(){
		const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		this.dataSource = ds.cloneWithRows(this.props.itineraries);
        return (
            <View style={{flex: 1}}>
                <ListView style={{backgroundColor: 'black'}}
					enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                <ActionBtn />
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

export default connect(mapStateToProps, { itineraryFetch })(ItineraryList);
