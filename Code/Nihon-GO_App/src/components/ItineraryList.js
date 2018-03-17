import React, {Component} from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ItineraryPreview from './ItineraryPreview';

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

    render(){
        return (
            <ListView style={{backgroundColor: 'black'}}
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }  
}

const mapStateToProps = state => {
    return { itineraries: state.itineraries };
};

export default connect(mapStateToProps)(ItineraryList);