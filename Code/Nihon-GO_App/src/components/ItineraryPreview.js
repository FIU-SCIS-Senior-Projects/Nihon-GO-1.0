import React, { Component } from 'react';
import {
		Alert,
		Text,
        View,
        TouchableWithoutFeedback,
        TouchableOpacity,
        UIManager,
        LayoutAnimation } from 'react-native';
import { ImageCard, CaptionBox, CountingIcon } from './common/index';
import { LinearGradient } from 'expo';
import { Icon, Button } from 'react-native-elements';
import { primary_color, primary_text_color }  from './common/AppPalette';
import { Actions } from 'react-native-router-flux';
import { userUpdateFavorites, favUpdate, userProfileSave, userProfileUpdate } from '../actions';
import { connect } from 'react-redux';

class ItineraryPreview extends Component {
    constructor(props){
        super(props);
        this.state = {
            expandedItinerary: false,
			favorites: this.props.itinerary.data.favorites
        };
    }
    componentWillUpdate() {
        var CustomLayoutLinear = {
            duration: 300,
            create: {
              type: LayoutAnimation.Types.linear,
              property: LayoutAnimation.Properties.opacity,
            },
            update: {
              type: LayoutAnimation.Types.linear,
            },
          };

		UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    toggleExpanded(){
        this.setState(previousState => {
            return { expandedItinerary: !previousState.expandedItinerary };
          });
    }

    renderIcon(){
        if (!this.state.expandedItinerary){
            return(
                <Icon
                    name='keyboard-arrow-down'
                    color='white'
                    size={30}
                    />
            );
        }
        else{
            return(
                <Icon
                    name='keyboard-arrow-up'
                    color='white'
                    size={30}
                    />
            );
        }
    }

    //This method renders the title, description, and selection arrow for all itinerary previews
    renderTopHalf(){
        const { itinerary, expanded } = this.props;
        const { id, data } = itinerary;
		const { image, description, title, location, duration } = data;
        const {titleStyle, captionStyle, linearGradient } = styles;

        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                    <CaptionBox>
                        <Text
                            style={titleStyle}
                            >
                            {title}
                        </Text>
                        <Text numberOfLines={1}
                            style={captionStyle}
                        >
                            {location}
                        </Text>
                        <Text numberOfLines={1}
                            style={captionStyle}
                        >
                            {duration}hrs
                        </Text>
                    </CaptionBox>
                </View>
                <View style={{flex: 1, marginTop: 10,}}>
                    {this.renderIcon()}
                </View>
            </View>
        );
    }

    //This method renders the comment, share, and favorites buttons when preview is expanded.
    renderBottomHalf(){
        const { itinerary, expanded } = this.props;
        const { id, data } = itinerary;
	    const { image, description, title, location, duration } = data;
        const {titleStyle, captionStyle, linearGradient, descStyle } = styles;

        return(
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                <View style={{ margin: 10}}>
                    <CaptionBox>
                        <Text numberOfLines={3}
                            style={descStyle}
                        >
                            {description}
                        </Text>
                    </CaptionBox>
                </View>
                <View style={{ alignSelf: 'stretch', margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    {this.renderHeartIcon()}
                    <Button
                        raised
                        small
                        borderRadius={2}
                        backgroundColor={primary_color}
                        onPress={() => Actions.itineraryView({ title: title, itinerary: itinerary})}
                        title='View' />
                </View>
            </View>
        );

    }
	
	renderHeartIcon() {
		const { id } = this.props.itinerary;
		var value = this.props.fav_itinerary;
		var heartType = 'heart-o';
		
		if (!value) {
			heartType = 'heart-o';
		}
		else if (value.includes(id)) {
			heartType = 'heart';
		}
		
		return (
			<CountingIcon
				iconName={heartType}
				iconType='font-awesome'
				count={this.state.favorites}
				onPress={() => {this.updateFavorites()}}
				iconColor='white'/>
		);
	}
	
	updateFavorites() {
        const { id } = this.props.itinerary;
		
		var favorites = this.state.favorites;
		var value = this.props.fav_itinerary;
		var addSub = favorites + 1;
		if(this.props.loggedIn){
			// Check if user has any favorites
			if (!value){
				value = [];
				value.push(id);
			}
			// Remove if in favorites
			else if (value.includes(id)) {
				addSub = favorites - 1;
				var i = value.indexOf(id);
				if(i != -1) {
					value.splice(i, 1);
				}
			}
			// Add to favorites
			else {
				value.push(id);			
			}
			
			this.props.favUpdate(id, addSub);
			this.setState({favorites: addSub});
			this.props.userProfileUpdate({prop: 'fav_itinerary', value});
			this.props.userProfileSave({fav_itinerary: value});
		}
		else{
			Alert.alert(
				'Notice',
				'Need to be logged in to do this!',
				[{text: 'Sign In Now', onPress: () => Actions.login()},]
			 );
		}
	}
	
    renderExpandedPreview(){
        const { itinerary, expanded } = this.props;
        const { id, data } = itinerary;
		const { image, description, title, location, duration } = data;
        const {titleStyle, captionStyle, linearGradient } = styles;

        
        if (!this.state.expandedItinerary){
            return (
                <ImageCard  source={{uri: image}} style={{height: 104}}>
                    <LinearGradient
                    colors={['#00000099', '#FFFFFF00']} //66 is 40% in hex
                    start={[0, 0]}
                    style={{flex:1,}}
                    >
                        {this.renderTopHalf()}
                    </LinearGradient>
                </ImageCard>
            );
        }
        else{
            return (
                <ImageCard  source={{uri: image}}>
                    <LinearGradient
                        colors={['#00000066', '#FFFFFF00']} //66 is 40% in hex
                        start={[0, 0]}
                        style={{flex: 1,}}
                        >
                        {this.renderTopHalf()}
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FFFFFF00', '#00000066']} //66 is 40% in hex
                        style={{flex: 1,}}
                        >
                        {this.renderBottomHalf()}
                    </LinearGradient>
                </ImageCard>
            );
        }
    }
    render(){

        return(
            <TouchableWithoutFeedback onPress={() => {this.toggleExpanded()}}>
                <View style={{backgroundColor: primary_color}}>
                    {this.renderExpandedPreview()}
                </View>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = {
    titleStyle: {
        flex: 2,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
    },
    captionStyle:{
        flex: 1.5,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18,
        fontStyle: 'italic',
        marginLeft: 10,
    },
    descStyle:{
        flex: 3,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18,
    },
};

const mapStateToProps = (state, ownProps) => {
    const { fav_itinerary } = state.user; 
	const { loggedIn } = state.auth; 
    return { fav_itinerary, loggedIn };
};

export default connect(mapStateToProps, { userUpdateFavorites, favUpdate, userProfileSave, userProfileUpdate })(ItineraryPreview);
