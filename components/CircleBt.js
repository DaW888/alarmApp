import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";

class CircleBt extends Component {

    styles = StyleSheet.create({
        cont: {
            width: this.props.size,
            height: this.props.size,
            borderRadius: 60,
            backgroundColor: this.props.bcColor,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    buttonIcon = () => {
        if (this.props.type === 'plus') {
            return <AntDesign name='plus' size={this.props.size - 4} color={Colors.text} />
        }
    }

    click = () => {
        this.props.circleClick();
    }

    render() {
        return (
            <TouchableOpacity style={this.styles.cont} onPress={this.click}>
                {this.buttonIcon()}
            </TouchableOpacity>
        );
    }
}

export default CircleBt;
