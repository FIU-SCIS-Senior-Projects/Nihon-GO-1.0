import React, { Component } from 'react';
import { Card, CardSection, ImageCard, Input} from './common';
import {connect} from 'react-redux';
import { itineraryUpdate, itineraryCreate } from '../actions';
import {Text, View, Modal, TouchableOpacity, ListView, Picker, Image, Dimensions, ScrollView, Alert} from 'react-native';
import {BlurView, ImagePicker, ImageManipulator} from 'expo';
import { Icon, Button, Avatar } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import EventPreview from './EventPreview';
import ItineraryView from './ItineraryView';
import { UploadPicture } from './UploadPicture';
import ImageResizer from 'react-native-image-resizer';

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
                image: null,
                duration: '',
            },
            itineraryImage: null,
            previewImage: false,
            maxImageDim: 500,   //Size of largest side of an image.
        };
    }
    
    componentWillUnmount(){
        this.setState({previewImage: false});
    }
    
    componentWillMount(){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(this.state.events);
    }

    componentWillUn

    onSubmitPress(){
        const { titleInput, location, description, image, duration, events } = this.props;
        const { itineraryImage } = this.state;
        if (!(titleInput && location && description && itineraryImage && duration)){
            var error = '';
            if(!titleInput)
                error += 'title, ';
            if(!location)
                error += 'location, ';
            if(!description)
                error += 'description, ';
            if(!itineraryImage)
                error += 'image, ';
            if(!duration)
                error += 'events, ';

            Alert.alert(
                'Enter all fields!' ,
                'Missing ' + error.replace(/,\s*$/, "") + '!',
                [
                    {text: 'OK'}
                ],
            )
        }
        else{
            this.props.itineraryCreate({ titleInput, location, description, itineraryImage, duration, events });
        }
    }
    
    pickImage(type){
        if (type==='itinerary')
            this.pickItineraryImage();
        if (type==='event')
            this.pickEventImage();
    }

    pickItineraryImage = async () =>{
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
            aspect: [16, 9],
        });

        const { height, width, cancelled } = pickerResult;
        const {maxImageDim} = this.state;
        
        if (!pickerResult.cancelled){
            
            //Resizes Image
            if(height > maxImageDim || width > maxImageDim){
                var dimension = {};
                (height > width ) ? dimension = {height: maxImageDim} : dimension = {width: maxImageDim};
                const manipResult = await ImageManipulator.manipulate(
                    pickerResult.uri, [{ resize: dimension }]
                );

                pickerResult.uri = manipResult
            }

            this.setState({itineraryImage: pickerResult.uri});
        }
    };

    pickEventImage = async () =>{ 
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
            aspect: [16, 9],
            quality: .3,
        });

        const {maxImageDim} = this.state;
        const { height, width, cancelled } = pickerResult;

        if (!cancelled){

            if(height > maxImageDim || width > maxImageDim){
                var dimension = {};
                (height > width ) ? dimension = {height: maxImageDim} : dimension = {width: maxImageDim};

                const manipResult = await ImageManipulator.manipulate(
                pickerResult.uri, [{ resize: dimension }]
                );

                pickerResult.uri = manipResult;
            }           

            this.setState({
                event: {
                    title: this.state.event.title,
                    address: this.state.event.address,
                    description: this.state.event.description,
                    image: pickerResult.uri,
                    duration: this.state.event.duration,
                },

            })
        }
    };

    decideRenderPreviewImage(type){
        if(type==='itinerary' && this.state.itineraryImage)
            this.renderPreviewImage(this.state.itineraryImage.uri)
        if(type==='event' && this.state.event.image)
            this.renderPreviewImage(this.state.event.image.uri)
    }

    previewImage(type){
        const { itineraryImage } = this.state;
        const { event } = this.state;
        var uri = null;

        if (itineraryImage || event.image){

            if(type==='itinerary' && itineraryImage){
                uri = itineraryImage.uri;
            }
            if (type==='event' && event.image){
                uri = event.image.uri;
            }
            
            if(uri){
                return(
                    <View style={{paddingLeft: 20, flex: 1}}>
                            <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 5, alignItems: 'center'}}> 
                                <Avatar
                                    large
                                    avatarStyle={{borderWidth: 2, borderRadius: 2, borderColor: '#ddd',}}
                                    source={{uri: uri}}
                                    onPress={() => {this.togglePreviewImage();}}
                                    activeOpacity={0.7}
                                />
                            </View>
                            {this.decideRenderPreviewImage(type)}
                    </View>
                );
            }  
        }
        else{
            return(
                <View style={{paddingLeft: 20, flex: 1}}>
                        <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 5, alignItems: 'center'}}> 
                            <Avatar
                                large
                                avatarStyle={{borderWidth: 2, borderRadius: 2, borderColor: '#ddd',}}
                                icon={{name: 'question-circle-o', type: 'font-awesome'}}
                                onPress={() => {this.pickImage(type)}}
                                activeOpacity={0.7}
                            />
                        </View>
                </View>
            );
        }
    }

    renderPreviewImage(imageSelected){       
       if(imageSelected){
            return (
                <Modal
                    animationType="slide"
                    visible={this.state.previewImage}
                    transparent
                    onRequestClose={() => {this.togglePreviewImage()}}>
                    <BlurView intensity={100} style={{flex: 1}}>
                        <Card style={[styles.modalStyle, {height: (Dimensions.get('window').width) / 1.618, borderWidth: 2}]}>
                            <ImageCard source={{ uri: imageSelected }} style={{borderBottomWidth: 0}}>
                                <View style={{alignItems: 'flex-end', flex: 1}}>
                                    <TouchableOpacity onPress={() => {this.togglePreviewImage()}}>
                                        <View style={{marginRight: 10, marginTop: 10}}>    
                                            <Icon
                                                name='x'
                                                type='feather'
                                                color='white'
                                                size={35}
                                                />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ImageCard>
                        </Card>
                    </BlurView>
                </Modal>
            );
        }
    }

    togglePreviewImage(){
        this.setState(previousState => {
            return { previewImage: !previousState.previewImage };
          });
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
                <ActionButton.Item buttonColor='#3498db' title="Submit Itinerary" onPress={() => this.onSubmitPress()}>
                    <Icon name='file-upload' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Add Event" onPress={() => this.toggleEventForm()}>
                    <Icon name='add' />
                </ActionButton.Item>
		    </ActionButton>
        );
    }

    allEventFields(){
        const {event} = this.state
        if (event.title && event.address && event.description && event.image && event.duration){
            return true;
        }
        
        return false;
    }

    addEvent(){
        const { event } = this.state;
        if (!(event.title && event.address && event.description && event.image && event.duration)){
            console.log("all fields required");
            console.log("event image : " + event.image)
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

            });

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
                    image: null,
                    duration: '',
                }
            })

            this.updateTotalDuration();
        }
    }

    updateTotalDuration(){
        var eventList = this.state.events;
        var sum = 0;

        for (i = 0; i<eventList.length; i++){
            sum = sum + parseInt(eventList[i].duration);
        }
        var value = sum
        
        {this.props.itineraryUpdate({prop: 'duration', value})}
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
                                label="Duration"
                                placeholder="Enter a duration in hours"
                                keyboardType='numeric'
                                value={this.state.event.duration}
                                onChangeText={value => 
                                    this.setState({
                                        event: {
                                            title: this.state.event.title,
                                            address: this.state.event.address,
                                            description: this.state.event.description,
                                            image: this.state.event.image,
                                            duration: value.replace(/[^0-9]/g,''),
                                        }
                                    })
                                }
                            />
                        </CardSection>
                        <CardSection>
                            <View style={[styles.imageStyle, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                                {this.previewImage('event')}
                                <View style={{flex: 2, marginBottom: 10}}>
                                    <Button
                                        onPress={() => this.pickEventImage()}
                                        icon={{name: 'image'}}
                                        backgroundColor='#03A9F4'
                                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                        title='CHOOSE IMAGE' 
                                    />
                                </View>
                            </View>
                        </CardSection>
                        <CardSection>
                            <View style={{flex: 1}}>
                                <Button 
                                    onPress={()=> this.addEvent()}
                                    icon={{name: 'add'}}
                                    title='ADD EVENT'
                                    disabled={!this.allEventFields()}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                />
                            </View>
                        </CardSection>
                    </Card>
                </BlurView>
            </Modal>
        );
    }

    renderEventList(){
        return (
            <View style={{flex:1}}>
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderEventRow}
                        enableEmptySections
                    />
            </View>
        );
    }

    renderEventRow(event){
        var image = event.image;
        var e = {
            title: event.title,
            location: event.location,
            description: event.description,
            duration: event.duration,
            image: image.uri
        }
        return(
            <EventPreview event={e}/>
        );
    }

    addItineraryForm(){
        return(
            <View style={{flex: 1}}>
                <Card style={{elevation: 0}}>
                    <CardSection>
                        <Input
                            label="Title"
                            placeholder="Enter a title"
                            value={this.props.titleInput}
                            onChangeText={value => this.props.itineraryUpdate({prop: 'titleInput', value})}
                        />
                    </CardSection>

                    <CardSection>
                        <View style={styles.containerStyle}>
                            <Text style={styles.labelStyle}>Region</Text>
                            <Picker
                                selectedValue={this.props.location}
                                style={{ height: 40, flex: 2}}
                                onValueChange={(value, itemIndex) => this.props.itineraryUpdate({prop: 'location', value})}>
                                <Picker.Item label="Select A Region" value="" />
                                <Picker.Item label="Chubu" value="Chubu" />
                                <Picker.Item label="Chugoku" value="Chugoku" />
                                <Picker.Item label="Hokkaido" value="Hokkaido" />
                                <Picker.Item label="Kansai" value="Kansai" />
                                <Picker.Item label="Kanto" value="Kanto" />
                                <Picker.Item label="Kyushu" value="Kyushu" />
                                <Picker.Item label="Okinawa" value="Okinawa" />
                                <Picker.Item label="Shikoku" value="Shikoku" />
                                <Picker.Item label="Tohoku" value="Tohoku" />
                            </Picker>
                        </View>
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Description"
                            multiline
                            placeholder="Enter a description"
                            value={this.props.description}
                            onChangeText={value => this.props.itineraryUpdate({prop: 'description', value})}
                        />
                    </CardSection>

                    <CardSection>
                        <View style={styles.containerStyle}>
                            <Text style={styles.labelStyle}>Duration</Text>
                            <Text style={[styles.inputStyle,{flex: 1}]}>{this.props.duration}</Text>
                            <Text style={{fontSize: 18, flex: 1}}>hours</Text>
                        </View>
                    </CardSection>

                    <CardSection>
                        <View style={[styles.imageStyle, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                            {this.previewImage('itinerary')}
                            <View style={{flex: 2, marginBottom: 10}}>
                                <Button
                                    onPress={() => this.pickItineraryImage()}
                                    icon={{name: 'image'}}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='CHOOSE IMAGE' 
                                />
                            </View>
                        </View>
                    </CardSection>
                </Card>
            </View>
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
    labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
    },
    inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    imageStyle: {
        flexDirection: 'column',
        flex: 1,
    }
}

const mapStateToProps = (state) =>{
    const { location, description, image, duration, titleInput, events } = state.itineraryForm;

    return { location, description, image, duration, titleInput, events }
}

export default connect(mapStateToProps, {
    itineraryUpdate, itineraryCreate
})(ItineraryCreate);