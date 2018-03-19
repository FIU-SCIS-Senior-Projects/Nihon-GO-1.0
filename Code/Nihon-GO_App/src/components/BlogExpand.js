import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet, Flatlist } from 'react-native';
import { ImageCard, CaptionBox } from './common/index';
import { EventView } from './EventView';
import * as actions from '../actions';
import {connect} from 'react-redux';
import data from '../reducers/LibraryList.json';
import SubBlogPreview from './SubBlogPreview';
import { BlogButton, BlogButtonPlus } from './common';

class BlogExpand extends Component
{
    state={ blogs: [] };

    componentWillMount()
    {
        this.setState ({ blogs: data });
    }
    
    renderSubBlogs()
    {
        return this.state.blogs.map(blog => /*<Text>{blog.title}</Text>);*/
            <SubBlogPreview key={blog.location} blogItem={blog}/>
        ); 
    }    
    
    render()
    {
        return (
            <ScrollView style={[styles.viewColor,styles.spacingView]}>
                 {this.renderSubBlogs()}
            </ScrollView>
        );
    }  
};

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

export default BlogExpand;