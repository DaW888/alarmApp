import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Item from "./Item";

class Items extends Component {
    render() {
        return (
            <View>
                {[<Item key={1}/>, <Item key={2}/>, <Item key={3}/>, <Item key={4}/>]}
            </View>
        );
    }
}

export default Items;
