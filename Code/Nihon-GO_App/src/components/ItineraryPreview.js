import React, { Component } from 'react';
import {Text,
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
import { userUpdateFavorites } from '../actions';
import { connect } from 'react-redux';

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
	      const { image, description, title, location, duration, favorites } = data;
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
                    <CountingIcon
                        iconName='heart'
                        iconType='font-awesome'
                        count={favorites}
                        onPress={this.props.userUpdateFavorites(id)}
                        iconColor='white'/>
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

// TODO
const mapStateToProps = (state, ownProps) => {
    const test = 0

    return { test };
};

export default connect(mapStateToProps, { userUpdateFavorites })(ItineraryPreview);
