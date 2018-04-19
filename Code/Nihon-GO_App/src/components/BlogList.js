import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet, ListView} from 'react-native';
import {connect} from 'react-redux';
import BlogPreview from './BlogPreview';
import { BlogButton, BlogButtonPlus } from './common';
import {blogFetch, blogLoaded} from '../actions'
import { Actions } from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class BlogList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            allBlogs: []
        }
    }
    
   renderActionButton(){
    return(
        <ActionButton
        fixNativeFeedbackRadius={true}
        buttonColor='#f3f3f3'
        size={70}
        buttonTextStyle={{color: 'black'}}
        renderIcon={() => {return(<Icon name = 'add' />)}}
        >
         <ActionButton.Item buttoncolor='#1abc9c' title="Add new blogs" onPress={() => Actions.BlogForm()}>
            <Icon name ='add' />
        </ActionButton.Item>
        </ActionButton>
    );
}

    renderRow(blog)
    {
        return(
            <BlogPreview blog={blog}/>
        ); 
    }    
    
    render()
    {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        if( !this.props.blogs.isLoaded )
        {
            this.props.blogLoaded();
            this.props.blogFetch('Culture');
            this.props.blogFetch('Travel');
            this.props.blogFetch('Currency');
            this.props.blogFetch('Weather');
            this.props.blogFetch('Transportation');
        }
        var categories =  [
        {category:'Culture',image: {name: 'ios-people', type: 'ionicon'}},
        {category:'Currency',image: {name: 'currency-jpy', type: 'material-community'}},
        {category:'Travel',image: {name: 'airplane', type: 'material-community'}},
        {category:'Weather', image: {name: 'ios-rainy', type: 'ionicon'}},
        {category:'Transportation', image: {name: 'train', type: 'material-community'}}];     
        this.dataSource = ds.cloneWithRows(categories);
        return (
            <View style={{flex:1}}>
                <ListView style={{backgroundColor: 'black', flex:1}}
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                enableEmptySections
                />        
                {this.renderActionButton()}
            </View>    
        );
    }  
}

    const styles = {
        viewColor: {          
            backgroundColor: '#D4DBDA',
        },
        spacingView: {
            paddingTop: 60
        },
        flexing: {
            flex: 1,
        },
    };

 const mapStateToProps = state => {
    return { blogs: state.blogs};
};     

export default connect(mapStateToProps,{blogFetch, blogLoaded})(BlogList);