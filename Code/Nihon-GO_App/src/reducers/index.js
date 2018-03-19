import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'; //authentication
import LibraryReducer from './LibraryReducer'; //tech-stack
import SelectionReducer from './SelectionReducer'; //tech-stack
import UserReducer from './UserReducer'; //user profile
import ItineraryFormReducer from './ItineraryFormReducer';
import ItineraryReducer from './ItineraryReducer';
import ItSelectionReducer from './ItSelectionReducer'; //Selecting an itineraty to View

export default combineReducers({
	auth: AuthReducer, //authentication
	libraries: LibraryReducer, //tech-stack
	selectedLibraryId: SelectionReducer, //tech-stack
	user: UserReducer, //user profile
	itineraries: ItineraryReducer,
	itineraryForm: ItineraryFormReducer,
	selectedItineraryId: ItSelectionReducer,
});