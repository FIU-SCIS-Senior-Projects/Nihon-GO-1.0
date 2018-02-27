import React, { Component } from 'react';
import { Input, BlogButton, BlogCard, BlogCardSection } from './common' ;
import {connect} from 'react-redux';
import { blogUpdate, blogForm} from '../actions';
import {View} from 'react-native';


class BlogForm extends Component {

    /*
    onButtonPress() {
        const {titleInput, location, description, image, duration} = this.props
        this.props.blogForm({titleInput,location,description,image,duration});
    }
    */

    render() {
        return (
            <View style={styles.spacingView}>
            <BlogCard>
                <BlogCardSection>
                    <Input
                    label="Title"
                    placeholder="Enter Event Title"
                    value={this.props.titleInput}
                    onChangeText={value => this.props.blogUpdate({prop: 'titleInput', value})}
                    />

                </BlogCardSection>
                
                <BlogCardSection>
                    <Input
                    label="Location"
                    placeholder="Enter Event Location"
                    value={this.props.location}
                    onChangeText={value => this.props.blogUpdate({prop: 'location', value})}
                    />
                </BlogCardSection>

                 <BlogCardSection>
                 <Input
                 label="Description"
                 placeholder="Enter Event Description"
                 value={this.props.description}
                 onChangeText={value => this.props.blogUpdate({prop: 'description', value})}
                 />
                 </BlogCardSection> 
                 <BlogCardSection>
                    <Input
                    label="Image"
                    placeholder="Enter Image Url"
                    value={this.props.image}
                    onChangeText={value => this.props.blogUpdate({prop: 'image', value})}
                    />
                </BlogCardSection> 
                <BlogCardSection>
                    <Input
                    label="Duration"
                    placeholder="The days of the event"
                    value={this.props.duration}
                    onChangeText={value => this.props.blogUpdate({prop: 'duration', value})}
                    />
                </BlogCardSection> 
                <BlogCardSection>
                    <BlogButton >
                        Submit
                    </BlogButton>
                </BlogCardSection>    
            </BlogCard>
            </View>        
        );
    }
};

const styles = {
    spacingView: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 4
    },
    };

export default BlogForm; 