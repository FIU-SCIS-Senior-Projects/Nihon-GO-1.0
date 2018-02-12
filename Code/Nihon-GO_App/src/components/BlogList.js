import React, { Component } from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import data from '../reducers/LibraryList.json';
import BlogPreview from './BlogPreview';
import { BlogButton } from '../components/common/BlogButton';
import { BlogButtonPlus } from '../components/common/BlogButtonPlus';

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
            <ScrollView style={styles.viewColor}>
                 {this.renderBlogs()}
 
                <BlogButtonPlus >
                    Add More Guides 
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
            paddingTop: 6,
            paddingBottom: 4
        },
        };

export default BlogList;