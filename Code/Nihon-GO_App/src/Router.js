import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { Scene, Router, Actions, Drawer, Lightbox } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import BlogList from './components/BlogList';
import ItineraryList from './components/ItineraryList';
import ItineraryView from './components/ItineraryView';
import ItineraryCreate from './components/ItineraryCreate';
import DrawerPanel from './components/DrawerPanel';
import BlogForm from './components/BlogForm';
import BlogExpand from './components/BlogExpand';
import MapModal from './components/MapModal';
import { Icon } from 'react-native-elements';
import { primary_color, primary_text_color }  from './components/common/AppPalette'

//Needs to be consolidated with other features
const RouterComponent = () => {
	return (
		<Router>	
			<Lightbox>
				<Scene key="root" hideNavBar>
						<Scene key="main" 
                        drawer 
                        drawerIcon={() => <Icon name='menu' color={primary_text_color}/>} 
                        contentComponent={DrawerPanel} 
                        navigationBarStyle={styles.navBar}
                        titleStyle={styles.navBarTitle}
                        tintColor={primary_text_color}>
							<Scene 
								key="homepage" 
								component={HomePage} 
								title="Home" 
								initial />
							<Scene 
								key="login" 
								back 
								component={LoginForm} 
								title="Please Login" />
							<Scene 
								onRight={() => Actions.editProfile()}
								rightTitle="Edit"
								key="userProfile" 
								component={UserProfile} 
								title="User Profile" />
							<Scene 
								key="editProfile" 
								back 
								onBack={()=> Actions.userProfile()} 
								component={EditProfile} 
								title="Edit Profile" />
							<Scene 
								rightTitle="Add Blog"
								onRight={()=> Actions.BlogForm()}
								title="Blog"
								component={BlogList}
								key="blog" />
							<Scene 
								key="BlogForm" 
								back 
								onBack={()=> Actions.blog()}
								component = {BlogForm}
								title="Create Blog" />
							<Scene
								key="BlogExpand"
								back 
								onBack={()=> Actions.blog()}
								component = {BlogExpand}
								title="[Blog Name]" />
							<Scene 
								key="itineraryList" 
								component={ItineraryList} 
								title="Itineraries"/>
							<Scene 
								key="itineraryCreate" 
								back 
								component={ItineraryCreate} 
								title="Create Itinerary" />
							<Scene 
								key="itineraryView"
								back
								onBack={()=> Actions.itineraryList()}
								component={ItineraryView} 
								title="Itinerary - Events" />
						</Scene>
				</Scene>
				<Scene key="mapModal" component={MapModal} />
			</Lightbox>
		</Router>
	);
};


const styles = StyleSheet.create({
    navBar:{
        paddingTop: 20,
        height: 75,
        backgroundColor: primary_color,
    },
    navBarTitle:{
        color: primary_text_color
    },
});

export default RouterComponent;
