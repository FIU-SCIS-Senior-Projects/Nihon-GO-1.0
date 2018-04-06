import React, {Component} from 'react';
import {Text, View, TouchableOpacity , Image} from 'react-native';
import {
    BlogCardSection,
    BlogButton,
    BlogButtonPlus,
    BlogCard,
    BlogHeader,
    BlogExpand } from './common';
import * as actions from '../actions';
import {ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class BlogPreview extends Component {
    constructor(props){
        super(props);
    }


    render(){
        const {titleStyle, captionStyle } = styles;
        const { id, image, category } = this.props.blog;
  return(
        <BlogCard >
        <BlogCardSection >
        <View style={styles.imageContainerStyle}>
            <View >
                <Image style={styles.imageStyle}
                    source={ { uri: image } } />
            </View>
            <View style={styles.textContainerStyle}>
                <Text style={styles.titleText}>
                    {category}
                </Text>
            </View>
        </View>
        </BlogCardSection>
        <BlogCardSection >
            <BlogButton onPress={ () => this.props.selectCategory(this.props.blog.category)}>
                View
            </BlogButton>
            <BlogButton >
                Suggest Changes
            </BlogButton>
        </BlogCardSection>
        </BlogCard>
    );
}
};


const styles = {
    titleText: {
        flex: 1,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    captionText:{
        flex: 1,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 18,
    },
    imageStyle: {
        height: 100,
        width: 100,
    },
    imageContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    textContainerStyle: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    textReply: {
        align: 'center',
        justifyContent: 'space-around',

    },
    cardStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }

};

const mapStateToProps = state => {
    return { selectedCategory: state.selectedCategory };
};

export default connect(mapStateToProps, actions)(BlogPreview);
