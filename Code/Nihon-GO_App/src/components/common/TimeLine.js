import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

/*
    Creates a customizable Timeline. Checked state, colors, 
    line widths, and node sizes can be customized. See comments below.
*/

class TimeLine extends Component {
    constructor(props){
        super(props);
    }

    renderChecked(){
        const { children, 
                checkedColor, //Color when node is checked, default #2196F3 blue
                uncheckedColor, //Color when node is unchecked, default #9E9E9E gray
                checked, //If true, the node has an inner dot
                lineWidth, //Width of lines connecting nodes
                nodeSize //Size of node
            } = this.props;
        const { node, topLine, bottomLine } = styles;

        if(checked){
            return(
                <View style={{flexDirection: 'column'}}>
                    <View style={[
                        topLine, 
                        {backgroundColor: checkedColor || '#2196F3'}, 
                        {width: lineWidth || 4 }]}/>
                    <View style={[
                        node,
                        {borderColor: checkedColor || '#2196F3'},
                        {borderWidth: lineWidth /2 || 2},
                        {width: nodeSize || 28},
                        {height: nodeSize || 28},
                        {borderRadius: nodeSize / 2 || 14},
                        ]}>
                    <View style={[
                        {backgroundColor: checkedColor || '#2196F3'},
                        {width: nodeSize / 2 || 14},
                        {height: nodeSize /2 || 14},
                        {borderRadius: nodeSize /4 || 7}]}/>
                    </View>
                    <View style={[
                        bottomLine,
                        {backgroundColor: checkedColor || '#2196F3'}, 
                        {width: lineWidth || 4 }
                        ]}/>
                </View>
            );
        }
        else{
            return(
                <View style={{flexDirection: 'column'}}>
                    <View style={[
                        topLine, 
                        {backgroundColor: uncheckedColor || '#9E9E9E'}, 
                        {width: lineWidth || 4 }]}/>
                    <View style={[
                        node,
                        {borderColor: uncheckedColor || '#9E9E9E'},
                        {borderWidth: lineWidth /2 || 2},
                        {width: nodeSize || 28},
                        {height: nodeSize || 28},
                        {borderRadius: nodeSize / 2 || 14},
                        ]}>
                    </View>
                    <View style={[
                        bottomLine,
                        {backgroundColor: uncheckedColor || '#9E9E9E'}, 
                        {width: lineWidth || 4 }
                        ]}/>
                </View>
            );
        }
        
    }

    render(){
        const { node, topLine, bottomLine } = styles;
        const { checkedColor, uncheckedColor, children, style, onPress } = this.props;

        return(
            <View style={[{flex: 1, flexDirection: 'row'}, style]}>
                <TouchableWithoutFeedback onPress={onPress}>
                    {this.renderChecked()}
                </TouchableWithoutFeedback>
                {children}
            </View>
        );
    }
}

const styles = {
    topLine: {
        flex: 1,
        alignSelf: 'center',
    },
    node: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomLine: {
        flex: 8,
        alignSelf: 'center',
    },
};

export { TimeLine };