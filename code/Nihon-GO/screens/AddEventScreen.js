import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, TextInput } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class AddEventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      city: "",
      isDateTimePickerVisible: false,
    };
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    const { navigate } = this.props.navigation;
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={{
        flex: 1,
        flexDirection:'column',
      }}>
        <Text>Event Title:</Text>
        <TextInput
          style={styles.textBoxStyle}
          placeholder="Event Title"
        />
        <Text>City: </Text>
        <Picker
          selectedValue={this.state.city}
          onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
          <Picker.Item label="Kyoto" value="kyoto" />
          <Picker.Item label="Osaka" value="osaka" />
          <Picker.Item label="Tokyo" value="tokyo" />
        </Picker>
        <Text>Event Address:</Text>
        <TextInput
          style={styles.textBoxStyle}
          placeholder="Address"
        />
        <View style={styles.container}>
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Text>Show DatePicker</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
        <Text>Event Description:</Text>
        <TextInput
          style={styles.textBoxStyle}
          placeholder="Description"
          multiline={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBoxStyle: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    margin: 10,
    height: 60,
    paddingLeft: 10
  },
});
