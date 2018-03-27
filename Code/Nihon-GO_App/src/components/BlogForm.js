import React, { Component } from 'react';
import { Input, BlogButton, BlogCard, BlogCardSection } from './common' ;
import {connect} from 'react-redux';
import { blogUpdate, blogForm} from '../actions';
import {View, Picker} from 'react-native';


class BlogForm extends Component {
  constructor(props){
    super(props);
    this.state={
      category: 'currency'
    };
  }

    onButtonPress() {
        const {titleInput, title, description, guide, category} = this.props
        this.props.blogForm({titleInput,title,description,guide});
    }

    render() {
        return (
            <BlogCard>
              <BlogCardSection>
                  <Input
                  label="LOL"
                  placeholder="Fix me"
                  value={this.props.titleInput}
                  onChangeText={value => this.props.blogUpdate({prop: 'titleInput', value})}
                  />
                  <Input
                  label="LOL"
                  placeholder="Fix me"
                  value={this.props.titleInput}
                  onChangeText={value => this.props.blogUpdate({prop: 'titleInput', value})}
                  />
                  <Input
                  label="LOL"
                  placeholder="Fix me"
                  value={this.props.titleInput}
                  onChangeText={value => this.props.blogUpdate({prop: 'titleInput', value})}
                  />
                <View style={{
                  flex:1,
                  height: 100,
                  alignItems: 'center',
                  backgroundColor: 'purple',
                  flexDirection: 'row',
                }}>
                  <View style={{flex:1}}>
                    <Picker
                      style={{height: 30, width: 100}}
                      mode="dropdown"
                      color='black'
                      selectedValue={this.state.category}
                      onValueChange={itemValue => this.setState({category: itemValue})}>
                      <Picker.Item label="Currency" value="currency" />
                      <Picker.Item label="Travel" value="travel" />
                    </Picker>
                  </View>
              </View>
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
                    <Input
                    label="Guide"
                    placeholder="Enter Guide"
                    value={this.props.guide}
                    onChangeText={value => this.props.blogUpdate({prop: 'guide', value})}
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
    const { title, description, guide, category, titleInput } = state.blogForm;

    return { title, description, guide, category, titleInput }
}

export default connect(mapStateToProps, {blogUpdate, blogForm})(BlogForm);
