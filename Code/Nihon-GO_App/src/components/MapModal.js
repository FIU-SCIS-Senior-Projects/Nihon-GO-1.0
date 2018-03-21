import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2:{
	  borderRadius: 5,
	  width: 250,
	  height: 250,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'white'
  },
  textStyle:{
	  padding: 10,
	  fontSize: 20,
  }
});

export default class MapModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: -deviceHeight
    }).start(Actions.pop);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container2, { backgroundColor: 'white' },
			{ transform: [{ translateY: this.state.offset }] }]}>
          <Text style={styles.textStyle}>{this.props.data}</Text>
          <Button title="Close" onPress={this.closeModal.bind(this)}></Button>
        </Animated.View>
      </View>
    );
  }
}