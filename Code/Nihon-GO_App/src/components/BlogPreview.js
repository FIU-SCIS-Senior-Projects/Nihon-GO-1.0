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
import {Icon} from 'react-native-elements';
import ActionButton from 'react-native-action-button';


class BlogPreview extends Component {
    constructor(props){
        super(props);
    }


  

    render(){
        const {titleStyle, captionStyle } = styles;
        const { category, image } = this.props.blog;
        return(
                <BlogCard>
                <BlogCardSection>
                <View style={styles.imageContainerStyle}>
                    <View >
                        <Icon
                            size = {100}
                            name={image.name} 
                            iconStyle={styles.imageStyle}
                            type={image.type}/>
                    </View>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.titleText}>
                            {category}
                        </Text>
                    </View>
                </View>
                </BlogCardSection>
                <BlogCardSection >
                    <BlogButton onPress={ () => this.props.selectCategory(category)}>
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
        fontSize: 40,
    },
    captionText:{
        flex: 1,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 22,
    },
    imageStyle: {
        marginLeft: 15,
        height: 100,
        width: 100,
    },
    imageContainerStyle: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    textContainerStyle: {
        marginLeft: 35,
        marginTop: 25,
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
    return { selectCategory: state.selectCategory };
};

export default connect(mapStateToProps, actions)(BlogPreview);
