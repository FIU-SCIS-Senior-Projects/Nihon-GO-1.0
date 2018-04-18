import React from 'react';
import {Text, View, TouchableOpacity , Image} from 'react-native';
import { 
    BlogCardSection, 
    BlogButton, 
    BlogButtonPlus,
    BlogCard,
    BlogHeader,
    BlogExpand } from './common';
import { Actions} from 'react-native-router-flux';

const BlogPreview = (props) => {
    return(
        <BlogCard >
        <BlogCardSection /*onPress={Actions.BlogExpand()*/ >
        <View style={styles.imageContainerStyle}>
            <View >
                <Image style={styles.imageStyle} 
                    source={ { uri: props.blogItem.image } } />
            </View>
            <View style={styles.textContainerStyle}>
                <Text style={styles.titleText}>
                    {props.blogItem.location}
                </Text>
                <Text style={styles.captionText}>
                    {props.blogItem.description}
                </Text>
            </View>
        </View>
        </BlogCardSection>
        <BlogCardSection >
            <BlogButton onPress={ () => Actions.BlogExpand()}>
                View
            </BlogButton>
            <BlogButton >
                Suggest Changes
            </BlogButton>
        </BlogCardSection>
        </BlogCard>
    );
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


export default BlogPreview;