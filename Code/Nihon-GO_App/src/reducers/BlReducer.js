import {BLOG_FETCH} from '../actions/types';
const INITIAL_STATE = {
    isLoaded: false,
    Culture: [],
    Currency: [],
    Travel: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BLOG_FETCH:
            return {...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
//import data from './category_data.json';

//export default () => data;
