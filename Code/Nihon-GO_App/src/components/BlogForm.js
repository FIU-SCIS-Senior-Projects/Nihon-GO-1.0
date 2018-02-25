import React, { Component } from 'react';
import { input } from './common/Input' ;
import firebase from 'firebase';
import {BlogButton, BlogCard, BlogCardSection} from './common'


class BlogForm extends Component {

    onButtonPress() {
        const {titleIn, loc, desc, img, dur} = this.props
        this.props.BlogForm({titleIn,loc,desc,img,dur});
    }

    render() {
        return (
            <BlogCard>
                <BlogCardSection>
                    <Input
                    placeholder="Title"
                    label="Enter Event Title"
                    value={this.props.titleIn}
                    onChangeText={value => this.props.BlogForm({prop: 'titleIn', value})}
                    />
                </BlogCardSection>
                    <Input
                    placeholder="Location"
                    label="Enter Event Location"
                    value={this.props.loc}
                    onChangeText={value => this.props.BlogForm({prop: 'loc', value})}
                    />
                 <BlogCardSection>
                 <Input
                 placeholder="Description"
                 label="Enter Event Description"
                 value={this.props.desc}
                 onChangeText={value => this.props.BlogForm({prop: 'desc', value})}
                 />
                 </BlogCardSection> 
                 <BlogCardSection>
                    <Input
                    placeholder="Image"
                    label="Enter Image Url"
                    value={this.props.img}
                    onChangeText={value => this.props.BlogForm({prop: 'img', value})}
                    />
                </BlogCardSection> 
                <BlogCardSection>
                    <Input
                    placeholder="Duration"
                    label="The days of the event"
                    value={this.props.dur}
                    onChangeText={value => this.props.BlogForm({prop: 'dur', value})}
                    />
                </BlogCardSection> 
                <BlogCardSection>
                    <BlogButton onPress={this.onButonPress.bind(this)}>
                        Submit
                    </BlogButton>
                </BlogCardSection>    
            </BlogCard>        

        );
    }
};

const mapStateToProps = (state) => {
    const {loc, desc,img, dur, titleIn} = state.BlogForm;

    return {loc, desc, img, dur, titleIn}
}

export default BlogForm;    