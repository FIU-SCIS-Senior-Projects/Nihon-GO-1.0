import React, { Component } from 'react';
import {Text,
        View, 
        TouchableWithoutFeedback,
        TouchableOpacity, 
        UIManager, 
        LayoutAnimation } from 'react-native';
import { ImageCard, CaptionBox, CountingIcon } from './common/index';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

class ItineraryPreview extends Component {
    constructor(props){
        super(props);
        this.state = {
            expandedItinerary: false
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
                            {location}
                        </Text>
                        <Text numberOfLines={1}
                            style={captionStyle}
                        >
                            {description}
                        </Text>
                    </CaptionBox>
                </View>
                <View style={{flex: 1, marginTop: 10,}}>
                    <TouchableOpacity 
                        onPress={() => this.props.selectItinerary(id)}
                        style={{flex: 1}}>
                        <Icon
                            name='angle-right'
                            type='font-awesome'
                            color='white'
                            size={30}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    //This method renders the comment, share, and favorites buttons when preview is expanded.
    renderBottomHalf(){
        const { itinerary, expanded } = this.props;
        const { id, data } = itinerary;
		const { image, description, title, location, duration } = data;
        const {titleStyle, captionStyle, linearGradient } = styles;

		console.log("id");
		console.log(id);
		
        return(
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={{marginBottom: 10, marginLeft: 10, flexDirection: 'row'}}>
                    <CountingIcon 
                        iconName='comment' 
                        iconType='font-awesome' 
                        count='30'
                        iconColor='white'/>
                    <CountingIcon 
                        iconName='share-alt' 
                        iconType='font-awesome' 
                        count='25'
                        iconColor='white'/>
                    <CountingIcon 
						onPress={this.props.userUpdateFavorites(id)}
                        iconName='heart' 
                        iconType='font-awesome' 
                        count='1000'
                        iconColor='white'/>
                </View>
            </View>
        );

    }
	
    renderExpandedPreview(){
        const { itinerary, expanded } = this.props;
        const { id, data } = itinerary;
		const { image, description, title, location, duration } = data;
        const {titleStyle, captionStyle, linearGradient } = styles;

        if (!this.state.expandedItinerary){
            return (
                <ImageCard  source={{uri: image}} style={{height: 100}}>
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
                <View>
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
        flex: 3,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18,
        fontStyle: 'italic',
        marginLeft: 10,
    },
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedItineraryId === ownProps.itinerary.id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(ItineraryPreview);