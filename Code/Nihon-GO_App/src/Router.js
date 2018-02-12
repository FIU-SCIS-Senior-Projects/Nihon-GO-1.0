import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ItineraryList from './components/ItineraryList';
import { View } from 'react-native';
import { Header } from './components/common/index';
import EventList from './components/EventList';
import ItineraryCreate from './components/ItineraryCreate';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    return (
        <Router style={{textAlign: 'center'}}>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" initial component={LoginForm} title="Log In" />
                </Scene>
                <Scene key="itineraryNav">
                    <Scene 
                        rightTitle="Add"
                        onRight={()=> Actions.itineraryCreate()}
                        key="itineraryList" 
                        component={ItineraryList} 
                        title="Itineraries"
                        initial
                    />
                    <Scene key="itineraryCreate" component={ItineraryCreate} title="Create Itinerary" />
                    <Scene key="eventList" component={EventList} title="Events" />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;