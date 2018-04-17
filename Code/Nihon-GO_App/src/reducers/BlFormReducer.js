import {
    BLOG_UPDATE, BLOG_SUB_RESET
} from '../actions/types';

const INITIAL_STATE = {
    category: '',
    title:'',
    description: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case BLOG_UPDATE:
            return {...state, [action.payload.prop]: action.payload.value };
        case BLOG_SUB_RESET:
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
};