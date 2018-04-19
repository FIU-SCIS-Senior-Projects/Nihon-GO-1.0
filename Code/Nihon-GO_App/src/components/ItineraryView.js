import React, { Component } from 'react';
import {
        Alert,
        Dimensions,
        Animated,
        View,
        Text,
        Image,
        TouchableWithoutFeedback,
        TouchableOpacity,
        ScrollView } from 'react-native';
import { startedItnUpdate, startedItnReset, startedItnSave, itineraryReset } from '../actions';
import { connect } from 'react-redux';
import { Card, Background, Spinner } from './common';
import { Icon, Button } from 'react-native-elements';
import EventList from './EventList';
import { primary_color, disabled_color}  from './common/AppPalette';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get("window");

class ItineraryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedDesc: false,
            isDone: false,
            offsetY: new Animated.Value(0),
            offsetX: new Animated.Value(width+100),
        };
    }

    componentDidMount(){
        if(this.props.itinerary.id == this.props.started)
            this.animateCancel();
    }
    componentWillUnmount() {
        if(this.props.itinerary.id == this.props.started || this.state.isDone){
            //save itinerary state to user in database
            const events_Done = this.props.events;
            const progress = this.props.progress;
            const started = this.props.started;
            const startedTitle = this.props.startedTitle;
            this.props.startedItnSave({ events: events_Done, progress: progress, started: started, title: startedTitle });
        }
        if(this.props.isViewing){
          this.props.startedItnUpdate({ prop: 'isViewing', value: false });
          this.props.itineraryReset();
        }
    }

    cancel(){
        //confirmation
        this.props.startedItnReset();//clear state
        Animated.timing(                  // reset cancelbtn
            this.state.offsetX,
            { toValue: width+100 }
        ).start();

        Animated.timing(                  // reset startbtn
            this.state.offsetY,
            { toValue: 0 }
        ).start(onComplete = () => {
            const events_Done = this.props.events;
            const progress = this.props.progress;
            const started = this.props.started;
            const startedTitle = this.props.startedTitle;
            this.props.startedItnSave({ events: events_Done, progress: progress, started: started, title: startedTitle });
        });
    }

    done(){
        this.props.startedItnReset();//clear state
        this.state.isDone = true;
        Actions.pop();
    }

    animateCancel(){
        Animated.timing(                  // Animate over time
            this.state.offsetX,
            { toValue: 0 }
        ).start();
        Animated.sequence([
            Animated.timing(                  // Animate over time
                this.state.offsetY,
                { toValue: -30 }
            ),
            Animated.timing(                  // Animate over time
                this.state.offsetY,
                { toValue: 100 }
            ),
        ]).start();
    }

    startItinerary(){
        const { id, data } = this.props.itinerary;
        const { events, title } = data;
        const numEvents = Object.keys(events).length;
        const val = true;
        //Animate start button
        Animated.sequence([
            Animated.timing(                  // Animate over time
                this.state.offsetY,
                { toValue: -30 }
            ),
            Animated.timing(                  // Animate over time
                this.state.offsetY,
                { toValue: 100 }
            ),
        ]).start(onComplete = () => {
            //Start itinerary
            this.props.startedItnUpdate({ prop: 'isStarted', value: val });
            this.props.startedItnUpdate({ prop: 'started', value: id });
            this.props.startedItnUpdate({ prop: 'events', value: numEvents });
            this.props.startedItnUpdate({ prop: 'title', value: title });
            this.animateCancel();
        }); // start the sequence group
    }

    renderDescription(){
        const { titleStyle, descriptionStyle } = styles;
        const { id, data } = this.props.itinerary;
	      const { title, location, description, image, duration } = data;
        if(this.state.expandedDesc){
            return (
                <Card style={{height: 200, flexDirection: 'row', marginTop: 5, backgroundColor: 'white',}}>
                    <View style={{flex: 5, justifyContent:'flex-start'}}>
                        <Text style={titleStyle}>{location}</Text>
                        <ScrollView>
                            <Text style={descriptionStyle}>{description}</Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                        <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} Hours</Text>
                        <TouchableOpacity onPress={() => {this.toggleExpand()}}>
                            <View style={{marginBottom: 15}}>
                                <Icon
                                name='angle-up'
                                type='font-awesome'
                                color='black'
                                size={35}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            );
        }
        else{
            return (
                <Card style={{height: 80, flexDirection: 'row', marginTop: 5, backgroundColor: 'white',}}>
                    <View style={{flex: 5}}>
                        <Text numberOfLines={1} style={titleStyle}>{location}</Text>
                        <Text numberOfLines={2} style={descriptionStyle}>
                            {description}
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                        <Text style={[descriptionStyle, {marginTop: 10}]}>{duration} Hours</Text>
                        <TouchableOpacity onPress={() => {this.toggleExpand()}}>
                            <View style={{marginBottom: 10}}>
                                <Icon
                                name='angle-down'
                                type='font-awesome'
                                color='black'
                                size={35}
                                />
                            </View>
                            </TouchableOpacity>
                    </View>
                </Card>
            );
        }
    }

    toggleExpand(){
        this.setState(previousState => {
            return { expandedDesc: !previousState.expandedDesc };
          });
    }

	rendrEvents(){
		    const { id, data } = this.props.itinerary;
        const events_Done = this.props.events;
        const progress = this.props.progress;
        const started = this.props.started;
        const loggedIn = this.props.loggedIn;
        const isStarted = this.props.started == this.props.itinerary.id;
		if(data.events)
			return(
                <EventList
                    selectedItineraryId={id}
                    events={data.events}
                    events_Done={events_Done}
                    progress={progress}
                    started={started}
                    loggedIn={loggedIn}
                    isStarted={isStarted}
                    />
            );
		else
			return(<View/>);
	}

	renderStartBtn(){
        const events_Done = this.props.events;
        const progress = this.props.progress;

        if(this.props.loggedIn){
             //check if there isn't a started itinerary
            if(!this.props.isStarted){
                return(
                    <Animated.View style={{
                        transform: [{translateY: this.state.offsetY}],
                        paddingBottom: 15,
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: 0,
                    }}>
                        <Button
                            raised
                            large
                            borderRadius={2}
                            icon={{name: 'card-travel'}}
                            title="START THIS ITINERARY!"
                            onPress={() => {this.startItinerary()}}
                            buttonStyle={{paddingBottom: 15, backgroundColor: primary_color,}}
                        />
                    </Animated.View>
                );
            }
            //check if this is the started itinerary
            else if(this.props.itinerary.id == this.props.started){
                if(events_Done != progress)
                    return(
                        <Animated.View style={{
                            transform: [{translateX: this.state.offsetX}],
                            paddingBottom: 15,
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            bottom: 0,
                        }}>
                            <Button
                                raised
                                small
                                borderRadius={2}
                                title="Cancel"
                                onPress={() => {this.cancel()}}
                                buttonStyle={{paddingBottom: 15, backgroundColor: 'red',}}
                            />
                        </Animated.View>
                    );
                else{
                    return(
                        <View style={{
                            paddingBottom: 15,
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            bottom: 0,
                        }}>
                            <Button
                                raised
                                large
                                borderRadius={2}
                                title="Done!"
                                onPress={() => {this.done()}}
                                buttonStyle={{paddingBottom: 15, backgroundColor: 'green',}}
                            />
                        </View>
                    );
                }
            }
            //not the started itinerary
            else{
                return(
                    <View style={{
                        paddingBottom: 15,
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: 0,
                    }}>
                        <Button
                            raised
                            large
                            borderRadius={2}
                            icon={{name: 'card-travel'}}
                            title="START THIS ITINERARY!"
                            onPress={() => {
                              Alert.alert(
                                'Notice',
                                'Finish current itinerary first!',
                                [
                                  {text: 'Ok', onPress: () => console.log("cancel")},
                                ]
                              );}
                            }
                            buttonStyle={{paddingBottom: 15, backgroundColor: disabled_color}}
                        />
                    </View>
                );
            }
        }
        else{
            return(
                <View style={{
                        paddingBottom: 15,
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: 0,
                    }}>
                        <Button
                            raised
                            large
                            borderRadius={2}
                            icon={{name: 'card-travel'}}
                            title="START THIS ITINERARY!"
                            onPress={() => {
                              Alert.alert(
                                'Notice',
                                'Need to be logged in to do this!',
                                [
                                  {text: 'Sign In Now', onPress: () => Actions.login()},
                                ]
                              );}
                            }
                            buttonStyle={{paddingBottom: 15, backgroundColor: disabled_color}}
                        />
                    </View>
            );
        }
    }
    render(){
        const { id, data } = this.props.itinerary;
        const { title, location, description, image, duration } = data;

		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<View style={{flex: 1}}>
						<Image source={{uri: image}} style={{flex:1}} />
					</View>
					<View style={{flex: 2}}>
						<Background>
							{this.renderDescription()}
							<View style={{flex:1}}>
								{this.rendrEvents()}
							</View>
							{this.renderStartBtn()}
						</Background>
					</View>
				</View>
			</View>
		);
    }
}

const styles = {
    titleStyle: {
        flex: 2,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 22,
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
};

const mapStateToProps = state => {
    const { loggedIn } = state.auth;
    const start_itn = state.StartItn;
    const { events, progress, started, isStarted, title, isViewing } = start_itn;
    const startedTitle = title;
    return { events, progress, started, isStarted, isViewing, loggedIn, startedTitle };
};

export default connect(mapStateToProps, { startedItnUpdate, startedItnReset, startedItnSave, itineraryReset })(ItineraryView);
