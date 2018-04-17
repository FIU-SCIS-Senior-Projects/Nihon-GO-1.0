import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'; //authentication
import LibraryReducer from './LibraryReducer'; //tech-stack
import SelectionReducer from './SelectionReducer'; //tech-stack
import UserReducer from './UserReducer'; //user profile
import ItSelectionReducer from './ItSelectionReducer'; //Itinerary
import ItineraryFormReducer from './ItineraryFormReducer';
import ItineraryReducer from './ItineraryReducer';
import BlFormReducer from './BlFormReducer';
import BlReducer from './BlReducer';
import BlSelectionReducer from './BlSelectionReducer';
import BlSubReducer from './BlSubReducer';
import BlCategoryReducer from './BlCategoryReducer';

export default combineReducers({
	auth: AuthReducer, //authentication
	libraries: LibraryReducer, //tech-stack
	selectedLibraryId: SelectionReducer, //tech-stack
	user: UserReducer, //user profile
	selectedItineraryId: ItSelectionReducer,
	itineraries: ItineraryReducer,
	itineraryForm: ItineraryFormReducer,
	blogCreate: BlFormReducer,
	subCategoryCreate: BlFormReducer,
	blogs: BlReducer,
	selectedBlogId: BlSelectionReducer,
	subblogs: BlSubReducer,
	selectedCategory: BlCategoryReducer
});
