import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import LibraryList from './components/LibraryList';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import BlogList from './components/BlogList';

import ItineraryList from './components/ItineraryList';
import EventList from './components/EventList';
import ItineraryCreate from './components/ItineraryCreate';
import BlogForm from './components/BlogForm';
import BlogExpand from './components/BlogExpand';


const RouterComponent = () => {
	return (
		<Router>	
			<Scene key="root" hideNavBar>
				<Scene key="main">
					<Scene 
						key="homepage" 
						component={HomePage} 
						title="Homepage" 
						initial 
						onRight={() => Actions.itineraryList()}
						rightTitle="View Itineraries"/>
					<Scene key="login" component={LoginForm} title="Please Login" />
					<Scene key="itinerary" component={LibraryList} title="Itinerary" />
					<Scene 
						onRight={() => Actions.editProfile()}
						rightTitle="Edit"
						key="userProfile" 
						component={UserProfile} 
						title="User Profile" />
					<Scene key="editProfile" component={EditProfile} title="Edit Profile" />
					<Scene 
					 	rightTitle="Add Blog"
						onRight={()=> Actions.BlogForm()}
						title="Blog"
						component={BlogList}
						key="blog" 
					/>
					<Scene 
					key="BlogForm" 
					component = {BlogForm}
					title="Create Blog" 
					/>
					<Scene
					key="BlogExpand"
					component = {BlogExpand}
					title="[Blog Name]"
					/>
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

export default RouterComponent;