import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import data from '../reducers/LibraryList.json';
import BlogPreview from './BlogPreview';
import { BlogButton, BlogButtonPlus } from './common';

class BlogList extends Component 
{
    state={ blogs: [] };

    componentWillMount()
    {
        this.setState ({ blogs: data });
    }
    
    renderBlogs()
    {
        return this.state.blogs.map(blog => /*<Text>{blog.title}</Text>);*/
            <BlogPreview key={blog.location} blogItem={blog}/>
        ); 
    }    
    
    render()
    {
        return (
            <ScrollView style={[styles.viewColor,styles.spacingView]}>
                 {this.renderBlogs()}
                        
            <BlogButtonPlus>
                Load More
            </BlogButtonPlus>
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

        
export default BlogList;