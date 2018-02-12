import React, {Component} from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import ZoneButton from './ZoneButton'



class ZoneViewer extends Component {
	
	state = { scope: 0, data:[] }; 
	//scope = used in URL building (regions\Kanto for example)
	//data = data of the gathered objects
	
	componentWillMount(){
		axios.get('http://nihongo-app-api.herokuapp.com/').then(response => this.setState({data: response.data}));
	}
	
	renderZone() {
		var newScope; //0 is regions, 1 is cities, 2 is events (not yet supported))
		var zone;
		
		if(this.state.scope == 0){
			zone = 'regions/';
			newScope = 1;
		}else if(this.state.scope == 1){
			zone = 'cities/';
			newScope = 2;
		}
	
		if(this.state.scope == 0 || this.state.scope == 1){
			return this.state.data.map(dat => <ZoneButton key={dat.name} name={dat.name} description={dat.description} onPress={() => this.getNewData(newScope, zone, dat.name)} />);
		} else {
			return this.state.data.map(dat => <ZoneButton key={dat.name} name={dat.name} description={dat.description} />);
		}
	}
	
	getNewData(newScope, zone, name){
		this.setState({scope: newScope, data: this.state.data});
		axios.get('http://nihongo-app-api.herokuapp.com/' + zone + name).then(response => this.setState({scope: newScope, data: response.data}));
	}
	
	render(){
		console.log(this.state);
	    return (
	    	<View>
			{this.renderZone()}
	    	</View>
	    );
	}
	
}

export default ZoneViewer;

