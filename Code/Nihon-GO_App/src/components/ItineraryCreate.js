import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';
import {connect} from 'react-redux';
import { itineraryUpdate, itineraryCreate } from '../actions';

class ItineraryCreate extends Component{
    onButtonPress(){
        const { titleInput, location, description, image, duration } = this.props;

        this.props.itineraryCreate({ titleInput, location, description, image, duration });
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Title"
                        placeholder="Enter a title"
                        value={this.props.titleInput}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'titleInput', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Location"
                        placeholder="Enter a city"
                        value={this.props.location}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'location', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Description"
                        placeholder="Enter a description"
                        value={this.props.description}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'description', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Image"
                        placeholder="Enter an image url"
                        value={this.props.image}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'image', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Duration (days)"
                        placeholder="Enter a duration in days"
                        value={this.props.duration}
                        onChangeText={value => this.props.itineraryUpdate({prop: 'duration', value})}
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Add
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) =>{
    const { location, description, image, duration, titleInput } = state.itineraryForm;

    return { location, description, image, duration, titleInput }
}

export default connect(mapStateToProps, {
    itineraryUpdate, itineraryCreate
})(ItineraryCreate);