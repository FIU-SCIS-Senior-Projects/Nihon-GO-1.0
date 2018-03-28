import React, { Component } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { ImageCard, CaptionBox } from './common/index';
import * as actions from '../actions';
import { connect } from 'react-redux';

class BlogExpand extends Component{
    render(){
        return(
            <View>
                <Text style={styles.padStyle}>
                    Text
                </Text>
                <Text>
                    Text
                </Text>
                <Text>
                    Text
                </Text>
            </View>        
        );
    }
};

const styles = {
    padStyle: {
        paddingTop: 60
    },
};

export default BlogExpand;