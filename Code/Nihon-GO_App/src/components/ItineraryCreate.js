import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';
import {connect} from 'react-redux';
import { itineraryUpdate, itineraryCreate } from '../actions';
import {Text, View, Modal, TouchableOpacity, ListView} from 'react-native';
import {BlurView} from 'expo';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import EventPreview from './EventPreview';
import ItineraryView from './ItineraryView';

class ItineraryCreate extends Component{

    constructor(props){
        super(props);
        this.state = {
            addingEvent: false,
            events: [],
            event: {
                title: '',
                address: '',
                description: '',
                image: '',
                duration: '',
            },
        };
    }
    
    componentWillMount(){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(this.state.events);
    }

    onSubmitPress(){
        const { titleInput, location, description, image, duration, events } = this.props;
        if (!titleInput && !location && !description && !image && !duration && !events){
            console.log("All fields required!");
        }
        else{
            this.props.itineraryCreate({ titleInput, location, description, image, duration, events });
        }
    }

    onPreviewPress(){
        console.log('Preview Requested...');
        console.log(this.props.events);
    }

    toggleEventForm(){
        this.setState(previousState => {
            return { addingEvent: !previousState.addingEvent };
          });
    }

    renderActionButton(){
        return(
            <ActionButton 
			fixNativeFeedbackRadius={true} 
			buttonColor='#4fc3f7' 
			size={70} 
			buttonTextStyle={{color: 'black'}}
			renderIcon={() => {return(<Icon name='add' />)}}
		    >
                <ActionButton.Item buttonColor='#9b59b6' title="Preview Itinerary" onPress={() => this.onPreviewPress()}>
                    <Icon name='card-travel' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Submit Itinerary" onPress={() => this.onSubmitPress()}>
                    <Icon name='file-upload' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Add Event" onPress={() => this.toggleEventForm()}>
                    <Icon name='add' />
                </ActionButton.Item>
		    </ActionButton>
        );
    }

    addEvent(){
        const { event } = this.state;
        if (!event.title && !event.address && !event.description && !event.image && !event.duration){
            console.log("all fields required")
        }
        else{
            this.setState({
                event: {
                    title: this.state.event.title,
                    address: this.state.event.address,
                    description: this.state.event.description,
                    image: this.state.event.image,
                    duration: this.state.event.duration,
                },

            })
            this.state.events.push(event);
            var value = this.state.events;
            
            {this.props.itineraryUpdate({prop: 'events', value})};

            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            });
            this.dataSource = ds.cloneWithRows(this.state.events);
            this.setState(
                this.state
            )

        this.setState({
            event: {
                title: '',
                address: '',
                description: '',
                image: '',
                duration: '',
            }
        })
        }
    }
    
    addEventForm(){
        return(
            <Modal
                animationType="slide"
                visible={this.state.addingEvent}
                transparent
                onRequestClose={() => {this.toggleEventForm()}}>
                <BlurView intensity={100} style={{flex: 1}}>
                    <Card style={styles.modalStyle}>
                        <CardSection>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', flex: 5, fontSize: 18, marginLeft: 10}}>Event</Text>
                                <View style={{justifyContent: 'flex-end', flex: 1}}>
                                    <TouchableOpacity onPress={() => {this.toggleEventForm()}}>
                                        <View style={{marginRight: 10, marginTop: 10}}>    
                                            <Icon
                                                name='x'
                                                type='feather'
                                                color='black'
                                                size={35}
                                                />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Title"
                                placeholder="Enter a title"
                                value={this.state.event.title}
                                onChangeText={value => 
                                    this.setState({
                                        event: {
                                            title: value,
                                            address: this.state.event.address,
                                            description: this.state.event.description,
                                            image: this.state.event.image,
                                            duration: this.state.event.duration,
                                        }
                                    })
                                }
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Address"
                                placeholder="Enter an address"
                                value={this.state.event.address}
                                onChangeText={value => 
                                    this.setState({
                                        event: {
                                            title: this.state.event.title,
                                            address: value,
                                            description: this.state.event.description,
                                            image: this.state.event.image,
                                            duration: this.state.event.duration,
                                        }
                                    })
                                }
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Description"
                                placeholder="Enter a description"
                                value={this.state.event.description}
                                onChangeText={value => 
                                    this.setState({
                                        event: {
                                            title: this.state.event.title,
                                            address: this.state.event.address,
                                            description: value,
                                            image: this.state.event.image,
                                            duration: this.state.event.duration,
                                        }
                                    })
                                }
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Image"
                                placeholder="Enter an image URL"
                                value={this.state.event.image}
                                onChangeText={value => 
                                    this.setState({
                                        event: {
                                            title: this.state.event.title,
                                            address: this.state.event.address,
                                            description: this.state.event.description,
                                            image: value,
                                            duration: this.state.event.duration,
                                        }
                                    })
                                }
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Duration"
                                placeholder="Enter a duration in days"
                                value={this.state.event.duration}
                                onChangeText={value => 
                                    this.setState({
                                        event: {
                                            title: this.state.event.title,
                                            address: this.state.event.address,
                                            description: this.state.event.description,
                                            image: this.state.event.image,
                                            duration: value,
                                        }
                                    })
                                }
                            />
                        </CardSection>
                        <CardSection>
                            <Button onPress={()=> this.addEvent()}>
                                        Add Event
                            </Button>
                        </CardSection>
                    </Card>
                </BlurView>
            </Modal>
        );
    }

    renderEventList(){
        return (
            <View style={{flex:1}}>
                <View>
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderEventRow}
                        enableEmptySections
                    />
                </View>
            </View>
        );
    }

    renderEventRow(event){
        return(
            <EventPreview event={event} mode={'edit'}/>
        );
    }

    addItineraryForm(){
        return(
            <Card style={{elevation: 0}}>
                <CardSection>
                    <Text style={{fontWeight: 'bold'}}>Itinerary</Text>
                </CardSection>
                <CardSection>
                    <Input
                        label="Title"
                        placeholder="Enter a title"
                        value={this.props.titleInput}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'titleInput', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Location"
                        placeholder="Enter a city"
                        value={this.props.location}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'location', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Description"
                        placeholder="Enter a description"
                        value={this.props.description}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'description', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Image"
                        placeholder="Enter an image url"
                        value={this.props.image}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'image', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Duration"
                        placeholder="Enter a duration in days"
                        value={this.props.duration}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'duration', value})}
                    />
                </CardSection>
            </Card>
        );
    }

    render(){
        return(
            <View style={{flex: 1}}>
                    <View style={{flex:1}}>
                        {this.addItineraryForm()}
                        {this.addEventForm()}
                        {this.renderEventList()}
                    </View>
                {this.renderActionButton()}
            </View>
        );
    }
}

const styles={
    modalStyle: {
        marginTop: 25, 
        marginBottom: 25, 
        marginLeft: 20, 
        marginRight: 20,
        backgroundColor: 'white',
    },
}

const mapStateToProps = (state) =>{
    const { location, description, image, duration, titleInput, events } = state.itineraryForm;

    return { location, description, image, duration, titleInput, events }
}

export default connect(mapStateToProps, {
    itineraryUpdate, itineraryCreate
})(ItineraryCreate);