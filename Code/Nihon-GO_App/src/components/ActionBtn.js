import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
 import { Actions } from 'react-native-router-flux';
 
class ActionBtn extends Component {
 
  render() {
    return (
		<ActionButton 
			fixNativeFeedbackRadius={true} 
			buttonColor='#4fc3f7' 
			size={70} 
			buttonTextStyle={{color: 'black'}}
			renderIcon={() => {return(<Icon name='add' />)}}
		>
			<ActionButton.Item buttonColor='#9b59b6' title="Top Itineraries" onPress={() => Actions.itineraryList()}>
				<Icon name='card-travel' />
			</ActionButton.Item>
			<ActionButton.Item buttonColor='#3498db' title="Create Itinerary" onPress={() => Actions.itineraryCreate()}>
				<Icon name='create' />
			</ActionButton.Item>
		</ActionButton>
    );
  }
 
}
 
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ActionBtn