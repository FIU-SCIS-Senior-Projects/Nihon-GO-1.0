import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    BLOG_UPDATE
} from './types';

export const blogUpdate = ({prop, value}) => {
    return{
        type: BLOG_UPDATE,
        payload: {prop,value}
    };
};

export const blogForm = ({titleInput, location, description, image, duration}) => {
    return()  =>{
        firebase.database().ref('/blogs')
        .push({titleInput,location,description,image, duration})
        .then(() => Actions.pop())
    };
};

export const selectBlog = (blogId) => {
    console.log("...");
    return {
        type: 'select_blog',
        payload: blogId
    };
}
export const selectCategory = (category) => {
    Actions.BlogExpand();
    return {
        type: 'select_category',
        payload: category
    };
};
