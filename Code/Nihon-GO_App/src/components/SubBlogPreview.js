import React, {Component} from 'react';
import {Text, View, TouchableOpacity , Image, TouchableWithoutFeedback} from 'react-native';
import {
    BlogCardSection,
    BlogButton,
    BlogButtonPlus,
    BlogCard,
    BlogHeader,
    BlogExpand } from './common';
import * as actions from '../actions';
import { Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';


class SubBlogPreview extends Component {
    constructor(props){
        super(props);
        this.state = {
            expandedSubBlog: false
        };
    }

    toggleExpanded(){
        this.setState(previousState => {
            return { expandedSubBlog: !previousState.expandedSubBlog };
          });
    }

    onCardPress(){
      this.toggleExpanded();
    }

    renderCat(){
      const {titleStyle, captionStyle } = styles;
      const {title, description} = this.props.blog.data;

        if (this.state.expandedSubBlog){
          return(

            <TouchableWithoutFeedback onPress={() => this.onCardPress()}>
              <View>
              <BlogCard>
                  <BlogCardSection>
                      <View style={styles.imageContainerStyle}>
                          <View style={styles.textContainerStyle}>
                              <Text style={styles.titleText}>
                                  {title}
                              </Text>
                          </View>
                      </View>
                  </BlogCardSection>
                  <BlogCardSection>
                      <View>
                          <Text style={styles.captionText}>
                              {description}
                          </Text>
                      </View>
                  </BlogCardSection>
              </BlogCard>
              </View>
            </TouchableWithoutFeedback>
          );
        }
        else{
          return(
            <TouchableWithoutFeedback onPress={() => this.onCardPress()}>
              <View>
                <BlogCard>
                    <BlogCardSection>
                        <View style={styles.imageContainerStyle}>
                            <View style={styles.textContainerStyle}>
                                <Text style={styles.titleText}>
                                    {title}
                                </Text>
                            </View>
                        </View>
                    </BlogCardSection>
                </BlogCard>
              </View>
            </TouchableWithoutFeedback>
          );
        }
    }

    render(){

    return(
        <View>
          {this.renderCat()}
        </View>
    );
}
};


const styles = {
    titleText: {
        flex: 1,
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 30,
    },
    captionText:{
        marginLeft:4,
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
        marginLeft: 6,
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

export default connect(mapStateToProps, actions)(SubBlogPreview);