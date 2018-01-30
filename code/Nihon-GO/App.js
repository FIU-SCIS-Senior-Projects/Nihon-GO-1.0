import React from 'react';
import { StackNavigator } from 'react-navigation';
import AddEventScreen from './screens/AddEventScreen';
import ItineraryScreen from './screens/ItineraryScreen';

const RootNavigator = StackNavigator({
  Itinerary: {
    screen: ItineraryScreen,
    navigationOptions: {
      headerTitle: 'Itinerary',
    },
  },
  Events: {
    screen: AddEventScreen,
    navigationOptions: {
      headerTitle: 'Event',
    },
  },
});

export default RootNavigator;
