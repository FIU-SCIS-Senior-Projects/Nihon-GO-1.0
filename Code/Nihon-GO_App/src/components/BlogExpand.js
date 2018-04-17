import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet, Flatlist } from 'react-native';
import { ImageCard, CaptionBox } from './common/index';
import { EventView } from './EventView';
import * as actions from '../actions';
import {connect} from 'react-redux';
import SubBlogPreview from './SubBlogPreview';
import {ListView, FlatList } from 'react-native';

class BlogExpand extends Component
{
    renderRow(blog)
    {
        return(
            <SubBlogPreview blog={blog}/>
        );
    }

    render()
    {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        
        var blogList = [];
        switch (this.props.selectedCategory){
            case 'Culture' :
                blogList = this.props.blogs.Culture;
                break;
            case 'Currency' :
                blogList = this.props.blogs.Currency;
                break;
            case 'Travel' :
                blogList = this.props.blogs.Travel;
                break;
            case 'Weather' :
                blogList = this.props.blogs.Weather;
                break;
            case 'Transportation' :
                blogList = this.props.blogs.Transportation;
                break;
        } 
        this.dataSource = ds.cloneWithRows(blogList);
        return (            
            <ListView style={{backgroundColor: 'black'}}
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            enableEmptySections
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
    const {blogs, selectedCategory} = state;
    return {blogs, selectedCategory};
};

export default connect(mapStateToProps)(BlogExpand);
