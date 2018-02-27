import React from 'react';
import { Scene, Router, Actions, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import LibraryList from './components/LibraryList';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import BlogList from './components/BlogList';
import ItineraryList from './components/ItineraryList';
import EventList from './components/EventList';
import ItineraryCreate from './components/ItineraryCreate';
import DrawerPanel from './components/DrawerPanel';

//Needs to be consolidated with other features
const RouterComponent = () => {
	return (
		<Router>	
			<Scene key="root" hideNavBar>
					<Scene key="main" drawer contentComponent={DrawerPanel} navigationBarStyle={headerStyle}>
						<Scene 
							key="homepage" 
							component={HomePage} 
							title="Homepage" 
							initial />
						<Scene key="login" back component={LoginForm} title="Please Login" />
						<Scene key="itinerary" component={LibraryList} title="Itinerary" />
						<Scene 
							onRight={() => Actions.editProfile()}
							rightTitle="Edit"
							key="userProfile" 
							component={UserProfile} 
							title="User Profile" />
						<Scene key="editProfile" component={EditProfile} title="Edit Profile" />
						<Scene key="blog" component={BlogList} title="Blog" />
						<Scene 
							rightTitle="Add"
							onRight={()=> Actions.itineraryCreate()}
							key="itineraryList" 
							component={ItineraryList} 
							title="Itineraries"
						/>
						<Scene key="itineraryCreate" component={ItineraryCreate} title="Create Itinerary" />
						<Scene key="eventList" component={EventList} title="Events" />
					</Scene>
			</Scene>
		</Router>
	);
};


//Quick fix to status bar issue
const headerStyle = {
  paddingTop: 20,
  height: 75,
};

export default RouterComponent;