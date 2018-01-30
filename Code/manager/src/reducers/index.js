import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import LibraryReducer from './LibraryReducer'; //tech-stack
import SelectionReducer from './SelectionReducer'; //tech-stack

export default combineReducers({
	auth: AuthReducer,
	libraries: LibraryReducer, //tech-stack
	selectedLibraryId: SelectionReducer //tech-stack
});