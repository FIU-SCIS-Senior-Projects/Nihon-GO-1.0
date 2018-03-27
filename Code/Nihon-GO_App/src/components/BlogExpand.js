import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet, Flatlist } from 'react-native';
import { ImageCard, CaptionBox } from './common/index';
import { EventView } from './EventView';
import * as actions from '../actions';
import {connect} from 'react-redux';
import SubBlogPreview from './SubBlogPreview';
import { BlogButton, BlogButtonPlus } from './common';
import {ListView } from 'react-native';

class BlogExpand extends Component
{
    componentWillMount()
    {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            });

            this.dataSource = ds.cloneWithRows(this.props.subblogs);
    }

    renderRow(blog)
    {
        return(
            <SubBlogPreview blog={blog.subcategory}/>
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
    return { subblogs: state.subblogs};
};

export default connect(mapStateToProps)(BlogExpand);
