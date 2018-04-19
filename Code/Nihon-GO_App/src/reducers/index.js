import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'; //authentication
import SelectionReducer from './SelectionReducer'; //tech-stack
import UserReducer from './UserReducer'; //user profile
import ItineraryFormReducer from './ItineraryFormReducer';
import ItineraryReducer from './ItineraryReducer';
import StartItnReducer from './StartItnReducer';
import BlFormReducer from './BlFormReducer';
import BlReducer from './BlReducer';
import BlCategoryReducer from './BlCategoryReducer';
import publishedItnReducer from './publishedItnReducer';

export default combineReducers({
	auth: AuthReducer, //authentication
	selectedLibraryId: SelectionReducer, //tech-stack
	user: UserReducer, //user profile
	itineraries: ItineraryReducer,
	itineraryForm: ItineraryFormReducer,
    StartItn: StartItnReducer,
	blogCreate: BlFormReducer,
	blogs: BlReducer,
	selectedCategory: BlCategoryReducer,
    publishedItn: publishedItnReducer,
});
