import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import LibraryReducer from './LibraryReducer'; //tech-stack
import SelectionReducer from './SelectionReducer';
import ItineraryReducer from './ItineraryReducer';
import ItineraryFormReducer from './ItineraryFormReducer';

export default combineReducers({
	auth: AuthReducer,
	libraries: LibraryReducer, //tech-stack
	selectedItineraryId: SelectionReducer,
	itineraries: ItineraryReducer,
	itineraryForm: ItineraryFormReducer
});