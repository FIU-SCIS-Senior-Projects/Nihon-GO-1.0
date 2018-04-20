import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';
import {connect} from 'react-redux';
import { blogUpdate, blogCreate, subCategoryCreate} from '../actions';
import {Text, View, Modal, TouchableOpacity, ListView, Picker} from 'react-native';
import {BlurView} from 'expo';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import SubcategoryPreview from './SubcategoryPreview';



class BlogForm extends Component {
  constructor(props){
    super(props);
    
    /*
    this.state={
      addingSubcategory: false,
      subcategories: [],
      subcategory: {
          title:'',
          description:'',
      },
    }; */
  }

  componentWillMount(){
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    });

    this.dataSource = ds.cloneWithRows(this.props.blogs);
}

    onSubmitPress() {
        const {category, title, description} = this.props;
        if(!category && !title && !description)
        {
            console.log("Missing all fields");
        }
        else{
            this.props.blogCreate({category, title, description});
        }
    }
/*
    onSubCatSubmitPress() {
        const {category, subcategories} = this.props;
        if(!category && !subcategories)
        {
            console.log("Missing all fields");
        
        else{
            this.props.subCategoryCreate({category, subcategories});
        }
    }
*/
   /*
    toggleBlogForm(){
        this.setState(previousState => {
            return {addingSubcategory: !previousState.addingSubcategory};
        });
    }
*/
    renderActionButton(){
        return(
            <ActionButton
                fixNativeFeedbackRadius={true}
                buttonColor='#4fc3f7'
                size={70}
                buttonTextStyle={{color: 'black'}}
                renderIcon={() => {return(<Icon name = 'add' />)}}
                >
                {/*
                <ActionButton.Item buttoncolor='#9b59b6' title="Preview Blog" onPress={() => this.onPreviewPress()}>
                    <Icon name ='card-travel' />
                </ActionButton.Item>
                */}
                <ActionButton.Item buttonColor='#3498db' title="Submit Blog" onPress={() => this.onSubmitPress()}>
                    <Icon name='file-upload' />
                </ActionButton.Item>
                {/*   
                <ActionButton.Item buttonColor='#4DCDBD' title="Submit Subcategories" onPress={() => this.onSubCatSubmitPress()}>
                    <Icon name='file-upload' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Add Subcategory" onPress={() => this.toggleBlogForm()}>
                    <Icon name='add' />
                </ActionButton.Item>
                */}
		    </ActionButton>
        );
    }

    /*
    addSubcategory(){
        const {subcategory} = this.state;
        if(!subcategory.title && !subcategory.description){
            console.log("Fields missing")
        }
        else{
            this.setState({
                subcategory: {
                    title: this.state.subcategory.title,
                    description: this.state.subcategory.description
                },
            })
            this.state.subcategories.push(subcategory);
            var value = this.state.subcategories;
            {this.props.blogUpdate({prop: 'subcategories', value})};
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            });
            this.dataSource = ds.cloneWithRows(this.props.subcategories);
            this.setState(
                this.state
            )
            this.setState({
                subcategory: {
                    title: '',
                    description:'',
                }
            })
        }
    }
*/
/*  addSubcategoryForm(){
        return(
            <Modal
            animationType="slide"
            visible={this.state.addingSubcategory}
            transparent
            onRequestClose={() => {this.toggleBlogForm()}}>
            <BlurView intensity={100} style={{flex: 1}}>
                <Card style={styles.modalStyle}>
                    <CardSection>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', flex: 5, fontSize: 18, marginLeft: 10}}>Subcategory</Text>
                            <View style={{justifyContent: 'flex-end', flex: 1}}>
                                <TouchableOpacity onPress={() => {this.toggleBlogForm()}}>
                                    <View style={{marginRight: 10, marginTop: 10}}>    
                                        <Icon
                                            name='x'
                                            type='feather'
                                            color='black'
                                            size={35}
                                            />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Title"
                            placeholder="Enter a title"
                            value={this.state.subcategory.title}
                            onChangeText={value =>
                                this.setState({
                                    subcategory: {
                                        title: value,
                                        description: this.state.subcategory.description,
                                    }
                                })
                            }
                            />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Description"
                            multiline
                            placeholder="Enter the guide content"
                            onChangeText={value =>
                                this.setState({
                                    subcategory: {
                                        title: this.state.subcategory.title,
                                        description: value,
                                    }
                                })
                            }
                         />
                       </CardSection>
                       <CardSection>
                           <Button onPress={()=> this.addSubcategory()}>
                                    Add Subcategory
                            </Button>
                       </CardSection>
                       </Card>
                      </BlurView>
                    </Modal>                         
        );
    }
*/
/*
    renderSubcategoryList(){
        return(
            <View style={{flex:1}}>
            <View>
              <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderSubcategoryRow}
                    enableEmptySections
                    />
             </View>
           </View>             
        );
    }
*/
/*
    renderSubcategoryRow(subcategory){
        return(
            <SubcategoryPreview subcategory={subcategory} mode={'edit'} />
        );
    }
*/
    addCategoryForm(){
        return(
            <Card style={{elevation: 0}}>
                <CardSection>
                    <View style={styles.containerStyle}>
                        <Text style={styles.labelStyle}>Category</Text>
                        <Picker 
                            selectedValue={this.props.category}
                            mode = "dropdown"
                            style={{flex:1, height: 1004, width:100 }}
                            onValueChange={(value) => this.props.blogUpdate({prop: "category",value})}>
                            <Picker.Item label="Choose one" value="" />
                            <Picker.Item label="Currency" value="Currency" />
                            <Picker.Item label="Travel" value="Travel" />
                            <Picker.Item label="Culture" value="Culture" />
                            <Picker.Item label="Weather" value="Weather" />
                            <Picker.Item label="Transportation" value="Transportation" />
                        </Picker>
                    </View>
                </CardSection>
                <CardSection>
                    <Input
                        label="Title"
                        placeholder="Enter a title"
                        value={this.props.title}
                        onChangeText={value =>this.props.blogUpdate({prop: "title",value})}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Description"
                        multiline
                        placeholder="Enter the guide content"
                        value={this.props.description}
                        onChangeText={value =>this.props.blogUpdate({prop: "description",value})}
                    />
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1}}>
                    {this.addCategoryForm()}
                </View>
                {this.renderActionButton()}
            </View>    
        );
    }
}
    


const styles ={
    modalStyle: {
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
    },
    inputStyle: {
            color: '#000',
            paddingRight: 5,
            paddingLeft: 5,
            fontSize: 18,
            lineHeight: 23,
            flex: 2
        },
    labelStyle: {
            fontSize: 18,
            paddingLeft: 20,
            flex: 1
        },
    containerStyle: {
            height: 40,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }
  }

const mapStateToProps = (state) =>{
   const { category, title, description } = state.blogCreate;
   const blogs = state.blogs;
   return { category, title, description, blogs};
}

export default connect(mapStateToProps,{blogCreate, blogUpdate})(BlogForm);
