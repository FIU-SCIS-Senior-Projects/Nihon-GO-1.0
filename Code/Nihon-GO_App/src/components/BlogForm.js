import React, { Component } from 'react';
import { Input, BlogButton, BlogCard, BlogCardSection } from './common' ;
import {connect} from 'react-redux';
import { blogUpdate, blogForm} from '../actions';
import {View, Picker} from 'react-native';


class BlogForm extends Component {
  constructor(props){
    super(props);
    /*this.state={
      category: 'currency'
    }; */
  }

    onButtonPress() {
        const {category, title, description} = this.props;
        this.props.blogForm({category, title, description});
    }

    render() {
        return (
            <BlogCard>
                 <BlogCardSection>
                    <Input
                    label="Category Title"
                    placeholder="Enter Category Title"
                    value={this.props.category}
                    onChangeText={value => this.props.blogUpdate({prop: 'category', value})}
                    />
                </BlogCardSection>
                <BlogCardSection>
                    <Input
                    label="Subcategory Title"
                    placeholder="Enter Subcategory Title"
                    value={this.props.title}
                    onChangeText={value => this.props.blogUpdate({prop: 'title', value})}
                    />
                </BlogCardSection>
                 <BlogCardSection>
                 <Input
                 label="Description"
                 placeholder="Enter Description"
                 value={this.props.description}
                 onChangeText={value => this.props.blogUpdate({prop: 'description', value})}
                 />
                 </BlogCardSection>
                <BlogCardSection>
                    <BlogButton onPress={this.onButtonPress.bind(this)}>
                        Submit
                    </BlogButton>
                </BlogCardSection>
            </BlogCard>
        );
    }
};

const styles ={
  picker:{
    flex:1,
    maxHeight: 30,
  }
};

const mapStateToProps = (state) =>{
    const { category, title, description } = state.blogForm;

    return { category, title, description };
}

export default connect(mapStateToProps, {blogUpdate, blogForm})(BlogForm);
