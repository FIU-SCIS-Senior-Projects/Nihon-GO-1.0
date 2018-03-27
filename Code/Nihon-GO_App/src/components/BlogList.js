import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet, ListView} from 'react-native';
import {connect} from 'react-redux';
import BlogPreview from './BlogPreview';
import { BlogButton, BlogButtonPlus } from './common';

class BlogList extends Component 
{
    componentWillMount()
    {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            });

            this.dataSource = ds.cloneWithRows(this.props.blogs);
    }
    
    renderRow(blog)
    {
        return(
            <BlogPreview blog={blog.category}/>
        ); 
    }    
    
    render()
    {
        return (
            <ListView style={{backgroundColor: '#D4DBDA',paddingTop:60}}
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            />
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

export default connect(mapStateToProps)(BlogList);