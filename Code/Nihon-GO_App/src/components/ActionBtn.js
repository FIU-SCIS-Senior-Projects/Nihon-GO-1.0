import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { primary_color, primary_text_color }  from './common/AppPalette';
import { itineraryFetch, startedItnUpdate } from '../actions';
import { connect } from 'react-redux';

class ActionBtn extends Component {
    
	createItn(){
		if(this.props.loggedIn){
			Actions.itineraryCreate()
		}
		else{
			Alert.alert(
					'Notice',
					'Need to be logged in to do this!',
					[{text: 'Sign In Now', onPress: () => Actions.login()},]
			 );
		}
	}
	
	goToTopItn(){
        Actions.main();
        Actions.itineraryList({title: 'Top Itineraries', filters: {region:'ALL'} });
    }

    continueItn(id){
      this.props.itineraryFetch({id: id});
      this.props.startedItnUpdate({ prop: 'isViewing', value: true });
    }

    renderBtn(){
      return(
        <ActionButton.Item
            buttonColor='green'
            title="Continue Itinerary"
            onPress={() => this.continueItn(this.props.started)}
        >
            <Icon name='card-travel' />
        </ActionButton.Item>
      );
    }

    render() {
        //this.props.itineraryFetch({id: '-LA-TDv9zkOXR8ZSGjov'});
        //console.log(this.props.itineraries);
        if(this.props.started == 'no'){
            return (
                <ActionButton
                    fixNativeFeedbackRadius={true}
                    buttonColor={primary_color}
                    size={70}
                    buttonTextStyle={{color: primary_text_color}}
                    renderIcon={() => {return(<Icon name='add' size={35} color={primary_text_color}/>)}}
                >
                    <ActionButton.Item
                        buttonColor='#9b59b6'
                        title="Top Itineraries"
                        onPress={() => this.goToTopItn()}
                    >
                        <Icon name='public' />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor='#3498db'
                        title="Create Itinerary"
                        onPress={() => this.createItn()}
                    >
                        <Icon name='create' />
                    </ActionButton.Item>
                </ActionButton>
            );
        }
        else{
          return (
                <ActionButton
                    fixNativeFeedbackRadius={true}
                    buttonColor={primary_color}
                    size={70}
                    buttonTextStyle={{color: primary_text_color}}
                    renderIcon={() => {return(<Icon name='add' size={35} color={primary_text_color}/>)}}
                >
                    {this.renderBtn()}
                    <ActionButton.Item
                        buttonColor='#9b59b6'
                        title="Top Itineraries"
                        onPress={() => this.goToTopItn()}
                    >
                        <Icon name='public' />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor='#3498db'
                        title="Create Itinerary"
                        onPress={() => this.createItn()}
                    >
                        <Icon name='create' />
                    </ActionButton.Item>
                </ActionButton>
            );
        }
    }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

// Redux things
const mapStateToProps = (state) => {
	const { loggedIn } = state.auth;
	const itineraries = state.itineraries;
	const start_itn = state.StartItn;
	const { started, isStarted } = start_itn;
	return { itineraries, started, isStarted, loggedIn };
};

// Redux things
export default connect(mapStateToProps, { itineraryFetch, startedItnUpdate })(ActionBtn);