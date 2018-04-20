import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    BLOG_UPDATE, BLOG_SUB_RESET, BLOG_FETCH
} from './types';

export const blogUpdate = ({prop, value}) => {
    return{
        type: BLOG_UPDATE,
        payload: {prop,value}
    };
};

export const subCategoryCreate = ({category, subcategories}) => {
    const ref = firebase.database().ref(`/blogs/${category}/subcategories`);
    return(dispatch)  =>{
        for (var i in subcategories)
        {
            ref.push({
                title: subcategories[i].title,
                description: subcategories[i].description,
            });
        }
        dispatch({type: BLOG_SUB_RESET});
    };
}

export const blogCreate = ({category, title, description}) => {
    return()  =>{
        firebase.database().ref(`/blogs/${category}`)
            .push({title, description});
    };   
};

export const blogLoaded = () => {
    return { type: BLOG_FETCH, payload: {prop: 'isLoaded' , value: true }}; 
}

export const blogFetch = (category) => {
    var blogs = [];
    const ref = firebase.database().ref(`/blogs/${category}`);
    return (dispatch) => {
        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var data_val = childSnapshot.val();
                    blogs.push({id: key, data: data_val});
            });
            dispatch({ type: BLOG_FETCH, payload: {prop: category, value: blogs } });
        });
    }

    /*
	var blogs = [];
    var ref = firebase.database().ref('/blogs')
    if (cat== 'ALL'){
        return (dispatch) => {
            ref.orderByChild("favorites").once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var data_val = childSnapshot.val();
                        blogs.push({id: key, data: data_val})
                });
                dispatch({ type: BLOG_FETCH, payload: blogs.reverse() });
            });
        };
    }
    else {
        return (dispatch) => {
            ref.orderByChild("favorites").once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var data_val = childSnapshot.val();
                        if( data_val.category== cat)
                            blogs.push({id: key, data: data_val})
                });
                dispatch({ type: BLOG_FETCH, payload: blogs.reverse() });
            });
        };
    }
    */
};

export const selectCategory = (category) => {
    Actions.BlogExpand();
    return {
        type: 'select_category',
        payload: category
    };
};