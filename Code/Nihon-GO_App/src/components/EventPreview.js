import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { Card, TimeLine, ImageCard, Button } from './common/index';
import { Avatar, Icon } from 'react-native-elements';
import { BlurView } from 'expo';
import { connect } from 'react-redux';
import { startedItnUpdate } from '../actions';

class EventPreview extends Component {
    constructor(props){
        super(props);
        this.state = {
            expandedEvent: false,
            completedEvent: false
        };
    }
    
    toggleCompleted(){
        if(this.props.index + 1 == this.props.progress){
            this.props.startedItnUpdate({ prop: 'progress', value: (this.props.progress - 1) });
        }
        else if(this.props.index == this.props.progress){
            this.props.startedItnUpdate({ prop: 'progress', value: (this.props.progress + 1) });
        }
    }

    toggleExpand(){
        this.setState(previousState => {
            return { expandedEvent: !previousState.expandedEvent };
          });
    }

    renderButton(){
        if (this.props.started == this.props.selectedItineraryId && (this.props.index + 1 == this.props.progress || this.props.index == this.props.progress)){
            if (this.props.index + 1 <= this.props.progress)
            {
                return(
                    <Button 
                        fontColor='white'
                        onPress={()=>{this.toggleCompleted()}}
                        style={{
                            justifyContent: 'center',
                            alignItems:'center',
                            backgroundColor: '#007aff'}}>
                        Not Done
                    </Button>
                );
            }
            else{
                return(
                    <Button 
                        onPress={()=>{this.toggleCompleted()}}
                        style={{
                            justifyContent: 'center',
                            alignItems:'center'}}>
                        Done
                    </Button>
                );
            }
        }
        else{
            <View/>
        }
    }

    renderModal(){
        const { id, title, address, description, image, duration } = this.props.event;
        const { avatarStyle, titleStyle, descriptionStyle, modalStyle } = styles;

        return (
            <Modal
                animationType="slide"
                visible={this.state.expandedEvent}
                transparent
                onRequestClose={() => {this.toggleExpand()}}>
                <BlurView intensity={100} style={{flex: 1}}>
                    <Card style={modalStyle}>
                        <ImageCard source={{uri: image}} 
                            style={{borderBottomWidth: 0, 
                                    alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => {this.toggleExpand()}}>
                                <View style={{marginRight: 10, marginTop: 10}}>    
                                    <Icon
                                        name='x'
                                        type='feather'
                                        color='white'
                                        size={35}
                                        />
                                </View>
                            </TouchableOpacity>
                        </ImageCard>
                        <View style={{flex: 2}}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <View style={{flex: 3, justifyContent: "space-around"}}>
                                    <Text numberOfLines={1} style={titleStyle}>{title}</Text>
                                    <Text style={descriptionStyle}>{address}</Text>
                                </View>
                                <View  style={{marginTop: 10, marginRight: 10, 
                                        marginTop: 15, marginBottom: 15, flex: 1, 
                                        justifyContent: 'center',
                                        alignItems:'center'}}>
                                    {this.renderButton()}
                                </View>
                            </View>
                            <View style={{flex: 4}}>
                                <ScrollView>
                                    <Text style={descriptionStyle}>{description}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    </Card>
                </BlurView>
            </Modal>
        );
    }

    renderCard(){
        const { id, title, address, description, image, duration } = this.props.event;
        const { avatarStyle, titleStyle, descriptionStyle, cardNotStarted } = styles;

        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => {this.toggleExpand()}}>
                    <Card style={cardNotStarted}>
                        <View style={avatarStyle}>
                            <Avatar
                                large
                                rounded
                                source={{uri: image}}
                                activeOpacity={0.7}
                                />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', flex: 3}}>
                                <Text numberOfLines={1} style={titleStyle}>{title}</Text>
                                <Text numberOfLines={1} style={descriptionStyle}>
                                    {address}
                                </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'space-around'}}>
                                <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} days</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

    renderTimeLine(){
        if(this.props.index + 1 <= this.props.progress)
        {
            return(
                <TimeLine 
                    style={{marginLeft: 10}} 
                    checked onPress={() => {this.toggleCompleted()}}>
                    {this.renderCard()}
                </TimeLine>
            );
        }
        else{
            return(
                <TimeLine 
                    style={{marginLeft: 10}} 
                    onPress={() => {this.toggleCompleted()}}>
                    {this.renderCard()}
                </TimeLine>
            );
        }
    }

    renderEditing(){
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=> this.onEditPress()}>
                        <Icon
                            name='edit'
                            size={35}
                            />
                    </TouchableOpacity>
                </View>
                {this.renderCard()}
            </View>
        );
    }

    onEditPress(){
        //Need to complete
    }

    decideMode(){
        if (this.props.mode==='edit'){
            return(
                <View>
                    {this.renderEditing()}
                </View>
            );
        }
        else if (this.props.started == this.props.selectedItineraryId){
            return(
                <View>
                    {this.renderTimeLine()}
                </View>
            );
        }
        else {
            return(
                <View>
                    {this.renderCard()}
                </View>
            );
        }
    }

    render(){
        return(
            <View>
                {this.renderModal()}
                {this.decideMode()}
            </View>
        );
    }
}

const styles = {
    avatarStyle: {
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
    },
    titleStyle: {
        flex: 2,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 5,
        maxHeight: 29,
    },
    descriptionStyle:{
        flex: 3,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 16,
        fontStyle: 'italic',
        marginLeft: 10,
    },
    modalStyle: {
        flex: 1,
        marginTop: 25, 
        marginBottom: 25, 
        marginLeft: 20, 
        marginRight: 20,
        backgroundColor: 'white',
    },
    cardNotStarted: {
        marginTop: 5, 
        marginBottom: 5,
        marginRight: 15, 
        marginLeft: 15,
        flexDirection: 'row', 
        flex: 1,
        backgroundColor: 'white'
    },
};

const mapStateToProps = state => {
    const start_itn = state.StartItn;
    const { events, progress, started, isStarted } = start_itn;
    const selectedItineraryId = state.selectedItineraryId;
    return { events, progress, started, isStarted, selectedItineraryId };
};

export default connect(mapStateToProps, { startedItnUpdate })(EventPreview);